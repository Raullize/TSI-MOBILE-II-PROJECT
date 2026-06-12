import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { useTeams } from '../hooks/useTeams';
import { matchesService } from '../services/matches.service';
import { MatchStatus } from '../types';
import { buildMatchDateTime, getTeamAbbreviation, toDateInput } from '../utils/team';
import { maskDate, maskTime } from '../utils/mask';

export default function MatchFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEdit = !!id;

  const { teams } = useTeams();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [status, setStatus] = useState<MatchStatus>('SCHEDULED');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  useEffect(() => {
    if (teams.length >= 2 && !homeTeam) {
      setHomeTeam(teams[0].id);
      setAwayTeam(teams[1].id);
    }
  }, [teams]);

  useEffect(() => {
    if (!id) return;
    matchesService.getById(id).then(match => {
      const d = new Date(match.date);
      setDate(toDateInput(match.date));
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
      setLocation(match.location);
      setHomeTeam(match.homeTeamId);
      setAwayTeam(match.awayTeamId);
      setStatus(match.status);
      setHomeScore(String(match.homeTeamScore));
      setAwayScore(String(match.awayTeamScore));
    }).catch(() => Alert.alert('Não foi possível carregar', 'Verifique sua conexão e tente novamente.'));
  }, [id]);

  const handleSave = async () => {
    if (!date.trim() || !time.trim() || !location.trim() || !homeTeam || !awayTeam) {
      Alert.alert('Campos obrigatórios', 'Preencha a data, o horário, o local e os dois times.');
      return;
    }
    if (homeTeam === awayTeam) {
      Alert.alert('Times inválidos', 'O time da casa e o visitante devem ser diferentes.');
      return;
    }
    try {
      const dto = {
        date: buildMatchDateTime(date, time),
        location,
        status,
        homeTeamId: homeTeam,
        awayTeamId: awayTeam,
        homeTeamScore: status === 'FINISHED' ? Number(homeScore) : 0,
        awayTeamScore: status === 'FINISHED' ? Number(awayScore) : 0,
      };
      if (isEdit) {
        await matchesService.update(id!, dto);
      } else {
        await matchesService.create(dto);
      }
      router.back();
    } catch {
      Alert.alert('Não foi possível salvar', 'Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? 'Edit Match' : 'New Match' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: theme.spacing.sm }]}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={theme.colors.subtext}
              value={date}
              onChangeText={v => setDate(maskDate(v))}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.sm }]}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              placeholderTextColor={theme.colors.subtext}
              value={time}
              onChangeText={v => setTime(maskTime(v))}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor={theme.colors.subtext}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Match Status</Text>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[styles.statusButton, status === 'SCHEDULED' && styles.statusButtonActive]}
              onPress={() => setStatus('SCHEDULED')}
            >
              <Text style={[styles.statusButtonText, status === 'SCHEDULED' && styles.statusButtonTextActive]}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, status === 'FINISHED' && styles.statusButtonActive]}
              onPress={() => setStatus('FINISHED')}
            >
              <Text style={[styles.statusButtonText, status === 'FINISHED' && styles.statusButtonTextActive]}>Finished</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Home Team</Text>
          <View style={styles.teamsContainer}>
            {teams.map(team => (
              <TouchableOpacity
                key={`home-${team.id}`}
                style={[styles.teamItem, homeTeam === team.id && styles.teamItemSelected]}
                onPress={() => setHomeTeam(team.id)}
              >
                <View style={[styles.teamLogo, { backgroundColor: team.uniformColor }]}>
                  <Text style={styles.teamLogoText}>{getTeamAbbreviation(team.name)}</Text>
                </View>
                <Text style={[styles.teamItemText, homeTeam === team.id && styles.teamItemTextSelected]}>
                  {team.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Away Team</Text>
          <View style={styles.teamsContainer}>
            {teams.map(team => (
              <TouchableOpacity
                key={`away-${team.id}`}
                style={[styles.teamItem, awayTeam === team.id && styles.teamItemSelected]}
                onPress={() => setAwayTeam(team.id)}
              >
                <View style={[styles.teamLogo, { backgroundColor: team.uniformColor }]}>
                  <Text style={styles.teamLogoText}>{getTeamAbbreviation(team.name)}</Text>
                </View>
                <Text style={[styles.teamItemText, awayTeam === team.id && styles.teamItemTextSelected]}>
                  {team.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {status === 'FINISHED' && (
          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: theme.spacing.sm }]}>
              <Text style={styles.label}>Home Score</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={theme.colors.subtext}
                value={homeScore}
                onChangeText={setHomeScore}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.sm }]}>
              <Text style={styles.label}>Away Score</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={theme.colors.subtext}
                value={awayScore}
                onChangeText={setAwayScore}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{isEdit ? 'Update Match' : 'Save Match'}</Text>
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
  row: {
    flexDirection: 'row',
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
  statusContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statusButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.cardAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  statusButtonText: {
    color: theme.colors.subtext,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#FFF',
  },
  actions: {
    marginTop: theme.spacing.md,
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
