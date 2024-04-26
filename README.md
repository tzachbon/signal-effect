<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="888px" height="443px" viewBox="0 0 888 443" version="1.1" style="background: rgb(247, 247, 247); baseline-shift: 0px; clip-rule: nonzero; color: rgb(0, 0, 0); color-interpolation: srgb; color-interpolation-filters: linearrgb; color-rendering: auto; cursor: auto; direction: ltr; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: nonzero; font: 400 16px / 18.4px Nunito, sans-serif; image-rendering: auto; letter-spacing: normal; marker: none; overflow: hidden; paint-order: normal; pointer-events: auto; shape-rendering: auto; stroke: none; stroke-dasharray: none; stroke-dashoffset: 0px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 1px; text-anchor: start; text-decoration: none solid rgb(0, 0, 0); text-rendering: auto; visibility: visible; word-spacing: 0px; writing-mode: horizontal-tb;"><defs style="baseline-shift: 0px; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><linearGradient x1="87.9681034%" y1="50%" x2="1.27351722%" y2="50%" id="linearGradient-1" style="baseline-shift: 0px; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><stop stop-color="#1F202E" offset="0%" style="baseline-shift: 0px; paint-order: normal; stop-color: rgb(31, 32, 46); text-decoration: none solid rgb(0, 0, 0);"/><stop stop-color="#865A3C" offset="67.6877392%" style="baseline-shift: 0px; paint-order: normal; stop-color: rgb(134, 90, 60); text-decoration: none solid rgb(0, 0, 0);"/><stop stop-color="#1F202E" offset="100%" style="baseline-shift: 0px; paint-order: normal; stop-color: rgb(31, 32, 46); text-decoration: none solid rgb(0, 0, 0);"/></linearGradient></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="Arial-BoldMT, Arial" font-weight="bold" style="baseline-shift: 0px; fill: none; fill-rule: evenodd; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: 700; line-height: 18.4px; font-family: Arial-BoldMT, Arial; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><g id="gh-banner" style="baseline-shift: 0px; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><text id="gh-title-reflection" fill="url(#linearGradient-1)" font-size="48" style="baseline-shift: 0px; display: block; fill: url(&quot;#linearGradient-1&quot;); font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-size: 48px; line-height: 55.2px; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><tspan x="444" y="234" text-anchor="middle" style="baseline-shift: 0px; paint-order: normal; text-anchor: middle; text-decoration: none solid rgb(0, 0, 0);">Signal Effect</tspan></text><text id="gh-title-reflection-copy" font-size="18" fill="#4D4E56" style="baseline-shift: 0px; display: block; fill: rgb(77, 78, 86); font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-size: 18px; line-height: 20.7px; paint-order: normal; text-decoration: none solid rgb(0, 0, 0);"><tspan x="444" y="309" text-anchor="middle" style="baseline-shift: 0px; paint-order: normal; text-anchor: middle; text-decoration: none solid rgb(0, 0, 0);">Simple effect(() =&gt; {}) method based on the tc39/proposal-signals</tspan></text></g></g></svg>

# Signal Effect

Simple `effect(() => {})` method based on the [tc39/proposal-signals](https://github.com/tc39/proposal-signals)

> Disclaimer: It uses "signal-polyfill" until the proposal is accepted and it is required

## Install

```bash
npm install --save signal-effect signal-polyfill
```

## Usage

```js
// polyfill for signal
import { Signal } from 'signal-polyfill';


import { effect } from 'signal-effect'

const counter = new Signal.State(0);

effect(() => element.innerText = counter.get());

// Simulate external updates to counter...
setInterval(() => counter.set(counter.get() + 1), 1000);
```