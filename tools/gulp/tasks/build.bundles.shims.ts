import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import Config from '../gulp.config';
const plugins = <any>gulpLoadPlugins();


function getShims() {
    let libs = Config.PROD_DEPENDENCIES
        .filter(d => /\.js$/.test(d.src));

    return libs.filter(l => l.inject === 'shims')
        .concat(libs.filter(l => l.inject === 'libs'))
        .concat(libs.filter(l => l.inject === true))
        .map(l => l.src);
}

function bundleShims() {
    return gulp.src(getShims())
        // Strip comments and sourcemaps
        .pipe(plugins.uglify({
            mangle: false
        }))
        .pipe(plugins.concat(Config.JS_PROD_SHIMS_BUNDLE))
        .pipe(gulp.dest(Config.JS_DEST));
}

gulp.task('build.bundles.shims', () => merge(bundleShims()));