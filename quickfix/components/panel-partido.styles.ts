import { StyleSheet } from 'react-native';

import { FILETE, Fuentes, Pixel } from '@/constants/theme';

export const styles = StyleSheet.create({
  panel: {
    borderWidth: FILETE,
    padding: 12,
    gap: 2,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 6,
  },
  rotulo: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 13,
  },
  dato: {
    flexShrink: 1,
    fontFamily: Fuentes.textoMedio,
    fontSize: 13,
    textAlign: 'right',
  },
  // los nombres en píxeles, como en el marcador
  nombre: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.mediano,
    lineHeight: 38,
  },
  vs: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.cifra,
    lineHeight: 22,
  },
  boton: {
    marginTop: 12,
  },
  campeon: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.grande,
    lineHeight: 56,
  },
});
