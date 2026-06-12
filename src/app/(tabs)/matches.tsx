import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { useMatches } from '../../hooks/useMatches';
import { useTeams } from '../../hooks/useTeams';
import { matchesService } from '../../services/matches.service';
import { getTeamAbbreviation, formatMatchDate, formatMatchTime } from '../../utils/team';

const FILTERS = ['All', 'Upcoming', 'Finished'];

export default function MatchesScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const { matches, loading, error, refetch } = useMatches();
  const { teams } = useTeams();

  const filteredMatches = matches.filter(match => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Upcoming') return match.status === 'SCHEDULED';
    if (activeFilter === 'Finished') return match.status === 'FINISHED';
    return true;
  });

  const getTeam = (teamId: string) => teams.find(t => t.id === teamId);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Match', 'Are you sure you want to delete this match?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await matchesService.remove(id);
            refetch();
          } catch {
            Alert.alert('Error', 'Failed to delete match.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && <ActivityIndicator style={styles.loader} color={theme.colors.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={filteredMatches}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const homeTeam = getTeam(item.homeTeamId);
          const awayTeam = getTeam(item.awayTeamId);
          const isFinished = item.status === 'FINISHED';

          return (
            <View style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchDate}>
                  {formatMatchDate(item.date)} • {formatMatchTime(item.date)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={[styles.statusBadge, { backgroundColor: isFinished ? theme.colors.success : theme.colors.cardAlt }]}>
                    <Text style={[styles.statusText, !isFinished && { color: theme.colors.subtext }]}>
                      {isFinished ? 'Finished' : 'Scheduled'}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/match-form', params: { id: item.id } })}>
                    <Ionicons name="pencil" size={18} color={theme.colors.subtext} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash" size={18} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.matchTeams}>
                <View style={styles.team}>
                  <View style={[styles.teamLogo, { backgroundColor: homeTeam?.uniformColor }]}>
                    <Text style={styles.teamLogoText}>{homeTeam ? getTeamAbbreviation(homeTeam.name) : '?'}</Text>
                  </View>
                  <Text style={styles.teamName} numberOfLines={2}>{homeTeam?.name}</Text>
                </View>

                <View style={styles.scoreContainer}>
                  {isFinished ? (
                    <Text style={styles.scoreText}>{item.homeTeamScore} - {item.awayTeamScore}</Text>
                  ) : (
                    <Text style={styles.vsText}>VS</Text>
                  )}
                </View>

                <View style={[styles.team, { flexDirection: 'row-reverse' }]}>
                  <View style={[styles.teamLogo, { backgroundColor: awayTeam?.uniformColor }]}>
                    <Text style={styles.teamLogoText}>{awayTeam ? getTeamAbbreviation(awayTeam.name) : '?'}</Text>
                  </View>
                  <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={2}>{awayTeam?.name}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/match-form')}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filtersWrapper: {
    height: 40,
    marginVertical: theme.spacing.md,
  },
  filtersContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.cardAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.subtext,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFF',
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    margin: theme.spacing.lg,
  },
  listContainer: {
    padding: theme.spacing.md,
    paddingTop: 0,
    gap: theme.spacing.md,
  },
  matchCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  matchDate: {
    color: theme.colors.subtext,
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.sm,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamName: {
    color: theme.colors.text,
    fontSize: 14,
    flex: 1,
  },
  scoreContainer: {
    minWidth: 60,
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  scoreText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  vsText: {
    color: theme.colors.subtext,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
