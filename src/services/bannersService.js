import { supabase } from '../lib/supabase';
import { banners as defaultBanners } from '../data/banners';

function mapBannerFromDatabase(banner) {
  return {
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    imageUrl: banner.image_url,
    buttonText: banner.button_text,
    buttonLink: banner.button_link,
    position: banner.position,
    active: banner.active
  };
}

function mapBannerToDatabase(banner) {
  return {
    title: banner.title,
    subtitle: banner.subtitle,
    image_url: banner.imageUrl,
    button_text: banner.buttonText,
    button_link: banner.buttonLink,
    position: banner.position || 'hero',
    active: banner.active !== false
  };
}

export async function getBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return defaultBanners;
  }

  return data.map(mapBannerFromDatabase);
}

export async function getBannerByPosition(position) {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('position', position)
    .eq('active', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);

    return defaultBanners.find(
      (banner) => banner.position === position && banner.active
    );
  }

  return data ? mapBannerFromDatabase(data) : null;
}

export async function createBanner(banner) {
  const { data, error } = await supabase
    .from('banners')
    .insert(mapBannerToDatabase(banner))
    .select()
    .single();

  if (error) throw error;

  return mapBannerFromDatabase(data);
}

export async function updateBanner(id, banner) {
  const { data, error } = await supabase
    .from('banners')
    .update(mapBannerToDatabase(banner))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return mapBannerFromDatabase(data);
}