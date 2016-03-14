import * as gulp from 'gulp';
import Server from '../utils/server';

gulp.task('server.start', () => {
   Server.start();
});