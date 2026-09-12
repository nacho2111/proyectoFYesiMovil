import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';

export default function ParticipantesScreen() {
  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Lista de jugadores y tamaño del cuadro.">Participantes</Title>

      <Link href="/cuadro" asChild>
        <Button title="Generar cuadro" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
});
