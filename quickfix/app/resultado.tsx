import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTorneo, useTorneos } from '@/hooks/use-torneos';
import { cargarResultado, esJugable, obtenerCampeon } from '@/utils/fixture';

export default function ResultadoScreen() {
  const { id, ronda, partido } = useLocalSearchParams<{
    id: string;
    ronda: string;
    partido: string;
  }>();
  const router = useRouter();
  const torneo = useTorneo(id);
  const { actualizarTorneo } = useTorneos();
  const colors = Colors[useColorScheme() ?? 'light'];

  const indiceRonda = Number(ronda);
  const indicePartido = Number(partido);
  const partidoActual = torneo?.rondas[indiceRonda]?.partidos[indicePartido];

  // si se reabre un partido ya jugado, arranca mostrando lo que ya estaba cargado
  const [ganador, setGanador] = useState<string | null>(partidoActual?.ganador ?? null);
  const [resultado, setResultado] = useState(partidoActual?.resultado ?? '');

  if (!torneo || !partidoActual || !esJugable(partidoActual)) {
    return (
      <ThemedView style={styles.container}>
        <Title subtitle="Puede que el cuadro haya cambiado.">No encontramos el partido</Title>
        <Button title="Volver" onPress={() => router.back()} variant="secondary" />
      </ThemedView>
    );
  }

  const campeon = obtenerCampeon(torneo.rondas);

  if (campeon) {
    return (
      <ThemedView style={styles.container}>
        <Title subtitle={`Campeón: ${campeon}`}>El torneo ya terminó</Title>
        <Button title="Volver" onPress={() => router.back()} variant="secondary" />
      </ThemedView>
    );
  }

  const jugadores = [partidoActual.jugador1, partidoActual.jugador2] as const;

  function guardar() {
    if (!ganador) {
      return;
    }

    actualizarTorneo(id, {
      rondas: cargarResultado(torneo!.rondas, indiceRonda, indicePartido, ganador, resultado.trim()),
    });
    router.back();
  }

  return (
    <ThemedView style={styles.container}>
      <Title subtitle="Elegí quién ganó y, si querés, anotá el resultado.">Resultado</Title>

      <View style={styles.jugadores}>
        {jugadores.map((jugador) => {
          if (!jugador) {
            return null;
          }

          const elegido = jugador === ganador;

          return (
            <Pressable
              key={jugador}
              onPress={() => setGanador(jugador)}
              accessibilityRole="radio"
              accessibilityState={{ checked: elegido }}
              style={({ pressed }) => [
                styles.jugador,
                {
                  backgroundColor: colors.surface,
                  borderColor: elegido ? colors.primary : colors.border,
                },
                pressed && styles.pressed,
              ]}>
              <ThemedText type={elegido ? 'defaultSemiBold' : 'default'} numberOfLines={1}>
                {jugador}
              </ThemedText>
              {elegido ? (
                <ThemedText type="small" style={{ color: colors.primary }}>
                  Ganador
                </ThemedText>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <Input
        label="Resultado (opcional)"
        placeholder="Ej: 6-4 6-3"
        value={resultado}
        onChangeText={setResultado}
        onSubmitEditing={guardar}
        returnKeyType="done"
      />

      <Button title="Guardar" onPress={guardar} disabled={!ganador} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  jugadores: {
    gap: 8,
  },
  jugador: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});
