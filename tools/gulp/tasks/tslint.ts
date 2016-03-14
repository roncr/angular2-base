import * as gulp from 'gulp';
import {readFileSync} from 'fs';
import * as gulpPlugins from 'gulp-load-plugins';

import Config from '../gulp.config';

const plugins = <any>gulpPlugins();

// TODO: consider using join(...)
gulp.task('tslint', done => {
    const NG2LINT_RULES = customTSLintRules();
    let src = [`${Config.APP_SRC}/**/*.ts`, `!${Config.APP_SRC}/**/*.d.ts`]; // include the tasks in the linting process
    return gulp.src(src)
        .pipe(plugins.tslint({
            rulesDirectory: NG2LINT_RULES
        }))
        .pipe(plugins.tslint.report(plugins.tslintStylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
});

// Util methods
// NOTE: I think this is not necessary, explore if just tslint.json would be enough
// TODO: make the tslint filename as a parameter
function customTSLintRules(): string[] {
    var lintConf = JSON.parse(readFileSync('tslint.json').toString());
    return lintConf.rulesDirectory;
}