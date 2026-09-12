import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, FontSizes } from '@/constants/theme';
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

const styles = StyleSheet.create({
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
