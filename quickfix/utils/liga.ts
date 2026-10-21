import type { Puntos } from '@/utils/deportes';
import { desenlaceDe, type Carga, type Partido } from '@/utils/fixture';

export type Fecha = {
  nombre: string;
  partidos: Partido[];
  // con cantidad impar, cada fecha uno queda sin jugar
  libre: string | null;
};

export type FilaTabla = {
  nombre: string;
  jugados: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  // partidos perdidos por no presentarse
  walkovers: number;
  puntos: number;
};

// Todos contra todos con el método del círculo: el primero queda fijo y el resto gira.
// Así cada uno juega una vez contra cada rival y nadie juega dos veces en la misma fecha.
export function generarLiga(participantes: string[]): Fecha[] {
  if (participantes.length < 2) {
    throw new Error('Tiene que haber al menos 2 participantes');
  }

  const lista: (string | null)[] = [...participantes];

  if (lista.length % 2 !== 0) {
    lista.push(null);
  }

  const cantidad = lista.length;
  const fechas: Fecha[] = [];

  for (let numero = 0; numero < cantidad - 1; numero++) {
    const partidos: Partido[] = [];
    let libre: string | null = null;

    for (let i = 0; i < cantidad / 2; i++) {
      const local = lista[i];
      const visitante = lista[cantidad - 1 - i];

      if (local === null || visitante === null) {
        libre = local ?? visitante;
        continue;
      }

      // se alterna quién figura primero para que no sea siempre el mismo
      const [jugador1, jugador2] = numero % 2 === 0 ? [local, visitante] : [visitante, local];

      partidos.push({
        jugador1,
        jugador2,
        ganador: null,
        resultado: null,
        libre: false,
        desenlace: null,
      });
    }

    fechas.push({ nombre: `Fecha ${numero + 1}`, partidos, libre });

    // girar todos menos el primero
    const ultimo = lista.pop()!;
    lista.splice(1, 0, ultimo);
  }

  return fechas;
}

export function cargarResultadoLiga(
  fechas: Fecha[],
  indiceFecha: number,
  indicePartido: number,
  { desenlace, ganador, resultado }: Carga
): Fecha[] {
  return fechas.map((fecha, i) =>
    i !== indiceFecha
      ? fecha
      : {
          ...fecha,
          partidos: fecha.partidos.map((partido, j) =>
            j !== indicePartido
              ? partido
              : {
                  ...partido,
                  ganador: desenlace === 'empate' ? null : ganador,
                  resultado,
                  desenlace,
                }
          ),
        }
  );
}

export function partidosDeLiga(fechas: Fecha[]): Partido[] {
  return fechas.flatMap((fecha) => fecha.partidos);
}

export function ligaTerminada(fechas: Fecha[]): boolean {
  const partidos = partidosDeLiga(fechas);

  return partidos.length > 0 && partidos.every((partido) => desenlaceDe(partido) !== null);
}

// Suma lo de cada partido jugado. Los pases directos de una eliminación no cuentan:
// ahí no se jugó nada.
export function calcularTabla(
  participantes: string[],
  partidos: Partido[],
  puntos: Puntos
): FilaTabla[] {
  const filas = new Map<string, FilaTabla>(
    participantes.map((nombre) => [
      nombre,
      { nombre, jugados: 0, ganados: 0, empatados: 0, perdidos: 0, walkovers: 0, puntos: 0 },
    ])
  );

  for (const partido of partidos) {
    const desenlace = desenlaceDe(partido);

    if (!desenlace || partido.jugador1 === null || partido.jugador2 === null) {
      continue;
    }

    for (const nombre of [partido.jugador1, partido.jugador2]) {
      const fila = filas.get(nombre);

      if (!fila) {
        continue;
      }

      fila.jugados += 1;

      // en eliminación un empate igual tiene a alguien que pasa, pero para la tabla es empate
      if (desenlace === 'empate') {
        fila.empatados += 1;
        fila.puntos += puntos.empatado;
      } else if (partido.ganador === nombre) {
        fila.ganados += 1;
        fila.puntos += puntos.ganado;
      } else if (desenlace === 'walkover') {
        // el que no se presentó pierde y no suma nada
        fila.perdidos += 1;
        fila.walkovers += 1;
      } else {
        fila.perdidos += 1;
        fila.puntos += puntos.perdido;
      }
    }
  }

  return ordenarTabla([...filas.values()]);
}

// más puntos primero; si empatan, más partidos ganados; si siguen igual, menos W.O.
export function ordenarTabla(filas: FilaTabla[]): FilaTabla[] {
  return [...filas].sort(
    (a, b) => b.puntos - a.puntos || b.ganados - a.ganados || a.walkovers - b.walkovers
  );
}
