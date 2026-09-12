import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';

export default function CuadroScreen() {
  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Rondas y cruces del torneo.">Cuadro</Title>

      <View style={styles.buttons}>
        <Link href="/resultado" asChild>
          <Button title="Cargar resultado" />
        </Link>

        <Link href="/" dismissTo asChild>
          <Button title="Volver al inicio" variant="secondary" />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  buttons: {
    gap: 12,
  },
});
