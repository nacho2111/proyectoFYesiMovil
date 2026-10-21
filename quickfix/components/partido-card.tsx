import { Pressable, Text, View } from 'react-native';

import { Marca } from '@/components/marca';
import { ALTO_PARTIDO, ANCHO_PARTIDO, styles } from '@/components/partido-card.styles';
import { Colors, Fuentes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { desenlaceDe, type Partido } from '@/utils/fixture';

export { ALTO_PARTIDO, ANCHO_PARTIDO };

type PartidoCardProps = {
  partido: Partido;
  onPress?: () => void;
};

export function PartidoCard({ partido, onPress }: PartidoCardProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const { jugador1, jugador2, ganador, resultado, libre } = partido;
  const desenlace = desenlaceDe(partido);
  // los que faltan jugar llevan el azul de "lo que sigue"
  const pendiente = onPress !== undefined && desenlace === null;

  let pie = '';
  if (libre && ganador) {
    pie = 'pasa directo';
  } else if (desenlace === 'empate') {
    pie = resultado ? `${resultado} · pasó ${ganador}` : `pasó ${ganador}`;
  } else if (resultado) {
    pie = resultado;
  } else if (pendiente) {
    pie = 'Cargar resultado';
  }

  const nombre1 = jugador1 ?? (libre ? 'Libre' : 'A definir');
  const nombre2 = jugador2 ?? (libre ? 'Libre' : 'A definir');

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${nombre1} contra ${nombre2}${ganador && !libre ? `, pasó ${ganador}` : ''}`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.background,
          borderColor: pendiente ? colors.siguiente : colors.border,
        },
        libre && (ganador ? styles.pasaDirecto : styles.vacio),
        pressed && styles.pressed,
      ]}>
      <Fila jugador={jugador1} partido={partido} />
      <View style={[styles.divisor, { backgroundColor: colors.border }]} />
      <Fila jugador={jugador2} partido={partido} />
      <View style={[styles.divisor, { backgroundColor: colors.border }]} />

      <View style={styles.pie}>
        {desenlace === 'walkover' ? <Marca tipo="WO" /> : null}
        {desenlace === 'empate' ? <Marca tipo="E" /> : null}
        <Text
          numberOfLines={1}
          style={[
            styles.pieTexto,
            pendiente && { fontFamily: Fuentes.textoNegrita, fontSize: 13 },
            { color: pendiente ? colors.siguiente : colors.textMuted },
          ]}>
          {pie}
        </Text>
      </View>
    </Pressable>
  );
}

function Fila({ jugador, partido }: { jugador: string | null; partido: Partido }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const { libre, ganador } = partido;
  // en un pase directo no hay partido, así que no se marca ganador ni perdedor
  const gano = !libre && jugador !== null && jugador === ganador;
  const perdio = !libre && jugador !== null && ganador !== null && jugador !== ganador;

  if (jugador === null) {
    return (
      <View style={styles.fila}>
        <Text numberOfLines={1} style={[styles.nombre, styles.sinJugador, { color: colors.textMuted }]}>
          {libre ? 'Libre' : 'A definir'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.fila}>
      <Text
        numberOfLines={1}
        style={[
          styles.nombre,
          {
            color: perdio ? colors.textMuted : colors.text,
            fontFamily: gano ? Fuentes.textoNegrita : Fuentes.textoMedio,
          },
        ]}>
        {jugador}
      </Text>
    </View>
  );
}
