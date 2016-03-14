import * as gulpPlugins from 'gulp-load-plugins';

const plugins = <any>gulpPlugins();

export class TypeScriptHelper {
    makeProject () {
        // A TS project allow us to do incremental compilations
        return plugins.typescript.createProject('tsconfig.json');
    }
}

let tsHelper = new TypeScriptHelper();
export default tsHelper;