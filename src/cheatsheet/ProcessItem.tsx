import classNames from 'classnames';
import React, { ReactNode, useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import shallow from 'zustand/shallow';
import { data } from './data';
import { usePageStore } from './store';
import { Itto, IttoRef } from './typing';

function useItemPref(name) {
  return usePageStore(
    useCallback(
      ({ preferConflict, preferAbbr, selectedName }) => ({
        preferConflict,
        preferAbbr,
        selected: selectedName === name,
      }),
      [name],
    ),
    shallow,
  );
}

export const ProcessItem: React.FC<{ value: IttoRef | Itto } & React.HTMLAttributes<HTMLDivElement>> = ({
  value,
  className,
  ...rest
}) => {
  if (!value) {
    return null;
  }
  const refName = value['refName'] || value.name;
  const { preferConflict: prefer, preferAbbr, selected } = useItemPref(refName);
  const o: IttoRef & Itto = Object.assign({}, data.ittoByName[refName], value, value[prefer]);
  const { rate, highlight, abbr } = o;
  let name = o.name || '';
  if (preferAbbr && abbr) {
    name = abbr;
  }

  const highlightClasses = 'text-red-500 print:text-black print:font-bold';
  const selectedClasses = 'text-green-500 font-bold print:text-black print:font-normal';
  const props: React.HTMLAttributes<HTMLSpanElement> = {
    className: classNames(className, rate && highlightClasses, selected && selectedClasses),
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
  return (
    <span
      onClick={() => {
        if (refName !== usePageStore.getState().selectedName) {
          usePageStore.setState({ selectedName: refName });
        } else {
          usePageStore.setState((s) => {
            s.selectedName = undefined;
          });
        }
      }}
      {...props}
    />
  );
};

function isEmpty(v) {
  return v === '' || v === null;
}
