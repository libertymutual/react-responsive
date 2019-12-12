import getThreshold from '../src/getThreshold';
import defaultThresholdMap from '../src/defaultThresholdMap';

describe('getThreshold', () => {
  it('should return xs if no width', () => {
    const results = getThreshold();
    expect(results).toEqual('xs');
  });

  it('should return xs if width equals xs', () => {
    const results = getThreshold(defaultThresholdMap.xs, defaultThresholdMap);
    expect(results).toEqual('xs');
  });

  it('should return xs if width equals xs +1', () => {
    const results = getThreshold(defaultThresholdMap.xs + 1, defaultThresholdMap);
    expect(results).toEqual('xs');
  });

  it('should return xs if width equals one less than next threhsold', () => {
    const results = getThreshold(defaultThresholdMap.sm - 1, defaultThresholdMap);
    expect(results).toEqual('xs');
  });

  it('should return sm if width equals sm', () => {
    const results = getThreshold(defaultThresholdMap.sm, defaultThresholdMap);
    expect(results).toEqual('sm');
  });

  it('should return sm if width equals sm + 1', () => {
    const results = getThreshold(defaultThresholdMap.sm + 1, defaultThresholdMap);
    expect(results).toEqual('sm');
  });

  it('should return sm if width equals one less than next threhsold', () => {
    const results = getThreshold(defaultThresholdMap.md - 1, defaultThresholdMap);
    expect(results).toEqual('sm');
  });

  it('should return md if width equals md', () => {
    const results = getThreshold(defaultThresholdMap.md, defaultThresholdMap);
    expect(results).toEqual('md');
  });

  it('should return md if width equals md + 1', () => {
    const results = getThreshold(defaultThresholdMap.md + 1, defaultThresholdMap);
    expect(results).toEqual('md');
  });

  it('should return md if width equals one less than next threhsold', () => {
    const results = getThreshold(defaultThresholdMap.lg - 1, defaultThresholdMap);
    expect(results).toEqual('md');
  });

  it('should return lg if width equals lg', () => {
    const results = getThreshold(defaultThresholdMap.lg, defaultThresholdMap);
    expect(results).toEqual('lg');
  });

  it('should return lg if width equals lg + 1', () => {
    const results = getThreshold(defaultThresholdMap.lg + 1, defaultThresholdMap);
    expect(results).toEqual('lg');
  });

  it('should return lg if width equals one less than next threhsold', () => {
    const results = getThreshold(defaultThresholdMap.xl - 1, defaultThresholdMap);
    expect(results).toEqual('lg');
  });

  it('should return xl if width equals xl', () => {
    const results = getThreshold(defaultThresholdMap.xl, defaultThresholdMap);
    expect(results).toEqual('xl');
  });

  it('should return xl if width equals xl + 1', () => {
    const results = getThreshold(defaultThresholdMap.xl + 1, defaultThresholdMap);
    expect(results).toEqual('xl');
  });
});
