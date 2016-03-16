import * as gulp from 'gulp';
import Config from '../gulp.config';

// TODO: assets should literally only take care of assets, but it is transfering the .html of the components, that should be done by another task
gulp.task('build.assets.dev', () => {
    let src = [
        `${Config.APP_SRC}/**`,
        `!${Config.APP_SRC}/**/*.ts`
    ];

    gulp.src(src)
        .pipe(gulp.dest(Config.APP_DEST));
});