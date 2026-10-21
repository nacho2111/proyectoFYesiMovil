import { Children, Fragment, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FILETE } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Un filete grueso de tinta arriba, filetes finos entre filas y uno fino abajo.
export function Panel({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const filas = Children.toArray(children);

  return (
    <View
      style={[
        styles.panel,
        { borderTopColor: colors.rule, borderBottomColor: colors.border },
        style,
      ]}>
      {filas.map((fila, i) => (
        <Fragment key={i}>
          {i > 0 ? <View style={[styles.divisor, { backgroundColor: colors.hairline }]} /> : null}
          {fila}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderTopWidth: FILETE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
  },
});
