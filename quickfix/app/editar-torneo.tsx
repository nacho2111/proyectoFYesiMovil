import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Panel } from '@/components/panel';
import { ParticipanteItem } from '@/components/participante-item';
import { EditorPuntos, SelectorDeporte, SelectorFormato } from '@/components/selectores';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTorneo, useTorneos, type Torneo } from '@/hooks/use-torneos';
import { styles } from '@/styles/editar-torneo.styles';
import { obtenerDeporte, type DeporteId, type Puntos } from '@/utils/deportes';
import { nombreFormato, type Formato } from '@/utils/formatos';
import { actualizarFaseFinal } from '@/utils/grupos';
import { renombrarParticipante, sinFixture, tieneFixture } from '@/utils/torneo';
import { validarDeporteOtro, validarNombreTorneo, validarRenombre } from '@/utils/validaciones';

export default function EditarTorneoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const torneo = useTorneo(id);

  if (!torneo) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle="Puede que ya no exista.">No encontramos el torneo</Title>
        <Link href="/" dismissTo asChild>
          <Button title="Volver al inicio" variant="secondary" />
        </Link>
      </ThemedView>
    );
  }

  return <Formulario torneo={torneo} />;
}

function Formulario({ torneo }: { torneo: Torneo }) {
  const router = useRouter();
  const { actualizarTorneo, borrarTorneo } = useTorneos();
  const insets = useSafeAreaInsets();
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');
  const [nombre, setNombre] = useState(torneo.nombre);
  const [deporte, setDeporte] = useState<DeporteId>(torneo.deporte);
  const [deporteOtro, setDeporteOtro] = useState(torneo.deporteOtro);
  const [formato, setFormato] = useState<Formato>(torneo.formato);
  const [puntos, setPuntos] = useState<Puntos>(torneo.puntos);
  const [error, setError] = useState<string | null>(null);
  const [errorOtro, setErrorOtro] = useState<string | null>(null);
  const armado = tieneFixture(torneo);

  function cambiarDeporte(id: DeporteId) {
    setDeporte(id);
    setPuntos(obtenerDeporte(id).puntos);
    setErrorOtro(null);
  }

  function guardar() {
    const problema = validarNombreTorneo(nombre);
    const problemaOtro = deporte === 'otro' ? validarDeporteOtro(deporteOtro) : null;

    setError(problema);
    setErrorOtro(problemaOtro);

    if (problema || problemaOtro) {
      return;
    }

    const cambios: Partial<Torneo> = {
      nombre: nombre.trim(),
      deporte,
      deporteOtro: deporte === 'otro' ? deporteOtro.trim() : '',
      puntos,
      // el formato solo se puede cambiar mientras no haya fixture
      formato: armado ? torneo.formato : formato,
    };

    // con otros puntos puede cambiar quién clasifica en los grupos
    if (torneo.formato === 'grupos' && armado) {
      Object.assign(
        cambios,
        actualizarFaseFinal(torneo.grupos, torneo.clasifican, puntos, {
          clasificados: torneo.clasificados,
          rondas: torneo.rondas,
        })
      );
    }

    actualizarTorneo(torneo.id, cambios);
    router.back();
  }

  function renombrar(indice: number, nuevo: string) {
    actualizarTorneo(
      torneo.id,
      renombrarParticipante(torneo, torneo.participantes[indice], nuevo)
    );
  }

  function rearmar() {
    actualizarTorneo(torneo.id, sinFixture());
    router.dismissTo('/');
    router.push({ pathname: '/participantes', params: { id: torneo.id } });
  }

  function borrar() {
    borrarTorneo(torneo.id);
    router.dismissTo('/');
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <Title subtitle="Cambiá lo que necesites. Los resultados cargados no se pierden.">
            Editar torneo
          </Title>

          <Input
            label="Nombre del torneo"
            value={nombre}
            onChangeText={(texto) => {
              setNombre(texto);
              setError(null);
            }}
            error={error ?? undefined}
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

          {armado ? (
            <View style={styles.seccion}>
              <ThemedText style={styles.etiqueta}>Formato</ThemedText>
              <ThemedText>{nombreFormato(torneo.formato)}</ThemedText>
              <ThemedText type="small" style={{ color: mutedColor }}>
                Para cambiar el formato hay que rearmar el fixture (abajo de todo).
              </ThemedText>
            </View>
          ) : (
            <SelectorFormato valor={formato} onCambiar={setFormato} />
          )}

          <EditorPuntos valor={puntos} onCambiar={setPuntos} />

          <Button title="Guardar cambios" onPress={guardar} />

          <View style={styles.seccion}>
            <ThemedText type="subtitle">Participantes</ThemedText>

            {armado ? (
              <>
                <ThemedText type="small" style={{ color: mutedColor }}>
                  Tocá el lápiz para corregir un nombre: se cambia en todo el torneo, también en
                  los resultados ya cargados.
                </ThemedText>
                <Panel>
                  {torneo.participantes.map((participante, indice) => (
                    <ParticipanteItem
                      key={`${indice}-${participante}`}
                      numero={indice + 1}
                      nombre={participante}
                      ordenable={false}
                      onEditar={(nuevo) => renombrar(indice, nuevo)}
                      validar={(nuevo) => validarRenombre(nuevo, indice, torneo.participantes)}
                    />
                  ))}
                </Panel>
              </>
            ) : (
              <Button
                title="Cargar participantes"
                variant="secondary"
                onPress={() =>
                  router.replace({ pathname: '/participantes', params: { id: torneo.id } })
                }
              />
            )}
          </View>

          {/* lo que no se puede deshacer va aparte, lejos de lo demás */}
          <View style={[styles.seccion, styles.peligro, { borderTopColor: borderColor }]}>
            <ThemedText type="subtitle">Empezar de nuevo</ThemedText>

            {armado ? (
              <>
                <ThemedText type="small" style={{ color: mutedColor }}>
                  Rearmar el fixture borra todos los resultados y te deja agregar, sacar o
                  reordenar participantes y cambiar el formato.
                </ThemedText>
                <BotonConfirmar
                  titulo="Rearmar fixture"
                  confirmacion="Tocá de nuevo para borrar los resultados"
                  onConfirmar={rearmar}
                />
              </>
            ) : null}

            <BotonConfirmar
              titulo="Borrar torneo"
              confirmacion="Tocá de nuevo para borrarlo para siempre"
              onConfirmar={borrar}
            />
          </View>

          <View style={{ height: insets.bottom }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

// Las acciones que no se pueden deshacer piden un segundo toque. Funciona igual en el
// celular y en la compu (en la web no hay alertas nativas).
function BotonConfirmar({
  titulo,
  confirmacion,
  onConfirmar,
}: {
  titulo: string;
  confirmacion: string;
  onConfirmar: () => void;
}) {
  const [pidiendo, setPidiendo] = useState(false);

  useEffect(() => {
    if (!pidiendo) {
      return;
    }

    const espera = setTimeout(() => setPidiendo(false), 4000);
    return () => clearTimeout(espera);
  }, [pidiendo]);

  return (
    <Button
      title={pidiendo ? confirmacion : titulo}
      variant="danger"
      onPress={() => (pidiendo ? onConfirmar() : setPidiendo(true))}
    />
  );
}
