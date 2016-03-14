import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as rimraf from 'rimraf';

// TODO: make the core method reusable, so the path can be a variable
gulp.task('clean:dev', done => {
    let paths:string|string[] = '/dist';
    let pathsArray: string[];
    if (!(paths instanceof Array)) {
        pathsArray = [<string>paths];
    }
    let promises = pathsArray.map(path => {
        return new Promise(resolve => {
            rimraf(path, error => {
                if (error) {
                    util.log('Clean task failed with', error);
                } else {
                    util.log('Deleted', chalk.yellow(path || '-'));
                }
                resolve();
            });
        });
    });
    Promise.all(promises).then(() => done());
});