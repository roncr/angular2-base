import * as gulp from 'gulp';

import Config from '../gulp.config';

gulp.task('build:html', () => {
    // TODO: why tmp?
    return gulp.src(`${Config.APP_SRC}/**/*.html'`)
        .pipe(gulp.dest(Config.TMP_DIR));
});