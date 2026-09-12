import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';

export default function ResultadoScreen() {
  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Resultado del partido y ganador.">Resultado</Title>

      <Link href="/cuadro" dismissTo asChild>
        <Button title="Guardar" />
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
