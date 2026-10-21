import { StyleSheet } from 'react-native';

import { Fuentes } from '@/constants/theme';

// alto fijo: el cuadro lo usa para alinear cada partido con los dos que lo alimentan
export const ANCHO_PARTIDO = 200;
export const ALTO_PARTIDO = 104;

export const styles = StyleSheet.create({
  card: {
    width: ANCHO_PARTIDO,
    height: ALTO_PARTIDO,
    borderWidth: 2,
    borderRadius: 0,
    overflow: 'hidden',
  },
  fila: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nombre: {
    flex: 1,
    fontSize: 15,
  },
  sinJugador: {
    fontFamily: Fuentes.texto,
    fontStyle: 'italic',
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
  },
  pie: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
  },
  pieTexto: {
    flex: 1,
    fontFamily: Fuentes.cifras,
    fontSize: 20,
  },
  pasaDirecto: {
    opacity: 0.6,
  },
  vacio: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.8,
  },
});
