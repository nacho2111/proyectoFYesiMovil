import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Torneo } from '@/hooks/use-torneos';

type TorneoCardProps = {
  torneo: Torneo;
};

export function TorneoCard({ torneo }: TorneoCardProps) {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];
  const campeon = torneo.rondas.at(-1)?.partidos[0].ganador;
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  estado: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
