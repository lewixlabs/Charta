"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var funny_1 = require("./funny");
window.addEventListener('DOMContentLoaded', function () {
    var myBtn = document.getElementById("idBtn");
    myBtn.addEventListener("click", function (event) {
        funny_1.launchLink();
    });
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
});
// let myBtn = document.getElementById("idBtn");
//   myBtn.addEventListener("click", (event) => {
//     launchLink();
//   })
