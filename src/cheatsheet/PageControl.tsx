import { Checkbox } from '@blueprintjs/core';
import React from 'react';
import { usePageStore } from './store';

export const PageControl = () => {
  const state = usePageStore();
  return (
    <div className={'fixed right-4 top-4 screen-o z-50'}>
      <div className={'px-2 py-4 rounded bg-gray-200 w-40'}>
        <h4 className={'bp3-heading'}>页面控制</h4>
        <Checkbox
          checked={state.hideTableCount}
          onChange={() => usePageStore.setState({ hideTableCount: !state.hideTableCount })}
        >
          隐藏数量
        </Checkbox>
      </div>
    </div>
  );
};
