import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.rm('-rf', PATHS.appBuildOutput);
