import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as requireDir from 'require-dir';

requireDir('./tools/gulp/tasks');

// --------------
// Build dev.
gulp.task('build:dev', done => {
    runSequence('clean:dev',
                'tslint',
                'css-lint',
                'build:assets:dev',
                'build:css',
                'build:html',
                'build:js:dev',
                'build:index:dev',
                done);
});


// --------------
// Serve dev
gulp.task('serve:dev', done => {
    runSequence('build:dev',
                'server.start',
                done);
});