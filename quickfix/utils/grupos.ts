import type { Puntos } from '@/utils/deportes';
import { generarFixture, type Ronda } from '@/utils/fixture';
import { calcularTabla, generarLiga, ligaTerminada, partidosDeLiga, type Fecha } from '@/utils/liga';

export type Grupo = {
  nombre: string;
  participantes: string[];
  fechas: Fecha[];
};

export const CANTIDADES_GRUPOS = [2, 4, 8];
export const CLASIFICAN_POR_GRUPO = [1, 2];

const LETRAS = 'ABCDEFGH';

// Se reparten en orden: el 1 al A, el 2 al B, ... y vuelve a empezar. Así los primeros
// de la lista (los cabezas de serie) quedan en grupos distintos.
export function generarGrupos(participantes: string[], cantidadGrupos: number): Grupo[] {
  const grupos: Grupo[] = Array.from({ length: cantidadGrupos }, (_, i) => ({
    nombre: `Grupo ${LETRAS[i]}`,
    participantes: [],
    fechas: [],
  }));

  participantes.forEach((participante, i) => {
    grupos[i % cantidadGrupos].participantes.push(participante);
  });

  return grupos.map((grupo) => ({ ...grupo, fechas: generarLiga(grupo.participantes) }));
}

export function gruposTerminados(grupos: Grupo[]): boolean {
  return grupos.length > 0 && grupos.every((grupo) => ligaTerminada(grupo.fechas));
}

export function tablaDeGrupo(grupo: Grupo, puntos: Puntos) {
  return calcularTabla(grupo.participantes, partidosDeLiga(grupo.fechas), puntos);
}

// Los que pasan, ya ordenados para el cuadro: el 1° de un grupo cruza con el 2° del
// grupo vecino, así no se vuelven a cruzar en la primera ronda los del mismo grupo.
export function obtenerClasificados(
  grupos: Grupo[],
  clasifican: number,
  puntos: Puntos
): string[] {
  const tablas = grupos.map((grupo) => tablaDeGrupo(grupo, puntos).map((fila) => fila.nombre));

  if (clasifican === 1) {
    return tablas.map((tabla) => tabla[0]);
  }

  const orden: string[] = [];

  for (let i = 0; i < tablas.length; i += 2) {
    const a = tablas[i];
    const b = tablas[i + 1];
    orden.push(a[0], b[1], b[0], a[1]);
  }

  return orden;
}

// Cuando termina la fase de grupos se arma el cuadro final. Si se corrige un resultado
// de grupos y cambia quién clasifica, el cuadro final se vuelve a armar desde cero.
export function actualizarFaseFinal(
  grupos: Grupo[],
  clasifican: number,
  puntos: Puntos,
  anteriores: { clasificados: string[]; rondas: Ronda[] }
): { clasificados: string[]; rondas: Ronda[] } {
  if (!gruposTerminados(grupos)) {
    return { clasificados: [], rondas: [] };
  }

  const clasificados = obtenerClasificados(grupos, clasifican, puntos);
  const iguales =
    clasificados.length === anteriores.clasificados.length &&
    clasificados.every((nombre, i) => nombre === anteriores.clasificados[i]);

  if (iguales && anteriores.rondas.length > 0) {
    return anteriores;
  }

  return { clasificados, rondas: generarFixture(clasificados, clasificados.length) };
}
