import { Pressable, ScrollView, Text } from 'react-native';

import { styles } from '@/components/pestanias.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type PestaniasProps<T extends string> = {
  opciones: { id: T; nombre: string }[];
  valor: T;
  onCambiar: (id: T) => void;
};

// pestañas de texto alineadas a la izquierda; si no entran, se deslizan
export function Pestanias<T extends string>({ opciones, valor, onCambiar }: PestaniasProps<T>) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.pestanias}
      accessibilityRole="tablist">
      {opciones.map((opcion) => {
        const elegida = opcion.id === valor;

        return (
          <Pressable
            key={opcion.id}
            onPress={() => onCambiar(opcion.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: elegida }}
            style={[
              styles.pestania,
              { borderBottomColor: elegida ? colors.siguiente : 'transparent' },
            ]}>
            <Text
              style={[
                styles.texto,
                elegida && styles.elegida,
                { color: elegida ? colors.text : colors.textMuted },
              ]}>
              {opcion.nombre}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
