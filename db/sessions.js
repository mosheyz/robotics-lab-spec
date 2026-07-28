import { createClient } from '@supabase/supabase-js';

const { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } = process.env

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)