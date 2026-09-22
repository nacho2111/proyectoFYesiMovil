import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  opciones: {
    flexDirection: 'row',
    gap: 8,
  },
  opcion: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});
