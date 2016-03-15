import * as gulp from 'gulp';
import * as gulpPlugins from 'gulp-load-plugins';
import TSLintHelper from '../utils/tslint.helper';
import Config from '../gulp.config';

const plugins = <any>gulpPlugins();

gulp.task('tslint', done => {
    const customRulesDir = TSLintHelper.getCustomRulesDir('tslint.json');

    let src = [`${Config.APP_SRC}/**/*.ts`, `!${Config.APP_SRC}/**/*.d.ts`]; // include the tasks in the linting process
    return gulp.src(src)
        .pipe(plugins.tslint({
            rulesDirectory: customRulesDir
        }))
        .pipe(plugins.tslint.report(plugins.tslintStylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
});
