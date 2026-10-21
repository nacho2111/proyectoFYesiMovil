import { View } from 'react-native';

import { OpcionesNumero } from '@/components/selectores';
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
      <OpcionesNumero
        titulo="Tamaño del cuadro"
        opciones={TAMANIOS_CUADRO}
        valor={lugares}
        onCambiar={onCambiar}
        deshabilitada={(tamanio) => cantidad > tamanio}
        etiqueta={(tamanio) => `Cuadro de ${tamanio}`}
      />

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
