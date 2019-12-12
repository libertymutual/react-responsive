/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Show } from '../src';
import fireResizeEvent from './utilities/fireResizeEvent';

beforeEach(() => {
  window.innerWidth = 1000;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
  cleanup();
});

describe('Show', () => {
  test('hides if threshold matches xs', async () => {
    const { container, getByText } = render(<Show thresholds="xs">Test</Show>);

    const { firstChild } = container;

    expect(firstChild).toBeNull();

    act(() => fireResizeEvent(0));

    expect(getByText('Test')).toBeDefined();
  });

  test('hides if threshold matches xs passed as array', async () => {
    const { container, getByText } = render(<Show thresholds={['xs', 'sm']}>Test</Show>);

    const { firstChild } = container;

    expect(firstChild).toBeNull();

    act(() => fireResizeEvent(0));

    expect(getByText('Test')).toBeDefined();
  });
});
