import * as gulp from 'gulp';
import { resolve } from 'path';
import StaticServer from '../utils/static.server';
import Config from '../gulp.config';

gulp.task('serve.docs', () => {
    let dir = resolve(process.cwd(), Config.DOCS_DEST);
    StaticServer.start(dir, Config.DOCS_PORT, Config.APP_BASE);
});