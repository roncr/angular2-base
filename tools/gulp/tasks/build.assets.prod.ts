import * as gulp from 'gulp';
import {join} from 'path';
import Config from '../gulp.config';

// TODO There should be more elegant to prevent empty directories from copying
// TODO: what is the purpose of this task? wouldn't it better to perform optimizations on images?
let es: any = require('event-stream');
var onlyDirs = function (es: any) {
    return es.map(function (file: any, cb: any) {
        if (file.stat.isFile()) {
            return cb(null, file);
        } else {
            return cb();
        }
    });
};

gulp.task('build.assets.prod', () => {
    return gulp.src([
            `${Config.APP_SRC}/**`,
            `!${Config.APP_SRC}/**/*.ts`,
            `!${Config.APP_SRC}/**/*.css`,
            `!${Config.APP_SRC}/**/*.html`,
            `!${Config.APP_ASSETS}/**/*.js`
        ])
        .pipe(onlyDirs(es))
        .pipe(gulp.dest(Config.APP_DEST));
});