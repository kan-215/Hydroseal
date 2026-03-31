import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseData<T>(table: string, orderField: string = 'sort_order') {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderField, { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setData(data as T[]);
      }
      setLoading(false);
    }
    fetchData();
  }, [table, orderField]);

  return { data, loading, error };
}
