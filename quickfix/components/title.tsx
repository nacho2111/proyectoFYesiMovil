import { View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/title.styles';
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
