import * as migration_20261021_202350_baseline from './20261021_202350_baseline';
import * as migration_20261021_203044_submitter_hash from './20261021_203044_submitter_hash';
import * as migration_20261021_203239_media_prefix from './20261021_203239_media_prefix';
import * as migration_20261021_205504_payload_3_90_upgrade from './20261021_205504_payload_3_90_upgrade';
import * as migration_20261022_235931_showcase_fields from './20261022_235931_showcase_fields';

export const migrations = [
  {
    up: migration_20261021_202350_baseline.up,
    down: migration_20261021_202350_baseline.down,
    name: '20261021_202350_baseline',
  },
  {
    up: migration_20261021_203044_submitter_hash.up,
    down: migration_20261021_203044_submitter_hash.down,
    name: '20261021_203044_submitter_hash',
  },
  {
    up: migration_20261021_203239_media_prefix.up,
    down: migration_20261021_203239_media_prefix.down,
    name: '20261021_203239_media_prefix',
  },
  {
    up: migration_20261021_205504_payload_3_90_upgrade.up,
    down: migration_20261021_205504_payload_3_90_upgrade.down,
    name: '20261021_205504_payload_3_90_upgrade',
  },
  {
    up: migration_20261022_235931_showcase_fields.up,
    down: migration_20261022_235931_showcase_fields.down,
    name: '20261022_235931_showcase_fields'
  },
];
