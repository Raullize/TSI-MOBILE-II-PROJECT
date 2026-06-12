import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { teamsService } from '../services/teams.service';
import { Team } from '../types';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamsService.getAll();
      setTeams(data);
    } catch {
      setError('Failed to load teams.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchTeams(); }, [fetchTeams]));

  return { teams, loading, error, refetch: fetchTeams };
}
