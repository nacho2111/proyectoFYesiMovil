import { StyleSheet } from 'react-native';

import { ANCHO_PARTIDO } from '@/components/partido-card.styles';
import { Fuentes } from '@/constants/theme';

export const ESPACIO_ENTRE_PARTIDOS = 14;

export const styles = StyleSheet.create({
  rondas: {
    paddingHorizontal: 16,
    gap: 18,
  },
  ronda: {
    width: ANCHO_PARTIDO,
    gap: 8,
  },
  encabezado: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8,
  },
  nombreRonda: {
    flex: 1,
    fontFamily: Fuentes.textoNegrita,
    fontSize: 15,
  },
  conteo: {
    fontFamily: Fuentes.cifras,
    fontSize: 20,
  },
  partidos: {
    justifyContent: 'space-around',
  },
});
