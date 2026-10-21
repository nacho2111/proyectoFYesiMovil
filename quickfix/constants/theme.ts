import { Platform } from 'react-native';

// Letra de píxeles: un muestrario tipográfico de los de Emigre aplicado al fixture.
// Papel blanco, tinta negra, filetes gruesos, tramas de puntos y un solo color sintético,
// el magenta de imprenta, reservado para lo que importa ahora (el puntero, la fecha en
// juego, el próximo partido). Las marcas de resultado van en blanco y negro.
export const Colors = {
  light: {
    text: '#111111',
    textMuted: '#5A5A5A',
    background: '#FFFFFF',
    surface: '#F2F2F2',
    surfaceAlt: '#E6E6E6',
    border: '#BDBDBD',
    hairline: '#DDDDDD',
    // los filetes gruesos que dividen las secciones
    rule: '#111111',
    primary: '#111111',
    onPrimary: '#FFFFFF',
    // el magenta: lo que sigue, el puntero, la fecha en juego, los errores
    siguiente: '#E6007E',
    onSiguiente: '#FFFFFF',
    hecho: '#111111',
    empate: '#111111',
    walkover: '#111111',
    danger: '#E6007E',
  },
  dark: {
    text: '#F2F2F2',
    textMuted: '#A6A6A6',
    background: '#0E0E0E',
    surface: '#1A1A1A',
    surfaceAlt: '#262626',
    border: '#474747',
    hairline: '#2B2B2B',
    rule: '#F2F2F2',
    primary: '#F2F2F2',
    onPrimary: '#0E0E0E',
    siguiente: '#FF3EA5',
    onSiguiente: '#0E0E0E',
    hecho: '#F2F2F2',
    empate: '#F2F2F2',
    walkover: '#F2F2F2',
    danger: '#FF3EA5',
  },
};

// Tamaños del muestrario: la misma letra de píxeles se repite en estos pasos.
export const Pixel = {
  enorme: 88,
  grande: 64,
  mediano: 40,
  chico: 30,
  cifra: 22,
};

export const FontSizes = {
  small: 14,
  body: 16,
  subtitle: 30,
  title: 40,
  hero: 64,
};

// Jersey 10 (de píxeles) para títulos y todos los números; Schibsted Grotesk para leer.
// Con fuentes propias el peso va en la familia, no en fontWeight (Android lo ignora).
export const Fuentes = {
  texto: 'SchibstedGrotesk_400Regular',
  textoMedio: 'SchibstedGrotesk_500Medium',
  textoNegrita: 'SchibstedGrotesk_700Bold',
  pixel: 'Jersey10_400Regular',
  // las cifras van en píxeles, como en un marcador de estadio
  cifras: 'Jersey10_400Regular',
  cifrasNegrita: 'Jersey10_400Regular',
};

// todo es cuadrado
export const Radios = {
  chico: 0,
  medio: 0,
  pastilla: 0,
};

export const FILETE = 2;

// en la compu el contenido no se estira de punta a punta
export const ANCHO_MAXIMO = 720;
// la pantalla del torneo pasa a dos paneles desde este ancho
export const ANCHO_DOS_PANELES = 960;

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
