import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Colors, FontSizes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, variant = 'primary', disabled, style, ...rest }: ButtonProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { borderWidth: 1, borderColor: colors.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}>
      <Text style={[styles.text, { color: isPrimary ? colors.onPrimary : colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
