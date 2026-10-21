import { Pressable, Text, View } from 'react-native';

import { styles } from '@/components/fila-partido.styles';
import { Marca } from '@/components/marca';
import { Colors, Fuentes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { desenlaceDe, type Partido } from '@/utils/fixture';

type FilaPartidoProps = {
  partido: Partido;
  onPress?: () => void;
};

// Un partido como en las apps de resultados: el primero a la izquierda pegado al
// resultado, el segundo a la derecha. El que ganó va en negrita y el que perdió se apaga.
export function FilaPartido({ partido, onPress }: FilaPartidoProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const { jugador1, jugador2, ganador, resultado } = partido;
  const desenlace = desenlaceDe(partido);
  const jugado = desenlace !== null;

  const estilo = (nombre: string | null) => {
    if (!jugado || ganador === null) {
      return { color: colors.text, fontFamily: Fuentes.textoMedio };
    }
    return nombre === ganador
      ? { color: colors.text, fontFamily: Fuentes.textoNegrita }
      : { color: colors.textMuted, fontFamily: Fuentes.texto };
  };

  let estado = 'sin jugar';
  if (desenlace === 'empate') {
    estado = 'empate';
  } else if (desenlace === 'walkover') {
    estado = `ganó ${ganador} por walkover`;
  } else if (desenlace === 'ganador') {
    estado = `ganó ${ganador}`;
  }

  let centro = (
    <Text style={[styles.vs, { color: onPress ? colors.siguiente : colors.textMuted }]}>vs</Text>
  );
  if (desenlace === 'walkover') {
    centro = <Marca tipo="WO" />;
  } else if (resultado) {
    centro = (
      <Text numberOfLines={1} style={[styles.resultado, { color: colors.text }]}>
        {resultado}
      </Text>
    );
  } else if (desenlace === 'empate') {
    centro = <Marca tipo="E" />;
  } else if (jugado) {
    centro = <Text style={[styles.vs, { color: colors.textMuted }]}>fin</Text>;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${jugador1} contra ${jugador2}, ${estado}${resultado ? `, ${resultado}` : ''}`}
      style={({ pressed }) => [styles.fila, pressed && styles.pressed]}>
      <Text numberOfLines={2} style={[styles.nombre, styles.nombreLocal, estilo(jugador1)]}>
        {jugador1}
      </Text>
      <View style={styles.centro}>{centro}</View>
      <Text numberOfLines={2} style={[styles.nombre, estilo(jugador2)]}>
        {jugador2}
      </Text>
    </Pressable>
  );
}
