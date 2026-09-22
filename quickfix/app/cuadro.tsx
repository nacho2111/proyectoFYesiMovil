import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ALTO_PARTIDO, ANCHO_PARTIDO, PartidoCard } from '@/components/partido-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTorneo } from '@/hooks/use-torneos';
import { esJugable, obtenerCampeon } from '@/utils/fixture';

const ESPACIO_ENTRE_PARTIDOS = 16;

export default function CuadroScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const torneo = useTorneo(id);
  const insets = useSafeAreaInsets();
  const mutedColor = useThemeColor({}, 'textMuted');
  const primaryColor = useThemeColor({}, 'primary');
  const onPrimaryColor = useThemeColor({}, 'onPrimary');

  if (!torneo) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle="Puede que ya no exista.">
          No encontramos el torneo
        </Title>

        <Link href="/" dismissTo asChild>
          <Button title="Volver al inicio" variant="secondary" />
        </Link>
      </ThemedView>
    );
  }

  if (torneo.rondas.length === 0) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle="Primero cargá los participantes y generá el cuadro.">
          Todavía no hay cuadro
        </Title>

        <Button
          title="Cargar participantes"
          onPress={() => router.replace({ pathname: '/participantes', params: { id } })}
        />
      </ThemedView>
    );
  }

  // Todas las columnas miden lo mismo y reparten los partidos con space-around:
  // así cada partido queda a la altura del medio de los dos que lo alimentan.
  const altoColumna = torneo.rondas[0].partidos.length * (ALTO_PARTIDO + ESPACIO_ENTRE_PARTIDOS);
  const campeon = obtenerCampeon(torneo.rondas);

  function abrirPartido(ronda: number, partido: number) {
    router.push({ pathname: '/resultado', params: { id, ronda, partido } });
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.contenido, { paddingBottom: 24 + insets.bottom }]}>
        <View style={styles.encabezado}>
          <Title subtitle={torneo.nombre}>Cuadro</Title>

          {campeon ? (
            <View style={[styles.banner, { backgroundColor: primaryColor }]}>
              <Ionicons name="trophy" size={20} color={onPrimaryColor} />
              <ThemedText type="defaultSemiBold" style={{ color: onPrimaryColor }}>
                Campeón: {campeon} · Torneo terminado
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="small" style={{ color: mutedColor }}>
              Tocá un partido para cargar el resultado. Deslizá para el costado para ver las
              rondas que siguen.
            </ThemedText>
          )}
        </View>

        <ScrollView horizontal contentContainerStyle={styles.rondas}>
          {torneo.rondas.map((ronda, indiceRonda) => (
            <View key={ronda.nombre} style={styles.ronda}>
              <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.nombreRonda}>
                {ronda.nombre}
              </ThemedText>

              <View style={[styles.partidos, { height: altoColumna }]}>
                {ronda.partidos.map((partido, indicePartido) => (
                  <PartidoCard
                    key={indicePartido}
                    partido={partido}
                    onPress={
                      !campeon && esJugable(partido)
                        ? () => abrirPartido(indiceRonda, indicePartido)
                        : undefined
                    }
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aviso: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  contenido: {
    paddingTop: 24,
    gap: 24,
  },
  encabezado: {
    paddingHorizontal: 24,
    gap: 8,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  rondas: {
    paddingHorizontal: 24,
    gap: 24,
  },
  ronda: {
    width: ANCHO_PARTIDO,
    gap: 8,
  },
  nombreRonda: {
    height: 24,
  },
  partidos: {
    justifyContent: 'space-around',
  },
});
