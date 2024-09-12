import { describe, it, expect } from 'vitest';
import { setupCounter } from './counter';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('setupCounter', () => {
  it('should update the counter text and increment on click', async () => {
    // Mock the HTMLButtonElement
    const element = document.createElement('button');

    // Setup the counter with the mocked element
    setupCounter(element);

    // Initial text should be "0"
    expect(element.innerText).toBe('0');

    // Simulate a click event on the button
    element.click();

    await sleep(100);

    // After one click, the counter should be incremented to "1"
    expect(element.innerText).toBe('1');

    // Simulate another click event
    element.click();

    await sleep(100);

    // After two clicks, the counter should be incremented to "2"
    expect(element.innerText).toBe('2');
  });
});
