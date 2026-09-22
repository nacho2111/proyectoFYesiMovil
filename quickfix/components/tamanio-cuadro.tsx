import { Pressable, View } from 'react-native';

import { styles } from '@/components/tamanio-cuadro.styles';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TAMANIOS_CUADRO } from '@/utils/fixture';

type TamanioCuadroProps = {
  lugares: number;
  cantidad: number;
  onCambiar: (lugares: number) => void;
};

export function TamanioCuadro({ lugares, cantidad, onCambiar }: TamanioCuadroProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const sobran = lugares - cantidad;

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">Tamaño del cuadro</ThemedText>

      <View style={styles.opciones}>
        {TAMANIOS_CUADRO.map((tamanio) => {
          const elegido = tamanio === lugares;
          const noEntran = cantidad > tamanio;

          return (
            <Pressable
              key={tamanio}
              onPress={() => onCambiar(tamanio)}
              disabled={noEntran}
              accessibilityRole="button"
              accessibilityLabel={`Cuadro de ${tamanio}`}
              accessibilityState={{ selected: elegido, disabled: noEntran }}
              style={({ pressed }) => [
                styles.opcion,
                elegido
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && styles.pressed,
                noEntran && styles.disabled,
              ]}>
              <ThemedText
                type="defaultSemiBold"
                style={{ color: elegido ? colors.onPrimary : colors.text }}>
                {tamanio}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {cantidad > 0 && sobran > 0 ? (
        <ThemedText type="small" style={{ color: colors.textMuted }}>
          {sobran === 1
            ? 'Sobra 1 lugar. El que no tenga rival pasa directo a la ronda siguiente.'
            : `Sobran ${sobran} lugares. Los que no tengan rival pasan directo a la ronda siguiente.`}
        </ThemedText>
      ) : null}
    </View>
  );
}
