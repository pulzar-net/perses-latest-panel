import { thresholdColor } from './threshold';

describe('thresholdColor', () => {
  const thresholds = {
    steps: [
      { value: 80, color: 'red' },
      { value: 50, color: 'orange' },
    ],
  };

  it('takes the highest step reached', () => {
    expect(thresholdColor(90, thresholds, 'ink')).toBe('red');
    expect(thresholdColor(60, thresholds, 'ink')).toBe('orange');
  });

  it('falls back below every step', () => {
    expect(thresholdColor(10, thresholds, 'ink')).toBe('ink');
    expect(thresholdColor(10, { ...thresholds, defaultColor: 'green' }, 'ink')).toBe('green');
  });
});
