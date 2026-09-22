import { StyleSheet } from 'react-native';

import { FontSizes } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: FontSizes.body,
  },
});
