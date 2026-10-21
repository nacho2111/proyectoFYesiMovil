import { StyleSheet } from 'react-native';

import { FILETE, FontSizes, Fuentes } from '@/constants/theme';

// rectángulos de tinta, sin redondeo
export const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderWidth: FILETE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: FontSizes.body,
  },
  // al apretarlo se corre un poco, como un sello
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  disabled: {
    opacity: 0.35,
  },
});
