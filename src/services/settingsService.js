import { supabase } from '../lib/supabase';
import { storeConfig as defaultStoreConfig } from '../data/storeConfig';

function mapSettingsFromDatabase(settings) {
  return {
    id: settings.id,

    storeName: settings.store_name || '',
    slogan: settings.slogan || '',
    whatsapp: settings.whatsapp || '',
    instagram: settings.instagram || '',
    address: settings.address || '',
    openingHours: settings.opening_hours || '',
    defaultWhatsappText: settings.default_whatsapp_text || '',

    colors: {
      primary: settings.primary_color || '#d4af37',
      secondary: settings.secondary_color || '#111111',
      background: settings.background_color || '#070707'
    },

    logoUrl: settings.logo_url || '',
    faviconUrl: settings.favicon_url || '',
    email: settings.email || '',
    facebook: settings.facebook || '',
    tiktok: settings.tiktok || '',

    heroTitle: settings.hero_title || '',
    heroDescription: settings.hero_description || '',
    heroButtonText: settings.hero_button_text || '',
    heroButtonLink: settings.hero_button_link || ''
  };
}

function mapSettingsToDatabase(settings) {
  return {
    store_name: settings.storeName || '',
    slogan: settings.slogan || '',
    whatsapp: settings.whatsapp || '',
    instagram: settings.instagram || '',
    address: settings.address || '',
    opening_hours: settings.openingHours || '',
    default_whatsapp_text: settings.defaultWhatsappText || '',

    primary_color: settings.colors?.primary || '#d4af37',
    secondary_color: settings.colors?.secondary || '#111111',
    background_color: settings.colors?.background || '#070707',

    logo_url: settings.logoUrl || '',
    favicon_url: settings.faviconUrl || '',
    email: settings.email || '',
    facebook: settings.facebook || '',
    tiktok: settings.tiktok || '',

    hero_title: settings.heroTitle || '',
    hero_description: settings.heroDescription || '',
    hero_button_text: settings.heroButtonText || '',
    hero_button_link: settings.heroButtonLink || ''
  };
}

export async function getStoreSettings() {
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return defaultStoreConfig;
  }

  if (!data) {
    return null;
  }

  return mapSettingsFromDatabase(data);
}

export async function updateStoreSettings(id, settings) {
  const { data, error } = await supabase
    .from('store_settings')
    .update(mapSettingsToDatabase(settings))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return mapSettingsFromDatabase(data);
}