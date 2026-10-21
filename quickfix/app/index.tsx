import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Panel } from '@/components/panel';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TorneoCard } from '@/components/torneo-card';
import { Trama } from '@/components/trama';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTorneos } from '@/hooks/use-torneos';
import { styles } from '@/styles/index.styles';
import { DEPORTES } from '@/utils/deportes';

export default function HomeScreen() {
  const { torneos, cargando } = useTorneos();
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.contenido,
          { paddingTop: 24 + insets.top, paddingBottom: 32 + insets.bottom },
        ]}>
        <View style={styles.portada}>
          <Text accessibilityRole="header" style={[styles.marca, { color: colors.text }]}>
            QuickFix
          </Text>
          <Text style={[styles.bajada, { color: colors.text }]}>
            Armá el fixture de tu torneo en minutos. Sin registrarte, todo queda en tu celular.
          </Text>
        </View>

        <Trama filas={3} />

        <Link href="/crear-torneo" asChild>
          <Button title="Crear torneo" style={styles.crear} />
        </Link>

        <View style={styles.seccion}>
          <ThemedText type="subtitle">Empezá por el deporte</ThemedText>
          {/* atajo: abre la creación con ese deporte ya elegido */}
          <View style={styles.deportes}>
            {DEPORTES.map((deporte) => (
              <Pressable
                key={deporte.id}
                onPress={() =>
                  router.push({ pathname: '/crear-torneo', params: { deporte: deporte.id } })
                }
                accessibilityRole="button"
                accessibilityLabel={`Crear un torneo de ${deporte.nombre}`}
                style={({ pressed }) => [
                  styles.deporte,
                  { borderColor: colors.text },
                  pressed && { backgroundColor: colors.text },
                ]}>
                {({ pressed }) => (
                  <Text
                    style={[styles.deporteNombre, { color: pressed ? colors.background : colors.text }]}>
                    {deporte.nombre}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.seccion}>
          <View style={styles.listaTitulo}>
            <ThemedText type="subtitle">Tus torneos</ThemedText>
            {torneos.length > 0 ? (
              <Text style={[styles.cantidad, { color: colors.textMuted }]}>{torneos.length}</Text>
            ) : null}
          </View>

          {/* mientras carga lo guardado, no mostrar el vacío: todavía no sabemos si hay torneos */}
          {cargando ? null : torneos.length === 0 ? (
            <ThemedText style={{ color: colors.textMuted }}>
              Todavía no tenés torneos. Elegí un deporte de arriba para armar el primero.
            </ThemedText>
          ) : (
            <Panel>
              {torneos.map((torneo) => (
                <TorneoCard key={torneo.id} torneo={torneo} />
              ))}
            </Panel>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
