import { createClient } from '@supabase/supabase-js';

// Configuration can be loaded from env or dynamic settings
const DEFAULT_SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL ||
  'https://jthsfxdavsvgldjwqosp.supabase.co';

const DEFAULT_SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_hBNqq9w8zGJoOXZIy0QjfA_1yyQOeKc';

export function getSupabaseConfig() {
  const savedUrl = localStorage.getItem('dhanlaxmi_supabase_url') || DEFAULT_SUPABASE_URL;
  const savedKey = localStorage.getItem('dhanlaxmi_supabase_key') || DEFAULT_SUPABASE_ANON_KEY;
  return {
    url: savedUrl.trim(),
    key: savedKey.trim(),
    isConfigured: Boolean(savedUrl.trim() && savedKey.trim()),
  };
}

export function saveSupabaseConfig(url: string, key: string) {
  localStorage.setItem('dhanlaxmi_supabase_url', url.trim());
  localStorage.setItem('dhanlaxmi_supabase_key', key.trim());
}

export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (config.isConfigured) {
    try {
      return createClient(config.url, config.key);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return null;
}
