import { createClient } from '@supabase/supabase-js';

// NOTE: In a real project, these should be in a .env file.
// VITE_SUPABASE_URL=https://zgkovghzfzrgpxjobq.supabase.co
// VITE_SUPABASE_ANON_KEY=sb_publishable_ICFao23PmLonXjt4MzDtxQ_GLgBc2Y1

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zgkovghzfzrgpxjobq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ICFao23PmLonXjt4MzDtxQ_GLgBc2Y1';

export const supabase = createClient(supabaseUrl, supabaseKey);