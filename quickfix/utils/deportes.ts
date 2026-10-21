export type DeporteId =
  | 'tenis'
  | 'truco'
  | 'futbol'
  | 'basquet'
  | 'padel'
  | 'futsal'
  | 'voley'
  | 'otro';

export type Puntos = {
  ganado: number;
  empatado: number;
  perdido: number;
};

type Deporte = {
  id: DeporteId;
  nombre: string;
  // cómo se le dice a cada participante en ese deporte
  participante: string;
  participantes: string;
  // el texto de ayuda del campo para cargar a cada uno ("Nombre de la pareja")
  campoNombre: string;
  ejemploResultado: string;
  puntos: Puntos;
};

// "puntaje normal": 3 por ganar, 1 por empatar, 0 por perder
export const PUNTAJE_NORMAL: Puntos = { ganado: 3, empatado: 1, perdido: 0 };

export const DEPORTES: Deporte[] = [
  {
    id: 'futbol',
    nombre: 'Fútbol',
    participante: 'equipo',
    campoNombre: 'Nombre del equipo',
    participantes: 'equipos',
    ejemploResultado: 'Ej: 2-1',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'futsal',
    nombre: 'Futsal',
    participante: 'equipo',
    campoNombre: 'Nombre del equipo',
    participantes: 'equipos',
    ejemploResultado: 'Ej: 4-3',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'basquet',
    nombre: 'Básquet',
    participante: 'equipo',
    campoNombre: 'Nombre del equipo',
    participantes: 'equipos',
    ejemploResultado: 'Ej: 78-70',
    // como en FIBA: perder también suma 1, el que no se presenta suma 0
    puntos: { ganado: 2, empatado: 1, perdido: 1 },
  },
  {
    id: 'voley',
    nombre: 'Vóley',
    participante: 'equipo',
    campoNombre: 'Nombre del equipo',
    participantes: 'equipos',
    ejemploResultado: 'Ej: 3-1',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'tenis',
    nombre: 'Tenis',
    participante: 'jugador',
    campoNombre: 'Nombre del jugador',
    participantes: 'jugadores',
    ejemploResultado: 'Ej: 6-4 6-3',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'padel',
    nombre: 'Pádel',
    participante: 'pareja',
    campoNombre: 'Nombre de la pareja',
    participantes: 'parejas',
    ejemploResultado: 'Ej: 6-4 6-3',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'truco',
    nombre: 'Truco',
    participante: 'pareja',
    campoNombre: 'Nombre de la pareja',
    participantes: 'parejas',
    ejemploResultado: 'Ej: 30-24',
    puntos: PUNTAJE_NORMAL,
  },
  {
    id: 'otro',
    nombre: 'Otro',
    participante: 'participante',
    campoNombre: 'Nombre del participante',
    participantes: 'participantes',
    ejemploResultado: 'Ej: 2-1',
    puntos: PUNTAJE_NORMAL,
  },
];

export function obtenerDeporte(id: DeporteId): Deporte {
  return DEPORTES.find((deporte) => deporte.id === id) ?? DEPORTES[DEPORTES.length - 1];
}

// el nombre para mostrar: si es "otro", lo que escribió el usuario
export function nombreDeporte(id: DeporteId, otro?: string): string {
  if (id === 'otro') {
    return otro?.trim() || 'Torneo';
  }

  return obtenerDeporte(id).nombre;
}
