import { TextInput, View, type TextInputProps } from 'react-native';

import { styles } from '@/components/input.styles';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...rest }: InputProps) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View style={styles.container}>
      {label ? <ThemedText type="defaultSemiBold">{label}</ThemedText> : null}

      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
          },
          style,
        ]}
        {...rest}
      />

      {error ? (
        <ThemedText type="small" style={{ color: colors.danger }}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}
