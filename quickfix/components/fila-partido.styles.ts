import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 12,
    gap: 10,
  },
  nombre: {
    flex: 1,
    fontSize: 15,
  },
  nombreLocal: {
    textAlign: 'right',
  },
  centro: {
    minWidth: 64,
    alignItems: 'center',
  },
  vs: {
    fontFamily: Fuentes.cifras,
    fontSize: 18,
  },
  resultado: {
    fontFamily: Fuentes.cifrasNegrita,
    fontSize: 22,
    fontVariant: ['tabular-nums'],
  },
  pressed: {
    opacity: 0.7,
  },
});
