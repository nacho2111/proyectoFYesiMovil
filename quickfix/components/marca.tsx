import { Text, View } from 'react-native';

import { styles } from '@/components/marca.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type TipoMarca = 'G' | 'E' | 'P' | 'WO';

const NOMBRES: Record<TipoMarca, string> = {
  G: 'Ganó',
  E: 'Empató',
  P: 'Perdió',
  WO: 'Walkover',
};

// Las marcas de resultado van en blanco y negro y se distinguen por la forma:
// ganado lleno de tinta, empate con contorno, perdido gris, walkover tachado.
export function Marca({ tipo }: { tipo: TipoMarca }) {
  const colors = Colors[useColorScheme() ?? 'light'];

  const estilos = {
    G: { fondo: colors.text, borde: colors.text, texto: colors.background },
    E: { fondo: 'transparent', borde: colors.text, texto: colors.text },
    P: { fondo: 'transparent', borde: colors.border, texto: colors.textMuted },
    WO: { fondo: 'transparent', borde: colors.text, texto: colors.text },
  }[tipo];

  return (
    <View
      accessible
      accessibilityLabel={NOMBRES[tipo]}
      style={[styles.marca, { backgroundColor: estilos.fondo, borderColor: estilos.borde }]}>
      <Text style={[styles.texto, { color: estilos.texto }, tipo === 'WO' && styles.tachado]}>
        {tipo}
      </Text>
    </View>
  );
}
