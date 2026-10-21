import { StyleSheet } from 'react-native';

import { FontSizes, Fuentes, Radios } from '@/constants/theme';

export const styles = StyleSheet.create({
  contenedor: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 52,
    paddingHorizontal: 12,
  },
  mover: {
    gap: 2,
  },
  accionChica: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 12,
    lineHeight: 16,
  },
  deshabilitado: {
    opacity: 0.3,
  },
  numero: {
    width: 26,
    fontFamily: Fuentes.cifras,
    fontSize: 22,
    fontVariant: ['tabular-nums'],
  },
  nombre: {
    flex: 1,
    fontFamily: Fuentes.textoMedio,
    fontSize: FontSizes.body,
  },
  input: {
    flex: 1,
    minHeight: 38,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: Radios.chico,
    fontFamily: Fuentes.texto,
    fontSize: FontSizes.body,
  },
  accion: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  accionTexto: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 14,
  },
  error: {
    paddingHorizontal: 12,
    paddingBottom: 6,
    fontFamily: Fuentes.texto,
    fontSize: 13,
  },
});
