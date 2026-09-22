import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    flexGrow: 1,
    padding: 24,
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
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 8,
  },
});
