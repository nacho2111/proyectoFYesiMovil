import { StyleSheet } from 'react-native';

import { FontSizes, Fuentes, Pixel } from '@/constants/theme';

// La letra de píxeles se usa en los pasos del muestrario (88 / 64 / 40 / 30 / 22);
// lo que se lee va en Schibsted Grotesk.
export const styles = StyleSheet.create({
  default: {
    fontFamily: Fuentes.texto,
    fontSize: FontSizes.body,
    lineHeight: 23,
  },
  defaultSemiBold: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: FontSizes.body,
    lineHeight: 23,
  },
  title: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.mediano,
    lineHeight: 38,
  },
  hero: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.grande,
    lineHeight: 56,
  },
  subtitle: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.chico,
    lineHeight: 30,
  },
  numero: {
    fontFamily: Fuentes.cifras,
    fontSize: Pixel.cifra,
    lineHeight: 24,
  },
  link: {
    fontFamily: Fuentes.textoMedio,
    fontSize: FontSizes.body,
    lineHeight: 30,
  },
  small: {
    fontFamily: Fuentes.texto,
    fontSize: FontSizes.small,
    lineHeight: 20,
  },
});
