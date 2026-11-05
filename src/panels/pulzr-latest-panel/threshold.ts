import type { ThresholdOptions } from '@perses-dev/components';

/** The color of the highest absolute step a value reaches, or the default below them all. */
export function thresholdColor(value: number, thresholds: ThresholdOptions | undefined, fallback: string): string {
  let color = thresholds?.defaultColor ?? fallback;
  for (const step of (thresholds?.steps ?? []).toSorted((a, b) => a.value - b.value)) {
    if (value >= step.value && step.color) color = step.color;
  }
  return color;
}
