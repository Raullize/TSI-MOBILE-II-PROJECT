import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';
import { useMatches } from '../../hooks/useMatches';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeams } from '../../hooks/useTeams';
import { getTeamAbbreviation, formatMatchDate, formatMatchTime } from '../../utils/team';

export default function HomeScreen() {
  const { teams } = useTeams();
  const { players } = usePlayers();
  const { matches } = useMatches();

  const upcomingMatches = matches.filter(m => m.status === 'SCHEDULED');
  const finishedMatches = matches.filter(m => m.status === 'FINISHED');

  const getTeam = (id: string) => teams.find(t => t.id === id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeTitle}>Welcome back, Admin 👋</Text>
          <Text style={styles.welcomeSubtitle}>2026 Season • Dunk Park</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Ionicons name="people-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.metricValue}>{teams.length}</Text>
          <Text style={styles.metricLabel}>Total Teams</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.metricValue}>{players.length}</Text>
          <Text style={styles.metricLabel}>Total Players</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="trophy-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.metricValue}>{finishedMatches.length}</Text>
          <Text style={styles.metricLabel}>Matches Played</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.metricValue}>{upcomingMatches.length}</Text>
          <Text style={styles.metricLabel}>Upcoming Matches</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming matches</Text>
        {upcomingMatches.map(match => {
          const homeTeam = getTeam(match.homeTeamId);
          const awayTeam = getTeam(match.awayTeamId);

          return (
            <View key={match.id} style={styles.matchCard}>
              <View style={styles.matchTeams}>
                <View style={styles.team}>
                  <View style={[styles.teamLogo, { backgroundColor: homeTeam?.uniformColor }]}>
                    <Text style={styles.teamLogoText}>{homeTeam ? getTeamAbbreviation(homeTeam.name) : '?'}</Text>
                  </View>
                  <Text style={styles.teamName} numberOfLines={2}>{homeTeam?.name}</Text>
                </View>

                <Text style={styles.vsText}>VS</Text>

                <View style={styles.team}>
                  <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={2}>{awayTeam?.name}</Text>
                  <View style={[styles.teamLogo, { backgroundColor: awayTeam?.uniformColor }]}>
                    <Text style={styles.teamLogoText}>{awayTeam ? getTeamAbbreviation(awayTeam.name) : '?'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.matchFooter}>
                <Text style={styles.matchInfoText}>{formatMatchDate(match.date)}</Text>
                <Text style={styles.matchInfoDot}>•</Text>
                <Text style={styles.matchInfoText}>{formatMatchTime(match.date)}</Text>
                <Text style={styles.matchInfoDot}>•</Text>
                <Text style={styles.matchInfoText}>{match.location}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  welcomeCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  welcomeHeader: {
    gap: 4,
  },
  welcomeTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: theme.colors.subtext,
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: theme.colors.subtext,
    fontSize: 12,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  matchCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
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
  vsText: {
    color: theme.colors.subtext,
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: theme.spacing.md,
  },
  matchFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  matchInfoText: {
    color: theme.colors.subtext,
    fontSize: 12,
  },
  matchInfoDot: {
    color: theme.colors.subtext,
    fontSize: 12,
    marginHorizontal: theme.spacing.sm,
  },
});
