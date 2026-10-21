import { Fragment } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/components/tabla-posiciones.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { FilaTabla } from '@/utils/liga';

type TablaPosicionesProps = {
  filas: FilaTabla[];
  // los primeros que se marcan (el puntero, o los que clasifican en un grupo)
  destacados?: number;
};

const COLUMNAS: { titulo: string; valor: (fila: FilaTabla) => number; nombre: string }[] = [
  { titulo: 'PJ', valor: (fila) => fila.jugados, nombre: 'jugados' },
  { titulo: 'G', valor: (fila) => fila.ganados, nombre: 'ganados' },
  { titulo: 'E', valor: (fila) => fila.empatados, nombre: 'empatados' },
  { titulo: 'P', valor: (fila) => fila.perdidos, nombre: 'perdidos' },
  { titulo: 'WO', valor: (fila) => fila.walkovers, nombre: 'perdidos por walkover' },
];

export function TablaPosiciones({ filas, destacados = 1 }: TablaPosicionesProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const hayJugados = filas.some((fila) => fila.jugados > 0);

  return (
    <View style={[styles.tabla, { borderTopColor: colors.rule, borderBottomColor: colors.border }]}>
      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.posicion, { color: colors.textMuted }]}>#</Text>
        <Text style={[styles.tituloNombre, { color: colors.textMuted }]}>Nombre</Text>
        {COLUMNAS.map((columna) => (
          <Text key={columna.titulo} style={[styles.titulo, { color: colors.textMuted }]}>
            {columna.titulo}
          </Text>
        ))}
        <Text style={[styles.titulo, styles.puntosTitulo, { color: colors.text }]}>PTS</Text>
      </View>

      {filas.map((fila, indice) => {
        // el puntero (o los que clasifican) llevan su posición en magenta; sin partidos no hay puntero
        const destacada = hayJugados && indice < destacados;

        return (
          <Fragment key={fila.nombre}>
            <View style={[styles.divisor, { backgroundColor: colors.hairline }]} />
            <View
              accessible
              accessibilityLabel={`${indice + 1}°, ${fila.nombre}, ${fila.puntos} puntos, ${COLUMNAS.map((c) => `${c.valor(fila)} ${c.nombre}`).join(', ')}`}
              style={styles.fila}>
              <Text style={[styles.posicion, { color: destacada ? colors.siguiente : colors.textMuted }]}>
                {indice + 1}
              </Text>
              <Text numberOfLines={1} style={[styles.nombre, { color: colors.text }]}>
                {fila.nombre}
              </Text>
              {COLUMNAS.map((columna) => {
                const valor = columna.valor(fila);
                const color =
                  columna.titulo === 'WO' && valor > 0 ? colors.walkover : colors.textMuted;

                return (
                  <Text key={columna.titulo} style={[styles.columna, { color }]}>
                    {valor}
                  </Text>
                );
              })}
              <Text
                style={[
                  styles.columna,
                  styles.puntos,
                  { color: hayJugados && indice === 0 ? colors.siguiente : colors.text },
                ]}>
                {fila.puntos}
              </Text>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
}
