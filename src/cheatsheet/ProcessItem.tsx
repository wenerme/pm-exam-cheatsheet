import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Highlighter from 'react-highlight-words';
import { usePageStore } from './store';
import { Item, ItemRef } from './typing';

function useItemPref() {
  return usePageStore(({ preferConflict, preferAbbr }) => ({ preferConflict, preferAbbr }));
}

export const ProcessItem: React.FC<{ value: ItemRef | Item } & React.HTMLAttributes<HTMLDivElement>> = ({
  value,
  className,
  ...rest
}) => {
  if (!value) {
    return null;
  }
  const { preferConflict: prefer, preferAbbr } = useItemPref();
  const o: ItemRef = Object.assign({}, value, value[prefer]);
  const { rate, highlight } = o;
  let name = o.name || '';
  // if (value[prefer]) {
  //   console.log(`conflict`, value, o);
  // }

  const highlightClasses = 'text-red-500 print:text-black print:font-bold';
  const props: React.HTMLAttributes<HTMLSpanElement> = {
    className: classNames(className, rate && highlightClasses),
    ...rest,
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
  // if (name.length >= 8) {
  //   props.className += 'text-xs';
  // } else if (name.length >= 6) {
  //   props.className += 'text-sm';
  // }

  let content: ReactNode = name;

  if (highlight) {
    content = (
      <Highlighter
        highlightClassName={highlightClasses}
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
  if (props.children) {
    const last = props.children;
    const lastContent = content;
    content = (
      <>
        {lastContent}
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
