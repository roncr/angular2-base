import * as gulp from 'gulp';
import * as browserSync from 'browser-sync';
import Config from '../gulp.config';

let runServer = () => {
    let baseDir = Config.APP_DEST;
    let routes:any = {
        [`${Config.APP_BASE}${Config.APP_DEST}`]: Config.APP_DEST,
        [`${Config.APP_BASE}node_modules`]: 'node_modules',
    };

    if (Config.APP_BASE !== '/') {
        routes[`${Config.APP_BASE}`] = Config.APP_DEST;
        baseDir = `${Config.APP_DIST}/empty/`; // TODO: what is this for?
    }

    browserSync.init({
        middleware: [require('connect-history-api-fallback')({index: `${Config.APP_BASE}index.html`})],
        port: Config.PORT,
        startPath: Config.APP_BASE,
        server: {
            baseDir: baseDir,
            routes: routes
        }
    });
};

let listen = () => {
    runServer();
};

gulp.task('server.start', () => {
   listen();
});