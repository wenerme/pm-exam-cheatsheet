import React from 'react';
import { BlueprintStylePage } from '../components/BlueprintStylePage';
import { ControlAnchor } from './ControlAnchor';
import { IttoList } from './IttoList';
import { PageControl } from './PageControl';
import { ProcessTable } from './ProcessTable';
import { data } from './data';
import './page.css';

const Page: React.FC = ({ children }) => {
  return (
    <BlueprintStylePage>
      <PageControl />
      <div
        className={'px-2 py-4 flex flex-col items-center gap-2 mx-auto relative border-l border-r print:border-none'}
        style={{ width: '29.7cm' }}
      >
        {children}
      </div>
    </BlueprintStylePage>
  );
};

export const CheatSheetPage: React.FC = () => {
  return (
    <Page>
      <h3 className={'bp3-heading'}>软考知识总结</h3>
      <ControlAnchor>默写</ControlAnchor>
      <ProcessTable />
      <IttoList />

      <div className={'screen-only'}>
        <h5 className={'bp3-heading'}>ITTO 统计</h5>
        <div>ITTO: {data.items.length}</div>
      </div>
    </Page>
  );
};
