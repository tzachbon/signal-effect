![signal-effect)](https://github.com/tzachbon/signal-effect/assets/45866571/25baf708-8ffb-4ab0-b223-d60cce494236)

# Signal Effect

Simple `effect(() => {})` method based on the [tc39/proposal-signals](https://github.com/tc39/proposal-signals)

> Disclaimer: It uses "signal-polyfill" until the proposal is accepted and implemented in the browsers.

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
