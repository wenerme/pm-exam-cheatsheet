import create from 'zustand';

export interface PageStore {
  hideTableCount?: boolean;
  conflictPrefer: string | 'mid' | 'hi' | 'pmp';
}

export const usePageStore = create<PageStore>(() => {
  return {
    hideTableCount: false,
    conflictPrefer: 'mid',
  };
});

const conflictPrefer = (v) => v.conflictPrefer;

export function useConflictPrefer() {
  return usePageStore(conflictPrefer);
}
