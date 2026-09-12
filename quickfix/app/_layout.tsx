import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TorneosProvider } from '@/hooks/use-torneos';

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const colors = Colors[colorScheme];

  const theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <TorneosProvider>
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            headerTitle: '',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
          }}>
          <Stack.Screen name="index" options={{ title: 'QuickFix', headerShown: false }} />
          <Stack.Screen name="crear-torneo" options={{ title: 'Crear torneo' }} />
          <Stack.Screen name="participantes" options={{ title: 'Participantes' }} />
          <Stack.Screen name="cuadro" options={{ title: 'Cuadro' }} />
          <Stack.Screen name="resultado" options={{ title: 'Resultado', presentation: 'modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TorneosProvider>
  );
}
