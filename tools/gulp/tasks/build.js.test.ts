import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';
import TypeScriptHelper from '../utils/typescript.helper';
const plugins = <any>gulpLoadPlugins();

gulp.task('build.js.test', () => {
    let tsProject = TypeScriptHelper.makeProject();
    let src = [
        'typings/browser.d.ts',
        `${Config.TOOLS_DIR}/manual_typings/**/*.d.ts`,
        `${Config.APP_SRC}/**/*.ts`,
        `!${Config.APP_SRC}/**/*.e2e.ts`,
        `!${Config.APP_SRC}/${Config.BOOTSTRAP_MODULE}.ts`
    ];

    let result = gulp.src(src)
        .pipe(plugins.plumber())
        .pipe(plugins.inlineNg2Template({base: Config.APP_SRC, useRelativePaths: true}))
        .pipe(plugins.typescript(tsProject));

    return result.js
        .pipe(gulp.dest(Config.APP_DEST));
});
