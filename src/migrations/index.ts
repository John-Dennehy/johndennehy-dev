import * as migration_20261021_202350_baseline from './20261021_202350_baseline';

export const migrations = [
  {
    up: migration_20261021_202350_baseline.up,
    down: migration_20261021_202350_baseline.down,
    name: '20261021_202350_baseline'
  },
];
