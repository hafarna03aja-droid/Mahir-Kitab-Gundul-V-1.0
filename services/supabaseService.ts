import { supabase } from '../lib/supabase';
import type { AnalysisResult } from '../types';

/**
 * Save analysis result to Supabase database
 * This is optional - the app will work without database
 */
export const saveAnalysisHistory = async (result: AnalysisResult): Promise<void> => {
    try {
        const { data, error } = await supabase
            .from('analysis_history')
            .insert({
                original_text: result.originalText,
                vocalized_text: result.vocalizedText,
                translation: result.translation,
                irab_analysis: result.irab,
            });

        if (error) {
            console.error('Error saving to history:', error);
            // Don't throw - let the app continue even if save fails
        }
    } catch (error) {
        console.error('Error saving analysis:', error);
        // Silently fail - database is optional
    }
};

/**
 * Get analysis history from Supabase
 * Returns empty array if database is not configured
 */
export const getAnalysisHistory = async (limit: number = 10): Promise<any[]> => {
    try {
        const { data, error } = await supabase
            .from('analysis_history')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching history:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error getting history:', error);
        return [];
    }
};

/**
 * Delete analysis history item
 */
export const deleteAnalysisHistory = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('analysis_history')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting history:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting history:', error);
        return false;
    }
};

/**
 * Check if Supabase is configured
 */
export const isSupabaseConfigured = (): boolean => {
    try {
        return !!(
            import.meta.env.VITE_SUPABASE_URL &&
            import.meta.env.VITE_SUPABASE_ANON_KEY
        );
    } catch {
        return false;
    }
};
