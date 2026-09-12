import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type TitleProps = {
  children: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
};

export function Title({ children, subtitle, style }: TitleProps) {
  const mutedColor = useThemeColor({}, 'textMuted');

  return (
    <View style={[styles.container, style]}>
      <ThemedText type="title">{children}</ThemedText>
      {subtitle ? <ThemedText style={{ color: mutedColor }}>{subtitle}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
});
