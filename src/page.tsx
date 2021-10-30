import React, { ComponentClass, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import './global.css';

export interface RenderPageOptions<P> {
  props?: P;
  root?: string;
}

export function renderPage<P = any>(
  Page: FunctionComponent<P> | ComponentClass<P> | string,
  opts?: RenderPageOptions<P>,
) {
  const o = Object.assign({ root: 'root' }, opts);
  ReactDOM.render(
    <React.StrictMode>
      <Page {...(o.props as P)} />
    </React.StrictMode>,
    document.getElementById(o.root),
  );
}
