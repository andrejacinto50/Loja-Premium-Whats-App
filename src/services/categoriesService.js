import { supabase } from '../lib/supabase';
import { categories as defaultCategories } from '../data/categories';

function mapCategoryFromDatabase(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    imageUrl: category.image_url,
    order: category.display_order,
    active: category.active
  };
}

function mapCategoryToDatabase(category) {
  return {
    name: category.name,
    slug: category.slug,
    image_url: category.imageUrl,
    display_order: Number(category.order || 1),
    active: category.active !== false
  };
}

/* Loja pública: mostra só categorias ativas */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(error);

    return defaultCategories
      .filter((category) => category.active !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  }

  return data.map(mapCategoryFromDatabase);
}

/* Admin: mostra todas, inclusive desativadas */
export async function getAllCategoriesAdmin() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error(error);

    return defaultCategories.sort(
      (a, b) => Number(a.order || 0) - Number(b.order || 0)
    );
  }

  return data.map(mapCategoryFromDatabase);
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert(mapCategoryToDatabase(category))
    .select()
    .single();

  if (error) throw error;

  return mapCategoryFromDatabase(data);
}

export async function updateCategory(id, category) {
  const { data, error } = await supabase
    .from('categories')
    .update(mapCategoryToDatabase(category))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return mapCategoryFromDatabase(data);
}