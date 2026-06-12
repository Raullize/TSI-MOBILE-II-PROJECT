import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

const COLORS = ['#DC2626', '#3B82F6', '#10B981', '#A855F7', '#EAB308', '#FFFFFF'];

export default function NewTeamScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEdit = !!id;
  
  const [teamName, setTeamName] = useState('');
  const [city, setCity] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSave = () => {
    // Aqui no futuro chamaremos a API
    console.log({ teamName, city, selectedColor });
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? 'Edit Team' : 'New Team' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Team Name</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter team name"
          placeholderTextColor={theme.colors.subtext}
          value={teamName}
          onChangeText={setTeamName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor={theme.colors.subtext}
          value={city}
          onChangeText={setCity}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Primary Color</Text>
        <View style={styles.colorPicker}>
          {COLORS.map(color => (
            <TouchableOpacity 
              key={color}
              style={[
                styles.colorCircle, 
                { backgroundColor: color },
                selectedColor === color && styles.colorCircleSelected
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{isEdit ? 'Update Team' : 'Save Team'}</Text>
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
  colorPicker: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  colorCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected: {
    borderColor: '#FFF',
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
