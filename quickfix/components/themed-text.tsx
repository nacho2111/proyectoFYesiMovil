import { Text, type TextProps } from 'react-native';

import { styles } from '@/components/themed-text.styles';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'hero' | 'defaultSemiBold' | 'subtitle' | 'numero' | 'link' | 'small';
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

  return <Text style={[{ color }, styles[type], style]} {...rest} />;
}
