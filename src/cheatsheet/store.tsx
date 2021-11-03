import create from 'zustand';

export interface PageStore {
  hideTableCount?: boolean;
  preferConflict: string | 'mid' | 'hi' | 'pmp';
  preferAbbr?: boolean;
  selectedName?: string;
}

export const usePageStore = create<PageStore>(() => {
  return {
    hideTableCount: false,
    preferConflict: 'mid',
    preferAbbr: true,
  };
});
