import type { Torneo } from '@/hooks/use-torneos';
import {
  campeonDoble,
  cargarResultadoDoble,
  generarDoble,
  partidoDoble,
  renombrarEnDoble,
  todosLosPartidosDoble,
  vistaDoble,
} from '@/utils/doble';
import {
  cargarResultado,
  esJugable,
  estaJugado,
  generarFixture,
  obtenerCampeon,
  type Carga,
  type Partido,
  type Ronda,
} from '@/utils/fixture';
import { actualizarFaseFinal, generarGrupos, type Grupo } from '@/utils/grupos';
import {
  calcularTabla,
  cargarResultadoLiga,
  generarLiga,
  ligaTerminada,
  partidosDeLiga,
  type Fecha,
  type FilaTabla,
} from '@/utils/liga';

// Cómo se llega a un partido desde la pantalla de resultado. Va como texto en la URL:
// "eliminacion:1:0" (ronda, partido), "liga:2:3" (fecha, partido),
// "grupo:0:1:2" (grupo, fecha, partido), "doble:G1-0" (id del partido).
export type RefPartido =
  | { fase: 'eliminacion'; ronda: number; partido: number }
  | { fase: 'liga'; fecha: number; partido: number }
  | { fase: 'grupo'; grupo: number; fecha: number; partido: number }
  | { fase: 'doble'; id: string };

export function refATexto(ref: RefPartido): string {
  switch (ref.fase) {
    case 'eliminacion':
      return `eliminacion:${ref.ronda}:${ref.partido}`;
    case 'liga':
      return `liga:${ref.fecha}:${ref.partido}`;
    case 'grupo':
      return `grupo:${ref.grupo}:${ref.fecha}:${ref.partido}`;
    case 'doble':
      return `doble:${ref.id}`;
  }
}

export function textoARef(texto: string | undefined): RefPartido | null {
  const [fase, ...resto] = (texto ?? '').split(':');
  const numeros = resto.map(Number);

  if (fase === 'eliminacion' && numeros.length === 2) {
    return { fase, ronda: numeros[0], partido: numeros[1] };
  }
  if (fase === 'liga' && numeros.length === 2) {
    return { fase, fecha: numeros[0], partido: numeros[1] };
  }
  if (fase === 'grupo' && numeros.length === 3) {
    return { fase, grupo: numeros[0], fecha: numeros[1], partido: numeros[2] };
  }
  if (fase === 'doble' && resto.length === 1) {
    return { fase, id: resto[0] };
  }

  return null;
}

export function tieneFixture(torneo: Torneo): boolean {
  switch (torneo.formato) {
    case 'liga':
      return torneo.fechas.length > 0;
    case 'grupos':
      return torneo.grupos.length > 0;
    case 'doble':
      return torneo.doble.length > 0;
    default:
      return torneo.rondas.length > 0;
  }
}

// lo que hay que guardar en el torneo al generar el fixture, según el formato
export function generarFixtureTorneo(torneo: Torneo): Partial<Torneo> {
  const { participantes, lugares } = torneo;
  const vacio = { rondas: [], fechas: [], grupos: [], clasificados: [], doble: [] };

  switch (torneo.formato) {
    case 'liga':
      return { ...vacio, fechas: generarLiga(participantes) };
    case 'grupos':
      return { ...vacio, grupos: generarGrupos(participantes, torneo.cantidadGrupos) };
    case 'doble':
      return { ...vacio, doble: generarDoble(participantes, lugares) };
    default:
      return { ...vacio, rondas: generarFixture(participantes, lugares) };
  }
}

// borra el fixture para volver a cargar participantes (se pierden los resultados)
export function sinFixture(): Partial<Torneo> {
  return { rondas: [], fechas: [], grupos: [], clasificados: [], doble: [] };
}

export function obtenerCampeonTorneo(torneo: Torneo): string | null {
  switch (torneo.formato) {
    case 'liga':
      return ligaTerminada(torneo.fechas) ? (tablaGeneral(torneo)[0]?.nombre ?? null) : null;
    case 'doble':
      return campeonDoble(torneo.doble);
    default:
      // en grupos + eliminación, el campeón sale del cuadro final
      return obtenerCampeon(torneo.rondas);
  }
}

export function obtenerPartido(torneo: Torneo, ref: RefPartido): Partido | null {
  switch (ref.fase) {
    case 'eliminacion':
      return torneo.rondas[ref.ronda]?.partidos[ref.partido] ?? null;
    case 'liga':
      return torneo.fechas[ref.fecha]?.partidos[ref.partido] ?? null;
    case 'grupo':
      return torneo.grupos[ref.grupo]?.fechas[ref.fecha]?.partidos[ref.partido] ?? null;
    case 'doble':
      return partidoDoble(torneo.doble, ref.id);
  }
}

// dónde está el partido, para mostrarlo arriba: "Fecha 3", "Grupo A · Fecha 1", "Semifinal"...
export function nombreDelPartido(torneo: Torneo, ref: RefPartido): string {
  switch (ref.fase) {
    case 'eliminacion': {
      const ronda = torneo.rondas[ref.ronda]?.nombre ?? '';
      return torneo.formato === 'grupos' ? `Cuadro final · ${ronda}` : ronda;
    }
    case 'liga':
      return torneo.fechas[ref.fecha]?.nombre ?? '';
    case 'grupo': {
      const grupo = torneo.grupos[ref.grupo];
      return grupo ? `${grupo.nombre} · ${grupo.fechas[ref.fecha]?.nombre ?? ''}` : '';
    }
    case 'doble': {
      const partido = torneo.doble.find((p) => p.id === ref.id);
      if (!partido) {
        return '';
      }
      if (partido.llave === 'final') {
        return partido.ronda;
      }
      return `${partido.llave === 'ganadores' ? 'Ganadores' : 'Perdedores'} · ${partido.ronda}`;
    }
  }
}

// en liga y grupos un empate es empate; en un cuadro siempre tiene que pasar alguien
export function empateNecesitaGanador(ref: RefPartido): boolean {
  return ref.fase === 'eliminacion' || ref.fase === 'doble';
}

export function guardarResultado(torneo: Torneo, ref: RefPartido, carga: Carga): Partial<Torneo> {
  switch (ref.fase) {
    case 'eliminacion':
      return { rondas: cargarResultado(torneo.rondas, ref.ronda, ref.partido, carga) };
    case 'liga':
      return { fechas: cargarResultadoLiga(torneo.fechas, ref.fecha, ref.partido, carga) };
    case 'doble':
      return { doble: cargarResultadoDoble(torneo.doble, ref.id, carga) };
    case 'grupo': {
      const grupos = torneo.grupos.map((grupo, i) =>
        i !== ref.grupo
          ? grupo
          : { ...grupo, fechas: cargarResultadoLiga(grupo.fechas, ref.fecha, ref.partido, carga) }
      );
      const final = actualizarFaseFinal(grupos, torneo.clasifican, torneo.puntos, {
        clasificados: torneo.clasificados,
        rondas: torneo.rondas,
      });

      return { grupos, ...final };
    }
  }
}

// Todos los partidos que ya se jugaron, de cualquier fase, para la tabla y las estadísticas.
export function partidosJugados(torneo: Torneo): Partido[] {
  return todosLosPartidos(torneo).filter(estaJugado);
}

function todosLosPartidos(torneo: Torneo): Partido[] {
  const delCuadro = torneo.rondas.flatMap((ronda) => ronda.partidos);

  switch (torneo.formato) {
    case 'liga':
      return partidosDeLiga(torneo.fechas);
    case 'grupos':
      return [...torneo.grupos.flatMap((grupo) => partidosDeLiga(grupo.fechas)), ...delCuadro];
    case 'doble':
      return todosLosPartidosDoble(torneo.doble);
    default:
      return delCuadro;
  }
}

export function progreso(torneo: Torneo): { jugados: number; total: number } {
  const partidos = todosLosPartidos(torneo).filter((partido) => !partido.libre);

  return {
    jugados: partidos.filter(estaJugado).length,
    total: partidos.length,
  };
}

export function tablaGeneral(torneo: Torneo): FilaTabla[] {
  return calcularTabla(torneo.participantes, partidosJugados(torneo), torneo.puntos);
}

export type Destacado = {
  titulo: string;
  nombres: string[];
  valor: string;
};

// Los que se destacan en algo. Si hay empate en lo más alto, se muestran todos.
export function estadisticas(torneo: Torneo): Destacado[] {
  const tabla = tablaGeneral(torneo).filter((fila) => fila.jugados > 0);

  if (tabla.length === 0) {
    return [];
  }

  const mejores = (valor: (fila: FilaTabla) => number) => {
    const maximo = Math.max(...tabla.map(valor));
    return { maximo, nombres: tabla.filter((fila) => valor(fila) === maximo).map((f) => f.nombre) };
  };

  const destacados: Destacado[] = [];
  const puntos = mejores((fila) => fila.puntos);
  const ganados = mejores((fila) => fila.ganados);
  const empates = mejores((fila) => fila.empatados);
  const invictos = tabla.filter((fila) => fila.perdidos === 0);

  destacados.push({
    titulo: 'Más puntos',
    nombres: puntos.nombres,
    valor: `${puntos.maximo} ${puntos.maximo === 1 ? 'punto' : 'puntos'}`,
  });

  if (ganados.maximo > 0) {
    destacados.push({
      titulo: 'Más ganador',
      nombres: ganados.nombres,
      valor: `${ganados.maximo} ${ganados.maximo === 1 ? 'partido ganado' : 'partidos ganados'}`,
    });
  }

  if (invictos.length > 0 && invictos.length < tabla.length) {
    destacados.push({
      titulo: 'Invictos',
      nombres: invictos.map((fila) => fila.nombre),
      valor: 'Todavía no perdieron',
    });
  }

  if (empates.maximo > 0) {
    destacados.push({
      titulo: 'Más empates',
      nombres: empates.nombres,
      valor: `${empates.maximo} ${empates.maximo === 1 ? 'empate' : 'empates'}`,
    });
  }

  return destacados;
}

export type Etapa = {
  nombre: string;
  jugados: number;
  total: number;
  estado: 'hecha' | 'en-juego' | 'pendiente';
};

// Las etapas del torneo en orden (fechas, rondas o fases) con cuántos partidos se
// jugaron en cada una: es lo que muestra la tira de arriba de la pantalla del torneo.
export function etapas(torneo: Torneo): Etapa[] {
  const grupos: { nombre: string; partidos: Partido[] }[] = [];
  const delCuadro = (rondas: Ronda[], prefijo = '') =>
    rondas.map((ronda) => ({ nombre: `${prefijo}${ronda.nombre}`, partidos: ronda.partidos }));

  switch (torneo.formato) {
    case 'liga':
      grupos.push(...torneo.fechas);
      break;
    case 'grupos':
      grupos.push({
        nombre: 'Grupos',
        partidos: torneo.grupos.flatMap((grupo) => partidosDeLiga(grupo.fechas)),
      });
      // el cuadro final todavía no existe hasta que terminan los grupos
      grupos.push(
        ...(torneo.rondas.length > 0
          ? delCuadro(torneo.rondas)
          : [{ nombre: 'Cuadro final', partidos: [] }])
      );
      break;
    case 'doble': {
      const vista = vistaDoble(torneo.doble);
      grupos.push(
        { nombre: 'Ganadores', partidos: vista.ganadores.flatMap((r) => r.partidos) },
        { nombre: 'Perdedores', partidos: vista.perdedores.flatMap((r) => r.partidos) },
        { nombre: 'Final', partidos: vista.final.flatMap((r) => r.partidos) }
      );
      break;
    }
    default:
      grupos.push(...delCuadro(torneo.rondas));
  }

  let yaHayEnJuego = false;

  return grupos
    .map(({ nombre, partidos }) => {
      const reales = partidos.filter((partido) => !partido.libre);
      const jugados = reales.filter(estaJugado).length;
      let estado: Etapa['estado'] = 'pendiente';

      if (reales.length > 0 && jugados === reales.length) {
        estado = 'hecha';
      } else if (
        // solo la primera etapa sin terminar está "en juego"; las que siguen esperan
        !yaHayEnJuego &&
        reales.some((partido) => esJugable(partido) && !estaJugado(partido))
      ) {
        estado = 'en-juego';
        yaHayEnJuego = true;
      }

      return { nombre, jugados, total: reales.length, estado };
    })
    // una ronda que es toda de pases directos no se juega: no es una etapa
    .filter((etapa) => etapa.total > 0 || etapa.nombre === 'Cuadro final');
}

// el primer partido que se puede jugar y todavía no tiene resultado
export function proximoPartido(torneo: Torneo): { ref: RefPartido; partido: Partido } | null {
  const candidatos: { ref: RefPartido; partido: Partido }[] = [];

  switch (torneo.formato) {
    case 'liga':
      torneo.fechas.forEach((fecha, f) =>
        fecha.partidos.forEach((partido, p) =>
          candidatos.push({ ref: { fase: 'liga', fecha: f, partido: p }, partido })
        )
      );
      break;
    case 'grupos':
      // primero los grupos fecha por fecha, después el cuadro final
      for (let f = 0; f < Math.max(0, ...torneo.grupos.map((g) => g.fechas.length)); f++) {
        torneo.grupos.forEach((grupo, g) =>
          grupo.fechas[f]?.partidos.forEach((partido, p) =>
            candidatos.push({ ref: { fase: 'grupo', grupo: g, fecha: f, partido: p }, partido })
          )
        );
      }
      agregarCuadro(torneo.rondas, candidatos);
      break;
    case 'doble':
      for (const { id } of torneo.doble) {
        const partido = partidoDoble(torneo.doble, id);

        if (partido) {
          candidatos.push({ ref: { fase: 'doble', id }, partido });
        }
      }
      break;
    default:
      agregarCuadro(torneo.rondas, candidatos);
  }

  return candidatos.find(({ partido }) => esJugable(partido) && !estaJugado(partido)) ?? null;
}

function agregarCuadro(rondas: Ronda[], candidatos: { ref: RefPartido; partido: Partido }[]) {
  rondas.forEach((ronda, r) =>
    ronda.partidos.forEach((partido, p) =>
      candidatos.push({ ref: { fase: 'eliminacion', ronda: r, partido: p }, partido })
    )
  );
}

// Cambia el nombre de un participante en todo el torneo, incluidos los resultados ya cargados.
export function renombrarParticipante(torneo: Torneo, viejo: string, nuevo: string): Partial<Torneo> {
  const cambiar = (nombre: string | null) => (nombre === viejo ? nuevo : nombre);
  const enPartido = (partido: Partido): Partido => ({
    ...partido,
    jugador1: cambiar(partido.jugador1),
    jugador2: cambiar(partido.jugador2),
    ganador: cambiar(partido.ganador),
  });
  const enRondas = (rondas: Ronda[]) =>
    rondas.map((ronda) => ({ ...ronda, partidos: ronda.partidos.map(enPartido) }));
  const enFechas = (fechas: Fecha[]) =>
    fechas.map((fecha) => ({
      ...fecha,
      libre: cambiar(fecha.libre),
      partidos: fecha.partidos.map(enPartido),
    }));
  const enGrupos = (grupos: Grupo[]) =>
    grupos.map((grupo) => ({
      ...grupo,
      participantes: grupo.participantes.map((nombre) => cambiar(nombre)!),
      fechas: enFechas(grupo.fechas),
    }));

  return {
    participantes: torneo.participantes.map((nombre) => cambiar(nombre)!),
    rondas: enRondas(torneo.rondas),
    fechas: enFechas(torneo.fechas),
    grupos: enGrupos(torneo.grupos),
    clasificados: torneo.clasificados.map((nombre) => cambiar(nombre)!),
    doble: renombrarEnDoble(torneo.doble, viejo, nuevo),
  };
}
