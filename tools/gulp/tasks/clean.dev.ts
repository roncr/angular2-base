import * as gulp from 'gulp';
import clean from '../utils/clean';
import Config from '../gulp.config';

gulp.task('clean.dev', done => {
    clean(Config.DEV_DEST, done);
});