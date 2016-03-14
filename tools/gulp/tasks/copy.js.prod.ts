import * as gulp from 'gulp';
import Config from '../gulp.config';

//TODO: what is this task for?
gulp.task('copy.js.prod', () => {
    return gulp.src([
            `${Config.APP_SRC}/**/*.ts`,
            `!${Config.APP_SRC}/**/*.spec.ts`,
            `!${Config.APP_SRC}/**/*.e2e.ts`
        ])
        .pipe(gulp.dest(Config.TMP_DIR));
});