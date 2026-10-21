import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const PASO = 6;
const PUNTO = 2;

// Una banda de trama de puntos, como la de imprenta: la única textura de la app.
// Los puntos se achican hacia la derecha para que la banda tenga degradé de tinta.
export function Trama({ filas = 2, style }: { filas?: number; style?: StyleProp<ViewStyle> }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const [ancho, setAncho] = useState(0);
  const columnas = Math.floor(ancho / PASO);

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onLayout={(evento: LayoutChangeEvent) => setAncho(evento.nativeEvent.layout.width)}
      style={[{ height: filas * PASO }, style]}>
      {Array.from({ length: filas }, (_, fila) => (
        <View key={fila} style={styles.fila}>
          {Array.from({ length: columnas }, (_, columna) => {
            const tamanio = PUNTO * (1 - (columna / Math.max(columnas, 1)) * 0.6);
            return (
              <View key={columna} style={styles.celda}>
                <View
                  style={{
                    width: tamanio,
                    height: tamanio,
                    backgroundColor: colors.text,
                  }}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    height: PASO,
  },
  celda: {
    width: PASO,
    height: PASO,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
