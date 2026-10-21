import { StyleSheet } from 'react-native';

import { FontSizes, Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: FontSizes.small,
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 12,
    borderWidth: 2,
    fontFamily: Fuentes.texto,
    fontSize: FontSizes.body,
  },
});
