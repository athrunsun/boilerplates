import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`tsc -p ${PATHS.tsConfigApp} --noEmit --watch`);
