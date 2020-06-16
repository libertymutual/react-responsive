import React, { useContext } from 'react';
import responsivePropBuilder from './responsivePropBuilder';
import ResponsiveContext from './ResponsiveContext';
import useThreshold from './useThreshold';
import defaultThresholdMap from './defaultThresholdMap';

export interface ResponsivePropsConfig {
  propKeys: Array<string>;
}

// This component takes a given property, like size, and based on the current threshold replaces that value
// for example on a mobile phone the value for size would be replaced with the value from xs
// e.g. size={{xs: 'small', 'md': 'large'}}
// const examplePropsConfiguration = {
//   propKeys: [ 'size' ],
// }

const WithResponsiveProps = (configuration: ResponsivePropsConfig) => (WrappedComponent: React.ComponentType) => {
  const Component = (props: any) => {
    const threshold = useThreshold();

    const responsiveContext = useContext(ResponsiveContext);

    const thresholdMap = responsiveContext ? responsiveContext.getThresholdMap() : defaultThresholdMap;

    const overrideProps = responsivePropBuilder(threshold, props, configuration, thresholdMap);

    // spread the current props, then spread the override props and it they will replace the initial value
    return <WrappedComponent {...props} {...overrideProps} />;
  };

  return Component;
};

export default WithResponsiveProps;
