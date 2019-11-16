// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import ReactDOM = require('react-dom');
import React = require('react');
import { MyReactButton } from './myreactbutton';

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions as any)[type]);
  }

  ReactDOM.render(<MyReactButton/>, document.getElementById('idReactMain'));
});
