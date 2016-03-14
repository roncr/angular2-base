import * as gulp from 'gulp';
import * as gulpPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';

const plugins = <any>gulpPlugins();

// A TS project allow us to do incremental compilations
function makeTsProject() {
    return plugins.typescript.createProject('tsconfig.json');
}

gulp.task('build:js:dev', () => {
    let tsProject = makeTsProject();
    let src = [
        'typings/browser.d.ts',
        `${Config.TOOLS_DIR}/manual_typings/**/*.d.ts`,
        `${Config.APP_SRC}/**/*.ts`,
        `!${Config.APP_SRC}/**/*.spec.ts`,
        `!${Config.APP_SRC}/**/*.e2e.ts`
    ];
    let result = gulp.src(src)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init()) // NOTE: gulp-typescript suggest the usage of gulp-sourcemaps
        .pipe(plugins.typescript(tsProject));

    return result.js
        .pipe(plugins.sourcemaps.write())
        // TODO: consider if using gulp-template adds any value. It passes variables from config to the js, variables like env
        .pipe(gulp.dest(Config.APP_DEST));
})