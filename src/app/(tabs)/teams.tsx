import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../../components/Card';
import { FAB } from '../../components/FAB';
import { theme } from '../../constants/theme';
import { useTeams } from '../../hooks/useTeams';
import { teamsService } from '../../services/teams.service';
import { getTeamAbbreviation } from '../../utils/team';

export default function TeamsScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { teams, loading, error, refetch } = useTeams();

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Team', 'Are you sure you want to delete this team?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await teamsService.remove(id);
            refetch();
          } catch {
            Alert.alert('Error', 'Failed to delete team.');
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
          placeholder="Search teams..."
          placeholderTextColor={theme.colors.subtext}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading && <ActivityIndicator style={styles.loader} color={theme.colors.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={filteredTeams}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card 
            onEdit={() => router.push({ pathname: '/team-form', params: { id: item.id } })}
            onDelete={() => handleDelete(item.id)}
          >
            <View style={[styles.teamLogo, { backgroundColor: item.uniformColor }]}>
              <Text style={styles.teamLogoText}>{getTeamAbbreviation(item.name)}</Text>
            </View>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{item.name}</Text>
              <Text style={styles.teamMeta}>{item.city}</Text>
            </View>
          </Card>
        )}
      />

      <FAB onPress={() => router.push('/team-form')} />
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
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  teamLogoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  teamMeta: {
    color: theme.colors.subtext,
    fontSize: 13,
  },
});
