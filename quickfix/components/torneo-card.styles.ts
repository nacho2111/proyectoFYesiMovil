import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  estado: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
