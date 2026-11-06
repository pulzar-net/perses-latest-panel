# Latest values panel for Perses

`PulzrLatestPanel` shows each series' current value, how long ago it was read ("just now", "5 minutes ago"), and greys a value read longer ago than `staleAfter` seconds. One tile per series, laid out to fit.

```yaml
kind: Panel
spec:
  plugin:
    kind: PulzrLatestPanel
    spec:
      format: { unit: decimal, decimalPlaces: 1 }
      formats:
        cham.rh: { unit: percent, decimalPlaces: 0 }
      labels:
        cham.t: Chamber
        cham.rh: Chamber RH
      staleAfter: 900
```

- `format` is Perses's unit and decimals; `formats` overrides it by series name.
- `thresholds` color a value by the highest step it reaches.
- `labels` rename series.

It works with any time series datasource: each series' last value and its time. The query runs in instant mode, and a datasource's `metadata.latest` (`{value, time}` by series name) wins where present, as the [Pulzr Net datasource](https://github.com/pulzar-net/perses-pulzr-datasource) gives it, reaching back past the dashboard's range. Series labelled `band` are left out.

## Install

Put the archive (`PulzrLatestPanel-<version>.tar.gz`, from the releases) in a folder listed in the Perses server's `plugin.archive_paths`, or `npm install @pulzr/perses-latest-panel` to embed it.

## Development

```bash
npm install
npm test
percli plugin test-schemas
npm run build
percli plugin build
```

### Releasing

Set the new version in `package.json`, commit, then tag and push it:

```bash
git tag v0.2.0 && git push origin v0.2.0
```

The Release workflow tests and builds, publishes the package to npm with provenance, and attaches the Perses plugin archive and the npm tarball to a GitHub release.

## License

Apache 2.0
