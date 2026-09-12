import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#11181C',
    textMuted: '#687076',
    background: '#FFFFFF',
    surface: '#F1F3F5',
    border: '#D7DBDF',
    primary: '#15803D',
    onPrimary: '#FFFFFF',
    danger: '#C62828',
  },
  dark: {
    text: '#ECEDEE',
    textMuted: '#9BA1A6',
    background: '#151718',
    surface: '#1F2224',
    border: '#30353A',
    primary: '#22C55E',
    onPrimary: '#052E16',
    danger: '#FF6B6B',
  },
};

export const FontSizes = {
  small: 14,
  body: 16,
  subtitle: 20,
  title: 28,
  hero: 40,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
