import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 28,
  },
  footer: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
