import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { styles } from '@/components/input.styles';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, onFocus, onBlur, ...rest }: InputProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const [enfocado, setEnfocado] = useState(false);

  let borde = colors.border;
  if (error) {
    borde = colors.danger;
  } else if (enfocado) {
    borde = colors.primary;
  }

  return (
    <View style={styles.container}>
      {label ? (
        <ThemedText style={[styles.label, { color: colors.text }]}>{label}</ThemedText>
      ) : null}

      <TextInput
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        onFocus={(evento) => {
          setEnfocado(true);
          onFocus?.(evento);
        }}
        onBlur={(evento) => {
          setEnfocado(false);
          onBlur?.(evento);
        }}
        style={[
          styles.input,
          { color: colors.text, backgroundColor: colors.background, borderColor: borde },
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
