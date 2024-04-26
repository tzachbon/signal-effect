import { describe, it, expect, vi } from 'vitest';
import { Signal } from 'signal-polyfill';
import { effect } from './index';

describe('effect', () => {
  it('effect initially runs the provided callback', () => {
    const mockCallback = vi.fn();
    effect(mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('effect re-evaluates when the dependent signal changes', async () => {
    const state = new Signal.State(0);
    const mockCallback = vi.fn(() => state.get());

    effect(mockCallback as () => void);
    state.set(1);

    await waitForNextMicrotask();

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('effect clean-up function is called on disposal', () => {
    const cleanup = vi.fn();
    const mockCallback = vi.fn(() => cleanup);

    const dispose = effect(mockCallback);
    dispose();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('effect unsubscribes from signals on disposal', async () => {
    const state = new Signal.State(0);
    const mockCallback = vi.fn(() => state.get());

    const dispose = effect(mockCallback as () => void);
    dispose();

    state.set(1);

    await waitForNextMicrotask();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('errors in the effect callback are caught', async () => {
    const mockCallback = vi.fn(() => {
      throw new Error('Test error');
    });

    expect(() => {
      effect(mockCallback);
    }).toThrow(new Error('Test error'));
  });

  it('effect handles rapid consecutive signal changes gracefully', async () => {
    const state = new Signal.State(0);
    const mockCallback = vi.fn(() => state.get());

    effect(mockCallback as () => void);
    state.set(1);
    state.set(2);
    state.set(3);

    await waitForNextMicrotask();

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('effect handles cases where callback does not return a function', () => {
    const mockCallback = vi.fn(() => null);
    const dispose = effect(mockCallback as () => void);

    expect(() => {
      dispose();
    }).not.toThrow(TypeError);

    expect(() => dispose()).not.toThrow();
  });
});

function waitForNextMicrotask() {
  return Promise.resolve();
}
