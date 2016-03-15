import { readFileSync } from 'fs';

class TSLintHelper {
    /**
     * Extracts the directory of custom rules for tslint.
     *
     * @param {string} sourceFilename The JSON file containing the property named rulesDirectory which has the path to a directory of rules.
     * @return {string} Path to the custom rules directory.
     */
    getCustomRulesDir (sourceFilename:string) {
        var lintConf = JSON.parse(readFileSync(sourceFilename).toString());
        return lintConf.rulesDirectory;
    }
}

let helper = new TSLintHelper();
export default helper;