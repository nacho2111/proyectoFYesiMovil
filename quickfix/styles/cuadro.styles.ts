import { StyleSheet } from 'react-native';

import { ANCHO_PARTIDO } from '@/components/partido-card';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aviso: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  contenido: {
    paddingTop: 24,
    gap: 24,
  },
  encabezado: {
    paddingHorizontal: 24,
    gap: 8,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  rondas: {
    paddingHorizontal: 24,
    gap: 24,
  },
  ronda: {
    width: ANCHO_PARTIDO,
    gap: 8,
  },
  nombreRonda: {
    height: 24,
  },
  partidos: {
    justifyContent: 'space-around',
  },
});
