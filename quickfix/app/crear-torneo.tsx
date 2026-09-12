import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CrearTorneoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Acá va el nombre del torneo.</ThemedText>

      <Link href="/participantes" style={styles.link}>
        <ThemedText type="link">Crear</ThemedText>
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
