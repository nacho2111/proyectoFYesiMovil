import { useLocalSearchParams, useRouter } from 'expo-router';
import { type ReactNode, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Marca, type TipoMarca } from '@/components/marca';
import { Panel } from '@/components/panel';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { Colors, Fuentes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTorneo, useTorneos } from '@/hooks/use-torneos';
import { styles } from '@/styles/resultado.styles';
import { obtenerDeporte } from '@/utils/deportes';
import { desenlaceDe, esJugable, type Carga, type Partido } from '@/utils/fixture';
import {
  empateNecesitaGanador,
  guardarResultado,
  nombreDelPartido,
  obtenerCampeonTorneo,
  obtenerPartido,
  textoARef,
} from '@/utils/torneo';

// gano1: ganó el primero · wo1: el primero no se presentó, así que gana el segundo
type Opcion = 'gano1' | 'empate' | 'gano2' | 'wo1' | 'wo2';

// si se reabre un partido ya jugado, arranca mostrando lo que ya estaba cargado
function opcionInicial(partido: Partido): Opcion | null {
  const desenlace = desenlaceDe(partido);

  if (desenlace === 'empate') {
    return 'empate';
  }
  if (desenlace === 'walkover') {
    return partido.ganador === partido.jugador1 ? 'wo2' : 'wo1';
  }
  if (desenlace === 'ganador') {
    return partido.ganador === partido.jugador1 ? 'gano1' : 'gano2';
  }

  return null;
}

export default function ResultadoScreen() {
  const { id, ref: refTexto } = useLocalSearchParams<{ id: string; ref: string }>();
  const router = useRouter();
  const torneo = useTorneo(id);
  const { actualizarTorneo } = useTorneos();
  const insets = useSafeAreaInsets();
  const colors = Colors[useColorScheme() ?? 'light'];

  const ref = textoARef(refTexto);
  const partidoActual = torneo && ref ? obtenerPartido(torneo, ref) : null;

  const [opcion, setOpcion] = useState<Opcion | null>(
    partidoActual ? opcionInicial(partidoActual) : null
  );
  const [pasa, setPasa] = useState<string | null>(
    partidoActual && desenlaceDe(partidoActual) === 'empate' ? partidoActual.ganador : null
  );
  const [resultado, setResultado] = useState(partidoActual?.resultado ?? '');

  if (!torneo || !ref || !partidoActual || !esJugable(partidoActual)) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle="Puede que el fixture haya cambiado.">No encontramos el partido</Title>
        <Button title="Volver" onPress={() => router.back()} variant="secondary" />
      </ThemedView>
    );
  }

  const campeon = obtenerCampeonTorneo(torneo);

  if (campeon) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle={`Campeón: ${campeon}`}>El torneo ya terminó</Title>
        <Button title="Volver" onPress={() => router.back()} variant="secondary" />
      </ThemedView>
    );
  }

  const jugador1 = partidoActual.jugador1!;
  const jugador2 = partidoActual.jugador2!;
  const enCuadro = empateNecesitaGanador(ref);
  const faltaQuienPasa = opcion === 'empate' && enCuadro && pasa === null;
  const deporte = obtenerDeporte(torneo.deporte);

  function armarCarga(): Carga | null {
    switch (opcion) {
      case 'gano1':
        return { desenlace: 'ganador', ganador: jugador1, resultado: resultado.trim() };
      case 'gano2':
        return { desenlace: 'ganador', ganador: jugador2, resultado: resultado.trim() };
      case 'wo1':
        return { desenlace: 'walkover', ganador: jugador2, resultado: '' };
      case 'wo2':
        return { desenlace: 'walkover', ganador: jugador1, resultado: '' };
      case 'empate':
        return {
          desenlace: 'empate',
          ganador: enCuadro ? pasa : null,
          resultado: resultado.trim(),
        };
      default:
        return null;
    }
  }

  function guardar() {
    const carga = armarCarga();

    if (!carga || faltaQuienPasa) {
      return;
    }

    actualizarTorneo(id, guardarResultado(torneo!, ref!, carga));
    router.back();
  }

  function elegir(nueva: Opcion) {
    setOpcion(nueva);
    if (nueva !== 'empate') {
      setPasa(null);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.contenido}>
        <Title subtitle={nombreDelPartido(torneo, ref)}>{`${jugador1} vs ${jugador2}`}</Title>

        <Grupo titulo="¿Cómo terminó?">
          <OpcionFila
            elegida={opcion === 'gano1'}
            onPress={() => elegir('gano1')}
            texto={`Ganó ${jugador1}`}
            marca="G"
          />
          <OpcionFila
            elegida={opcion === 'empate'}
            onPress={() => elegir('empate')}
            texto="Empataron"
            marca="E"
          />
          <OpcionFila
            elegida={opcion === 'gano2'}
            onPress={() => elegir('gano2')}
            texto={`Ganó ${jugador2}`}
            marca="G"
          />
        </Grupo>

        <Grupo titulo="¿Alguien no se presentó?">
          <OpcionFila
            elegida={opcion === 'wo1'}
            onPress={() => elegir('wo1')}
            texto={`${jugador1} no vino`}
            detalle={`Gana ${jugador2} por walkover`}
            marca="WO"
          />
          <OpcionFila
            elegida={opcion === 'wo2'}
            onPress={() => elegir('wo2')}
            texto={`${jugador2} no vino`}
            detalle={`Gana ${jugador1} por walkover`}
            marca="WO"
          />
        </Grupo>

        {opcion === 'empate' && enCuadro ? (
          <Grupo
            titulo="¿Quién pasa a la ronda siguiente?"
            ayuda="En un cuadro alguien tiene que seguir: por penales, tie-break o como lo definan.">
            {[jugador1, jugador2].map((jugador) => (
              <OpcionFila
                key={jugador}
                elegida={pasa === jugador}
                onPress={() => setPasa(jugador)}
                texto={jugador}
              />
            ))}
          </Grupo>
        ) : null}

        {opcion !== 'wo1' && opcion !== 'wo2' ? (
          <Input
            label="Resultado (opcional)"
            placeholder={deporte.ejemploResultado}
            value={resultado}
            onChangeText={setResultado}
            onSubmitEditing={guardar}
            returnKeyType="done"
          />
        ) : null}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: 16 + insets.bottom, borderTopColor: colors.border },
        ]}>
        <Button title="Guardar resultado" onPress={guardar} disabled={!opcion || faltaQuienPasa} />
      </View>
    </ThemedView>
  );
}

function Grupo({ titulo, ayuda, children }: { titulo: string; ayuda?: string; children: ReactNode }) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View style={styles.grupo} accessibilityRole="radiogroup" accessibilityLabel={titulo}>
      <Text style={[styles.grupoTitulo, { color: colors.text }]}>{titulo}</Text>
      {ayuda ? (
        <ThemedText type="small" style={{ color: colors.textMuted }}>
          {ayuda}
        </ThemedText>
      ) : null}
      <Panel>{children}</Panel>
    </View>
  );
}

type OpcionFilaProps = {
  elegida: boolean;
  onPress: () => void;
  texto: string;
  detalle?: string;
  marca?: TipoMarca;
};

function OpcionFila({ elegida, onPress, texto, detalle, marca }: OpcionFilaProps) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: elegida }}
      accessibilityLabel={detalle ? `${texto}. ${detalle}` : texto}
      style={({ pressed }) => [
        styles.opcion,
        elegida && { backgroundColor: colors.surfaceAlt },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.radio, { borderColor: elegida ? colors.text : colors.textMuted }]}>
        {elegida ? <View style={[styles.radioPunto, { backgroundColor: colors.text }]} /> : null}
      </View>
      <View style={styles.opcionTextos}>
        <Text
          numberOfLines={2}
          style={[
            styles.opcionTexto,
            { color: colors.text, fontFamily: elegida ? Fuentes.textoNegrita : Fuentes.textoMedio },
          ]}>
          {texto}
        </Text>
        {detalle ? (
          <Text style={[styles.opcionDetalle, { color: colors.textMuted }]}>{detalle}</Text>
        ) : null}
      </View>
      {marca ? <Marca tipo={marca} /> : null}
    </Pressable>
  );
}
