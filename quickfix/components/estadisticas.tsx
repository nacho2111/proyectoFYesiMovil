import { Fragment } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/components/estadisticas.styles';
import { TablaPosiciones } from '@/components/tabla-posiciones';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Torneo } from '@/hooks/use-torneos';
import { estadisticas, progreso, tablaGeneral } from '@/utils/torneo';

export function Estadisticas({ torneo }: { torneo: Torneo }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const { jugados, total } = progreso(torneo);
  const destacados = estadisticas(torneo);

  return (
    <View style={styles.container}>
      <View style={styles.progreso}>
        <View style={styles.progresoFila}>
          <Text style={[styles.progresoNumero, { color: colors.text }]}>
            {jugados}/{total}
          </Text>
          <ThemedText type="small" style={{ color: colors.textMuted }}>
            partidos jugados
          </ThemedText>
        </View>
        {/* un cuadradito por partido: lleno los jugados, el que sigue en magenta */}
        <View style={styles.bloques} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {Array.from({ length: total }, (_, i) => {
            const jugado = i < jugados;
            const siguiente = i === jugados;
            let borde = colors.border;
            if (jugado) {
              borde = colors.text;
            } else if (siguiente) {
              borde = colors.siguiente;
            }

            return (
              <View
                key={i}
                style={[
                  styles.bloque,
                  { borderColor: borde, backgroundColor: jugado ? colors.text : 'transparent' },
                ]}
              />
            );
          })}
        </View>
      </View>

      {destacados.length === 0 ? (
        <View style={styles.vacio}>
          <ThemedText type="defaultSemiBold">Todavía no se jugó ningún partido</ThemedText>
          <ThemedText type="small" style={{ color: colors.textMuted }}>
            Cuando cargues resultados, acá vas a ver quién gana más y quién suma más puntos.
          </ThemedText>
        </View>
      ) : (
        <>
          <View style={[styles.panel, { borderTopColor: colors.rule, borderBottomColor: colors.border }]}>
            {destacados.map((destacado, i) => (
              <Fragment key={destacado.titulo}>
                {i > 0 ? <View style={[styles.divisor, { backgroundColor: colors.border }]} /> : null}
                <View style={styles.dato}>
                  <Text style={[styles.rotulo, { color: colors.textMuted }]}>{destacado.titulo}</Text>
                  <View style={styles.valores}>
                    {destacado.nombres.map((nombre) => (
                      <Text key={nombre} numberOfLines={1} style={[styles.nombre, { color: colors.text }]}>
                        {nombre}
                      </Text>
                    ))}
                    <Text style={[styles.valor, { color: colors.textMuted }]}>{destacado.valor}</Text>
                  </View>
                </View>
              </Fragment>
            ))}
          </View>

          <View style={styles.seccion}>
            <ThemedText type="subtitle">Tabla general</ThemedText>
            <ThemedText type="small" style={{ color: colors.textMuted }}>
              Todos los partidos del torneo: {torneo.puntos.ganado} por ganar,{' '}
              {torneo.puntos.empatado} por empatar y {torneo.puntos.perdido} por perder. El que
              pierde por walkover no suma.
            </ThemedText>
            <TablaPosiciones filas={tablaGeneral(torneo)} />
          </View>
        </>
      )}
    </View>
  );
}
