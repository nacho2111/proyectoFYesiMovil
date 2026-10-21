import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { CabeceraTorneo } from '@/components/cabecera-torneo';
import { Estadisticas } from '@/components/estadisticas';
import { FilaPartido } from '@/components/fila-partido';
import { Llave } from '@/components/llave';
import { Marca } from '@/components/marca';
import { Campeon, ProximoPartido } from '@/components/panel-partido';
import { Panel } from '@/components/panel';
import { Pestanias } from '@/components/pestanias';
import { TablaPosiciones } from '@/components/tabla-posiciones';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Title } from '@/components/title';
import { ANCHO_DOS_PANELES, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTorneo, type Torneo } from '@/hooks/use-torneos';
import { styles } from '@/styles/cuadro.styles';
import { obtenerDeporte } from '@/utils/deportes';
import { vistaDoble, type Llave as LlaveDoble } from '@/utils/doble';
import { esJugable } from '@/utils/fixture';
import type { Formato } from '@/utils/formatos';
import { tablaDeGrupo } from '@/utils/grupos';
import type { Fecha } from '@/utils/liga';
import {
  nombreDelPartido,
  obtenerCampeonTorneo,
  proximoPartido,
  refATexto,
  tablaGeneral,
  tieneFixture,
  type RefPartido,
} from '@/utils/torneo';

type Vista =
  | 'cuadro'
  | 'tabla'
  | 'fechas'
  | 'grupos'
  | 'final'
  | 'ganadores'
  | 'perdedores'
  | 'definicion'
  | 'estadisticas';

const PESTANIAS: Record<Formato, { id: Vista; nombre: string }[]> = {
  eliminacion: [
    { id: 'cuadro', nombre: 'Cuadro' },
    { id: 'estadisticas', nombre: 'Estadísticas' },
  ],
  liga: [
    { id: 'tabla', nombre: 'Tabla' },
    { id: 'fechas', nombre: 'Fechas' },
    { id: 'estadisticas', nombre: 'Estadísticas' },
  ],
  grupos: [
    { id: 'grupos', nombre: 'Grupos' },
    { id: 'final', nombre: 'Cuadro final' },
    { id: 'estadisticas', nombre: 'Estadísticas' },
  ],
  doble: [
    { id: 'ganadores', nombre: 'Ganadores' },
    { id: 'perdedores', nombre: 'Perdedores' },
    { id: 'definicion', nombre: 'Final' },
    { id: 'estadisticas', nombre: 'Estadísticas' },
  ],
};

export default function CuadroScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const torneo = useTorneo(id);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [vistaElegida, setVista] = useState<Vista | null>(null);
  const colors = Colors[useColorScheme() ?? 'light'];

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

  if (!tieneFixture(torneo)) {
    return (
      <ThemedView style={styles.aviso}>
        <Title subtitle="Primero cargá los participantes y generá el fixture.">
          Todavía no hay fixture
        </Title>

        <Button
          title="Cargar participantes"
          onPress={() => router.replace({ pathname: '/participantes', params: { id } })}
        />
      </ThemedView>
    );
  }

  const pestanias = PESTANIAS[torneo.formato];
  const vista =
    vistaElegida && pestanias.some((p) => p.id === vistaElegida) ? vistaElegida : pestanias[0].id;
  const campeon = obtenerCampeonTorneo(torneo);
  const proximo = campeon ? null : proximoPartido(torneo);
  const deporte = obtenerDeporte(torneo.deporte);
  const cantidad = torneo.participantes.length;
  // en la compu, el próximo partido va en un panel al costado que no se mueve
  const dosPaneles = width >= ANCHO_DOS_PANELES;

  function abrir(ref: RefPartido) {
    router.push({ pathname: '/resultado', params: { id, ref: refATexto(ref) } });
  }
  // con el torneo terminado el cuadro queda bloqueado
  const abrirSiSePuede = campeon ? undefined : abrir;

  const lateral =
    campeon || proximo ? (
      <View style={styles.lateral}>
        {campeon ? <Campeon nombre={campeon} /> : null}
        {proximo ? (
          <ProximoPartido
            donde={nombreDelPartido(torneo, proximo.ref)}
            partido={proximo.partido}
            onCargar={() => abrir(proximo.ref)}
          />
        ) : null}
      </View>
    ) : null;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push({ pathname: '/editar-torneo', params: { id } })}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Editar torneo"
              style={styles.editar}>
              <Text style={[styles.editarTexto, { color: colors.text }]}>Editar</Text>
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}>
        <CabeceraTorneo
          torneo={torneo}
          style={dosPaneles && styles.anchoDosPaneles}
          detalle={`${cantidad} ${cantidad === 1 ? deporte.participante : deporte.participantes}`}>
          <Pestanias opciones={pestanias} valor={vista} onCambiar={setVista} />
        </CabeceraTorneo>

        <View style={[styles.cuerpo, dosPaneles && styles.cuerpoDosPaneles]}>
          {!dosPaneles && vista !== 'estadisticas' && lateral ? (
            <View style={styles.contenido}>{lateral}</View>
          ) : null}

          <View style={dosPaneles ? styles.principal : undefined}>
            <Contenido torneo={torneo} vista={vista} abrir={abrirSiSePuede} />
          </View>

          {dosPaneles && lateral ? <View style={styles.costado}>{lateral}</View> : null}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function Contenido({
  torneo,
  vista,
  abrir,
}: {
  torneo: Torneo;
  vista: Vista;
  abrir?: (ref: RefPartido) => void;
}) {
  const colors = Colors[useColorScheme() ?? 'light'];

  switch (vista) {
    case 'cuadro':
      return (
        <SeccionCuadro>
          <Llave
            rondas={torneo.rondas}
            onAbrir={abrir && ((ronda, partido) => abrir({ fase: 'eliminacion', ronda, partido }))}
          />
        </SeccionCuadro>
      );

    case 'tabla':
      return (
        <View style={styles.contenido}>
          <TablaPosiciones filas={tablaGeneral(torneo)} />
          <Leyenda />
        </View>
      );

    case 'fechas':
      return (
        <View style={styles.contenido}>
          {torneo.fechas.map((fecha, f) => (
            <ListaFecha
              key={fecha.nombre}
              titulo={fecha.nombre}
              fecha={fecha}
              onAbrir={abrir && ((p) => abrir({ fase: 'liga', fecha: f, partido: p }))}
            />
          ))}
        </View>
      );

    case 'grupos':
      return (
        <View style={styles.contenido}>
          <ThemedText type="small" style={{ color: colors.textMuted }}>
            {torneo.clasifican === 1
              ? 'Pasa el primero de cada grupo al cuadro final. Su posición va en verde.'
              : `Pasan los ${torneo.clasifican} primeros de cada grupo al cuadro final. Sus posiciones van en verde.`}
          </ThemedText>

          {torneo.grupos.map((grupo, g) => (
            <View key={grupo.nombre} style={styles.grupo}>
              <ThemedText type="subtitle">{grupo.nombre}</ThemedText>
              <TablaPosiciones
                filas={tablaDeGrupo(grupo, torneo.puntos)}
                destacados={torneo.clasifican}
              />
              {grupo.fechas.map((fecha, f) => (
                <ListaFecha
                  key={fecha.nombre}
                  titulo={fecha.nombre}
                  fecha={fecha}
                  onAbrir={
                    abrir && ((p) => abrir({ fase: 'grupo', grupo: g, fecha: f, partido: p }))
                  }
                />
              ))}
            </View>
          ))}
          <Leyenda />
        </View>
      );

    case 'final':
      return torneo.rondas.length === 0 ? (
        <View style={styles.contenido}>
          <View style={styles.vacio}>
            <ThemedText type="defaultSemiBold">El cuadro final todavía no está</ThemedText>
            <ThemedText type="small" style={{ color: colors.textMuted }}>
              Se arma solo cuando se terminen de jugar todos los partidos de los grupos.
            </ThemedText>
          </View>
        </View>
      ) : (
        <SeccionCuadro>
          <Llave
            rondas={torneo.rondas}
            onAbrir={abrir && ((ronda, partido) => abrir({ fase: 'eliminacion', ronda, partido }))}
          />
        </SeccionCuadro>
      );

    case 'ganadores':
    case 'perdedores':
    case 'definicion':
      return (
        <CuadroDoble torneo={torneo} llave={vista === 'definicion' ? 'final' : vista} onAbrir={abrir} />
      );

    case 'estadisticas':
      return (
        <View style={styles.contenido}>
          <Estadisticas torneo={torneo} />
        </View>
      );
  }
}

function SeccionCuadro({ children }: { children: ReactNode }) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View style={styles.seccionCuadro}>
      <ThemedText type="small" style={[styles.ayudaCuadro, { color: colors.textMuted }]}>
        Tocá un partido para cargar el resultado. Los que faltan jugar tienen el borde magenta.
        Deslizá para el costado para ver las rondas que siguen.
      </ThemedText>
      {children}
    </View>
  );
}

function CuadroDoble({
  torneo,
  llave,
  onAbrir,
}: {
  torneo: Torneo;
  llave: LlaveDoble;
  onAbrir?: (ref: RefPartido) => void;
}) {
  const rondas = vistaDoble(torneo.doble)[llave];

  return (
    <SeccionCuadro>
      <Llave
        rondas={rondas}
        onAbrir={onAbrir && ((r, p) => onAbrir({ fase: 'doble', id: rondas[r].ids[p] }))}
      />
    </SeccionCuadro>
  );
}

function ListaFecha({
  titulo,
  fecha,
  onAbrir,
}: {
  titulo: string;
  fecha: Fecha;
  onAbrir?: (indicePartido: number) => void;
}) {
  const colors = Colors[useColorScheme() ?? 'light'];

  return (
    <View style={styles.fecha}>
      <View style={styles.fechaTitulo}>
        <ThemedText type="defaultSemiBold">{titulo}</ThemedText>
        {fecha.libre ? (
          <ThemedText type="small" style={{ color: colors.textMuted }}>
            Libre: {fecha.libre}
          </ThemedText>
        ) : null}
      </View>

      <Panel>
        {fecha.partidos.map((partido, p) => (
          <FilaPartido
            key={p}
            partido={partido}
            onPress={onAbrir && esJugable(partido) ? () => onAbrir(p) : undefined}
          />
        ))}
      </Panel>
    </View>
  );
}

function Leyenda() {
  const colors = Colors[useColorScheme() ?? 'light'];
  const marcas = [
    { tipo: 'G', texto: 'ganados' },
    { tipo: 'E', texto: 'empatados' },
    { tipo: 'P', texto: 'perdidos' },
    { tipo: 'WO', texto: 'perdidos por walkover' },
  ] as const;

  return (
    <View style={styles.leyenda}>
      {marcas.map((marca) => (
        <View key={marca.tipo} style={styles.leyendaItem}>
          <Marca tipo={marca.tipo} />
          <ThemedText type="small" style={{ color: colors.textMuted }}>
            {marca.texto}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
