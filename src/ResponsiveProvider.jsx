/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

export const ResponsiveProvider = props => {
  const { thresholdMap, children } = props;

  const getThresholdMap = () => {
    return thresholdMap;
  };
  return <ResponsiveContext.Provider value={{ getThresholdMap }}>{children}</ResponsiveContext.Provider>;
};

ResponsiveProvider.propTypes = {
  /** The names and values of the responsive breakpoints */
  thresholdMap: PropTypes.object,
  /**  @ignore */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

ResponsiveProvider.defaultProps = {
  thresholdMap: defaultThresholdMap
};

export default ResponsiveProvider;
