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
    for (const pendingSignal of watcher.getPending()) {
      pendingSignal.get();
    }

    watcher.watch();
  };
}

export function effect<DISPOSE_FN = () => void>(
  callback: () => DISPOSE_FN,
): () => void {
  let disposeCallback: DISPOSE_FN;

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
