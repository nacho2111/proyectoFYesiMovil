import { TAMANIOS_CUADRO } from '@/utils/fixture';

// Cada regla devuelve el mensaje para mostrar en pantalla, o null si está todo bien.

export const MAXIMO_PARTICIPANTES = TAMANIOS_CUADRO[TAMANIOS_CUADRO.length - 1];

export function validarNombreTorneo(nombre: string): string | null {
  if (!nombre.trim()) {
    return 'Ponele un nombre al torneo.';
  }

  return null;
}

export function validarNuevoParticipante(nombre: string, participantes: string[]): string | null {
  if (participantes.length >= MAXIMO_PARTICIPANTES) {
    return `Ya llegaste al máximo de ${MAXIMO_PARTICIPANTES} participantes.`;
  }

  const buscado = normalizar(nombre);

  if (participantes.some((participante) => normalizar(participante) === buscado)) {
    return 'Ya hay alguien con ese nombre.';
  }

  return null;
}

export function validarParticipantes(participantes: string[], lugares: number): string | null {
  const cantidad = participantes.length;

  if (cantidad < 2) {
    return 'Cargá al menos 2 participantes para armar el cuadro.';
  }
  if (cantidad > MAXIMO_PARTICIPANTES) {
    return `Entran hasta ${MAXIMO_PARTICIPANTES} participantes y cargaste ${cantidad}.`;
  }
  if (cantidad > lugares) {
    return `No entran ${cantidad} participantes en un cuadro de ${lugares}. Elegí uno más grande.`;
  }

  const repetidos = buscarRepetidos(participantes);

  if (repetidos.length > 0) {
    return `Hay nombres repetidos: ${repetidos.join(', ')}. Cambiá uno para poder distinguirlos.`;
  }

  return null;
}

// "Ana  María " y "ana maría" cuentan como el mismo nombre
function normalizar(nombre: string) {
  return nombre.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

// devuelve cada nombre repetido una sola vez, escrito como la primera vez que aparece
function buscarRepetidos(participantes: string[]): string[] {
  const primeros = new Map<string, string>();
  const repetidos = new Set<string>();

  for (const participante of participantes) {
    const clave = normalizar(participante);
    const primero = primeros.get(clave);

    if (primero === undefined) {
      primeros.set(clave, participante);
    } else {
      repetidos.add(primero);
    }
  }

  return [...repetidos];
}
