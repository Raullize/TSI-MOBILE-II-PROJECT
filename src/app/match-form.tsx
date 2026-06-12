import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { mockTeams } from '../data/mock';

export default function MatchFormScreen() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [homeTeam, setHomeTeam] = useState(mockTeams[0]?.id || '');
  const [awayTeam, setAwayTeam] = useState(mockTeams[1]?.id || '');

  const handleSave = () => {
    console.log({ date, time, location, homeTeam, awayTeam });
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: theme.spacing.sm }]}>
          <Text style={styles.label}>Date</Text>
          <TextInput 
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.subtext}
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.sm }]}>
          <Text style={styles.label}>Time</Text>
          <TextInput 
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor={theme.colors.subtext}
            value={time}
            onChangeText={setTime}
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
        <Text style={styles.label}>Home Team</Text>
        <View style={styles.teamsContainer}>
          {mockTeams.map(team => (
            <TouchableOpacity 
              key={`home-${team.id}`}
              style={[
                styles.teamItem,
                homeTeam === team.id && styles.teamItemSelected
              ]}
              onPress={() => setHomeTeam(team.id)}
            >
              <View style={[styles.teamLogo, { backgroundColor: team.color }]}>
                <Text style={styles.teamLogoText}>{team.abbreviation}</Text>
              </View>
              <Text style={[
                styles.teamItemText,
                homeTeam === team.id && styles.teamItemTextSelected
              ]}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Away Team</Text>
        <View style={styles.teamsContainer}>
          {mockTeams.map(team => (
            <TouchableOpacity 
              key={`away-${team.id}`}
              style={[
                styles.teamItem,
                awayTeam === team.id && styles.teamItemSelected
              ]}
              onPress={() => setAwayTeam(team.id)}
            >
              <View style={[styles.teamLogo, { backgroundColor: team.color }]}>
                <Text style={styles.teamLogoText}>{team.abbreviation}</Text>
              </View>
              <Text style={[
                styles.teamItemText,
                awayTeam === team.id && styles.teamItemTextSelected
              ]}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Match</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
