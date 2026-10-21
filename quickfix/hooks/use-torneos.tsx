import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

import { obtenerDeporte, type DeporteId, type Puntos } from '@/utils/deportes';
import type { PartidoDoble } from '@/utils/doble';
import type { Ronda } from '@/utils/fixture';
import type { Formato } from '@/utils/formatos';
import type { Grupo } from '@/utils/grupos';
import type { Fecha } from '@/utils/liga';

export type Torneo = {
  id: string;
  nombre: string;
  deporte: DeporteId;
  // qué es, cuando el deporte es "otro"
  deporteOtro: string;
  formato: Formato;
  puntos: Puntos;
  participantes: string[];
  lugares: number;
  // eliminación directa, y el cuadro final en grupos + eliminación
  rondas: Ronda[];
  // liga
  fechas: Fecha[];
  // grupos + eliminación
  grupos: Grupo[];
  cantidadGrupos: number;
  clasifican: number;
  clasificados: string[];
  // doble eliminación
  doble: PartidoDoble[];
};

// los torneos guardados antes de que hubiera deportes y formatos eran todos de eliminación
function completar(guardado: Partial<Torneo> & Pick<Torneo, 'id' | 'nombre'>): Torneo {
  const deporte = guardado.deporte ?? 'otro';

  return {
    deporteOtro: '',
    formato: 'eliminacion',
    puntos: obtenerDeporte(deporte).puntos,
    participantes: [],
    lugares: 4,
    rondas: [],
    fechas: [],
    grupos: [],
    cantidadGrupos: 2,
    clasifican: 2,
    clasificados: [],
    doble: [],
    ...guardado,
    deporte,
  };
}

const CLAVE_STORAGE = 'quickfix:torneos';

type TorneosContextValue = {
  torneos: Torneo[];
  cargando: boolean;
  setTorneos: Dispatch<SetStateAction<Torneo[]>>;
  actualizarTorneo: (id: string, cambios: Partial<Torneo>) => void;
  borrarTorneo: (id: string) => void;
};

const TorneosContext = createContext<TorneosContextValue | null>(null);

export function TorneosProvider({ children }: { children: ReactNode }) {
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [cargando, setCargando] = useState(true);
  // hasta que termine de leer lo guardado, no hay que grabar nada: si no, el
  // primer guardado (con torneos todavía en []) pisaría lo que ya había
  const yaLeyo = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(CLAVE_STORAGE)
      .then((guardado) => {
        if (guardado) {
          setTorneos(JSON.parse(guardado).map(completar));
        }
      })
      .catch(() => {
        // si lo guardado está corrupto, arranca vacío en vez de romper la app
      })
      .finally(() => {
        yaLeyo.current = true;
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (!yaLeyo.current) {
      return;
    }

    AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(torneos)).catch(() => {});
  }, [torneos]);

  function actualizarTorneo(id: string, cambios: Partial<Torneo>) {
    setTorneos((anteriores) =>
      anteriores.map((torneo) => (torneo.id === id ? { ...torneo, ...cambios } : torneo))
    );
  }

  function borrarTorneo(id: string) {
    setTorneos((anteriores) => anteriores.filter((torneo) => torneo.id !== id));
  }

  return (
    <TorneosContext.Provider
      value={{ torneos, cargando, setTorneos, actualizarTorneo, borrarTorneo }}>
      {children}
    </TorneosContext.Provider>
  );
}

export function useTorneos() {
  const context = useContext(TorneosContext);

  if (!context) {
    throw new Error('useTorneos se tiene que usar adentro de TorneosProvider');
  }

  return context;
}

export function useTorneo(id: string | undefined) {
  const { torneos } = useTorneos();

  return torneos.find((torneo) => torneo.id === id);
}
