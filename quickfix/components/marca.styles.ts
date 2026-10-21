import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  marca: {
    minWidth: 28,
    height: 22,
    paddingHorizontal: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontFamily: Fuentes.pixel,
    fontSize: 18,
    lineHeight: 18,
    includeFontPadding: false,
  },
  tachado: {
    textDecorationLine: 'line-through',
  },
});
