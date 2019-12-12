/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import getThreshold from './getThreshold';
import ResponsiveContext from './ResponsiveContext';
import defaultThresholdMap from './defaultThresholdMap';

const withThreshold = () => Component => {
  class WithThreshold extends React.Component {
    map;

    timeout = 0;

    constructor(props) {
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
  }
  WithThreshold.contextType = ResponsiveContext;

  return WithThreshold;
};

export default withThreshold;
