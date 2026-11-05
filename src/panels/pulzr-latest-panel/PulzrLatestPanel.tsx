import type { PanelPlugin } from '@perses-dev/plugin-system';

import type { PulzrLatestPanelOptions, PulzrLatestPanelProps } from './pulzr-latest-panel-types';
import { PulzrLatestPanelComponent } from './PulzrLatestPanelComponent';
import { PulzrLatestPanelSettingsEditor } from './PulzrLatestPanelSettingsEditor';

export const PulzrLatestPanel: PanelPlugin<PulzrLatestPanelOptions, PulzrLatestPanelProps> = {
  PanelComponent: PulzrLatestPanelComponent,
  panelOptionsEditorComponents: [{ label: 'Settings', content: PulzrLatestPanelSettingsEditor }],
  supportedQueryTypes: ['TimeSeriesQuery'],
  // Instant: a datasource that knows each series' current value says so.
  queryOptions: { mode: 'instant' },
  createInitialOptions: () => ({}),
};
