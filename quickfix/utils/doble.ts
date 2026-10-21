import { ubicarParticipantes, type Carga, type Desenlace, type Partido, type Ronda } from '@/utils/fixture';

// De dónde sale cada lugar de un partido: un participante (o un lugar vacío del cuadro),
// el ganador de otro partido o el perdedor de otro partido.
type Fuente =
  | { tipo: 'participante'; nombre: string | null }
  | { tipo: 'ganador' | 'perdedor'; partido: string };

export type Llave = 'ganadores' | 'perdedores' | 'final';

type ResultadoGuardado = {
  jugador1: string;
  jugador2: string;
  ganador: string;
  resultado: string;
  desenlace: Desenlace;
};

export type PartidoDoble = {
  id: string;
  llave: Llave;
  ronda: string;
  fuente1: Fuente;
  fuente2: Fuente;
  resultado: ResultadoGuardado | null;
};

// lo que todavía no se sabe (pendiente) o un lugar que nunca va a tener a nadie (vacio)
const VACIO = Symbol('vacio');
type Lugar = string | typeof VACIO | undefined;

const ID_FINAL = 'F1';
const ID_DESEMPATE = 'F2';

// Cuadro de ganadores igual al de eliminación directa. Cada perdedor cae al cuadro de
// perdedores; quien pierde ahí queda afuera. El campeón de cada cuadro juega la final, y si
// gana el que venía de perdedores (o sea, el otro perdió por primera vez) hay desempate.
export function generarDoble(participantes: string[], lugares: number): PartidoDoble[] {
  if (participantes.length < 3) {
    throw new Error('Para doble eliminación tiene que haber al menos 3 participantes');
  }

  const partidos: PartidoDoble[] = [];
  const cantidadRondas = Math.log2(lugares);
  const ubicados = ubicarParticipantes(participantes, lugares);

  // cuadro de ganadores
  let anterior: string[] = [];

  for (let r = 1; r <= cantidadRondas; r++) {
    const actual: string[] = [];
    const cantidad = lugares / 2 ** r;

    for (let i = 0; i < cantidad; i++) {
      const id = `G${r}-${i}`;
      const [fuente1, fuente2]: [Fuente, Fuente] =
        r === 1
          ? [
              { tipo: 'participante', nombre: ubicados[i * 2].jugador },
              { tipo: 'participante', nombre: ubicados[i * 2 + 1].jugador },
            ]
          : [
              { tipo: 'ganador', partido: anterior[i * 2] },
              { tipo: 'ganador', partido: anterior[i * 2 + 1] },
            ];

      partidos.push({
        id,
        llave: 'ganadores',
        ronda: r === cantidadRondas ? 'Final de ganadores' : `Ronda ${r}`,
        fuente1,
        fuente2,
        resultado: null,
      });
      actual.push(id);
    }

    anterior = actual;
  }

  const finalGanadores = anterior[0];

  // cuadro de perdedores
  let numeroRonda = 1;
  const agregarRonda = (fuentes: [Fuente, Fuente][]): string[] => {
    const ids = fuentes.map(([fuente1, fuente2], i) => {
      const id = `P${numeroRonda}-${i}`;
      partidos.push({
        id,
        llave: 'perdedores',
        ronda: `Ronda ${numeroRonda}`,
        fuente1,
        fuente2,
        resultado: null,
      });
      return id;
    });
    numeroRonda++;
    return ids;
  };

  const perdedoresDe = (r: number) =>
    partidos.filter((p) => p.llave === 'ganadores' && p.id.startsWith(`G${r}-`)).map((p) => p.id);

  // primera ronda: los que perdieron en la primera de ganadores, de a dos
  const primeros = perdedoresDe(1);
  let vivos = agregarRonda(
    Array.from({ length: primeros.length / 2 }, (_, i) => [
      { tipo: 'perdedor', partido: primeros[i * 2] },
      { tipo: 'perdedor', partido: primeros[i * 2 + 1] },
    ])
  );

  for (let r = 2; r <= cantidadRondas; r++) {
    const caen = perdedoresDe(r);
    // en rondas pares se invierte el orden para que no se repita el cruce de recién
    const orden = r % 2 === 0 ? [...caen].reverse() : caen;

    vivos = agregarRonda(
      vivos.map((id, i) => [
        { tipo: 'ganador', partido: id },
        { tipo: 'perdedor', partido: orden[i] },
      ])
    );

    if (vivos.length > 1) {
      vivos = agregarRonda(
        Array.from({ length: vivos.length / 2 }, (_, i) => [
          { tipo: 'ganador', partido: vivos[i * 2] },
          { tipo: 'ganador', partido: vivos[i * 2 + 1] },
        ])
      );
    }
  }

  // la ronda final de perdedores se llama distinto
  const ultimaPerdedores = partidos.filter((p) => p.llave === 'perdedores').at(-1)!;
  ultimaPerdedores.ronda = 'Final de perdedores';

  partidos.push(
    {
      id: ID_FINAL,
      llave: 'final',
      ronda: 'Gran final',
      fuente1: { tipo: 'ganador', partido: finalGanadores },
      fuente2: { tipo: 'ganador', partido: ultimaPerdedores.id },
      resultado: null,
    },
    {
      id: ID_DESEMPATE,
      llave: 'final',
      ronda: 'Final de desempate',
      fuente1: { tipo: 'ganador', partido: ID_FINAL },
      fuente2: { tipo: 'perdedor', partido: ID_FINAL },
      resultado: null,
    }
  );

  return partidos;
}

type Estado = {
  jugador1: Lugar;
  jugador2: Lugar;
  ganador: Lugar;
  perdedor: Lugar;
  libre: boolean;
};

// Calcula quién juega cada partido a partir de los resultados cargados. Un resultado
// guardado solo vale si los que jugaron siguen siendo los mismos: si se corrige un partido
// anterior y cambian los rivales, ese resultado deja de contar solo.
function resolver(partidos: PartidoDoble[]): Map<string, Estado> {
  const estados = new Map<string, Estado>();
  const porId = new Map(partidos.map((p) => [p.id, p]));

  const lugarDe = (fuente: Fuente): Lugar => {
    if (fuente.tipo === 'participante') {
      return fuente.nombre ?? VACIO;
    }

    const estado = calcular(porId.get(fuente.partido)!);
    return fuente.tipo === 'ganador' ? estado.ganador : estado.perdedor;
  };

  function calcular(partido: PartidoDoble): Estado {
    const hecho = estados.get(partido.id);

    if (hecho) {
      return hecho;
    }

    const jugador1 = lugarDe(partido.fuente1);
    const jugador2 = lugarDe(partido.fuente2);
    let estado: Estado = { jugador1, jugador2, ganador: undefined, perdedor: undefined, libre: false };

    if (partido.id === ID_DESEMPATE) {
      // el desempate solo se juega si la final la ganó el que venía de perdedores
      const final = calcular(porId.get(ID_FINAL)!);

      if (typeof final.ganador !== 'string') {
        estado = { ...estado, jugador1: undefined, jugador2: undefined };
      } else if (final.ganador === final.jugador1) {
        estado = { jugador1: VACIO, jugador2: VACIO, ganador: VACIO, perdedor: VACIO, libre: true };
      } else {
        estado = conResultado(partido, estado);
      }
    } else if (jugador1 === VACIO || jugador2 === VACIO) {
      // pase directo: pasa el que esté, y no cae nadie a perdedores
      const presente = jugador1 === VACIO ? jugador2 : jugador1;
      estado = { ...estado, ganador: presente, perdedor: VACIO, libre: true };
    } else {
      estado = conResultado(partido, estado);
    }

    estados.set(partido.id, estado);
    return estado;
  }

  partidos.forEach(calcular);
  return estados;
}

function conResultado(partido: PartidoDoble, estado: Estado): Estado {
  const { jugador1, jugador2 } = estado;
  const guardado = partido.resultado;

  if (
    typeof jugador1 === 'string' &&
    typeof jugador2 === 'string' &&
    guardado &&
    guardado.jugador1 === jugador1 &&
    guardado.jugador2 === jugador2
  ) {
    return {
      ...estado,
      ganador: guardado.ganador,
      perdedor: guardado.ganador === jugador1 ? jugador2 : jugador1,
    };
  }

  return estado;
}

function aPartido(partido: PartidoDoble, estado: Estado): Partido {
  const nombre = (lugar: Lugar) => (typeof lugar === 'string' ? lugar : null);
  const valido = !estado.libre && typeof estado.ganador === 'string';

  return {
    jugador1: nombre(estado.jugador1),
    jugador2: nombre(estado.jugador2),
    ganador: estado.libre ? nombre(estado.ganador) : valido ? (estado.ganador as string) : null,
    resultado: valido ? (partido.resultado?.resultado ?? null) : null,
    libre: estado.libre,
    desenlace: valido ? (partido.resultado?.desenlace ?? 'ganador') : null,
  };
}

export type RondaDoble = Ronda & { ids: string[] };

// Los partidos ya resueltos, agrupados por llave y ronda para dibujarlos como cuadro.
export function vistaDoble(partidos: PartidoDoble[]): Record<Llave, RondaDoble[]> {
  const estados = resolver(partidos);
  const vista: Record<Llave, RondaDoble[]> = { ganadores: [], perdedores: [], final: [] };

  for (const partido of partidos) {
    const estado = estados.get(partido.id)!;

    // el desempate no se muestra si no hace falta
    if (partido.id === ID_DESEMPATE && estado.ganador === VACIO) {
      continue;
    }

    const rondas = vista[partido.llave];
    let ronda = rondas.find((r) => r.nombre === partido.ronda);

    if (!ronda) {
      ronda = { nombre: partido.ronda, partidos: [], ids: [] };
      rondas.push(ronda);
    }

    ronda.partidos.push(aPartido(partido, estado));
    ronda.ids.push(partido.id);
  }

  return vista;
}

export function partidoDoble(partidos: PartidoDoble[], id: string): Partido | null {
  const partido = partidos.find((p) => p.id === id);

  if (!partido) {
    return null;
  }

  return aPartido(partido, resolver(partidos).get(id)!);
}

export function todosLosPartidosDoble(partidos: PartidoDoble[]): Partido[] {
  const estados = resolver(partidos);

  return partidos.map((partido) => aPartido(partido, estados.get(partido.id)!));
}

export function campeonDoble(partidos: PartidoDoble[]): string | null {
  const estados = resolver(partidos);
  const desempate = estados.get(ID_DESEMPATE);
  const final = estados.get(ID_FINAL);

  if (desempate && typeof desempate.ganador === 'string') {
    return desempate.ganador;
  }
  if (desempate?.ganador === VACIO && final && typeof final.ganador === 'string') {
    return final.ganador;
  }

  return null;
}

export function cargarResultadoDoble(
  partidos: PartidoDoble[],
  id: string,
  { desenlace, ganador, resultado }: Carga
): PartidoDoble[] {
  const actual = partidoDoble(partidos, id);

  if (!actual || actual.libre || actual.jugador1 === null || actual.jugador2 === null || !ganador) {
    throw new Error('Ese partido todavía no se puede jugar');
  }

  const conNuevo = partidos.map((partido) =>
    partido.id !== id
      ? partido
      : {
          ...partido,
          resultado: {
            jugador1: actual.jugador1!,
            jugador2: actual.jugador2!,
            ganador,
            resultado,
            desenlace,
          },
        }
  );

  // los resultados que dejaron de valer (cambiaron los rivales) se borran para que no
  // reaparezcan si después se vuelve a corregir
  const estados = resolver(conNuevo);

  return conNuevo.map((partido) => {
    const estado = estados.get(partido.id)!;
    const guardado = partido.resultado;

    if (guardado && (guardado.jugador1 !== estado.jugador1 || guardado.jugador2 !== estado.jugador2)) {
      return { ...partido, resultado: null };
    }

    return partido;
  });
}

// cambia un nombre en todos lados (participantes del cuadro y resultados guardados)
export function renombrarEnDoble(
  partidos: PartidoDoble[],
  viejo: string,
  nuevo: string
): PartidoDoble[] {
  const cambiar = (nombre: string) => (nombre === viejo ? nuevo : nombre);
  const fuente = (f: Fuente): Fuente =>
    f.tipo === 'participante' && f.nombre !== null ? { ...f, nombre: cambiar(f.nombre) } : f;

  return partidos.map((partido) => ({
    ...partido,
    fuente1: fuente(partido.fuente1),
    fuente2: fuente(partido.fuente2),
    resultado: partido.resultado && {
      ...partido.resultado,
      jugador1: cambiar(partido.resultado.jugador1),
      jugador2: cambiar(partido.resultado.jugador2),
      ganador: cambiar(partido.resultado.ganador),
    },
  }));
}
