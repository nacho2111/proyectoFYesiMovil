import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useTorneos, type Torneo } from '@/hooks/use-torneos';
import { styles } from '@/styles/crear-torneo.styles';
import { TAMANIOS_CUADRO } from '@/utils/fixture';
import { validarNombreTorneo } from '@/utils/validaciones';

export default function CrearTorneoScreen() {
  const router = useRouter();
  const { setTorneos } = useTorneos();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);

  function cambiarNombre(texto: string) {
    setNombre(texto);
    setError(null);
  }

  function crear() {
    const problema = validarNombreTorneo(nombre);

    if (problema) {
      setError(problema);
      return;
    }

    const torneo: Torneo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      participantes: [],
      // arranca en el más chico y se agranda a medida que se cargan participantes
      lugares: TAMANIOS_CUADRO[0],
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
        onChangeText={cambiarNombre}
        onSubmitEditing={crear}
        returnKeyType="done"
        error={error ?? undefined}
        autoFocus
      />

      <Button title="Crear" onPress={crear} />
    </ThemedView>
  );
}
