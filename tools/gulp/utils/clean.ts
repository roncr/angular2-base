import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as rimraf from 'rimraf';

export default function clean(paths: string|string[], done) {
    let pathsArray: string[];

    if (!(paths instanceof Array)) {
        pathsArray = [<string>paths];
    } else {
        pathsArray = paths;
    }

    let promises = pathsArray.map(p => {
        return new Promise(resolve => {
            rimraf(p, e => {
                if (e) {
                    util.log('Clean task failed with', e);
                } else {
                    util.log('Deleted', chalk.yellow(p || '-'));
                }
                resolve();
            });
        });
    });

    Promise.all(promises).then(() => done());
}