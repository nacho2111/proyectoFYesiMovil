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
