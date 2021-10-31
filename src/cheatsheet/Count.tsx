import React from 'react';
import { usePageStore } from './store';

export const Count: React.FC = ({ children }) => {
  const hide = usePageStore((v) => v.hideTableCount);
  if (hide) {
    return null;
  }
  return <span className={'text-xs font-thin'}>({children})</span>;
};
