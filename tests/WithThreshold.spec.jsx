/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { render, cleanup, getByText, getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import WithThreshold from '../src/WithThreshold';
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

const component = props => <span>{props.threshold}</span>;

describe('WithThreshold', () => {
  test('it passes threshold prop', async () => {
    const HigherOrderComponent = WithThreshold()(component);
    const { container } = render(<HigherOrderComponent />);
    const thresholdRendered = getByText(container, 'lg');

    expect(thresholdRendered).toBeDefined();
  });

  test('it updates prop on resize', async () => {
    const HigherOrderComponent = WithThreshold()(component);
    const { container } = render(<HigherOrderComponent />);
    const thresholdRendered = getByText(container, 'lg');

    expect(thresholdRendered).toBeDefined();

    act(() => fireResizeEvent(breakpoints.xs));
    const thresholdUpdated = getByText(container, 'xs');

    expect(thresholdUpdated).toBeDefined();
  });

  test('it does not re-render if threshold does not change', async () => {
    const componentWithTime = () => <span data-testid="testId">{Date.now().toString()}</span>;
    const HigherOrderComponent = WithThreshold()(componentWithTime);
    const { container } = render(<HigherOrderComponent />);
    const thresholdRendered = getByTestId(container, 'testId').innerHTML;

    act(() => fireResizeEvent(breakpoints.lg));
    const thresholdUpdated = getByTestId(container, 'testId').innerHTML;

    expect(thresholdUpdated).toEqual(thresholdRendered);
  });

  test('it does re-render if threshold changes', async () => {
    const componentWithTime = () => <span data-testid="testId">{Date.now().toString()}</span>;
    const HigherOrderComponent = WithThreshold()(componentWithTime);
    const { container } = render(<HigherOrderComponent />);
    const thresholdRendered = getByTestId(container, 'testId').innerHTML;

    act(() => fireResizeEvent(breakpoints.xs));

    const thresholdUpdated = getByTestId(container, 'testId').innerHTML;
    expect(thresholdUpdated).not.toEqual(thresholdRendered);
  });
});
