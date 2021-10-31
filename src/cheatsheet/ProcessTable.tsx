import classNames from 'classnames';
import React from 'react';
import { Count } from './Count';
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
            <Count>{data.processes.length}</Count>
          </th>
          {data.groups.map((v) => (
            <th key={v.name}>
              {v.name}
              <Count>{v.processCount}</Count>
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
                <Count>{v.processCount}</Count>
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
