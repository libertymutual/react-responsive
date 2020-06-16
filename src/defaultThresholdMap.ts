import { ThresholdMap } from './ThresholdMap';

const defaultThresholdMap = (): ThresholdMap => {
  return {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 960,
    xl: 1280
  };
};

export default defaultThresholdMap();
