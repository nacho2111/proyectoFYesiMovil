import { StyleSheet } from 'react-native';

import { FILETE, Fuentes, Pixel } from '@/constants/theme';

export const styles = StyleSheet.create({
  tira: {
    gap: 6,
  },
  etapa: {
    minWidth: 92,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: FILETE,
  },
  nombre: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 13,
  },
  conteo: {
    fontFamily: Fuentes.cifras,
    fontSize: Pixel.cifra,
    lineHeight: 24,
  },
});
