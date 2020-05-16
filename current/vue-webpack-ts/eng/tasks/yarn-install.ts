import shell from 'shelljs';

function yarnInstall() {
    // CAUTION!
    // https://yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-production-true-false
    // Yarn will not install any package listed in devDependencies if the NODE_ENV environment variable is set to production.
    // This function is called when building production bundles so we need to filter out `NODE_ENV`.
    const { NODE_ENV, ...envVarsExceptNodeEnv } = process.env;
    shell.exec('yarn install', { env: envVarsExceptNodeEnv });
}

export { yarnInstall };
