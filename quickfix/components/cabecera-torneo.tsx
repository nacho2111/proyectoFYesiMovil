import type { ReactNode } from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { styles } from '@/components/cabecera-torneo.styles';
import { Etapas } from '@/components/etapas';
import { Trama } from '@/components/trama';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Torneo } from '@/hooks/use-torneos';
import { nombreDeporte } from '@/utils/deportes';
import { nombreFormato } from '@/utils/formatos';
import { etapas, obtenerCampeonTorneo } from '@/utils/torneo';

type CabeceraTorneoProps = {
  torneo: Torneo;
  detalle: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// El nombre del torneo en letra de píxeles enorme, la etapa en juego en magenta, la trama
// de puntos, la tira de etapas y las pestañas.
export function CabeceraTorneo({ torneo, detalle, children, style }: CabeceraTorneoProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const lista = etapas(torneo);
  const enJuego = lista.find((etapa) => etapa.estado === 'en-juego');
  const terminado = obtenerCampeonTorneo(torneo) !== null;

  let estado = '';
  if (terminado) {
    estado = 'Terminado';
  } else if (enJuego) {
    estado = `${enJuego.nombre} en juego`;
  }

  return (
    <View style={[styles.contenido, style]}>
      <View style={styles.textos}>
        <Text accessibilityRole="header" numberOfLines={3} style={[styles.nombre, { color: colors.text }]}>
          {torneo.nombre}
        </Text>
        {estado ? (
          <Text style={[styles.enJuego, { color: terminado ? colors.text : colors.siguiente }]}>
            {estado}
          </Text>
        ) : null}
        <Text style={[styles.meta, { color: colors.textMuted }]}>
          {nombreDeporte(torneo.deporte, torneo.deporteOtro)} · {nombreFormato(torneo.formato)} ·{' '}
          {detalle}
        </Text>
      </View>

      <Trama />

      <Etapas etapas={lista} />

      {children ? (
        <View style={[styles.pestanias, { borderBottomColor: colors.rule }]}>{children}</View>
      ) : null}
    </View>
  );
}
