/* eslint-disable import/no-named-as-default */
import { useState, useEffect, useContext } from 'react';
import getThreshold from './getThreshold';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

const getCurrentThreshold = map => getThreshold(window.innerWidth, map);

function useThreshold() {
  const responsiveContext = useContext(ResponsiveContext);

  const map = responsiveContext ? responsiveContext.getThresholdMap() : defaultThresholdMap;

  const initialThreshold = getCurrentThreshold(map);

  const [threshold, setThreshold] = useState(initialThreshold);

  useEffect(() => {
    const updateThreshold = () => {
      const newThreshold = getCurrentThreshold(map);
      if (threshold !== newThreshold) {
        setThreshold(newThreshold);
      }
    };
    let timeout = 0;

    const handleResize = () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(updateThreshold);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, threshold]);

  return threshold;
}

export default useThreshold;
