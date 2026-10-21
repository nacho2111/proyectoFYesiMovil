import { ScrollView, Text, View } from 'react-native';

import { styles } from '@/components/etapas.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Etapa } from '@/utils/torneo';

const ESTADOS = {
  hecha: 'terminada',
  'en-juego': 'en juego',
  pendiente: 'pendiente',
};

// La tira de etapas: lo terminado va lleno de tinta, lo que se está jugando con el borde
// magenta, lo que falta con el borde gris. Los conteos van en píxeles, como un marcador.
export function Etapas({ etapas }: { etapas: Etapa[] }) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tira}>
      {etapas.map((etapa) => {
        const hecha = etapa.estado === 'hecha';
        const enJuego = etapa.estado === 'en-juego';
        let borde = colors.border;
        if (hecha) {
          borde = colors.text;
        } else if (enJuego) {
          borde = colors.siguiente;
        }
        const tinta = hecha ? colors.onPrimary : colors.text;

        return (
          <View
            key={etapa.nombre}
            accessible
            accessibilityLabel={`${etapa.nombre}: ${ESTADOS[etapa.estado]}, ${etapa.jugados} de ${etapa.total} partidos jugados`}
            style={[
              styles.etapa,
              { borderColor: borde, backgroundColor: hecha ? colors.text : 'transparent' },
            ]}>
            <Text numberOfLines={1} style={[styles.nombre, { color: tinta }]}>
              {etapa.nombre}
            </Text>
            <Text style={[styles.conteo, { color: enJuego ? colors.siguiente : tinta }]}>
              {etapa.total > 0 ? `${etapa.jugados}/${etapa.total}` : '-'}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
