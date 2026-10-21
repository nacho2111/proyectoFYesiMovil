import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 68,
    paddingVertical: 10,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  nombre: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  detalle: {
    fontFamily: Fuentes.texto,
    fontSize: 13,
    lineHeight: 18,
  },
  estado: {
    alignItems: 'flex-end',
    gap: 2,
  },
  estadoTexto: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 13,
  },
  conteo: {
    fontFamily: Fuentes.cifras,
    fontSize: 22,
    fontVariant: ['tabular-nums'],
  },
  pressed: {
    opacity: 0.7,
  },
});
