import { Signal } from 'signal-polyfill';

let pending = false;

const watcher = new Signal.subtle.Watcher(() => {
  if (!pending) {
    pending = true;
    queueMicrotask(handleWatchEmitted());
  }
});

function handleWatchEmitted(): () => void {
  return () => {
    pending = false;
    for (let pendingSignal of watcher.getPending()) {
      pendingSignal.get();
    }

    watcher.watch();
  };
}

type DisposeCallback = (() => void) | void;

export function effect(callback: () => DisposeCallback): () => void {
  let disposeCallback: DisposeCallback;

  const computedSignal = new Signal.Computed(() => {
    if (typeof disposeCallback === 'function') {
      disposeCallback();
    }

    disposeCallback = callback();
  });

  watcher.watch(computedSignal);
  computedSignal.get();

  return () => {
    if (typeof disposeCallback === 'function') {
      disposeCallback();
    }

    watcher.unwatch(computedSignal);
  };
}
