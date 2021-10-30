import classNames from 'classnames';
import React from 'react';
import { ProcessItem } from './ProcessItem';
import { Process } from './typing';

export const IttoTable: React.FC<{ process: Process }> = ({ process }) => {
  const { in: input, out, tt } = process;
  const n = Math.max(input.length, out.length, tt.length);

  return (
    <table
      className={classNames(
        'border bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped',
        'text-base',
      )}
    >
      <caption>{process.name}</caption>
      <thead>
        <tr>
          <th>输入</th>
          <th>工具</th>
          <th>输出</th>
        </tr>
      </thead>
      <tbody>
        {Array(n)
          .fill(0)
          .map((_, i) => {
            return (
              <tr key={i}>
                <td>
                  <ProcessItem value={input[i]} />
                </td>
                <td>
                  <ProcessItem value={tt[i]} />
                </td>
                <td>
                  <ProcessItem value={out[i]} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
