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

import type { Ronda } from '@/utils/fixture';

export type Torneo = {
  id: string;
  nombre: string;
  participantes: string[];
  lugares: number;
  rondas: Ronda[];
};

const CLAVE_STORAGE = 'quickfix:torneos';

type TorneosContextValue = {
  torneos: Torneo[];
  cargando: boolean;
  setTorneos: Dispatch<SetStateAction<Torneo[]>>;
  actualizarTorneo: (id: string, cambios: Partial<Torneo>) => void;
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
          setTorneos(JSON.parse(guardado));
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

  return (
    <TorneosContext.Provider value={{ torneos, cargando, setTorneos, actualizarTorneo }}>
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
