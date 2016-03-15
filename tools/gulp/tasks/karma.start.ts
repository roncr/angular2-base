import * as gulp from 'gulp';
import * as karma from 'karma';

gulp.task('karma.start', (done: any) => {
    new (<any>karma).Server({
        configFile: `${process.cwd()}/karma.config.js`,
        singleRun: true
    }).start(done);
});