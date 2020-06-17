/* eslint-disable import/no-named-as-default */
import { useState, useEffect, useLayoutEffect, useContext, useCallback } from 'react';
import getThreshold from './getThreshold';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

// React currently throws a warning when using useLayoutEffect on the server.To get
//   around it, we can conditionally useEffect on the server (no-op) and
//   useLayoutEffect in the browser.
const useEnhancedEffect =
  typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

function useThreshold() {
  const responsiveContext = useContext(ResponsiveContext);

  const map = responsiveContext ? responsiveContext.getThresholdMap() : defaultThresholdMap;

  const [threshold, setThreshold] = useState(() => getThreshold(0, map));

  const getCurrentThreshold = useCallback(() => getThreshold(window.innerWidth, map), [map]);

  useEnhancedEffect(() => {
    setThreshold(getCurrentThreshold());
  }, []);

  useEffect(() => {
    let timeout = 0;

    const updateThreshold = () => {
      const newThreshold = getCurrentThreshold();

      if (threshold !== newThreshold) {
        setThreshold(newThreshold);
      }
    };

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
  }, [map, threshold, getCurrentThreshold]);

  return threshold;
}

export default useThreshold;
