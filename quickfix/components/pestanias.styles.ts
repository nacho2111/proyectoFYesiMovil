import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  pestanias: {
    gap: 22,
  },
  pestania: {
    minHeight: 46,
    justifyContent: 'center',
    borderBottomWidth: 4,
  },
  texto: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 15,
  },
  elegida: {
    fontFamily: Fuentes.textoNegrita,
  },
});
