import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { styles } from '@/components/button.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  // primary: tinta llena · acento: magenta, solo para lo que sigue (cargar el próximo
  // resultado) · secondary: contorno de tinta · danger: contorno magenta
  variant?: 'primary' | 'acento' | 'secondary' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, variant = 'primary', disabled, style, ...rest }: ButtonProps) {
  const colors = Colors[useColorScheme() ?? 'light'];

  const fondos = {
    primary: { backgroundColor: colors.primary, borderColor: colors.primary },
    acento: { backgroundColor: colors.siguiente, borderColor: colors.siguiente },
    secondary: { backgroundColor: 'transparent', borderColor: colors.text },
    danger: { backgroundColor: 'transparent', borderColor: colors.danger },
  };
  const textos = {
    primary: colors.onPrimary,
    acento: colors.onSiguiente,
    secondary: colors.text,
    danger: colors.danger,
  };

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.button,
        fondos[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}>
      <Text style={[styles.text, { color: textos[variant] }]}>{title}</Text>
    </Pressable>
  );
}
