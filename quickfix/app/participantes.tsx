import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ParticipantesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Lista de jugadores y tamaño del cuadro.</ThemedText>

      <Link href="/cuadro" style={styles.link}>
        <ThemedText type="link">Generar cuadro</ThemedText>
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
