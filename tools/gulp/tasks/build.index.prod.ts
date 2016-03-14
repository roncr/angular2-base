import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join, sep, normalize} from 'path';
import Config from '../gulp.config';
const plugins = <any>gulpLoadPlugins();

// TODO: some similar code with build.index.dev. Reuse!
function inject(...files: Array<string>) {
    return plugins.inject(gulp.src(files, { read: false }), {
        files,
        transform: transformPath()
    });
}

function injectJs() {
    return inject(
        join(Config.JS_DEST, Config.JS_PROD_SHIMS_BUNDLE),
        join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE)
    );
}

function injectCss() {
    return inject(join(Config.CSS_DEST, Config.CSS_PROD_BUNDLE));
}

function transformPath() {
    return function(filepath: string) {
        let path: Array<string> = normalize(filepath).split(sep);
        arguments[0] = path.slice(3, path.length).join(sep) + `?${Date.now()}`;
        return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    };
}

gulp.task('build.index.prod', () => {
    return gulp.src(`${Config.APP_SRC}/index.html`)
        .pipe(injectJs())
        .pipe(injectCss())
        // TODO: consider if using gulp-template adds any value. It passes variables from config to the js, variables like env
        .pipe(gulp.dest(Config.APP_DEST));
});