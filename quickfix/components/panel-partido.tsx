import { Text, View } from 'react-native';

import { Button } from '@/components/button';
import { styles } from '@/components/panel-partido.styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Partido } from '@/utils/fixture';

type ProximoPartidoProps = {
  donde: string;
  partido: Partido;
  onCargar: () => void;
};

// El partido que sigue manda en la pantalla: los nombres en píxeles grandes y el botón
// magenta, que es lo único magenta además del puntero y la etapa en juego.
export function ProximoPartido({ donde, partido, onCargar }: ProximoPartidoProps) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View style={[styles.panel, { borderColor: colors.rule }]}>
      <View style={styles.encabezado}>
        <Text style={[styles.rotulo, { color: colors.siguiente }]}>Próximo partido</Text>
        <Text numberOfLines={1} style={[styles.dato, { color: colors.textMuted }]}>
          {donde}
        </Text>
      </View>

      <Text numberOfLines={2} style={[styles.nombre, { color: colors.text }]}>
        {partido.jugador1}
      </Text>
      <Text style={[styles.vs, { color: colors.textMuted }]}>vs</Text>
      <Text numberOfLines={2} style={[styles.nombre, { color: colors.text }]}>
        {partido.jugador2}
      </Text>

      <Button title="Cargar resultado" variant="acento" onPress={onCargar} style={styles.boton} />
    </View>
  );
}

export function Campeon({ nombre }: { nombre: string }) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View
      accessible
      accessibilityLabel={`Campeón: ${nombre}. Torneo terminado.`}
      style={[styles.panel, { borderColor: colors.rule, backgroundColor: colors.text }]}>
      <View style={styles.encabezado}>
        <Text style={[styles.rotulo, { color: colors.onPrimary }]}>Campeón</Text>
        <Text style={[styles.dato, { color: colors.onPrimary }]}>torneo terminado</Text>
      </View>
      <Text numberOfLines={2} style={[styles.campeon, { color: colors.onPrimary }]}>
        {nombre}
      </Text>
    </View>
  );
}
