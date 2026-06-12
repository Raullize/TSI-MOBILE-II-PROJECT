import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { mockMatches, mockTeams } from '../../data/mock';

const FILTERS = ['All', 'Upcoming', 'Finished'];

export default function MatchesScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const filteredMatches = mockMatches.filter(match => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Upcoming') return match.status === 'Scheduled';
    if (activeFilter === 'Finished') return match.status === 'Finished';
    return true;
  });

  const getTeam = (teamId: string) => mockTeams.find(t => t.id === teamId);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {FILTERS.map(filter => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterPill,
                activeFilter === filter && styles.filterPillActive
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive
              ]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Matches List */}
      <FlatList 
        data={filteredMatches}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const homeTeam = getTeam(item.homeTeamId);
          const awayTeam = getTeam(item.awayTeamId);
          const isFinished = item.status === 'Finished';

          return (
            <View style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchDate}>{item.date} • {item.time}</Text>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: isFinished ? theme.colors.success : theme.colors.cardAlt }
                ]}>
                  <Text style={[
                    styles.statusText,
                    !isFinished && { color: theme.colors.subtext }
                  ]}>{isFinished ? 'Finished' : 'Scheduled'}</Text>
                </View>
              </View>

              <View style={styles.matchTeams}>
                {/* Home Team */}
                <View style={styles.team}>
                  <View style={[styles.teamLogo, { backgroundColor: homeTeam?.color }]}>
                    <Text style={styles.teamLogoText}>{homeTeam?.abbreviation}</Text>
                  </View>
                  <Text style={styles.teamName} numberOfLines={2}>{homeTeam?.name}</Text>
                </View>
                
                {/* Score or VS */}
                <View style={styles.scoreContainer}>
                  {isFinished ? (
                    <Text style={styles.scoreText}>{item.homeScore} - {item.awayScore}</Text>
                  ) : (
                    <Text style={styles.vsText}>VS</Text>
                  )}
                </View>
                
                {/* Away Team */}
                <View style={[styles.team, { flexDirection: 'row-reverse' }]}>
                  <View style={[styles.teamLogo, { backgroundColor: awayTeam?.color }]}>
                    <Text style={styles.teamLogoText}>{awayTeam?.abbreviation}</Text>
                  </View>
                  <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={2}>{awayTeam?.name}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* FAB */}
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
    fontSize: 16,
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
