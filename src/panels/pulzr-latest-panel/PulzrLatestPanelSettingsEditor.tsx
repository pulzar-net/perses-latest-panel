import { TextField } from '@mui/material';
import {
  FormatControls,
  OptionsEditorColumn,
  OptionsEditorGrid,
  OptionsEditorGroup,
  ThresholdsEditor,
} from '@perses-dev/components';
import type { OptionsEditorProps } from '@perses-dev/plugin-system';
import type { ReactElement } from 'react';

import type { PulzrLatestPanelOptions } from './pulzr-latest-panel-types';

export function PulzrLatestPanelSettingsEditor({
  value,
  onChange,
}: OptionsEditorProps<PulzrLatestPanelOptions>): ReactElement {
  return (
    <OptionsEditorGrid>
      <OptionsEditorColumn>
        <OptionsEditorGroup title="Values">
          <FormatControls
            value={value.format ?? { unit: 'decimal' }}
            onChange={(format) => onChange({ ...value, format })}
          />
          <TextField
            size="small"
            type="number"
            label="Stale after (seconds)"
            value={value.staleAfter ?? ''}
            onChange={(e) =>
              onChange({ ...value, staleAfter: e.target.value === '' ? undefined : Number(e.target.value) })
            }
          />
        </OptionsEditorGroup>
      </OptionsEditorColumn>
      <OptionsEditorColumn>
        <ThresholdsEditor
          hideDefault
          disablePercentMode
          thresholds={value.thresholds}
          onChange={(thresholds) => onChange({ ...value, thresholds })}
        />
      </OptionsEditorColumn>
    </OptionsEditorGrid>
  );
}
