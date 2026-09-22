import { StyleSheet } from 'react-native';

import { FontSizes } from '@/constants/theme';

export const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSizes.body,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
