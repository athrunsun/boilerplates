import debug from 'debug';
import path from 'path';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import { rollup, InputOptions, OutputOptions } from 'rollup';

import buildConfigs from '@eng/rollupConfigs';
import { PATHS } from '@eng/paths';

const logger = debug('eng:rollupBuild');

const [moduleConfig, nomoduleConfig] = buildConfigs;
const { output: outputOptionsModule, ...otherOptionsModule } = moduleConfig;
const { output: outputOptionsNoModule, ...otherOptionsNoModule } = nomoduleConfig;

async function createBundle(inputOptions: InputOptions, outputOptions: OutputOptions) {
    // create a bundle
    const bundle = await rollup(inputOptions);

    // write the bundle to disk
    await bundle.write(outputOptions);
}

async function compileTemplate() {
    logger('Compiling template...');
    const manifest = fs.readJsonSync(path.resolve(PATHS.appBuildOutput, 'manifest.json'));
    const modulepreload = fs.readJsonSync(path.resolve(PATHS.appBuildOutput, 'modulepreload.json'));

    const templateData = {
        manifest,
        modulepreload,
        ENV: process.env.NODE_ENV || 'development',
    };

    await fs.outputFile(
        path.resolve(PATHS.appBuildOutput, 'index.html'),
        nunjucks.render(PATHS.appIndexHtml, templateData),
    );
}

async function build() {
    logger('Creating ES module bundle...');
    await createBundle(otherOptionsModule, outputOptionsModule as OutputOptions);
    logger('Creating non-ES module bundle...');
    await createBundle(otherOptionsNoModule, outputOptionsNoModule as OutputOptions);
    await compileTemplate();
}

build();
