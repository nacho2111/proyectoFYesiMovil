import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    flexGrow: 1,
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    padding: 16,
    paddingTop: 18,
    gap: 24,
  },
  agregar: {
    flexDirection: 'row',
    // flex-start para que el botón no se estire cuando aparece el error abajo del input
    alignItems: 'flex-start',
    gap: 8,
  },
  campo: {
    flex: 1,
  },
  lista: {
    gap: 8,
  },
  footer: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
});
