import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO, Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aviso: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    gap: 24,
  },
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    padding: 16,
    paddingTop: 8,
    gap: 28,
  },
  seccion: {
    gap: 10,
  },
  peligro: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  etiqueta: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 14,
  },
});
