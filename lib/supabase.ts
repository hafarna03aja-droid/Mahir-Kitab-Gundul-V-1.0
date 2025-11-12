import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types untuk database
export interface AnalysisHistory {
    id: string;
    user_id?: string;
    original_text: string;
    vocalized_text: string;
    translation: string;
    irab_analysis: any; // JSON field
    created_at: string;
}

export interface UserProfile {
    id: string;
    username?: string;
    email?: string;
    created_at: string;
    updated_at: string;
}
