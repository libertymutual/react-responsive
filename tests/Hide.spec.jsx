/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { Hide } from '../src';
import fireResizeEvent from './utilities/fireResizeEvent';

beforeEach(() => {
  window.innerWidth = 1000;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
  cleanup();
});

describe('Hide', () => {
  test('hides if threshold matches xs', async () => {
    const { container, getByText } = render(<Hide thresholds="xs">Test</Hide>);
    expect(getByText('Test')).toBeDefined();

    act(() => fireResizeEvent(0));

    const { firstChild } = container;

    expect(firstChild).toBeNull();
  });

  test('hides if threshold matches xs passed as array', async () => {
    const { container, getByText } = render(<Hide thresholds={['xs', 'sm']}>Test</Hide>);
    expect(getByText('Test')).toBeDefined();

    act(() => fireResizeEvent(0));

    const { firstChild } = container;

    expect(firstChild).toBeNull();
  });
});
