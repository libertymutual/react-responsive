export type Threshold = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThresholdMap = {
  [key in Threshold]?: number;
};
