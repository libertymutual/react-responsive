import uuidv4 from 'uuid/v4';
import responsivePropBuilder from '../src/responsivePropBuilder';

const responsivePropsConfig = {
  propKeys: ['size', 'weight']
};

describe('ResponsivePropBuilder', () => {
  it('should return nothing if prop value is not an object', () => {
    const props = { size: uuidv4() };

    const results = responsivePropBuilder('xs', props, responsivePropsConfig);
    expect(results).toEqual({});
  });

  it('should return nothing if no props are responsive', () => {
    const props = { 'not-a-key': { 'not-a-responsive-threshold': uuidv4() } };

    const results = responsivePropBuilder('xs', props, responsivePropsConfig);
    expect(results).toEqual({});
  });

  it('should return null if key is not a responsive threshold', () => {
    const props = { size: { 'not-a-responsive-threshold': 'body' } };
    const results = responsivePropBuilder(null, props, responsivePropsConfig);

    expect(results).toEqual({ size: null });
  });

  it('should return lower threshold if actual threshold not provided', () => {
    const xlId = uuidv4();
    const lgId = uuidv4();
    const mdId = uuidv4();
    const smId = uuidv4();
    const xsId = uuidv4();

    const thresholds = [
      { threshold: 'xl', props: { size: { xl: xlId } } },
      { threshold: 'lg', props: { size: { lg: lgId } } },
      { threshold: 'md', props: { size: { md: mdId } } },
      { threshold: 'sm', props: { size: { sm: smId } } },
      { threshold: 'xs', props: { size: { xs: xsId } } }
    ];

    // loop through each responsive threshold and verify that it takes the matching threshold or the first available below it
    for (let i = 0; i < thresholds.length; i++) {
      const item = thresholds[i];
      const results = responsivePropBuilder('xl', item.props, responsivePropsConfig);
      expect(results.size).toEqual(item.props.size[item.threshold]);
    }

    for (let i = 1; i < thresholds.length; i++) {
      const item = thresholds[i];
      const results = responsivePropBuilder('lg', item.props, responsivePropsConfig);
      expect(results.size).toEqual(item.props.size[item.threshold]);
    }

    for (let i = 2; i < thresholds.length; i++) {
      const item = thresholds[i];
      const results = responsivePropBuilder('md', item.props, responsivePropsConfig);
      expect(results.size).toEqual(item.props.size[item.threshold]);
    }

    for (let i = 3; i < thresholds.length; i++) {
      const item = thresholds[i];
      const results = responsivePropBuilder('sm', item.props, responsivePropsConfig);
      expect(results.size).toEqual(item.props.size[item.threshold]);
    }
  });

  it('should return xl threshold if threshold is xl', () => {
    const uuid = uuidv4();
    const props = { size: { xl: uuid } };
    const results = responsivePropBuilder('xl', props, responsivePropsConfig);
    expect(results.size).toEqual(uuid);
  });

  it('should return lg threshold if threshold is lg', () => {
    const uuid = uuidv4();
    const props = { size: { lg: uuid } };
    const results = responsivePropBuilder('lg', props, responsivePropsConfig);
    expect(results.size).toEqual(uuid);
  });

  it('should return md threshold if threshold is md', () => {
    const uuid = uuidv4();
    const props = { size: { md: uuid }, threshold: 'md' };
    const results = responsivePropBuilder('md', props, responsivePropsConfig);
    expect(results.size).toEqual(uuid);
  });

  it('should return sm threshold if threshold is sm', () => {
    const uuid = uuidv4();
    const props = { size: { sm: uuid } };
    const results = responsivePropBuilder('sm', props, responsivePropsConfig);
    expect(results.size).toEqual(uuid);
  });

  it('should return xs threshold if threshold is xs', () => {
    const uuid = uuidv4();
    const props = { size: { xs: uuid } };
    const results = responsivePropBuilder('xs', props, responsivePropsConfig);
    expect(results.size).toEqual(uuid);
  });

  it('should not return a key value for undefined', () => {
    const uuid = uuidv4();
    const props = { size: { xs: uuid }, width: undefined };
    const results = responsivePropBuilder('xs', props, responsivePropsConfig);
    expect(results).toEqual({ size: uuid });
  });

  it('should return null for undefined responsive threshold', () => {
    const props = { size: { xs: undefined }, width: undefined };
    const results = responsivePropBuilder('lg', props, responsivePropsConfig);
    expect(results).toEqual({ size: null });
  });

  it('should return multiple threshold props', () => {
    const props = {
      size: { xs: 'test-size' },
      weight: { sm: 'test-weight' }
    };
    const results = responsivePropBuilder('lg', props, responsivePropsConfig);
    expect(results).toEqual({ size: 'test-size', weight: 'test-weight' });
  });

  it('should ignore other object props that are not in the config', () => {
    const props = { notAKey: { someKey: 'someValue' } };
    const results = responsivePropBuilder('lg', props, responsivePropsConfig);
    expect(results).toEqual({});
  });
});
