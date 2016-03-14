import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';
import TypeScriptHelper from '../utils/typescript.helper';
const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
    base: Config.TMP_DIR,
    useRelativePaths: true,
    removeLineBreaks: true
};

// TODO: shouldn't we minify here? and concat if necessary?
gulp.task('build.js.prod', () => {
    let tsProject = TypeScriptHelper.makeProject();
    let src = [
        'typings/browser.d.ts',
        `${Config.TOOLS_DIR}/manual_typings/**/*.d.ts`,
        `${Config.TMP_DIR}/**/*.ts`
    ];
    let result = gulp.src(src)
        .pipe(plugins.plumber())
        .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
        .pipe(plugins.typescript(tsProject));

    return result.js
        // TODO: consider if using gulp-template adds any value. It passes variables from config to the js, variables like env
        .pipe(gulp.dest(Config.TMP_DIR)); // TODO: why tmp?
});