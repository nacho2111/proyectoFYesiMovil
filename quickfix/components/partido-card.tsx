import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Partido } from '@/utils/fixture';

// alto fijo: el cuadro lo usa para alinear cada partido con los dos que lo alimentan
export const ANCHO_PARTIDO = 200;
export const ALTO_PARTIDO = 96;

type PartidoCardProps = {
  partido: Partido;
  onPress?: () => void;
};

export function PartidoCard({ partido, onPress }: PartidoCardProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const { jugador1, jugador2, ganador, resultado, libre } = partido;
  const pendiente = onPress !== undefined && ganador === null;

  let pie = '';
  if (libre && ganador) {
    pie = 'Pasa directo';
  } else if (resultado) {
    pie = resultado;
  }

  const nombre1 = jugador1 ?? (libre ? 'Libre' : 'A definir');
  const nombre2 = jugador2 ?? (libre ? 'Libre' : 'A definir');

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${nombre1} contra ${nombre2}${ganador && !libre ? `, ganó ${ganador}` : ''}`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          // los que faltan jugar se marcan para que se vea qué sigue
          borderColor: pendiente ? colors.primary : colors.border,
        },
        libre && (ganador ? styles.pasaDirecto : styles.vacio),
        pressed && styles.pressed,
      ]}>
      <Fila jugador={jugador1} libre={libre} ganador={ganador} />
      <View style={[styles.divisor, { backgroundColor: colors.border }]} />
      <Fila jugador={jugador2} libre={libre} ganador={ganador} />

      <View style={styles.pie}>
        <ThemedText type="small" numberOfLines={1} style={{ color: colors.textMuted }}>
          {pie}
        </ThemedText>
      </View>
    </Pressable>
  );
}

type FilaProps = {
  jugador: string | null;
  libre: boolean;
  ganador: string | null;
};

function Fila({ jugador, libre, ganador }: FilaProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  // en un pase directo no hay partido, así que no se marca ganador ni perdedor
  const gano = !libre && jugador !== null && jugador === ganador;
  const perdio = !libre && jugador !== null && ganador !== null && jugador !== ganador;

  if (jugador === null) {
    return (
      <View style={styles.fila}>
        <ThemedText
          numberOfLines={1}
          style={[styles.nombre, styles.sinJugador, { color: colors.textMuted }]}>
          {libre ? 'Libre' : 'A definir'}
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.fila}>
      <ThemedText
        numberOfLines={1}
        type={gano ? 'defaultSemiBold' : 'default'}
        style={[styles.nombre, perdio && { color: colors.textMuted }]}>
        {jugador}
      </ThemedText>

      {gano ? <Ionicons name="checkmark" size={18} color={colors.primary} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: ANCHO_PARTIDO,
    height: ALTO_PARTIDO,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fila: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  nombre: {
    flex: 1,
  },
  sinJugador: {
    fontStyle: 'italic',
  },
  divisor: {
    height: 1,
  },
  pie: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  pasaDirecto: {
    opacity: 0.6,
  },
  vacio: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.8,
  },
});
