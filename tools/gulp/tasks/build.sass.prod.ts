import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';
const plugins = <any>gulpLoadPlugins();

const processors = [
    autoprefixer({
        browsers: Config.BROWSER_LIST
    }),
    cssnano({
        discardComments: {removeAll: true}
    })
];

function processComponentCss() {
    return gulp.src(`${Config.APP_SRC}/**/*.scss`)
        .pipe(plugins.cached('process-component-css'))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(Config.TMP_DIR)); // TODO: remove the need for the tmp folder
}

function processExternalCss() {
    return gulp.src(getExternalCss().map(r => r.src))
        .pipe(plugins.cached('process-external-css'))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(plugins.concat(Config.CSS_PROD_BUNDLE))
        .pipe(gulp.dest(Config.CSS_DEST));
}

// TODO: duplicated method check css-lint.ts & build.scss.dev.ts
function getExternalCss() {
    return Config.APP_RESOURCES.filter(d => /\.scss$/.test(d.src));
}

// TODO: merge the src, instead of merge the stream
gulp.task('build.sass.prod', () => merge(processComponentCss(), processExternalCss()));