// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
//import { launchLink } from './funny'
import React from 'react';
import ReactDOM from 'react-dom';
import { MyReactButton } from './reactmain';

window.addEventListener('DOMContentLoaded', () => {
  // let myBtn = document.getElementById("idBtn");
  // myBtn.addEventListener("click", (event) => {
  //   launchLink();
  // })

  const replaceText = (selector, text) => {
    console.log(selector)
    console.log(text)
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  ReactDOM.render(<MyReactButton/>, document.getElementById('idReactMain'));
  
})

// let myBtn = document.getElementById("idBtn");
//   myBtn.addEventListener("click", (event) => {
//     launchLink();
//   })


