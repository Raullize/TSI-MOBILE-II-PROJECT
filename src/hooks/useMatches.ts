import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { matchesService } from '../services/matches.service';
import { Match } from '../types';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await matchesService.getAll();
      setMatches(data);
    } catch {
      setError('Failed to load matches.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchMatches(); }, [fetchMatches]));

  return { matches, loading, error, refetch: fetchMatches };
}
