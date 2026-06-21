import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB } from '../../components/FAB';
import { theme } from '../../constants/theme';
import { useMatches } from '../../hooks/useMatches';
import { useTeams } from '../../hooks/useTeams';
import { matchesService } from '../../services/matches.service';
import { formatMatchDate, formatMatchTime, getTeamAbbreviation } from '../../utils/team';

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
                
                <View style={styles.team}>
                  <View style={[styles.teamLogo, { backgroundColor: awayTeam?.uniformColor }]}>
                    <Text style={styles.teamLogoText}>{awayTeam ? getTeamAbbreviation(awayTeam.name) : '?'}</Text>
                  </View>
                  <Text style={styles.teamName} numberOfLines={2}>{awayTeam?.name}</Text>
                </View>
              </View>

              <View style={styles.matchFooter}>
                <Text style={styles.matchDate}>
                  {formatMatchDate(item.date)} • {formatMatchTime(item.date)} {item.location ? `• ${item.location}` : ''}
                </Text>
                
                <View style={styles.footerActions}>
                  <View style={[styles.statusBadge, { backgroundColor: isFinished ? theme.colors.success : theme.colors.cardAlt }]}>
                    <Text style={[styles.statusText, !isFinished && { color: theme.colors.subtext }]}>
                      {isFinished ? 'Finished' : 'Scheduled'}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({ pathname: '/match-form', params: { id: item.id } });
                    }}
                  >
                    <Ionicons name="pencil-outline" size={20} color={theme.colors.subtext} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <FAB onPress={() => router.push('/match-form')} />
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
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.sm,
  },
  matchDate: {
    color: theme.colors.subtext,
    fontSize: 13,
  },
  matchCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    width: '100%',
  },
  team: {
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
    fontSize: 16,
  },
  teamName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  scoreContainer: {
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
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
});
