import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { playersService } from '../services/players.service';
import { Player } from '../types';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await playersService.getAll();
      setPlayers(data);
    } catch {
      setError('Failed to load players.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchPlayers(); }, [fetchPlayers]));

  return { players, loading, error, refetch: fetchPlayers };
}
