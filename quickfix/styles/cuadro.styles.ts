import { StyleSheet } from 'react-native';

import { ANCHO_MAXIMO, Fuentes } from '@/constants/theme';

const ANCHO_DOS_PANELES_MAXIMO = 1120;

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
  editar: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  editarTexto: {
    fontFamily: Fuentes.textoNegrita,
    fontSize: 16,
  },
  anchoDosPaneles: {
    maxWidth: ANCHO_DOS_PANELES_MAXIMO,
  },
  cuerpo: {
    width: '100%',
  },
  // en la compu: el contenido a la izquierda y el próximo partido fijo a la derecha
  cuerpoDosPaneles: {
    maxWidth: ANCHO_DOS_PANELES_MAXIMO,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  principal: {
    flex: 1,
    minWidth: 0,
  },
  costado: {
    width: 320,
    paddingTop: 20,
    paddingRight: 16,
  },
  lateral: {
    gap: 12,
  },
  contenido: {
    width: '100%',
    maxWidth: ANCHO_MAXIMO,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 20,
  },
  seccionCuadro: {
    paddingTop: 20,
    gap: 12,
  },
  ayudaCuadro: {
    paddingHorizontal: 16,
    maxWidth: ANCHO_MAXIMO,
  },
  grupo: {
    gap: 10,
  },
  fecha: {
    gap: 8,
  },
  fechaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  vacio: {
    gap: 4,
    paddingVertical: 16,
  },
  leyenda: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  leyendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
