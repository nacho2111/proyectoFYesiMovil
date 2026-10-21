import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO, FILETE, Fuentes, Pixel } from '@/constants/theme';

export const styles = StyleSheet.create({
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 14,
  },
  textos: {
    gap: 6,
  },
  nombre: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.grande,
    lineHeight: 54,
  },
  enJuego: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.chico,
    lineHeight: 30,
  },
  meta: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 14,
  },
  pestanias: {
    borderBottomWidth: FILETE,
  },
});
