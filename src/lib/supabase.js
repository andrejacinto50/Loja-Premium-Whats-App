import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpzagskphshitpgnuqzl.supabase.co';
const supabaseAnonKey = 'sb_publishable_0YfIprB3sFbXP_l1jQTVgg_UTn75Sbr';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);