"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
//import { launchLink } from './funny'
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var reactmain_1 = require("./reactmain");
window.addEventListener('DOMContentLoaded', function () {
    // let myBtn = document.getElementById("idBtn");
    // myBtn.addEventListener("click", (event) => {
    //   launchLink();
    // })
    var replaceText = function (selector, text) {
        console.log(selector);
        console.log(text);
        var element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
        var type = _a[_i];
        replaceText(type + "-version", process.versions[type]);
    }
    react_dom_1.default.render(react_1.default.createElement(reactmain_1.MyReactButton, null), document.getElementById('idReactMain'));
});
// let myBtn = document.getElementById("idBtn");
//   myBtn.addEventListener("click", (event) => {
//     launchLink();
//   })
//# sourceMappingURL=preload.js.map