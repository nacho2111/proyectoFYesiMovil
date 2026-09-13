import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ParticipanteItem } from '@/components/participante-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTorneo, useTorneos } from '@/hooks/use-torneos';

export default function ParticipantesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const torneo = useTorneo(id);
  const { actualizarTorneo } = useTorneos();
  const insets = useSafeAreaInsets();
  const mutedColor = useThemeColor({}, 'textMuted');
  const [nombre, setNombre] = useState('');

  if (!torneo) {
    return (
      <ThemedView style={styles.contenido}>
        <Title subtitle="Puede que se haya borrado al cerrar la app.">
          No encontramos el torneo
        </Title>

        <Link href="/" dismissTo asChild>
          <Button title="Volver al inicio" variant="secondary" />
        </Link>
      </ThemedView>
    );
  }

  const participantes = torneo.participantes;
  const cantidad = participantes.length;

  function guardar(lista: string[]) {
    actualizarTorneo(id, { participantes: lista });
  }

  function agregar() {
    if (!nombre.trim()) {
      return;
    }

    guardar([...participantes, nombre.trim()]);
    setNombre('');
  }

  function editar(indice: number, nuevoNombre: string) {
    guardar(participantes.map((participante, i) => (i === indice ? nuevoNombre : participante)));
  }

  function borrar(indice: number) {
    guardar(participantes.filter((_, i) => i !== indice));
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
        <Title subtitle={torneo.nombre}>Participantes</Title>

        <View style={styles.agregar}>
          <View style={styles.campo}>
            <Input
              placeholder="Nombre del participante"
              value={nombre}
              onChangeText={setNombre}
              onSubmitEditing={agregar}
              submitBehavior="submit"
              autoFocus
            />
          </View>

          <Button title="Agregar" onPress={agregar} disabled={!nombre.trim()} />
        </View>

        <View style={styles.lista}>
          <ThemedText type="defaultSemiBold">
            {cantidad} {cantidad === 1 ? 'cargado' : 'cargados'}
          </ThemedText>

          {cantidad === 0 ? (
            <ThemedText style={{ color: mutedColor }}>Todavía no cargaste a nadie.</ThemedText>
          ) : (
            participantes.map((participante, indice) => (
              <ParticipanteItem
                key={`${indice}-${participante}`}
                numero={indice + 1}
                nombre={participante}
                onEditar={(nuevoNombre) => editar(indice, nuevoNombre)}
                onBorrar={() => borrar(indice)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
        <Link href="/cuadro" asChild>
          <Button title="Generar cuadro" />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  agregar: {
    flexDirection: 'row',
    gap: 8,
  },
  campo: {
    flex: 1,
  },
  lista: {
    gap: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
