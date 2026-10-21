import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO, Fuentes, Pixel } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    gap: 20,
  },
  portada: {
    gap: 10,
  },
  // el nombre en el paso más grande del muestrario
  marca: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.enorme,
    lineHeight: 76,
  },
  bajada: {
    fontFamily: Fuentes.textoMedio,
    fontSize: 17,
    lineHeight: 24,
    maxWidth: 380,
  },
  crear: {
    alignSelf: 'flex-start',
    paddingHorizontal: 28,
  },
  seccion: {
    gap: 12,
    marginTop: 8,
  },
  deportes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  deporte: {
    minHeight: 44,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderWidth: 2,
  },
  deporteNombre: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 15,
  },
  listaTitulo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  cantidad: {
    fontFamily: Fuentes.pixel,
    fontSize: Pixel.chico,
    lineHeight: 30,
  },
});
