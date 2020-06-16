import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useThreshold from './useThreshold';
import { Threshold } from './ThresholdMap';

interface HideThresholdProps {
  thresholds?: Array<Threshold>;
  children: React.ReactNode;
}

export const Hide = (props: HideThresholdProps) => {
  const { children, thresholds } = props;
  const breakpoints = Array.isArray(thresholds) ? thresholds : [thresholds];
  const threshold = useThreshold();
  const show = () => !breakpoints.includes(threshold);

  return show() ? <Fragment>{children}</Fragment> : null;
};

Hide.propTypes = {
  /**  @ignore */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** A single value or an array of values to hide this containers content */
  thresholds: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Hide;
