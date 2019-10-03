import { clean } from '@eng/tasks/clean';
import { build as rollupBuild } from '@eng/tasks/rollupBuild';

(async function() {
    clean();
    await rollupBuild();
})();
