import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  campo: {
    gap: 8,
  },
  etiqueta: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 14,
  },
  ayuda: {
    fontFamily: Fuentes.texto,
    fontSize: 13,
    lineHeight: 18,
  },
  deportes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 8,
  },
  deporte: {
    // cuatro por fila en el celular
    width: '23%',
    flexGrow: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
  },
  deporteTexto: {
    fontSize: 14,
  },
  // sin caja: filetes arriba, abajo y entre opciones
  panel: {
    borderTopWidth: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
  },
  formato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 0,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioPunto: {
    width: 8,
    height: 8,
    borderRadius: 0,
  },
  formatoTextos: {
    flex: 1,
    gap: 2,
  },
  formatoNombre: {
    fontSize: 15,
  },
  formatoDescripcion: {
    fontFamily: Fuentes.texto,
    fontSize: 13,
    lineHeight: 18,
  },
  puntos: {
    flexDirection: 'row',
  },
  punto: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  separador: {
    width: StyleSheet.hairlineWidth,
  },
  puntoNombre: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 13,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  stepperBoton: {
    width: 34,
    height: 34,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperTexto: {
    fontFamily: Fuentes.cifrasNegrita,
    fontSize: 18,
    lineHeight: 20,
  },
  puntoValor: {
    minWidth: 28,
    textAlign: 'center',
    fontFamily: Fuentes.cifrasNegrita,
    fontSize: 30,
    lineHeight: 30,
    fontVariant: ['tabular-nums'],
  },
  opciones: {
    flexDirection: 'row',
  },
  opcion: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionTexto: {
    fontFamily: Fuentes.cifras,
    fontSize: 26,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.35,
  },
});
