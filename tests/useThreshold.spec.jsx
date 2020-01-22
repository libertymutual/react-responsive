import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { useThreshold } from '../src';
import fireResizeEvent from './utilities/fireResizeEvent';

const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 960,
  xl: 1280
};

beforeEach(() => {
  window.innerWidth = 1000;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
  cleanup();
});

// Test component that uses the Hook
function MockComponent() {
  const mockComponent = useThreshold();
  return <span>{mockComponent}</span>;
}
describe('useThreshold', () => {
  test('should render xs', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.xs));

    expect(span.textContent).toBe('xs');
  });

  test('should render sm', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.sm));

    expect(span.textContent).toBe('sm');
  });

  test('should render md', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.md));

    expect(span.textContent).toBe('md');
  });

  test('should render lg', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.lg));

    expect(span.textContent).toBe('lg');
  });

  test('should render xl', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.xl));

    expect(span.textContent).toBe('xl');
  });
});
