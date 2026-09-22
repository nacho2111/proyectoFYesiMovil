import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/torneo-card.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Torneo } from '@/hooks/use-torneos';
import { obtenerCampeon } from '@/utils/fixture';

type TorneoCardProps = {
  torneo: Torneo;
};

export function TorneoCard({ torneo }: TorneoCardProps) {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];
  const campeon = obtenerCampeon(torneo.rondas);
  const cantidad = torneo.participantes.length;

  function abrir() {
    router.push({
      pathname: torneo.rondas.length > 0 ? '/cuadro' : '/participantes',
      params: { id: torneo.id },
    });
  }

  return (
    <Pressable
      onPress={abrir}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {torneo.nombre}
        </ThemedText>
        <ThemedText type="small" style={{ color: colors.textMuted }}>
          {campeon
            ? `Campeón: ${campeon}`
            : `${cantidad} ${cantidad === 1 ? 'participante' : 'participantes'}`}
        </ThemedText>
      </View>

      <ThemedText
        type="small"
        style={[styles.estado, { color: campeon ? colors.textMuted : colors.primary }]}>
        {campeon ? 'Terminado' : 'En curso'}
      </ThemedText>
    </Pressable>
  );
}
