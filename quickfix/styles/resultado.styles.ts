import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO, Fuentes } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aviso: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    gap: 24,
  },
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    padding: 16,
    paddingTop: 20,
    gap: 22,
  },
  grupo: {
    gap: 8,
  },
  grupoTitulo: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 14,
  },
  opcion: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 0,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioPunto: {
    width: 8,
    height: 8,
    borderRadius: 0,
  },
  opcionTextos: {
    flex: 1,
    gap: 2,
  },
  opcionTexto: {
    fontSize: 16,
  },
  opcionDetalle: {
    fontFamily: Fuentes.texto,
    fontSize: 13,
  },
  pressed: {
    opacity: 0.8,
  },
  footer: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
