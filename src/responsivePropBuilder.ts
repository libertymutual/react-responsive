import { Threshold } from './ThresholdMap';
import defaultThresholdMap from './defaultThresholdMap';

const getCurrentValue = (value: any) => (value !== undefined ? value : null);

export interface ResponsivePropsConfig {
  propKeys: Array<string>;
}

export interface GenericProps {
  [key: string]: any;
}

const responsivePropBuilder = (currentThreshold: Threshold, props: GenericProps, configuration: ResponsivePropsConfig, thresholdMap = defaultThresholdMap) => {
  // get the keys from the map, e.g. ['xs', 'sm', 'md', 'lg', 'xl']
  const thresholdKeys = Object.keys(thresholdMap);

  // we are going to filter out larger threshold values because we won't be using them
  const startingIndex = thresholdKeys.indexOf(currentThreshold);

  // we only care about the current threshold and smaller in descending order of size from largest to smallest
  // e.g. ['md', 'sm', 'xs']
  // this how a typical responsive grid works, the value taken is from the current threshold if provided or the next lowest one with a value if not provided
  const thresholds = thresholdKeys.slice(0, startingIndex + 1).reverse();

  // only an object can contain responsive values, null is an object also but that's not valid
  // e.g. size={{xs: 'h4', md: 'h3'}}
  const propKeys = configuration.propKeys.filter((propKey: string) => typeof props[propKey] === 'object' && props[propKey] !== null);

  // loop through the props that have been found as being responsive and extract an object of name/value pairs
  const translatedValues = propKeys.reduce((acc: any, propKey: string) => {
    let result = null;
    // find the first threshold with a value. That is our value because we reversed them above starting at the current threshold and moving to smaller thresholds
    for (let i = 0; i < thresholds.length; i++) {
      const threshold = thresholds[i];
      result = getCurrentValue(props[propKey][threshold]);
      if (result !== null) {
        // we found a value so break
        break;
      }
    }

    // add the value to the result, if the value was not found it is set to null
    return Object.assign(acc, { [propKey]: result });
  }, {});

  // return the result as an object of name/value pairs
  // e.g {{ size: 'h3' }, {'align': 'center'}}
  return translatedValues;
};

export default responsivePropBuilder;
