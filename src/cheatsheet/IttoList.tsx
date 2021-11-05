import { Checkbox, Radio, RadioGroup } from '@blueprintjs/core';
import React from 'react';
import { useImmer } from 'use-immer';
import { ControlAnchor } from './ControlAnchor';
import { IttoTable } from './IttoTable';
import { data } from './data';
import { Domain, ProcessGroup } from './typing';

export const IttoList = () => {
  const [state, update] = useImmer({ order: 'groups' });
  return (
    <>
      <h4 className={'bp3-heading'}>过程 ITTO</h4>
      <ControlAnchor>
        <RadioGroup
          label="排序"
          onChange={(e) => {
            update((s) => {
              s.order = e.target['value'];
            });
          }}
          selectedValue={state.order}
        >
          <Radio label="过程组" value="groups" />
          <Radio label="知识域" value="domains" />
        </RadioGroup>
      </ControlAnchor>
      {data[state.order].map((v) => {
        return <IttoGroup value={v} key={v.name} />;
      })}
    </>
  );
};
const IttoGroup: React.FC<{ value: Domain | ProcessGroup }> = ({ value }) => {
  return (
    <>
      <h5 className={'bp3-heading mt-4'}>
        <a>{value.name}</a>
      </h5>
      <div className={'grid md:grid-cols-2 xl:grid-cols-3 print:grid-cols-3 gap-x-1 gap-y-4 items-start'}>
        {value.processes.map((v) => {
          return <IttoTable key={v.name} process={v} />;
        })}
      </div>
    </>
  );
};
