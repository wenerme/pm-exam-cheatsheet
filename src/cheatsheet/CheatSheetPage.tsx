import React from 'react';
import { BlueprintStylePage } from '../components/BlueprintStylePage';
import { ControlAnchor } from './ControlAnchor';
import { Count } from './Count';
import { IttoList } from './IttoList';
import { PageControl } from './PageControl';
import { ProcessItem } from './ProcessItem';
import { ProcessTable } from './ProcessTable';
import { data } from './data';
import './page.css';
import planContent from './plan-content.yaml';

const Page: React.FC = ({ children }) => {
  return (
    <BlueprintStylePage>
      <PageControl />
      <div
        className={
          'px-4 py-4 pb-12 print:pb-0 flex flex-col items-center gap-2 mx-auto relative border-l border-r print:border-none'
        }
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
      <div>
        by <a href="https://github.com/wenerme">github.com/wenerme</a>
      </div>
      <ControlAnchor>默写</ControlAnchor>
      <ProcessTable />
      <IttoList />

      <div className={'screen-only'}>
        <h5 className={'bp3-heading'}>ITTO 统计</h5>
        <div>ITTO: {data.itto.length}</div>
      </div>

      <h4 className={'bp3-heading'}>项目管理计划内容</h4>
      <div className={'flex flex-wrap'}>
        {planContent.plans.map((v, i) => (
          <ProcessItem className={'p-2'} key={i} value={v} />
        ))}
      </div>
      <h4 className={'bp3-heading'}>项目文件</h4>
      <div className={'flex flex-wrap'}>
        {planContent.files.map((v, i) => (
          <ProcessItem className={'p-2'} key={i} value={v} />
        ))}
      </div>
      <h4 className={'bp3-heading'}>
        工具和技术<Count>{data.itto.filter((v) => v.as === 'tt').length}</Count>
      </h4>
      <div className={'flex flex-wrap'}>
        {data.itto
          .filter((v) => v.as === 'tt')
          .sort((a, b) => b.refs.length - a.refs.length)
          .map((v, i) => (
            <ProcessItem className={'p-2'} key={i} value={v}>
              {v.refs.length > 1 && <Count>{v.refs.length}</Count>}
            </ProcessItem>
          ))}
      </div>
    </Page>
  );
};
