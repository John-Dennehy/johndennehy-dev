import * as migration_20261021_202350_baseline from './20261021_202350_baseline';
import * as migration_20261021_203044_submitter_hash from './20261021_203044_submitter_hash';

export const migrations = [
  {
    up: migration_20261021_202350_baseline.up,
    down: migration_20261021_202350_baseline.down,
    name: '20261021_202350_baseline',
  },
  {
    up: migration_20261021_203044_submitter_hash.up,
    down: migration_20261021_203044_submitter_hash.down,
    name: '20261021_203044_submitter_hash'
  },
];
