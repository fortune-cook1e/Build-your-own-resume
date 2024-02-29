'use client';

import { SectionItem, SectionKey } from '@/web/types/entity/resume/sections';
import { ReactNode, createContext, useContext, useRef } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';

export type Mode = 'create' | 'update';

export type Payload = null | SectionItem;
interface SectionState {
  open: boolean;
  id: SectionKey;
  mode: Mode;
  payload: Payload;
}

interface SectionActions {
  setOpen: {
    on: () => void;
    off: () => void;
  };
  setCreateMode: () => void;
  setUpdateMode: () => void;
  setMode: (mode: Mode) => void;
  setId: (id: SectionKey) => void;
  setPayload: (item: null | Payload) => void;
}

type SectionStore = SectionState & SectionActions;

const createSectionStore = () =>
  createStore<SectionStore>()((set) => {
    return {
      open: false,
      id: 'profiles',
      mode: 'create',
      payload: null,

      setOpen: {
        on: () => set((state) => ({ ...state, open: true })),
        off: () => set((state) => ({ ...state, open: false })),
      },

      setCreateMode: () => set((state) => ({ ...state, mode: 'create' })),
      setUpdateMode: () => set((state) => ({ ...state, mode: 'update' })),
      setMode: (mode) => set((state) => ({ ...state, mode })),
      setId: (id) => set((state) => ({ ...state, id })),

      setPayload: (payload) => set((state) => ({ ...state, payload })),
    };
  });

const SectionContext = createContext<StoreApi<SectionStore> | null>(null);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<SectionStore>>();
  if (!storeRef.current) {
    storeRef.current = createSectionStore();
  }

  return (
    <SectionContext.Provider value={storeRef.current}>
      {children}
    </SectionContext.Provider>
  );
};

export function useSectionContext(): SectionState & SectionActions;
export function useSectionContext<T>(
  selector: (state: SectionState & SectionActions) => T,
): T;
export function useSectionContext<T>(
  selector?: (state: SectionState & SectionActions) => T,
): T | (SectionState & SectionActions) {
  const store = useContext(SectionContext);
  if (!store) {
    throw new Error(
      'useSectionStoreContext must be used within a SectionProvider',
    );
  }
  return useStore(store, selector!);
}
