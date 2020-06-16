import { Threshold, ThresholdMap } from './ThresholdMap';

const getThreshold = (width: number = 0, breakpoints : ThresholdMap = { xs: 0 }) => {
  const breakpointKeys = Object.keys(breakpoints) as Array<Threshold>;

  let result = breakpointKeys[0];

  // loop through the breakpoint keys to find the last breakpoint that is greater than the width
  for (let i = 1; i < breakpointKeys.length; i++) {
    // the current threshold breakpoint value
    const threshold = breakpoints[breakpointKeys[i]];
    if (width >= threshold) {
      result = breakpointKeys[i];
    } else {
      // since the breakpoints are in order once we have passed where the width is greater than the threshold being
      // checked there is no reason to continue checking as they will all be larger
      break;
    }
  }
  return result;
};

export default getThreshold;
