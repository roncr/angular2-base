import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as doiuse from 'doiuse';
import * as colorguard from 'colorguard';
import * as stylelint from 'stylelint';
import * as reporter from 'postcss-reporter';
import * as gulpPlugins from 'gulp-load-plugins';

import Config from '../gulp.config';

const plugins = <any>gulpPlugins();
const isProd = Config.ENV === 'prod'; // TODO: validate what is this variable for

const processors = [
    doiuse({
        browsers: Config.BROWSER_LIST,
    }),
    colorguard(),
    //stylelint(),
    reporter({clearMessages: true}) // TODO: consider a different reporter so no postcss is required
];

// Lints the css that is defined next to the components
function lintComponentCss() {
    let src = [
        `${Config.APP_SRC}/**/*.css`,
        `!${Config.APP_SRC}/assets/**/*.css`
    ];

    return gulp.src(src)
        // TODO: why postcss?
        .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
        .pipe(plugins.postcss(processors));
}

// Lints the css that is available outisde the components
function lintExternalCss() {
    return gulp.src(getExternalCss().map(r => r.src))
        // TODO: why postcss?
        .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
        .pipe(plugins.postcss(processors));
}

// Loads the css files that live outside the components
function getExternalCss() {
    return Config.APP_RESOURCES.filter(d => /\.css$/.test(d.src) && !d.vendor);
}

// TODO: merge the src in both methods, so that only 1 method is required
gulp.task('css-lint', () => merge(lintComponentCss(), lintExternalCss()));