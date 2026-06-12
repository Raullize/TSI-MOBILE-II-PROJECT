import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { mockPlayers, mockTeams } from '../../data/mock';

const POSITIONS = ['All', 'PG', 'SG', 'SF', 'PF', 'C'];

export default function PlayersScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = activeFilter === 'All' || player.position === activeFilter;
    return matchesSearch && matchesPosition;
  });

  const getTeamName = (teamId: string) => {
    return mockTeams.find(t => t.id === teamId)?.name || 'Unknown Team';
  };

  const getTeamColor = (teamId: string) => {
    return mockTeams.find(t => t.id === teamId)?.color || theme.colors.primary;
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
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

      {/* Filters */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {POSITIONS.map(pos => (
            <TouchableOpacity 
              key={pos}
              style={[
                styles.filterPill,
                activeFilter === pos && styles.filterPillActive
              ]}
              onPress={() => setActiveFilter(pos)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === pos && styles.filterTextActive
              ]}>{pos}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Players List */}
      <FlatList 
        data={filteredPlayers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <View style={[styles.playerNumber, { backgroundColor: getTeamColor(item.teamId) }]}>
              <Text style={styles.playerNumberText}>{item.number}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerTeam}>{getTeamName(item.teamId)}</Text>
            </View>
            <View style={styles.positionBadge}>
              <Text style={styles.positionText}>{item.position}</Text>
            </View>
          </View>
        )}
      />

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/player-form')}
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
  listContainer: {
    padding: theme.spacing.md,
    paddingTop: 0,
    gap: theme.spacing.md,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
