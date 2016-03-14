import * as gulp from 'gulp';
import Config from '../gulp.config';
import clean from '../utils/clean';

gulp.task('clean.prod', done => {
    // TODO: what is the tmp dir for?
    clean([Config.PROD_DEST, Config.TMP_DIR], done);
});