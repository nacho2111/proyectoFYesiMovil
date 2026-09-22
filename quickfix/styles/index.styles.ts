import { StyleSheet } from 'react-native';

import { FontSizes } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    paddingBottom: 24,
  },
  banner: {
    height: 320,
  },
  fotos: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  foto: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: FontSizes.hero,
    lineHeight: 48,
  },
  bannerText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 32,
  },
  crear: {
    minHeight: 60,
  },
  item: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  vacio: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  vacioTexto: {
    textAlign: 'center',
  },
});
