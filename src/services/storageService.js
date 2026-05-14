import { supabase } from '../lib/supabase';

export async function uploadImage(file, folder = 'products') {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();

  const fileName = `${Date.now()}.${fileExt}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from('store-images')
    .upload(filePath, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data } = supabase.storage
    .from('store-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}