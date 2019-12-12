import { useState, useEffect, useContext } from 'react';
import getThreshold from './getThreshold';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

const getCurrentThreshold = map => getThreshold(window.innerWidth, map);

function useThreshold() {
  const responsiveContext = useContext(ResponsiveContext);

  const map = responsiveContext ? responsiveContext.getThresholdMap() : defaultThresholdMap;

  let timeout = 0;
  const initialThreshold = getCurrentThreshold(map);

  const [threshold, setThreshold] = useState(initialThreshold);

  const updateThreshold = () => {
    const newThreshold = getCurrentThreshold(map);
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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  return threshold;
}

export default useThreshold;
