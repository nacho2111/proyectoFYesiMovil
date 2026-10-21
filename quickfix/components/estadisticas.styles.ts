import { StyleSheet } from 'react-native';

import { FILETE, Fuentes, Pixel } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  progreso: {
    gap: 10,
  },
  progresoFila: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  progresoNumero: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.grande,
    lineHeight: 56,
  },
  // la barra de progreso es una fila de cuadraditos, como un marcador de luces
  bloques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  bloque: {
    width: 12,
    height: 12,
    borderWidth: FILETE,
  },
  panel: {
    borderTopWidth: FILETE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dato: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
  },
  rotulo: {
    width: 110,
    fontFamily: Fuentes.textoNegrita,
    fontSize: 14,
    lineHeight: 30,
  },
  valores: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 2,
  },
  nombre: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.chico,
    lineHeight: 30,
    textAlign: 'right',
  },
  valor: {
    fontFamily: Fuentes.texto,
    fontSize: 13,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
  },
  seccion: {
    gap: 10,
  },
  vacio: {
    gap: 4,
    paddingVertical: 16,
  },
});
