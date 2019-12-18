# @libertymutual/react-responsive

[![Build Status](https://travis-ci.com/libertymutual/react-responsive.svg?branch=master)](https://travis-ci.com/libertymutual/react-responsive)

`npm install @libertymutual/react-responsive`

`yarn add @libertymutual/react-responsive`

This library provides a set of components and hooks that are responsive based on the defined thresholds. This library relies on react [hooks](https://reactjs.org/docs/hooks-overview.html) which require a React version of at least ^16.8.0.  With these components you can get the current threshold, create responsive props, or hide / show content.

The most valuable functionality provided by this library is the ability to make props on your components 'responsive props'.

## <ResponsiveProvider \/>

`import { ResponsiveProvider } from '@libertymutual/react-responsive'`

The **<ResponsiveProvider \/>** component is an optional component if you wish to change any of the defaults. The default `thresholdMap` is `{ xs: 0, sm: 480, md: 768, lg: 960, xl: 1280 }`. This can be changed by passing a new object to the `thresholdMap` prop. There are no restrictions to the number of thresholds you can have or what they need to be named. The keys you specify here are the values the other components will use. Based on the default the keys are 'xs', 'sm', 'md', 'lg', 'xl'.

You're first threshold must start with the value of 0 and your thresholds must be order from smallest to largest. Thresholds are matched from the value provided to the next threshold -1.

Providers can be nested for specialized cases. You can define a set of specific threshold for a single component or section of your application. Components will always get their `thresholdMap` from the nearest provider.

`<ResponsiveProvider thresholdMap={{'small-phone': 0, 'big-phone': 480, 'tablet': 768, 'largest': 960 }}>{children}</ReponsiveProvider>`

With the above configuration the keys used by the other components would be 'small-phone', 'big-phone', 'tablet', and 'largest'.

## useThreshold()

`import { useThreshold } from '@libertymutual/react-responsive'`

The React [hook](https://reactjs.org/docs/hooks-overview.html) returns the current threshold value from the thresholds you have provided to the **<ResponsiveProvider \/>**. Based on what we passed to the above example this hook would return 'small-phone', 'big-phone', 'tablet', or 'largest'. This hook is stateful and will trigger a re-render if the threshold changes.

`const threshold = useThreshold()`

## <WithThreshold \/>

`import { WithThreshold } from '@libertymutual/react-responsive'`

**<WithThreshold \/>** is the [higher order component](https://reactjs.org/docs/higher-order-components.html) version of the **useThreshold()** [hook](https://reactjs.org/docs/hooks-overview.html). It sets the value of the current threshold on a prop named `threshold`. This component is stateful and will trigger a re-render if the threshold changes.

`export default WithThreshold(YourComponent)`

## <Hide \/> and <Show \/>

`import { Hide } from '@libertymutual/react-responsive'`

`import { Show } from '@libertymutual/react-responsive'`

**<Hide \/>** and **<Show \/>** are utility components that conditionally render their content based on the values you provide to the `thresholds` prop. You can provide a single value or an array of values.

Based on what we passed to the above provider component example the following would not render their content on thresholds that matched 'small-phone' or 'large-phone' which range in size from 0 to 767px. Inversely show would only render it's content for those thresholds.

`<Hide thresholds={['small-phone', 'large-phone']}>{children}</Hide>`

`<Show thresholds={['small-phone', 'large-phone']}>{children}</Show>`

## <WithResponsiveProps \/>

`import { WithResponsiveProps } from '@libertymutual/react-responsive'`

**<WithResponsiveProps \/>** is a [higher order component](https://reactjs.org/docs/higher-order-components.html) that lets you turn any prop into a responsive prop. When a prop is responsive it goes from `size="small"` to **_also_** being able to accept an object value like `size={{'small-phone': 'xsmall', 'tablet': 'large'}}`. The value for the size prop will be determined based on the current threshold. This component is stateful and will trigger a re-render if the threshold changes.

When a prop is made responsive it follows a cascade to find it's value similar to how a responsive grid works. In the situation where a value has not been provided for the actual current threshold we look to the next lowest threshold, and repeat, until we find a value. In the above example if the threshold were 'large-phone' it would use the value 'xsmall' from 'small-phone' because we did not provide a value for 'large-phone'.

_It is important to provide a value for the smallest threshold that you have defined or the prop will have a value of null if the current threshold is lower than the lowest threshold value provided._

**<WithResponsiveProps \/>** accepts a configuration object. This object contains the names of the props on your component you wish to become responsive. Note that a responsive prop doesn't require it's value always be an object. If the value passed is not an object it will be treated normally.

`export default WithResponsiveProps({ propKeys: ['size'] })(YourComponent)`

---

### responsivePropBuilder()

This is a pure JavaScript utility function that translates the collection of responsive props into name/value pairs. It is not intended for general use but we expose it in case you prefer not to use **<WithResponsiveProps \/>**.

```js
import {
  responsivePropBuilder,
  ResponsiveContext,
  useThreshold
} from '@libertymutual/react-responsive';

export const YourComponent = props => {
    const responsiveContext = useContext(ResponsiveContext);
    const thresholdMap = responsiveContext.getThresholdMap();
    const currentThreshold = useThreshold();
    const responsivePropsConfig = { propKeys: ['size'] };

    // this converts something like size={{'small-phone': 'sm', 'tablet': 'lg'}} to {size:'sm'} if the current threshold was 'small-phone'
    const responsiveProps = responsivePropBuilder(
        currentThreshold,
        props,
        responsivePropsConfig,
        thresholdMap
    );

    // destructure all your props
    // this will replace the value for size from responsive props if it was responsive
    // if was not responsive size would come from props
    const { size } = { ...props, ...responsiveProps };

    return (<div>{size}</div>)
});
```
