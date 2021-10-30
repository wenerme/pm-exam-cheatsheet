import classNames from 'classnames';
import React from 'react';
import { ItemRef } from './typing';

export const ProcessItem: React.FC<{ value: ItemRef }> = ({ value }) => {
  if (!value) {
    return null;
  }
  const { name, html, rate } = value;
  const props: React.HTMLAttributes<HTMLSpanElement> = {
    className: classNames(rate && 'text-red-500'),
  };
  if (html) {
    props.dangerouslySetInnerHTML = { __html: html };
  } else {
    props.children = name;
  }
  return <span {...props} />;
};
