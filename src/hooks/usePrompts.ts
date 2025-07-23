import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Prompt } from '../types';

export const usePrompts = () => {
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPrompt();
  }, []);

  const fetchCurrentPrompt = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setCurrentPrompt(data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompt');
    } finally {
      setLoading(false);
    }
  };

  return { currentPrompt, loading, error, refetch: fetchCurrentPrompt };
};