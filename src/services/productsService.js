import { supabase } from '../lib/supabase';
import { products as defaultProducts } from '../data/products';

function mapProductFromDatabase(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price || 0),
    promoPrice: product.promo_price
      ? Number(product.promo_price)
      : null,
    description: product.description || '',
    images: product.images || [],
    sizes: product.sizes || [],
    colors: product.colors || [],
    badge: product.badge || '',
    stockStatus: product.stock_status || 'Disponível',
    categoryId: product.category_id || '',
    categorySlug: product.category_slug || '',
    featured: !!product.featured,
    promo: !!product.promo,
    active: product.active !== false,
    categoryActive: product.categories?.active !== false
  };
}

function mapProductToDatabase(product) {
  return {
    name: product.name,
    slug: product.slug,
    price: Number(product.price || 0),
    promo_price: product.promoPrice
      ? Number(product.promoPrice)
      : null,
    description: product.description || '',
    images: product.images || [],
    sizes: product.sizes || [],
    colors: product.colors || [],
    badge: product.badge || '',
    stock_status: product.stockStatus || 'Disponível',
    category_id: product.categoryId || null,
    category_slug: product.categorySlug || '',
    featured: !!product.featured,
    promo: !!product.promo,
    active: product.active !== false
  };
}

/* Loja pública: só produtos ativos E categoria ativa */
export async function getProducts() {
  const { data: activeCategories, error: categoriesError } = await supabase
    .from('categories')
    .select('slug')
    .eq('active', true);

  if (categoriesError) {
    console.error(categoriesError);
    return defaultProducts;
  }

  const activeCategorySlugs = activeCategories.map(
    (category) => category.slug
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .in('category_slug', activeCategorySlugs)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return defaultProducts;
  }

  return data.map(mapProductFromDatabase);
}

/* Admin: mostra todos os produtos, mesmo se categoria estiver desativada */
export async function getAllProductsAdmin() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map(mapProductFromDatabase);
}

export async function getFeaturedProducts() {
  const products = await getProducts();

  return products.filter((product) => product.featured);
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();

  if (error) {
    console.error(error);
    return defaultProducts.find((product) => product.slug === slug);
  }

  if (!data) {
    return null;
  }

  const { data: category } = await supabase
    .from('categories')
    .select('active')
    .eq('slug', data.category_slug)
    .maybeSingle();

  if (category?.active === false) {
    return null;
  }

  return mapProductFromDatabase(data);
}

export async function getProductsByCategory(categorySlug) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (
        active
      )
    `)
    .eq('category_slug', categorySlug)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data
    .filter((product) => product.categories?.active !== false)
    .map(mapProductFromDatabase);
}

export async function getRelatedProducts(product) {
  const products = await getProducts();

  return products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert(mapProductToDatabase(product))
    .select()
    .single();

  if (error) throw error;

  return mapProductFromDatabase(data);
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from('products')
    .update(mapProductToDatabase(product))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return mapProductFromDatabase(data);
}