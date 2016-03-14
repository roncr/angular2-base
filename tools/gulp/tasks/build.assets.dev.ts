import * as gulp from 'gulp';
import Config from '../gulp.config';

gulp.task('build.assets.dev', () => {
    let src = [
        `${Config.APP_SRC}/**`,
        `!${Config.APP_SRC}/**/*.ts`
    ];

    gulp.src(src)
        .pipe(gulp.dest(Config.APP_DEST));
});