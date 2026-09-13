import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useTorneos, type Torneo } from '@/hooks/use-torneos';

export default function CrearTorneoScreen() {
  const router = useRouter();
  const { setTorneos } = useTorneos();
  const [nombre, setNombre] = useState('');

  function crear() {
    if (!nombre.trim()) {
      return;
    }

    const torneo: Torneo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      participantes: [],
      lugares: 8,
      rondas: [],
    };

    setTorneos((torneos) => [torneo, ...torneos]);
    router.replace({ pathname: '/participantes', params: { id: torneo.id } });
  }

  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Poné un nombre y después cargás los participantes.">Crear torneo</Title>

      <Input
        label="Nombre del torneo"
        placeholder="Ej: Torneo de verano"
        value={nombre}
        onChangeText={setNombre}
        onSubmitEditing={crear}
        returnKeyType="done"
        autoFocus
      />

      <Button title="Crear" onPress={crear} disabled={!nombre.trim()} />
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
