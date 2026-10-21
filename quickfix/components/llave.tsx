import { ScrollView, Text, View } from 'react-native';

import { ESPACIO_ENTRE_PARTIDOS, styles } from '@/components/llave.styles';
import { ALTO_PARTIDO, PartidoCard } from '@/components/partido-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { esJugable, estaJugado, type Ronda } from '@/utils/fixture';

type LlaveProps = {
  rondas: Ronda[];
  // sin callback (torneo terminado) no se puede tocar ningún partido
  onAbrir?: (indiceRonda: number, indicePartido: number) => void;
};

// El cuadro con una columna por ronda que se desliza para el costado. Arriba de cada
// columna va cuántos partidos de esa ronda ya se jugaron.
export function Llave({ rondas, onAbrir }: LlaveProps) {
  const colors = Colors[useColorScheme() ?? 'light'];

  // Todas las columnas miden lo mismo y reparten los partidos con space-around:
  // así cada partido queda a la altura del medio de los dos que lo alimentan.
  const masPartidos = Math.max(...rondas.map((ronda) => ronda.partidos.length));
  const altoColumna = masPartidos * (ALTO_PARTIDO + ESPACIO_ENTRE_PARTIDOS);

  return (
    <ScrollView horizontal contentContainerStyle={styles.rondas}>
      {rondas.map((ronda, indiceRonda) => {
        const reales = ronda.partidos.filter((partido) => !partido.libre);
        const jugados = reales.filter(estaJugado).length;
        const completa = reales.length > 0 && jugados === reales.length;
        const enJuego = !completa && reales.some((p) => esJugable(p) && !estaJugado(p));

        let colorConteo = colors.textMuted;
        if (completa) {
          colorConteo = colors.hecho;
        } else if (enJuego) {
          colorConteo = colors.siguiente;
        }

        return (
          <View key={`${ronda.nombre}-${indiceRonda}`} style={styles.ronda}>
            <View style={styles.encabezado}>
              <Text numberOfLines={1} style={[styles.nombreRonda, { color: colors.text }]}>
                {ronda.nombre}
              </Text>
              {reales.length > 0 ? (
                <Text style={[styles.conteo, { color: colorConteo }]}>
                  {jugados}/{reales.length}
                </Text>
              ) : null}
            </View>

            <View style={[styles.partidos, { height: altoColumna }]}>
              {ronda.partidos.map((partido, indicePartido) => (
                <PartidoCard
                  key={indicePartido}
                  partido={partido}
                  onPress={
                    onAbrir && esJugable(partido)
                      ? () => onAbrir(indiceRonda, indicePartido)
                      : undefined
                  }
                />
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
