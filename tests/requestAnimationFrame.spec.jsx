import React from 'react';
import { render, cleanup, getByTestId, act } from '@testing-library/react';
import { useThreshold, WithThreshold } from '../src';
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
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
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
describe('re-renders do not happen if requestAnimationFrame fails', () => {
  test('should not re-render', () => {
    const component = <MockComponent />;
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(breakpoints.xs));

    expect(span.textContent).toBe('lg');

    // fire twice as it will already be failed
    act(() => fireResizeEvent(breakpoints.xs));

    expect(span.textContent).toBe('lg');
  });

  test('should not re-render', async () => {
    const componentWithTime = () => <span data-testid="testId">{Date.now().toString()}</span>;
    const HigherOrderComponent = WithThreshold()(componentWithTime);
    const { container } = render(<HigherOrderComponent />);
    const thresholdRendered = getByTestId(container, 'testId').innerHTML;

    act(() => fireResizeEvent(breakpoints.xs));

    const thresholdNoUpdated = getByTestId(container, 'testId').innerHTML;
    expect(thresholdNoUpdated).toEqual(thresholdRendered);
    // fire twice as it will already be failed
    act(() => fireResizeEvent(breakpoints.xs));

    expect(thresholdNoUpdated).toEqual(thresholdRendered);
  });
});
