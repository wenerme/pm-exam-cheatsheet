import classNames from 'classnames';
import React from 'react';
import { ProcessCount } from './ProcessCount';
import { data, groupNames } from './data';

export const ProcessTable = (props) => {
  return (
    <table
      className={classNames(
        'border bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped',
        'text-base',
      )}
    >
      <thead>
        <tr>
          <th>
            知识领域
            <ProcessCount>{data.processes.length}</ProcessCount>
          </th>
          {data.groups.map((v) => (
            <th key={v.name}>
              {v.name}
              <ProcessCount>{v.processCount}</ProcessCount>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.domains.map((v, i) => {
          return (
            <tr key={i}>
              <td>
                <span className={'font-semibold'}>{v.name}</span>
                <ProcessCount>{v.processCount}</ProcessCount>
              </td>
              {groupNames.map((n) => (
                <td key={n}>
                  <ul>
                    {v[n]?.map((pn) => (
                      <li key={pn.name}>{pn.name}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
