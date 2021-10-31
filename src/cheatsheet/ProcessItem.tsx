import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Highlighter from 'react-highlight-words';
import { useConflictPrefer } from './store';
import { ItemRef } from './typing';

export const ProcessItem: React.FC<{ value: ItemRef }> = ({ value }) => {
  if (!value) {
    return null;
  }
  const prefer = useConflictPrefer();
  const o: ItemRef = Object.assign({}, value, value[prefer]);
  const { rate, highlight } = o;
  let name = o.name || '';
  // if (value[prefer]) {
  //   console.log(`conflict`, value, o);
  // }

  const props: React.HTMLAttributes<HTMLSpanElement> = {
    className: classNames(rate && 'text-red-500'),
  };
  let conflictNote = '';
  if (value.name && isEmpty(value.mid?.name)) {
    conflictNote = '高项';
    name = value.name;
  } else if (!value.name && value.mid?.name) {
    conflictNote = '中项';
    name = value.mid.name;
  }

  // 考虑 autofit
  if (name.length >= 8) {
    props.className += 'text-xs';
  } else if (name.length >= 6) {
    props.className += 'text-sm';
  }
  let content: ReactNode = name;

  if (highlight) {
    content = (
      <Highlighter
        highlightClassName="text-red-500"
        highlightTag={'span'}
        searchWords={[highlight]}
        autoEscape={true}
        textToHighlight={name}
      />
    );
  }
  if (conflictNote) {
    const last = content;
    content = (
      <>
        <span className={'text-xs text-gray-500'}>{conflictNote}:</span>
        {last}
      </>
    );
  }
  props.children = content;
  return <span {...props} />;
};

function isEmpty(v) {
  return v === '' || v === null;
}
