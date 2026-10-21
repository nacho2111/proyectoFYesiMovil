import { View } from 'react-native';

import { OpcionesNumero } from '@/components/selectores';
import { styles } from '@/components/tamanio-cuadro.styles';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CANTIDADES_GRUPOS, CLASIFICAN_POR_GRUPO } from '@/utils/grupos';

type ConfigGruposProps = {
  cantidadGrupos: number;
  clasifican: number;
  cantidad: number;
  onCambiar: (cambios: { cantidadGrupos?: number; clasifican?: number }) => void;
};

export function ConfigGrupos({ cantidadGrupos, clasifican, cantidad, onCambiar }: ConfigGruposProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const porGrupo = Math.floor(cantidad / cantidadGrupos);
  const pasan = cantidadGrupos * clasifican;

  return (
    <View style={styles.container}>
      <OpcionesNumero
        titulo="Cantidad de grupos"
        opciones={CANTIDADES_GRUPOS}
        valor={cantidadGrupos}
        onCambiar={(valor) => onCambiar({ cantidadGrupos: valor })}
        etiqueta={(valor) => `${valor} grupos`}
      />

      <OpcionesNumero
        titulo="Pasan por grupo"
        opciones={CLASIFICAN_POR_GRUPO}
        valor={clasifican}
        onCambiar={(valor) => onCambiar({ clasifican: valor })}
        etiqueta={(valor) => (valor === 1 ? 'Pasa 1 por grupo' : `Pasan ${valor} por grupo`)}
      />

      <ThemedText type="small" style={{ color: colors.textMuted }}>
        {cantidad >= cantidadGrupos * 2
          ? `Quedan grupos de ${porGrupo}${cantidad % cantidadGrupos ? ` o ${porGrupo + 1}` : ''}. Al cuadro final pasan ${pasan}.`
          : `Hacen falta al menos ${cantidadGrupos * 2} participantes para ${cantidadGrupos} grupos.`}
      </ThemedText>
    </View>
  );
}
