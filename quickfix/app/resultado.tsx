import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ResultadoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Resultado del partido y ganador.</ThemedText>

      <Link href="/cuadro" dismissTo style={styles.link}>
        <ThemedText type="link">Guardar</ThemedText>
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
