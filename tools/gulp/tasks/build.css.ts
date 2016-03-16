import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulpPlugins from 'gulp-load-plugins';

import Config from '../gulp.config';

const plugins = <any>gulpPlugins();
const isProd = Config.ENV === 'prod'; // TODO: remove the need of this and the usage of the tmp folder

const processors = [
    // TODO: auto-prefixer may not be necessary
    autoprefixer({
        browsers: Config.BROWSER_LIST
    })
];

if (isProd) {
    // TODO: cssnano is aimed to postcss
    processors.push(
        cssnano({
            discardComments: {removeAll: true}
        })
    );
}

function processComponentCss() {
    return gulp.src(`${Config.APP_SRC}/**/*.css`)
        .pipe(isProd ? plugins.cached('process-component-css') : plugins.util.noop())
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(isProd ? Config.TMP_DIR: Config.APP_DEST)); // TODO: remove the need for the tmp folder
}

function processExternalCss() {
    return gulp.src(getExternalCss().map(r => r.src))
        .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
        .pipe(plugins.postcss(processors))
        .pipe(isProd ? plugins.concat(Config.CSS_PROD_BUNDLE) : plugins.util.noop())
        .pipe(gulp.dest(Config.CSS_DEST));
}

// TODO: duplicated method check css-lint.ts
function getExternalCss() {
    return Config.APP_RESOURCES.filter(d => /\.css$/.test(d.src));
}

// TODO: merge the src, instead of merge the stream
gulp.task('build.css', () => merge(processComponentCss(), processExternalCss()));