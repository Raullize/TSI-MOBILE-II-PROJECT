import { Stack } from 'expo-router';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="team-form" 
        options={{ 
          presentation: 'modal',
          title: 'New Team'
        }} 
      />
      <Stack.Screen 
        name="player-form" 
        options={{ 
          presentation: 'modal',
          title: 'New Player'
        }} 
      />
      <Stack.Screen 
        name="match-form" 
        options={{ 
          presentation: 'modal',
          title: 'New Match'
        }} 
      />
    </Stack>
  );
}
