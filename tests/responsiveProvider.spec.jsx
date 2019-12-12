import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useThreshold, WithThreshold, WithResponsiveProps, ResponsiveProvider } from '../src';
import fireResizeEvent from './utilities/fireResizeEvent';

const thresholdMap = {
  start: 0,
  xsmall: 480,
  small: 768,
  medium: 960,
  large: 1280,
  larger: 1480,
  xlarge: 1600,
  omg: 2000
};

jest.useFakeTimers();
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
  test('should render start', () => {
    const { container } = render(
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.start));

    expect(span.textContent).toBe('start');
  });

  test('should render xsmall', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.xsmall));

    expect(span.textContent).toBe('xsmall');
  });

  test('should render small', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.small));

    expect(span.textContent).toBe('small');
  });

  test('should render medium', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.medium));

    expect(span.textContent).toBe('medium');
  });

  test('should render large', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.large));

    expect(span.textContent).toBe('large');
  });

  test('should render larger', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.larger));

    expect(span.textContent).toBe('larger');
  });

  test('should render xlarge', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.xlarge));

    expect(span.textContent).toBe('xlarge');
  });

  test('should render omg', () => {
    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <MockComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.omg));

    expect(span.textContent).toBe('omg');
  });

  test('should render omg, uses responsive provider', () => {
    const comp = props => <span>{props.threshold}</span>;

    const HigherOrderComponent = WithThreshold()(comp);

    const component = (
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <HigherOrderComponent />
      </ResponsiveProvider>
    );
    const { container } = render(component);
    const span = container.firstChild;

    act(() => fireResizeEvent(thresholdMap.omg));

    expect(span.textContent).toBe('omg');
  });

  test('it renders child', async () => {
    const responsivePropsConfig = {
      propKeys: []
    };
    const id = 'test';
    const component = () => <div>{id}</div>;
    const HigherOrderComponent = WithResponsiveProps(responsivePropsConfig)(component);

    const { getByText } = render(
      <ResponsiveProvider thresholdMap={thresholdMap}>
        <HigherOrderComponent />
      </ResponsiveProvider>
    );

    expect(getByText(id)).toBeDefined();
  });
});
