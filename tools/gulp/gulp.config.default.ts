import { InjectableDependency } from './injectable-dependency.interface';

// TODO: consider having the ENV, APP_BASE as a console parameter
export class Config {
    // General
    ENV             = 'dev';
    PORT            = 7557;
    APP_BASE        = '/';

    // Source
    APP_SRC         = 'src';
    APP_STYLES      = `${this.APP_SRC}/styles`;
    TOOLS_DIR       = 'tools';

    // Target Folders
    APP_DIST        = 'dist';
    TMP_DIR         = `${this.APP_DIST}/tmp`;
    APP_DEST        = `${this.APP_DIST}/${this.ENV}`; // TODO: have only one dist, or change names
    CSS_DEST        = `${this.APP_DEST}/css`;

    // Target Filenames
    CSS_PROD_BUNDLE = 'all.css';

    // Other
    APP_RESOURCES: InjectableDependency[] = [
        { src: `${this.APP_STYLES}/main.css`, inject: true, vendor: false }
    ];

    DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
        { src: 'systemjs/dist/system-polyfills.js', inject: 'shims' },
        { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
        { src: 'systemjs/dist/system.src.js', inject: 'shims' },
        { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
        { src: 'rxjs/bundles/Rx.js', inject: 'libs' },
        { src: 'angular2/bundles/angular2.js', inject: 'libs' }
    ]);

    DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_RESOURCES);

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