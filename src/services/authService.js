import { supabase } from '../lib/supabase';

export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  return data;
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function getCurrentAdmin() {
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}

export function listenAuthChanges(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}