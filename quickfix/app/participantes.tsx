import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useTorneo } from '@/hooks/use-torneos';

export default function ParticipantesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const torneo = useTorneo(id);

  return (
    <ThemedView style={styles.container}>
      <Title subtitle={torneo?.nombre ?? 'Lista de jugadores y tamaño del cuadro.'}>
        Participantes
      </Title>

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
