/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { WithResponsiveProps, ResponsiveProvider } from '../src';
import fireResizeEvent from './utilities/fireResizeEvent';

jest.useFakeTimers();

beforeEach(() => {
  window.innerWidth = 1000;
});

afterEach(cleanup);

describe('WithResponsiveProps', () => {
  test('it renders child', async () => {
    const responsivePropsConfig = {
      propKeys: []
    };
    const id = uuidv4();
    const component = props => <div>{props.id}</div>;
    const HigherOrderComponent = WithResponsiveProps(responsivePropsConfig)(component);

    const { getByText } = render(<HigherOrderComponent id={id} />);

    expect(getByText(id)).toBeDefined();
  });

  test('it renders child with provider', async () => {
    const responsivePropsConfig = {
      propKeys: []
    };
    const id = uuidv4();
    const component = props => <div>{props.id}</div>;
    const HigherOrderComponent = WithResponsiveProps(responsivePropsConfig)(component);

    const { getByText } = render(
      <ResponsiveProvider>
        <HigherOrderComponent id={id} />
      </ResponsiveProvider>
    );

    expect(getByText(id)).toBeDefined();
  });

  test('it renders child with responsive prop', async () => {
    const responsivePropsConfig = {
      propKeys: ['id']
    };
    const id = uuidv4();
    const id2 = uuidv4();
    const component = props => <div>{props.id}</div>;
    const HigherOrderComponent = WithResponsiveProps(responsivePropsConfig)(component);

    act(() => fireResizeEvent(0));
    act(() => jest.runAllTimers());

    const { getByText } = render(
      <ResponsiveProvider>
        <HigherOrderComponent id={{ xs: id2, sm: id }} />
      </ResponsiveProvider>
    );

    expect(getByText(id2)).toBeDefined();
  });
});
