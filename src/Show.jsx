import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useThreshold from './useThreshold';

export const Show = props => {
  const { children, thresholds } = props;
  const breakpoints = Array.isArray(thresholds) ? thresholds : [thresholds];
  const threshold = useThreshold();
  const show = () => breakpoints.includes(threshold);

  return show() ? <Fragment>{children}</Fragment> : null;
};

Show.propTypes = {
  /**  @ignore */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** A single value or an array of values to show this containers content */
  thresholds: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export default Show;
