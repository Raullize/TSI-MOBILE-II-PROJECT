import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { FAB } from '../../components/FAB';
import { theme } from '../../constants/theme';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeams } from '../../hooks/useTeams';
import { playersService } from '../../services/players.service';

const POSITIONS = ['All', 'PG', 'SG', 'SF', 'PF', 'C'];

export default function PlayersScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const { players, loading, error, refetch } = usePlayers();
  const { teams } = useTeams();

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = activeFilter === 'All' || player.position === activeFilter;
    return matchesSearch && matchesPosition;
  });

  const getTeam = (teamId: string) => teams.find(t => t.id === teamId);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Player', 'Are you sure you want to delete this player?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await playersService.remove(id);
            refetch();
          } catch {
            Alert.alert('Error', 'Failed to delete player.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.subtext} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          placeholderTextColor={theme.colors.subtext}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {POSITIONS.map(pos => (
            <TouchableOpacity
              key={pos}
              style={[styles.filterPill, activeFilter === pos && styles.filterPillActive]}
              onPress={() => setActiveFilter(pos)}
            >
              <Text style={[styles.filterText, activeFilter === pos && styles.filterTextActive]}>{pos}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && <ActivityIndicator style={styles.loader} color={theme.colors.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={filteredPlayers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const team = getTeam(item.teamId);
          return (
            <Card
              onEdit={() => router.push({ pathname: '/player-form', params: { id: item.id } })}
              onDelete={() => handleDelete(item.id)}
            >
              <View style={[styles.playerNumber, { backgroundColor: team?.uniformColor ?? theme.colors.primary }]}>
                <Text style={styles.playerNumberText}>{item.jerseyNumber}</Text>
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.playerTeam}>{team?.name ?? 'Unknown Team'}</Text>
                  <View style={styles.positionBadge}>
                    <Text style={styles.positionText}>{item.position}</Text>
                  </View>
                </View>
              </View>
            </Card>
          );
        }}
      />

      <FAB onPress={() => router.push('/player-form')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardAlt,
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 48,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    fontSize: 16,
  },
  filtersWrapper: {
    height: 40,
    marginBottom: theme.spacing.md,
  },
  filtersContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterPill: {
    paddingHorizontal: 16,
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
  playerNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  playerNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playerTeam: {
    color: theme.colors.subtext,
    fontSize: 13,
  },
  positionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3B82F6',
    borderRadius: theme.borderRadius.full,
  },
  positionText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
