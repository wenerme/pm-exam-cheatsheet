import create from 'zustand';

export interface PageStore {
  hideTableCount?: boolean;
}

export const usePageStore = create<PageStore>(() => {
  return {
    hideTableCount: false,
  };
});
