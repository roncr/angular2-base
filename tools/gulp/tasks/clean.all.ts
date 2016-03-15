import * as gulp from 'gulp';
import Config from '../gulp.config';
import clean from '../utils/clean';

gulp.task('clean.all', done => {
    clean([Config.APP_DIST, Config.TESTS_COVERAGE_DIR], done);
});