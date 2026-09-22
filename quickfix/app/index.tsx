import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FlatList, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TorneoCard } from '@/components/torneo-card';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTorneos } from '@/hooks/use-torneos';
import { styles } from '@/styles/index.styles';

const fotos = [
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500&q=70',
  'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=500&q=70',
  'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&q=70',
  'https://images.unsplash.com/photo-1767128890439-1af9ca2ff1ac?w=500&q=70',
  'https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?w=500&q=70',
];

export default function HomeScreen() {
  const { torneos, cargando } = useTorneos();
  const mutedColor = useThemeColor({}, 'textMuted');

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={torneos}
        keyExtractor={(torneo) => torneo.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TorneoCard torneo={item} />
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.banner}>
              <View style={styles.fotos}>
                {fotos.map((foto) => (
                  <Image
                    key={foto}
                    source={foto}
                    style={styles.foto}
                    contentFit="cover"
                    transition={300}
                  />
                ))}
              </View>

              <View style={styles.overlay}>
                <ThemedText type="title" style={styles.bannerTitle}>
                  QuickFix
                </ThemedText>
                <ThemedText style={styles.bannerText}>
                  Armá el fixture de tu torneo en minutos.
                </ThemedText>
              </View>
            </View>

            <View style={styles.content}>
              <Link href="/crear-torneo" asChild>
                <Button title="Crear torneo" style={styles.crear} />
              </Link>

              <ThemedText type="subtitle">Tus torneos</ThemedText>
            </View>
          </>
        }
        ListEmptyComponent={
          // mientras carga lo guardado, no mostrar el vacío: todavía no sabemos si hay torneos
          cargando ? null : (
            <View style={styles.vacio}>
              <ThemedText type="defaultSemiBold">Todavía no tenés torneos</ThemedText>
              <ThemedText style={[styles.vacioTexto, { color: mutedColor }]}>
                Cuando crees uno, lo vas a ver acá.
              </ThemedText>
            </View>
          )
        }
      />
    </ThemedView>
  );
}
