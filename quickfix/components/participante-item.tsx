import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, FontSizes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ParticipanteItemProps = {
  numero: number;
  nombre: string;
  onEditar: (nombre: string) => void;
  onBorrar: () => void;
  // sin callback el botón queda deshabilitado (el primero no sube, el último no baja)
  onSubir?: () => void;
  onBajar?: () => void;
};

export function ParticipanteItem({
  numero,
  nombre,
  onEditar,
  onBorrar,
  onSubir,
  onBajar,
}: ParticipanteItemProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(nombre);

  function editar() {
    setTexto(nombre);
    setEditando(true);
  }

  function guardar() {
    if (texto.trim()) {
      onEditar(texto.trim());
    }

    setEditando(false);
  }

  return (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.mover}>
        <Pressable
          onPress={onSubir}
          disabled={!onSubir || editando}
          hitSlop={{ left: 8, right: 8, top: 4 }}
          style={(!onSubir || editando) && styles.deshabilitado}
          accessibilityLabel="Subir participante">
          <Ionicons name="chevron-up" size={20} color={colors.textMuted} />
        </Pressable>

        <Pressable
          onPress={onBajar}
          disabled={!onBajar || editando}
          hitSlop={{ left: 8, right: 8, bottom: 4 }}
          style={(!onBajar || editando) && styles.deshabilitado}
          accessibilityLabel="Bajar participante">
          <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
        </Pressable>
      </View>

      <ThemedText style={[styles.numero, { color: colors.textMuted }]}>{numero}</ThemedText>

      {editando ? (
        <TextInput
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={guardar}
          autoFocus
          style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
        />
      ) : (
        <ThemedText style={styles.nombre} numberOfLines={1}>
          {nombre}
        </ThemedText>
      )}

      <Pressable
        onPress={editando ? guardar : editar}
        hitSlop={8}
        style={styles.accion}
        accessibilityLabel={editando ? 'Guardar nombre' : 'Editar nombre'}>
        <Ionicons
          name={editando ? 'checkmark' : 'pencil'}
          size={20}
          color={editando ? colors.primary : colors.textMuted}
        />
      </Pressable>

      <Pressable
        onPress={onBorrar}
        hitSlop={8}
        style={styles.accion}
        accessibilityLabel="Borrar participante">
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 56,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  mover: {
    justifyContent: 'center',
  },
  deshabilitado: {
    opacity: 0.3,
  },
  numero: {
    minWidth: 24,
    textAlign: 'center',
  },
  nombre: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: FontSizes.body,
  },
  accion: {
    padding: 6,
  },
});
