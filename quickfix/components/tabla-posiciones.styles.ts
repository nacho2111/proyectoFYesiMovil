import { StyleSheet } from 'react-native';

import { FILETE, Fuentes, Pixel } from '@/constants/theme';

const ANCHO_COLUMNA = 30;

export const styles = StyleSheet.create({
  // un filete grueso arriba, uno fino entre filas, sin caja
  tabla: {
    borderTopWidth: FILETE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 2,
    gap: 2,
  },
  encabezado: {
    minHeight: 32,
  },
  posicion: {
    width: 26,
    fontFamily: Fuentes.cifras,
    fontSize: Pixel.cifra,
  },
  nombre: {
    flex: 1,
    fontFamily: Fuentes.textoMedio,
    fontSize: 15,
    paddingRight: 4,
  },
  columna: {
    width: ANCHO_COLUMNA,
    textAlign: 'center',
    fontFamily: Fuentes.cifras,
    fontSize: Pixel.cifra,
  },
  titulo: {
    width: ANCHO_COLUMNA,
    textAlign: 'center',
    fontFamily: Fuentes.textoNegrita,
    fontSize: 12,
  },
  tituloNombre: {
    flex: 1,
    fontFamily: Fuentes.textoNegrita,
    fontSize: 12,
  },
  puntos: {
    width: 36,
    textAlign: 'right',
    fontSize: 28,
  },
  puntosTitulo: {
    width: 36,
    textAlign: 'right',
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
  },
});
