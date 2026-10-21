import { Fragment } from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/components/selectores.styles';
import { Colors, Fuentes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DEPORTES, type DeporteId, type Puntos } from '@/utils/deportes';
import { FORMATOS, type Formato } from '@/utils/formatos';

function useColores() {
  return Colors[useColorScheme() ?? 'light'];
}

export function SelectorDeporte({
  valor,
  onCambiar,
}: {
  valor: DeporteId;
  onCambiar: (deporte: DeporteId) => void;
}) {
  const colors = useColores();

  return (
    <View style={styles.campo}>
      <Text style={[styles.etiqueta, { color: colors.text }]}>Deporte</Text>

      <View style={styles.deportes} accessibilityRole="radiogroup">
        {DEPORTES.map((deporte) => {
          const elegido = deporte.id === valor;

          return (
            <Pressable
              key={deporte.id}
              onPress={() => onCambiar(deporte.id)}
              accessibilityRole="radio"
              accessibilityLabel={deporte.nombre}
              accessibilityState={{ checked: elegido }}
              style={({ pressed }) => [
                styles.deporte,
                // el elegido va lleno de tinta, los demás con contorno
                elegido
                  ? { backgroundColor: colors.text, borderColor: colors.text }
                  : { backgroundColor: 'transparent', borderColor: colors.border },
                pressed && styles.pressed,
              ]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.deporteTexto,
                  {
                    color: elegido ? colors.background : colors.text,
                    fontFamily: elegido ? Fuentes.textoNegrita : Fuentes.textoMedio,
                  },
                ]}>
                {deporte.nombre}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function SelectorFormato({
  valor,
  onCambiar,
}: {
  valor: Formato;
  onCambiar: (formato: Formato) => void;
}) {
  const colors = useColores();

  return (
    <View style={styles.campo}>
      <Text style={[styles.etiqueta, { color: colors.text }]}>Formato</Text>

      <View
        style={[styles.panel, { borderTopColor: colors.rule, borderBottomColor: colors.border }]}
        accessibilityRole="radiogroup">
        {FORMATOS.map((formato, i) => {
          const elegido = formato.id === valor;

          return (
            <Fragment key={formato.id}>
              {i > 0 ? <View style={[styles.divisor, { backgroundColor: colors.border }]} /> : null}
              <Pressable
                onPress={() => onCambiar(formato.id)}
                accessibilityRole="radio"
                accessibilityLabel={`${formato.nombre}. ${formato.descripcion}`}
                accessibilityState={{ checked: elegido }}
                style={({ pressed }) => [
                  styles.formato,
                  pressed && styles.pressed,
                ]}>
                <View
                  style={[styles.radio, { borderColor: elegido ? colors.text : colors.textMuted }]}>
                  {elegido ? (
                    <View style={[styles.radioPunto, { backgroundColor: colors.text }]} />
                  ) : null}
                </View>
                <View style={styles.formatoTextos}>
                  <Text
                    style={[
                      styles.formatoNombre,
                      {
                        color: colors.text,
                        fontFamily: elegido ? Fuentes.textoNegrita : Fuentes.textoMedio,
                      },
                    ]}>
                    {formato.nombre}
                  </Text>
                  <Text style={[styles.formatoDescripcion, { color: colors.textMuted }]}>
                    {formato.descripcion}
                  </Text>
                </View>
              </Pressable>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

const MAXIMO_PUNTOS = 10;

export function EditorPuntos({
  valor,
  onCambiar,
}: {
  valor: Puntos;
  onCambiar: (puntos: Puntos) => void;
}) {
  const colors = useColores();
  const campos: { clave: keyof Puntos; nombre: string }[] = [
    { clave: 'ganado', nombre: 'Ganado' },
    { clave: 'empatado', nombre: 'Empate' },
    { clave: 'perdido', nombre: 'Perdido' },
  ];

  function cambiar(clave: keyof Puntos, diferencia: number) {
    const nuevo = Math.min(MAXIMO_PUNTOS, Math.max(0, valor[clave] + diferencia));
    onCambiar({ ...valor, [clave]: nuevo });
  }

  return (
    <View style={styles.campo}>
      <Text style={[styles.etiqueta, { color: colors.text }]}>Puntos por partido</Text>

      <View
        style={[
          styles.panel,
          styles.puntos,
          { borderTopColor: colors.rule, borderBottomColor: colors.border },
        ]}>
        {campos.map(({ clave, nombre }, i) => (
          <Fragment key={clave}>
            {i > 0 ? <View style={[styles.separador, { backgroundColor: colors.border }]} /> : null}
            <View style={styles.punto}>
              <Text style={[styles.puntoNombre, { color: colors.textMuted }]}>{nombre}</Text>
              <View style={styles.stepper}>
                <BotonPaso
                  texto="−"
                  etiqueta={`Restar un punto a ${nombre.toLowerCase()}`}
                  onPress={() => cambiar(clave, -1)}
                  disabled={valor[clave] <= 0}
                />
                <Text style={[styles.puntoValor, { color: colors.text }]}>{valor[clave]}</Text>
                <BotonPaso
                  texto="+"
                  etiqueta={`Sumar un punto a ${nombre.toLowerCase()}`}
                  onPress={() => cambiar(clave, 1)}
                  disabled={valor[clave] >= MAXIMO_PUNTOS}
                />
              </View>
            </View>
          </Fragment>
        ))}
      </View>

      <Text style={[styles.ayuda, { color: colors.textMuted }]}>
        Se usan para la tabla y las estadísticas. El que pierde por walkover no suma.
      </Text>
    </View>
  );
}

function BotonPaso({
  texto,
  etiqueta,
  onPress,
  disabled,
}: {
  texto: string;
  etiqueta: string;
  onPress: () => void;
  disabled: boolean;
}) {
  const colors = useColores();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={etiqueta}
      style={({ pressed }) => [
        styles.stepperBoton,
        { backgroundColor: colors.surfaceAlt },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={[styles.stepperTexto, { color: colors.text }]}>{texto}</Text>
    </Pressable>
  );
}

// una fila de opciones numéricas (tamaño del cuadro, cantidad de grupos, cuántos pasan...)
export function OpcionesNumero({
  titulo,
  opciones,
  valor,
  onCambiar,
  deshabilitada,
  etiqueta,
}: {
  titulo: string;
  opciones: number[];
  valor: number;
  onCambiar: (valor: number) => void;
  deshabilitada?: (valor: number) => boolean;
  etiqueta: (valor: number) => string;
}) {
  const colors = useColores();

  return (
    <View style={styles.campo}>
      <Text style={[styles.etiqueta, { color: colors.text }]}>{titulo}</Text>

      <View
        style={[
          styles.panel,
          styles.opciones,
          { borderTopColor: colors.rule, borderBottomColor: colors.border },
        ]}>
        {opciones.map((opcion, i) => {
          const elegida = opcion === valor;
          const bloqueada = deshabilitada?.(opcion) ?? false;

          return (
            <Fragment key={opcion}>
              {i > 0 ? <View style={[styles.separador, { backgroundColor: colors.border }]} /> : null}
              <Pressable
                onPress={() => onCambiar(opcion)}
                disabled={bloqueada}
                accessibilityRole="button"
                accessibilityLabel={etiqueta(opcion)}
                accessibilityState={{ selected: elegida, disabled: bloqueada }}
                style={({ pressed }) => [
                  styles.opcion,
                  elegida && { borderBottomWidth: 2, borderBottomColor: colors.text },
                  pressed && styles.pressed,
                  bloqueada && styles.disabled,
                ]}>
                <Text
                  style={[
                    styles.opcionTexto,
                    {
                      color: elegida ? colors.text : colors.text,
                      fontFamily: elegida ? Fuentes.cifrasNegrita : Fuentes.cifras,
                    },
                  ]}>
                  {opcion}
                </Text>
              </Pressable>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
