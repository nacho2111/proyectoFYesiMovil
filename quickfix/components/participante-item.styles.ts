import { StyleSheet } from 'react-native';

import { FontSizes } from '@/constants/theme';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 56,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  mover: {
    justifyContent: 'center',
  },
  deshabilitado: {
    opacity: 0.3,
  },
  numero: {
    minWidth: 24,
    textAlign: 'center',
  },
  nombre: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: FontSizes.body,
  },
  accion: {
    padding: 6,
  },
});
