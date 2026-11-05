import { Box, Stack, Typography, useTheme } from '@mui/material';
import { formatValue } from '@perses-dev/components';
import { useTimeRange } from '@perses-dev/plugin-system';
import { formatDistanceStrict } from 'date-fns';
import type { ReactElement } from 'react';

import { currentOf } from './current';
import type { PulzrLatestPanelProps } from './pulzr-latest-panel-types';
import { thresholdColor } from './threshold';

/** "just now" inside a minute, otherwise "5 minutes ago". */
function ago(time: number, at: number): string {
  return at - time < 60_000 ? 'just now' : `${formatDistanceStrict(time, at)} ago`;
}

export function PulzrLatestPanelComponent({ queryResults, spec }: PulzrLatestPanelProps): ReactElement {
  const theme = useTheme();
  // The dashboard's now, which moves when it refreshes.
  const at = useTimeRange().absoluteTimeRange.end.getTime();
  const rows = queryResults.flatMap((result) => currentOf(result.data));

  if (rows.length === 0) {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Typography color="text.secondary">No data</Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        alignContent: 'center',
        gap: 2,
        px: 2,
        overflowY: 'auto',
      }}
    >
      {rows.map((now) => {
        const stale = spec.staleAfter !== undefined && at - now.time > spec.staleAfter * 1000;
        const format = spec.formats?.[now.name] ?? spec.format;
        return (
          <Stack key={now.name} spacing={0.25} sx={{ opacity: stale ? 0.5 : 1, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" noWrap>
              {spec.labels?.[now.name] ?? now.name}
            </Typography>
            <Typography
              sx={{ fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.2 }}
              color={
                now.value === null
                  ? 'text.secondary'
                  : thresholdColor(now.value, spec.thresholds, theme.palette.text.primary)
              }
              noWrap
            >
              {now.value === null ? '–' : formatValue(now.value, format)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {ago(now.time, at)}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
