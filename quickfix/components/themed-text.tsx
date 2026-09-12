import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    type === 'link' ? 'primary' : 'text'
  );

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
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
