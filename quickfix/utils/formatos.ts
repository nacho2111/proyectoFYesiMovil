export type Formato = 'eliminacion' | 'liga' | 'grupos' | 'doble';

export const FORMATOS: { id: Formato; nombre: string; descripcion: string }[] = [
  {
    id: 'eliminacion',
    nombre: 'Eliminación directa',
    descripcion: 'El que pierde queda afuera. Rápido, ideal para un día.',
  },
  {
    id: 'liga',
    nombre: 'Liga',
    descripcion: 'Todos contra todos. Gana el que más puntos suma en la tabla.',
  },
  {
    id: 'grupos',
    nombre: 'Grupos + eliminación',
    descripcion: 'Fase de grupos con tablas y los mejores pasan a un cuadro final.',
  },
  {
    id: 'doble',
    nombre: 'Doble eliminación',
    descripcion: 'Hay que perder dos veces para quedar afuera.',
  },
];

export function nombreFormato(id: Formato): string {
  return FORMATOS.find((formato) => formato.id === id)?.nombre ?? 'Eliminación directa';
}

// los que se arman como cuadro y necesitan elegir el tamaño
export function usaCuadro(formato: Formato): boolean {
  return formato === 'eliminacion' || formato === 'doble';
}
