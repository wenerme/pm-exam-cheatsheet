import _ from 'lodash';
import React from 'react';
import shallow from 'zustand/shallow';
import { ProcessItem } from './ProcessItem';
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
      <RefList title={'输出过程'} items={refs['out']} />
      <RefList title={'用于过程输入'} items={refs['in']} />
      <RefList title={'用于过程'} items={refs['tt']} />
    </div>
  );
};

const RefList = ({ items, title }) => {
  if (!items) {
    return null;
  }
  return (
    <div className={'pt-2'}>
      <h6 className={'bp3-heading'}>{title}</h6>
      <ul>
        {items.map((v) => (
          <li id={v.id}>{v.process}</li>
        ))}
      </ul>
    </div>
  );
};
