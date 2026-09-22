export type Partido = {
  jugador1: string | null;
  jugador2: string | null;
  ganador: string | null;
  resultado: string | null;
  libre: boolean;
};

export type Ronda = {
  nombre: string;
  partidos: Partido[];
};

type Lugar = {
  jugador: string | null;
  libre: boolean;
};

export const TAMANIOS_CUADRO = [4, 8, 16, 32];

// el cuadro más chico de los que se pueden elegir donde entran todos
export function tamanioMinimo(cantidad: number): number {
  return (
    TAMANIOS_CUADRO.find((tamanio) => tamanio >= cantidad) ??
    TAMANIOS_CUADRO[TAMANIOS_CUADRO.length - 1]
  );
}

// el campeón es el ganador del único partido de la última ronda, si ya se jugó
export function obtenerCampeon(rondas: Ronda[]): string | null {
  return rondas.at(-1)?.partidos[0]?.ganador ?? null;
}

// se puede cargar resultado cuando ya están los dos rivales y no es un pase directo
export function esJugable(partido: Partido): boolean {
  return !partido.libre && partido.jugador1 !== null && partido.jugador2 !== null;
}

// Carga el resultado de un partido y hace avanzar al ganador a la ronda siguiente.
// Si se corrige un partido que ya se había jugado y cambia el ganador, el resultado
// de los partidos posteriores donde jugaba el ganador anterior deja de valer.
export function cargarResultado(
  rondas: Ronda[],
  indiceRonda: number,
  indicePartido: number,
  ganador: string,
  resultado: string
): Ronda[] {
  const copia = rondas.map((ronda) => ({
    ...ronda,
    partidos: ronda.partidos.map((partido) => ({ ...partido })),
  }));

  const partido = copia[indiceRonda].partidos[indicePartido];

  if (!esJugable(partido)) {
    throw new Error('Ese partido todavía no se puede jugar');
  }
  if (ganador !== partido.jugador1 && ganador !== partido.jugador2) {
    throw new Error('El ganador tiene que ser uno de los dos jugadores del partido');
  }

  partido.ganador = ganador;
  partido.resultado = resultado;

  propagarGanador(copia, indiceRonda, indicePartido, ganador);

  return copia;
}

// Pone a `jugador` (o lo saca, con null) en el lugar que le corresponde en la ronda
// siguiente. Si eso pisa un partido que ya tenía un resultado cargado, ese resultado
// deja de valer y la limpieza sigue en cascada hacia las rondas que vienen después.
function propagarGanador(
  rondas: Ronda[],
  indiceRonda: number,
  indicePartido: number,
  jugador: string | null
) {
  const rondaSiguiente = rondas[indiceRonda + 1];

  if (!rondaSiguiente) {
    return;
  }

  const slot = Math.floor(indicePartido / 2);
  const lado: 'jugador1' | 'jugador2' = indicePartido % 2 === 0 ? 'jugador1' : 'jugador2';
  const partidoSiguiente = rondaSiguiente.partidos[slot];

  if (partidoSiguiente[lado] === jugador) {
    return; // no cambió nada, no hay nada que limpiar más adelante
  }

  const teniaResultado = partidoSiguiente.ganador !== null;
  partidoSiguiente[lado] = jugador;

  if (partidoSiguiente.libre) {
    // pase directo: gana quien haya quedado en el único lugar ocupado, o nadie si quedó vacío
    const nuevoGanador = partidoSiguiente.jugador1 ?? partidoSiguiente.jugador2;
    partidoSiguiente.ganador = nuevoGanador;
    partidoSiguiente.resultado = null;
    propagarGanador(rondas, indiceRonda + 1, slot, nuevoGanador);
    return;
  }

  partidoSiguiente.ganador = null;
  partidoSiguiente.resultado = null;

  if (teniaResultado) {
    propagarGanador(rondas, indiceRonda + 1, slot, null);
  }
}

const NOMBRES_RONDAS = [
  'Final',
  'Semifinal',
  'Cuartos de final',
  'Octavos de final',
  'Dieciseisavos de final',
];

// Los cruces salen del orden de la lista: 1 contra 2, 3 contra 4, etc.
// Si sobran lugares, los últimos de la lista pasan directo a la ronda siguiente.
// Los partidos con libre = true no se juegan y ya vienen con el ganador cargado.
export function generarFixture(participantes: string[], lugares: number): Ronda[] {
  if (!Number.isInteger(Math.log2(lugares))) {
    throw new Error(`Un cuadro no puede tener ${lugares} lugares`);
  }
  if (participantes.length < 2) {
    throw new Error('Tiene que haber al menos 2 participantes');
  }
  if (participantes.length > lugares) {
    throw new Error(`No entran ${participantes.length} participantes en un cuadro de ${lugares}`);
  }
  if (new Set(participantes).size !== participantes.length) {
    throw new Error('Hay participantes con el mismo nombre');
  }

  const cantidadRondas = Math.log2(lugares);
  const rondas: Ronda[] = [];
  let lugaresRonda = ubicarParticipantes(participantes, lugares);

  for (let i = 0; i < cantidadRondas; i++) {
    const partidos: Partido[] = [];

    for (let j = 0; j < lugaresRonda.length; j += 2) {
      partidos.push(armarPartido(lugaresRonda[j], lugaresRonda[j + 1]));
    }

    rondas.push({
      nombre: NOMBRES_RONDAS[cantidadRondas - 1 - i] ?? `Ronda ${i + 1}`,
      partidos,
    });

    lugaresRonda = partidos.map((partido) => ({
      jugador: partido.ganador,
      libre: partido.libre && partido.ganador === null,
    }));
  }

  return rondas;
}

function ubicarParticipantes(participantes: string[], lugares: number): Lugar[] {
  // el cuadro más chico en el que entran todos
  let tamanio = 2;
  while (tamanio < participantes.length) {
    tamanio *= 2;
  }

  const juegan = (participantes.length - tamanio / 2) * 2;
  const orden: (string | null)[] = participantes.slice(0, juegan);

  for (const jugador of participantes.slice(juegan)) {
    orden.push(jugador, null);
  }

  // si eligieron un cuadro más grande, cada lugar se estira y lo que sobra queda libre
  const salto = lugares / tamanio;
  const ubicados: Lugar[] = [];

  for (const jugador of orden) {
    ubicados.push({ jugador, libre: jugador === null });

    for (let k = 1; k < salto; k++) {
      ubicados.push({ jugador: null, libre: true });
    }
  }

  return ubicados;
}

function armarPartido(lugar1: Lugar, lugar2: Lugar): Partido {
  const libre = lugar1.libre || lugar2.libre;

  return {
    jugador1: lugar1.jugador,
    jugador2: lugar2.jugador,
    ganador: libre ? (lugar1.jugador ?? lugar2.jugador) : null,
    resultado: null,
    libre,
  };
}
