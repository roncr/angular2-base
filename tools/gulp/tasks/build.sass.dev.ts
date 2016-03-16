import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';
const plugins = <any>gulpLoadPlugins();

const processors = [
    autoprefixer({
        browsers: Config.BROWSER_LIST
    })
];

function processComponentCss() {
    console.log("working here");
    return gulp.src(`${Config.APP_SRC}/**/*.scss`)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(Config.APP_DEST));
}

function processExternalCss() {
    return gulp.src(getExternalCss().map(r => r.src))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(Config.CSS_DEST));
}

// TODO: duplicated method check css-lint.ts
function getExternalCss() {
    return Config.APP_RESOURCES.filter(d => /\.scss$/.test(d.src));
}

// TODO: merge the src, instead of merge the stream
gulp.task('build.sass.dev', () => {
    merge(processComponentCss(), processExternalCss())
});