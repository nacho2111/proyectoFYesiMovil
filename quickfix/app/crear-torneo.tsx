import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';

export default function CrearTorneoScreen() {
  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Poné un nombre y después cargás los participantes.">Crear torneo</Title>

      <Input label="Nombre del torneo" placeholder="Ej: Torneo de verano" />

      <Link href="/participantes" asChild>
        <Button title="Crear" />
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
