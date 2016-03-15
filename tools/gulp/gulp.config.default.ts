import * as yargs from 'yargs';
import { InjectableDependency } from './injectable-dependency.interface';

const ENVIRONMENTS = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod'
};

// TODO: consider having the ENV, APP_BASE as a console parameter
export class Config {
    // General
    ENV                  = getEnvironment();
    PORT                 = 7557;
    APP_BASE             = '/';
    BOOTSTRAP_MODULE     = 'js/main';

    // Source
    APP_SRC              = 'src';
    APP_STYLES           = `${this.APP_SRC}/css`;
    APP_ASSETS           = `${this.APP_SRC}/assets`;
    TOOLS_DIR            = 'tools';

    // Target Folders
    APP_DIST             = 'dist';
    TMP_DIR              = `${this.APP_DIST}/tmp`; // TODO: what is this for?
    APP_DEST             = `${this.APP_DIST}/${this.ENV}`; // TODO: have only one dist, or change names
    DEV_DEST             = `${this.APP_DIST}/dev`; // TODO: remove this, have only 1 dist
    PROD_DEST            = `${this.APP_DIST}/prod`; // TODO: remove this, have only 1 dist
    CSS_DEST             = `${this.APP_DEST}/css`;
    JS_DEST              = `${this.APP_DEST}/js`;

    // Target Filenames
    CSS_PROD_BUNDLE      = 'all.css';
    JS_PROD_SHIMS_BUNDLE = 'shims.js';
    JS_PROD_APP_BUNDLE   = 'app.js';

    // Other
    APP_RESOURCES: InjectableDependency[] = [
        { src: `${this.APP_STYLES}/main.css`, inject: true, vendor: false }
    ];

    // TODO: find an alternative to don't handle this dependencies manually
    DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
        { src: 'systemjs/dist/system-polyfills.js', inject: 'shims' },
        { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
        { src: 'systemjs/dist/system.src.js', inject: 'shims' },
        { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
        { src: 'rxjs/bundles/Rx.js', inject: 'libs' },
        { src: 'angular2/bundles/angular2.js', inject: 'libs' }
    ]);

    PROD_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
        { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
        { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
        { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
        { src: 'systemjs/dist/system.js', inject: 'shims' },
        { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' }
    ]);

    DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_RESOURCES);
    PROD_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(this.APP_RESOURCES);

    SYSTEM_BUILDER_CONFIG = {
        defaultJSExtensions: true,
        paths: {
            [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
            '*': 'node_modules/*'
        }
    };

    // Auto-prefixer configuration.
    BROWSER_LIST = [
        'chrome >= 48'
    ];
};

export function normalizeDependencies(deps: InjectableDependency[]) {
    deps
        .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
        .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
    return deps;
}

// TODO: find a better alternative to identify the environment
// Will get the environment on this priority:
//  1. user param
//  2. having the keyword 'prod' in the task name (base), like: build.prod
function getEnvironment() {
    let base:string[] = yargs.argv['_'];
    let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
    if (base && prodKeyword || yargs.argv['env'] === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    } else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}