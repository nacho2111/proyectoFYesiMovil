import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/components/torneo-card.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Torneo } from '@/hooks/use-torneos';
import { nombreDeporte, obtenerDeporte } from '@/utils/deportes';
import { nombreFormato } from '@/utils/formatos';
import { obtenerCampeonTorneo, progreso, tieneFixture } from '@/utils/torneo';

type TorneoCardProps = {
  torneo: Torneo;
};

// Una fila de la lista de torneos del inicio: a la izquierda qué es, a la derecha cómo va.
export function TorneoCard({ torneo }: TorneoCardProps) {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];
  const campeon = obtenerCampeonTorneo(torneo);
  const armado = tieneFixture(torneo);
  const deporte = obtenerDeporte(torneo.deporte);
  const cantidad = torneo.participantes.length;
  const { jugados, total } = progreso(torneo);

  function abrir() {
    router.push({
      pathname: armado ? '/cuadro' : '/participantes',
      params: { id: torneo.id },
    });
  }

  let estado = { texto: 'armando', color: colors.textMuted };
  if (campeon) {
    estado = { texto: 'terminado', color: colors.hecho };
  } else if (armado) {
    estado = { texto: 'en curso', color: colors.text };
  }

  const tipo = `${nombreDeporte(torneo.deporte, torneo.deporteOtro)} · ${nombreFormato(torneo.formato)}`;
  const detalle = campeon
    ? `${tipo} · Campeón: ${campeon}`
    : `${tipo} · ${cantidad} ${cantidad === 1 ? deporte.participante : deporte.participantes}`;

  return (
    <Pressable
      onPress={abrir}
      accessibilityRole="button"
      accessibilityLabel={`${torneo.nombre}. ${detalle}. ${estado.texto}${armado ? `, ${jugados} de ${total} partidos` : ''}`}
      style={({ pressed }) => [styles.fila, pressed && styles.pressed]}>
      <View style={styles.textos}>
        <Text numberOfLines={1} style={[styles.nombre, { color: colors.text }]}>
          {torneo.nombre}
        </Text>
        <Text numberOfLines={2} style={[styles.detalle, { color: colors.textMuted }]}>
          {detalle}
        </Text>
      </View>

      <View style={styles.estado}>
        <Text style={[styles.estadoTexto, { color: estado.color }]}>{estado.texto}</Text>
        {armado ? (
          <Text style={[styles.conteo, { color: colors.textMuted }]}>
            {jugados}/{total}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
