import {
  createContext,
  useContext,
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

type TorneosContextValue = {
  torneos: Torneo[];
  setTorneos: Dispatch<SetStateAction<Torneo[]>>;
};

const TorneosContext = createContext<TorneosContextValue | null>(null);

export function TorneosProvider({ children }: { children: ReactNode }) {
  const [torneos, setTorneos] = useState<Torneo[]>([]);

  return (
    <TorneosContext.Provider value={{ torneos, setTorneos }}>{children}</TorneosContext.Provider>
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
