import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { ParticipanteItem } from '@/components/participante-item';
import { TamanioCuadro } from '@/components/tamanio-cuadro';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTorneo, useTorneos } from '@/hooks/use-torneos';
import { generarFixture, tamanioMinimo } from '@/utils/fixture';
import { validarNuevoParticipante, validarParticipantes } from '@/utils/validaciones';

export default function ParticipantesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const torneo = useTorneo(id);
  const { actualizarTorneo } = useTorneos();
  const insets = useSafeAreaInsets();
  const mutedColor = useThemeColor({}, 'textMuted');
  const dangerColor = useThemeColor({}, 'danger');
  const [nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorCuadro, setErrorCuadro] = useState<string | null>(null);

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
  const lugares = torneo.lugares;

  // si con el nuevo no entran, el cuadro se agranda solo; achicarlo lo decide el usuario
  function guardar(lista: string[]) {
    actualizarTorneo(id, {
      participantes: lista,
      lugares: lista.length > lugares ? tamanioMinimo(lista.length) : lugares,
    });
    setErrorCuadro(null);
  }

  function cambiarLugares(tamanio: number) {
    actualizarTorneo(id, { lugares: tamanio });
    setErrorCuadro(null);
  }

  function cambiarNombre(texto: string) {
    setNombre(texto);
    setErrorNombre(null);
  }

  function agregar() {
    if (!nombre.trim()) {
      return;
    }

    const problema = validarNuevoParticipante(nombre, participantes);

    if (problema) {
      setErrorNombre(problema);
      return;
    }

    guardar([...participantes, nombre.trim()]);
    setNombre('');
  }

  function generar() {
    const problema = validarParticipantes(participantes, lugares);

    if (problema) {
      setErrorCuadro(problema);
      return;
    }

    actualizarTorneo(id, { rondas: generarFixture(participantes, lugares) });
    // replace para que volver desde el cuadro no deje tocar los participantes ya sorteados
    router.replace({ pathname: '/cuadro', params: { id } });
  }

  function editar(indice: number, nuevoNombre: string) {
    guardar(participantes.map((participante, i) => (i === indice ? nuevoNombre : participante)));
  }

  function borrar(indice: number) {
    guardar(participantes.filter((_, i) => i !== indice));
  }

  function mover(indice: number, destino: number) {
    const lista = [...participantes];
    [lista[indice], lista[destino]] = [lista[destino], lista[indice]];
    guardar(lista);
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
              onChangeText={cambiarNombre}
              onSubmitEditing={agregar}
              submitBehavior="submit"
              error={errorNombre ?? undefined}
              autoFocus
            />
          </View>

          <Button title="Agregar" onPress={agregar} disabled={!nombre.trim()} />
        </View>

        <TamanioCuadro lugares={lugares} cantidad={cantidad} onCambiar={cambiarLugares} />

        <View style={styles.lista}>
          <ThemedText type="defaultSemiBold">
            {cantidad} {cantidad === 1 ? 'cargado' : 'cargados'}
          </ThemedText>

          {cantidad >= 2 ? (
            <ThemedText type="small" style={{ color: mutedColor }}>
              Los cruces salen de este orden: el 1 contra el 2, el 3 contra el 4, y así. Si sobran
              lugares, los últimos de la lista pasan directo.
            </ThemedText>
          ) : null}

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
                onSubir={indice > 0 ? () => mover(indice, indice - 1) : undefined}
                onBajar={indice < cantidad - 1 ? () => mover(indice, indice + 1) : undefined}
              />
            ))
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
        {errorCuadro ? (
          <ThemedText type="small" style={{ color: dangerColor }}>
            {errorCuadro}
          </ThemedText>
        ) : null}

        <Button title="Generar cuadro" onPress={generar} />
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
    // flex-start para que el botón no se estire cuando aparece el error abajo del input
    alignItems: 'flex-start',
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
    gap: 8,
  },
});
