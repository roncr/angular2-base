import * as gulp from 'gulp';
import { join } from 'path';
import * as gulpPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';

const plugins = <any>gulpPlugins();

function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
        name,
        transform: transformPath()
    });
}

// TODO: what is the benefit of inject this if the list of dependencies is maintained manually?
function getInjectablesDependenciesRef(name?: string) {
    return Config.DEV_DEPENDENCIES
        .filter(dep => dep['inject'] && dep['inject'] === (name || true))
        .map(mapPath);
}

function mapPath(dep: any) {
    let envPath = dep.src;
    if (envPath.startsWith(Config.APP_SRC)) {
        envPath = join(Config.APP_DEST, dep.src.replace(Config.APP_SRC, ''));
    }
    return envPath;
}

function transformPath() {
    return function (filepath: string) {
        arguments[0] = join(Config.APP_BASE, filepath) + `?${Date.now()}`;
        return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    };
}

gulp.task('build.index.dev', () => {
    return gulp.src(join(Config.APP_SRC, 'index.html'))
        .pipe(inject('shims'))
        .pipe(inject('libs'))
        .pipe(inject())
        // TODO: consider if using gulp-template adds any value. It passes variables from config to the js, variables like env
        .pipe(gulp.dest(Config.APP_DEST));
});