import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as requireDir from 'require-dir';

requireDir('./tools/gulp/tasks');


// --------------
// Build dev.
gulp.task('build.dev', done => {
    runSequence('clean.dev',
                'tslint',
                'css-lint',
                'build.assets.dev',
                'build.css',
                'build.html',
                'build.js.dev',
                'build.index.dev',
                done);
});


// --------------
// Build prod.
// TODO: streamline production pipeline
gulp.task('build.prod', done => {
    runSequence('clean.prod',
                'tslint',
                'css-lint',
                'build.assets.prod',
                'build.css',
                'build.html',
                'copy.js.prod',
                'build.js.prod',
                'build.bundles.shims',
                'build.bundles.app',
                'build.index.prod',
                done);
});

// --------------
// Build test.
gulp.task('build.test', (done: any) =>
    runSequence('clean.dev',
                'tslint',
                'build.assets.dev',
                'build.js.test',
                'build.index.dev',
                done));


// --------------
// Serve dev
gulp.task('serve.dev', done => {
    runSequence('build.dev',
                'server.start',
                'watch.dev',
                done);
});


// --------------
// Serve prod
gulp.task('serve.prod', ['build.prod']);


// --------------
// Test.
// TODO: re-do all testing tasks, remove all dependencies karma-* jasmine-* phantomjs-*
gulp.task('test', (done: any) =>
    runSequence('build.test',
                'karma.start',
                done));


// --------------
// Docs
gulp.task('docs', (done: any) =>
    runSequence('build.docs',
                'serve.docs',
                done));


// TODO: pending e2e tesing
// --------------
// [done] Build dev.
// Build e2e.
// [done] Build prod.
// [done] Build test.
// Build test watch.
// Build tools.
// Docs
// [done] Serve dev
// Serve e2e
// [done] Test.