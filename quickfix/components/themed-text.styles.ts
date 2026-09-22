import { StyleSheet } from 'react-native';

import { FontSizes } from '@/constants/theme';

export const styles = StyleSheet.create({
  default: {
    fontSize: FontSizes.body,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: FontSizes.body,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSizes.title,
    lineHeight: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FontSizes.subtitle,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  link: {
    fontSize: FontSizes.body,
    lineHeight: 30,
  },
  small: {
    fontSize: FontSizes.small,
    lineHeight: 20,
  },
});
