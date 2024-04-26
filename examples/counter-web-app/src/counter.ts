import { Signal } from 'signal-polyfill';
import { effect } from 'signal-effect';

export function setupCounter(element: HTMLButtonElement) {
  const counter = new Signal.State(0);

  effect(() => (element.innerText = String(counter.get())));

  element.addEventListener('click', () => counter.set(counter.get() + 1));
}
