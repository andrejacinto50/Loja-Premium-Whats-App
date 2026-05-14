import { supabase } from '../lib/supabase';

export async function getDashboardStats() {
  const [
    productsResult,
    categoriesResult,
    bannersResult,
    featuredResult,
    promosResult,
    activeProductsResult
  ] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),

    supabase.from('categories').select('id', { count: 'exact', head: true }),

    supabase.from('banners').select('id', { count: 'exact', head: true }),

    supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('featured', true),

    supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('promo', true),

    supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .neq('status', 'inactive')
  ]);

  return {
    products: productsResult.count || 0,
    categories: categoriesResult.count || 0,
    banners: bannersResult.count || 0,
    featured: featuredResult.count || 0,
    promos: promosResult.count || 0,
    activeProducts: activeProductsResult.count || 0
  };
}