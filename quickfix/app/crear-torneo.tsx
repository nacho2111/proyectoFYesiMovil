import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { EditorPuntos, SelectorDeporte, SelectorFormato } from '@/components/selectores';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useTorneos, type Torneo } from '@/hooks/use-torneos';
import { styles } from '@/styles/crear-torneo.styles';
import { DEPORTES, obtenerDeporte, type DeporteId, type Puntos } from '@/utils/deportes';
import { TAMANIOS_CUADRO } from '@/utils/fixture';
import type { Formato } from '@/utils/formatos';
import { validarDeporteOtro, validarNombreTorneo } from '@/utils/validaciones';

export default function CrearTorneoScreen() {
  const router = useRouter();
  // desde el inicio se puede llegar con el deporte ya elegido (tocando su foto)
  const { deporte: deporteInicial } = useLocalSearchParams<{ deporte?: string }>();
  const inicial: DeporteId =
    DEPORTES.find((d) => d.id === deporteInicial)?.id ?? 'futbol';
  const { setTorneos } = useTorneos();
  const insets = useSafeAreaInsets();
  const [nombre, setNombre] = useState('');
  const [deporte, setDeporte] = useState<DeporteId>(inicial);
  const [deporteOtro, setDeporteOtro] = useState('');
  const [formato, setFormato] = useState<Formato>('eliminacion');
  const [puntos, setPuntos] = useState<Puntos>(obtenerDeporte(inicial).puntos);
  const [error, setError] = useState<string | null>(null);
  const [errorOtro, setErrorOtro] = useState<string | null>(null);

  function cambiarNombre(texto: string) {
    setNombre(texto);
    setError(null);
  }

  // cada deporte trae su puntaje; si después lo tocan, se respeta lo que pusieron
  function cambiarDeporte(id: DeporteId) {
    setDeporte(id);
    setPuntos(obtenerDeporte(id).puntos);
    setErrorOtro(null);
  }

  function crear() {
    const problema = validarNombreTorneo(nombre);
    const problemaOtro = deporte === 'otro' ? validarDeporteOtro(deporteOtro) : null;

    setError(problema);
    setErrorOtro(problemaOtro);

    if (problema || problemaOtro) {
      return;
    }

    const torneo: Torneo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      deporte,
      deporteOtro: deporte === 'otro' ? deporteOtro.trim() : '',
      formato,
      puntos,
      participantes: [],
      // arranca en el más chico y se agranda a medida que se cargan participantes
      lugares: TAMANIOS_CUADRO[0],
      rondas: [],
      fechas: [],
      grupos: [],
      cantidadGrupos: 2,
      clasifican: 2,
      clasificados: [],
      doble: [],
    };

    setTorneos((torneos) => [torneo, ...torneos]);
    router.replace({ pathname: '/participantes', params: { id: torneo.id } });
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <Title subtitle="Elegí el deporte y el formato. Después cargás a los participantes.">
            Crear torneo
          </Title>

          <Input
            label="Nombre del torneo"
            placeholder="Ej: Torneo de verano"
            value={nombre}
            onChangeText={cambiarNombre}
            returnKeyType="done"
            error={error ?? undefined}
            autoFocus
          />

          <SelectorDeporte valor={deporte} onCambiar={cambiarDeporte} />

          {deporte === 'otro' ? (
            <Input
              label="¿De qué es el torneo?"
              placeholder="Ej: Ping pong, FIFA, ajedrez"
              value={deporteOtro}
              onChangeText={(texto) => {
                setDeporteOtro(texto);
                setErrorOtro(null);
              }}
              error={errorOtro ?? undefined}
            />
          ) : null}

          <SelectorFormato valor={formato} onCambiar={setFormato} />

          <EditorPuntos valor={puntos} onCambiar={setPuntos} />
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
          <Button title="Crear y cargar participantes" onPress={crear} />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
