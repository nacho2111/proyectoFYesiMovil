import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CuadroScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Rondas y cruces del torneo.</ThemedText>

      <Link href="/resultado" style={styles.link}>
        <ThemedText type="link">Cargar resultado</ThemedText>
      </Link>

      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Volver al inicio</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  link: {
    marginTop: 16,
    paddingVertical: 12,
  },
});
