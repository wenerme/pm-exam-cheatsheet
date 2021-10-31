import React from 'react';

export const ControlAnchor: React.FC = ({ children }) => {
  return (
    <div className={'relative w-full screen-only'}>
      <div className={'absolute mt-2 p-2 rounded bg-gray-100 text-gray-800'}>{children}</div>
    </div>
  );
};
