import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { ALTO_PARTIDO, ANCHO_PARTIDO, styles } from '@/components/partido-card.styles';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Partido } from '@/utils/fixture';

export { ALTO_PARTIDO, ANCHO_PARTIDO };

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
