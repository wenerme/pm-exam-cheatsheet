import { Button } from '@blueprintjs/core';
import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { Count } from './Count';
import { data } from './data';
import { usePageStore } from './store';

export const SelectedItem: React.FC = () => {
  const { selectedName } = usePageStore(({ selectedName }) => ({ selectedName }), shallow);
  if (!selectedName) {
    return null;
  }
  const itto = data.ittoByName[selectedName];
  if (!itto) {
    return null;
  }
  const refs = _.groupBy(itto.refs, 'as');
  return (
    <div>
      <h5 className={'bp3-heading'}>{selectedName}</h5>
      {itto.mid?.name && (
        <div>
          <b>中项</b>: <mark>{itto.mid.name}</mark>
        </div>
      )}
      <RefList title={'输出过程'} items={refs['out']} />
      <RefList title={'用于过程输入'} items={refs['in']} />
      <RefList title={'用于过程'} items={refs['tt']} />
      <RefList title={'由过程更新'} items={itto.updatedBy} />
    </div>
  );
};

const RefList = ({ items, title }) => {
  const [open, setOpen] = useState(true);
  if (!items?.length) {
    return null;
  }
  return (
    <div className={'pt-2 overflow-auto'}>
      <h6 className={'bp3-heading flex justify-between items-center pr-1'}>
        <span>
          {title}
          <Count>{items.length}</Count>
        </span>
        <Button minimal small icon={open ? 'collapse-all' : 'expand-all'} onClick={() => setOpen(!open)} />
      </h6>
      <ul className={classNames(!open && 'hidden')}>
        {items.map((v, i) => (
          <li key={i}>{v.process}</li>
        ))}
      </ul>
    </div>
  );
};
