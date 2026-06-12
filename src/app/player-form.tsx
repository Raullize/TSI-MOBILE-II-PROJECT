import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { useTeams } from '../hooks/useTeams';
import { playersService } from '../services/players.service';
import { getTeamAbbreviation } from '../utils/team';

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];

export default function PlayerFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEdit = !!id;

  const { teams } = useTeams();

  const [name, setName] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(POSITIONS[0]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    if (teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0].id);
    }
  }, [teams]);

  useEffect(() => {
    if (!id) return;
    playersService.getById(id).then(player => {
      setName(player.name);
      setJerseyNumber(String(player.jerseyNumber));
      setSelectedPosition(player.position);
      setSelectedTeam(player.teamId);
    }).catch(() => Alert.alert('Não foi possível carregar', 'Verifique sua conexão e tente novamente.'));
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !jerseyNumber.trim() || !selectedTeam) {
      Alert.alert('Campos obrigatórios', 'Preencha o nome, o número e selecione um time.');
      return;
    }
    try {
      const dto = {
        name,
        jerseyNumber: Number(jerseyNumber),
        position: selectedPosition,
        teamId: selectedTeam,
      };
      if (isEdit) {
        await playersService.update(id!, dto);
      } else {
        await playersService.create(dto);
      }
      router.back();
    } catch {
      Alert.alert('Não foi possível salvar', 'Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? 'Edit Player' : 'New Player' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Player Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter player name"
            placeholderTextColor={theme.colors.subtext}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Jersey Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 23"
            placeholderTextColor={theme.colors.subtext}
            value={jerseyNumber}
            onChangeText={setJerseyNumber}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Position</Text>
          <View style={styles.pillsContainer}>
            {POSITIONS.map(pos => (
              <TouchableOpacity
                key={pos}
                style={[styles.pill, selectedPosition === pos && styles.pillSelected]}
                onPress={() => setSelectedPosition(pos)}
              >
                <Text style={[styles.pillText, selectedPosition === pos && styles.pillTextSelected]}>{pos}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Team</Text>
          <View style={styles.teamsContainer}>
            {teams.map(team => (
              <TouchableOpacity
                key={team.id}
                style={[styles.teamItem, selectedTeam === team.id && styles.teamItemSelected]}
                onPress={() => setSelectedTeam(team.id)}
              >
                <View style={[styles.teamLogo, { backgroundColor: team.uniformColor }]}>
                  <Text style={styles.teamLogoText}>{getTeamAbbreviation(team.name)}</Text>
                </View>
                <Text style={[styles.teamItemText, selectedTeam === team.id && styles.teamItemTextSelected]}>
                  {team.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{isEdit ? 'Update Player' : 'Save Player'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.cardAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.cardAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  pillText: {
    color: theme.colors.subtext,
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#FFF',
  },
  teamsContainer: {
    gap: theme.spacing.sm,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  teamItemSelected: {
    borderColor: theme.colors.primary,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  teamLogoText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamItemText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  teamItemTextSelected: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.subtext,
    fontSize: 16,
    fontWeight: '600',
  },
});
