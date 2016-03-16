import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../gulp.config';
const plugins = <any>gulpLoadPlugins();

gulp.task('build.docs', () => {

    let src = [
        `typings/main.d.ts`,
        `${Config.APP_SRC}/**/*.ts`,
        `!${Config.APP_SRC}/**/*.spec.ts`,
        `!${Config.APP_SRC}/**/*.e2e.ts`
    ];

    return gulp.src(src)
        .pipe(plugins.typedoc({
            // TypeScript options (see typescript docs)
            module: 'commonjs',
            target: 'es5',
            includeDeclarations: true,
            // Output options (see typedoc docs)
            out: Config.DOCS_DEST,
            json: `${Config.DOCS_DEST}/data/docs.json`,
            name: Config.APP_TITLE,
            ignoreCompilerErrors: false,
            experimentalDecorators: true,
            excludeExternals: true,
            version: true
        }));
});