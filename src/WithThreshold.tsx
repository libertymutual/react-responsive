import React from 'react';
import getThreshold from './getThreshold';
import { Threshold } from './ThresholdMap';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

interface WithThresholdProps {
  threshold?: Threshold;
}

function withThreshold<P extends WithThresholdProps>(Component: React.ComponentType<P>) {
  return class extends React.Component<P, { threshold: Threshold }> {
    static contextType = ResponsiveContext;
    static displayName = Component.displayName || `WithThreshold${Component.name}`;

    private map: ThresholdMap = defaultThresholdMap;
    private timeout = 0;

    constructor(props: P) {
      super(props);

      this.state = {
        threshold: null
      };
    }

    componentDidMount() {
      this.map = this.context ? this.context.getThresholdMap() : defaultThresholdMap;

      const startingThreshold = getThreshold(window.innerWidth, this.map);

      this.setState(
        {
          threshold: startingThreshold
        },
        () => window.addEventListener('resize', this.handleResize)
      );
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      if (this.timeout) {
        window.cancelAnimationFrame(this.timeout);
      }

      this.timeout = window.requestAnimationFrame(this.updateSize);
    };

    updateSize = () => {
      const newThreshold = getThreshold(window.innerWidth, this.map);
      if (this.state.threshold !== newThreshold) {
        this.setState({
          threshold: newThreshold
        });
      }
    };

    render() {
      const { threshold } = this.props;

      const more = {
        threshold: threshold || this.state.threshold,
        ...this.props
      };

      return <Component {...more} />;
    }
  };
}

const WithThreshold = () => withThreshold;
export default WithThreshold;
