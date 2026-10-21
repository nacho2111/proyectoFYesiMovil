import {
  SchibstedGrotesk_400Regular,
  SchibstedGrotesk_500Medium,
  SchibstedGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/schibsted-grotesk';
import { Jersey10_400Regular } from '@expo-google-fonts/jersey-10';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Colors, Fuentes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TorneosProvider } from '@/hooks/use-torneos';

// la pantalla de carga se queda hasta que estén las letras, así no salta el diseño
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const colors = Colors[colorScheme];
  const [fuentesListas, errorFuentes] = useFonts({
    SchibstedGrotesk_400Regular,
    SchibstedGrotesk_500Medium,
    SchibstedGrotesk_700Bold,
    Jersey10_400Regular,
  });

  useEffect(() => {
    if (fuentesListas || errorFuentes) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fuentesListas, errorFuentes]);

  // si las fuentes fallan igual se muestra la app, con la letra del sistema
  if (!fuentesListas && !errorFuentes) {
    return null;
  }

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
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { fontFamily: Fuentes.textoNegrita },
            contentStyle: { backgroundColor: colors.background },
          }}>
          <Stack.Screen name="index" options={{ title: 'QuickFix', headerShown: false }} />
          <Stack.Screen name="crear-torneo" options={{ title: 'Crear torneo' }} />
          <Stack.Screen name="participantes" options={{ title: 'Participantes' }} />
          <Stack.Screen name="cuadro" options={{ title: 'Torneo' }} />
          <Stack.Screen name="editar-torneo" options={{ title: 'Editar torneo' }} />
          <Stack.Screen name="resultado" options={{ title: 'Resultado', presentation: 'modal' }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </TorneosProvider>
  );
}
