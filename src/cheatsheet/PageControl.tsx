import { Button, Checkbox, Radio, RadioGroup } from '@blueprintjs/core';
import React from 'react';
import { HiAdjustments } from 'react-icons/hi';
import { SelectedItem } from './SelectedItem';
import { usePageStore } from './store';

export const PageControl = () => {
  const state = usePageStore();
  return (
    <div className={'fixed right-4 top-4 screen-only z-50'}>
      <div className={'px-2 py-4 rounded bg-gray-200 w-40 flex flex-col gap-1'}>
        <h4 className={'bp3-heading'}>
          <HiAdjustments />
        </h4>
        <Checkbox
          checked={state.hideTableCount}
          onChange={() => usePageStore.setState({ hideTableCount: !state.hideTableCount })}
        >
          隐藏数量
        </Checkbox>
        <Checkbox checked={state.preferAbbr} onChange={() => usePageStore.setState({ preferAbbr: !state.preferAbbr })}>
          缩写常见 ITTO
        </Checkbox>

        <RadioGroup
          label="冲突显示"
          onChange={(e) => {
            usePageStore.setState({ preferConflict: e.target['value'] });
          }}
          selectedValue={state.preferConflict}
        >
          <Radio label="中项" value="mid" />
          <Radio label="高项" value="hi" />
        </RadioGroup>
        <SelectedItem />
        <div>
          <Button icon={'print'} text={'打印'} onClick={() => window.print()} />
        </div>
      </div>
    </div>
  );
};
