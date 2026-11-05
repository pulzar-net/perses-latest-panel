import type { FormatOptions, ThresholdOptions } from '@perses-dev/components';
import type { PanelProps } from '@perses-dev/plugin-system';
import type { TimeSeriesData } from '@perses-dev/spec';

export interface PulzrLatestPanelOptions {
  /** Unit and decimals for every value. */
  format?: FormatOptions;
  /** Unit and decimals by series name, where they differ. */
  formats?: Record<string, FormatOptions>;
  /** Colors a value by the highest step it reaches. */
  thresholds?: ThresholdOptions;
  /** Seconds after which a value is shown as stale. */
  staleAfter?: number;
  /** Display names by series name. */
  labels?: Record<string, string>;
}

export type PulzrLatestPanelProps = PanelProps<PulzrLatestPanelOptions, TimeSeriesData>;
