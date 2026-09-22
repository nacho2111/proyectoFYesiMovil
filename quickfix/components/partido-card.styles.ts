import { StyleSheet } from 'react-native';

// alto fijo: el cuadro lo usa para alinear cada partido con los dos que lo alimentan
export const ANCHO_PARTIDO = 200;
export const ALTO_PARTIDO = 96;

export const styles = StyleSheet.create({
  card: {
    width: ANCHO_PARTIDO,
    height: ALTO_PARTIDO,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fila: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  nombre: {
    flex: 1,
  },
  sinJugador: {
    fontStyle: 'italic',
  },
  divisor: {
    height: 1,
  },
  pie: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
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
