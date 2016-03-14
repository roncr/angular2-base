import * as gulp from 'gulp';
import {join} from 'path';
import * as Builder from 'systemjs-builder';
import Config from '../gulp.config';

const BUNDLER_OPTIONS = {
    format: 'cjs',
    minify: true,
    mangle: false
};

gulp.task('build.bundles.app', done => {
    let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
    builder
        .buildStatic(join(Config.TMP_DIR, Config.BOOTSTRAP_MODULE),
            join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE),
            BUNDLER_OPTIONS)
        .then(() => done());
});