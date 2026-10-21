import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { styles } from '@/components/participante-item.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ParticipanteItemProps = {
  numero: number;
  nombre: string;
  onEditar: (nombre: string) => void;
  // devuelve el problema con el nombre nuevo, o null si se puede guardar
  validar?: (nombre: string) => string | null;
  // sin callback no se puede borrar (por ejemplo, con el fixture ya armado)
  onBorrar?: () => void;
  // sin callback el botón queda deshabilitado (el primero no sube, el último no baja)
  onSubir?: () => void;
  onBajar?: () => void;
  // con el fixture armado el orden ya no se puede cambiar
  ordenable?: boolean;
};

// Una fila de la lista de participantes. Va adentro de un panel que pone los filetes.
export function ParticipanteItem({
  numero,
  nombre,
  onEditar,
  validar,
  onBorrar,
  onSubir,
  onBajar,
  ordenable = true,
}: ParticipanteItemProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(nombre);
  const [error, setError] = useState<string | null>(null);

  function editar() {
    setTexto(nombre);
    setError(null);
    setEditando(true);
  }

  function guardar() {
    const limpio = texto.trim();

    if (limpio === nombre || !limpio) {
      setEditando(false);
      setError(null);
      return;
    }

    const problema = validar?.(limpio) ?? null;

    if (problema) {
      setError(problema);
      return;
    }

    onEditar(limpio);
    setEditando(false);
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.item}>
        {ordenable ? (
          <View style={styles.mover}>
            <Pressable
              onPress={onSubir}
              disabled={!onSubir || editando}
              hitSlop={{ left: 8, right: 8, top: 6, bottom: 2 }}
              style={(!onSubir || editando) && styles.deshabilitado}
              accessibilityRole="button"
              accessibilityLabel={`Subir a ${nombre}`}>
              <Text style={[styles.accionChica, { color: colors.textMuted }]}>Subir</Text>
            </Pressable>
            <Pressable
              onPress={onBajar}
              disabled={!onBajar || editando}
              hitSlop={{ left: 8, right: 8, top: 2, bottom: 6 }}
              style={(!onBajar || editando) && styles.deshabilitado}
              accessibilityRole="button"
              accessibilityLabel={`Bajar a ${nombre}`}>
              <Text style={[styles.accionChica, { color: colors.textMuted }]}>Bajar</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={[styles.numero, { color: colors.textMuted }]}>{numero}</Text>

        {editando ? (
          <TextInput
            value={texto}
            onChangeText={(valor) => {
              setTexto(valor);
              setError(null);
            }}
            onSubmitEditing={guardar}
            autoFocus
            selectionColor={colors.primary}
            style={[
              styles.input,
              { color: colors.text, borderColor: error ? colors.danger : colors.primary },
            ]}
          />
        ) : (
          <Text numberOfLines={1} style={[styles.nombre, { color: colors.text }]}>
            {nombre}
          </Text>
        )}

        <Pressable
          onPress={editando ? guardar : editar}
          hitSlop={8}
          style={styles.accion}
          accessibilityRole="button"
          accessibilityLabel={editando ? 'Guardar nombre' : `Cambiar el nombre de ${nombre}`}>
          <Text style={[styles.accionTexto, { color: editando ? colors.siguiente : colors.textMuted }]}>
            {editando ? 'Guardar' : 'Editar'}
          </Text>
        </Pressable>

        {onBorrar && !editando ? (
          <Pressable
            onPress={onBorrar}
            hitSlop={8}
            style={styles.accion}
            accessibilityRole="button"
            accessibilityLabel={`Borrar a ${nombre}`}>
            <Text style={[styles.accionTexto, { color: colors.danger }]}>Borrar</Text>
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}
