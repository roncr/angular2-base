import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import Config from '../gulp.config';
import Server from '../utils/server';
const plugins = <any>gulpLoadPlugins();

gulp.task('watch.dev', () => {
    plugins.watch(`${Config.APP_SRC}/**`, (e:any) => {
        runSequence('build:dev', () => Server.update(e.path))
    });
});