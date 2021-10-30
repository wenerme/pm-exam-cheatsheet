import React from 'react';
import { BlueprintStylePage } from '../components/BlueprintStylePage';
import { IttoTable } from './IttoTable';
import { PageControl } from './PageControl';
import { ProcessTable } from './ProcessTable';
import { data } from './data';
import './page.css';

const Page: React.FC = ({ children }) => {
  return (
    <BlueprintStylePage>
      <PageControl />
      <div className={'p-4 flex flex-col items-center gap-2 mx-auto relative'} style={{ width: '29.7cm' }}>
        {children}
      </div>
    </BlueprintStylePage>
  );
};

export const CheatSheetPage: React.FC = () => {
  return (
    <Page>
      <h3 className={'bp3-heading'}>软考知识总结</h3>
      <ProcessTable />
      <h4 className={'bp3-heading'}>过程 ITTO</h4>
      <h5 className={'bp3-heading'}>
        <a>整体管理</a>
      </h5>
      <div className={'flex flex-wrap justify-center gap-y-4'}>
        <IttoTable process={data.processes[0]} />
        <IttoTable process={data.processes[1]} />
        <IttoTable process={data.processes[2]} />
      </div>
    </Page>
  );
};
