"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRuleFiles = exports.updateReadme = exports.formatUsage = void 0;
var es6_promise_1 = require("es6-promise");
var fs = require("fs");
var path = require("path");
var rules_1 = require("./rules");
function formatUsage(usage) {
    return usage.replace(/~~~/g, '```').replace(/(^[ \t]*\n)/gm, '\n').replace(/^    /mg, '');
}
exports.formatUsage = formatUsage;
function createRuleTable() {
    var buffer = [];
    var category = '';
    rules_1.rules.forEach(function (rule) {
        if (category !== rule.category) {
            category = rule.category;
            buffer.push("\n### " + category + "\n\n");
            buffer.push(rules_1.categories[category] + "\n\n");
            buffer.push('| :grey_question: | ESLint | TSLint | Description |\n');
            buffer.push('| :---            | :---:  | :---:  | :---        |\n');
        }
        var available;
        if (rule.available) {
            available = rule.provider === 'native' ? ':ballot_box_with_check:' : ':white_check_mark:';
        }
        else {
            available = rule.tslintRule === 'Not applicable' ? ':no_entry_sign:' : ':x:';
        }
        var tsRuleName = rule.tslintUrl ? "[" + rule.tslintRule + "](" + rule.tslintUrl + ")" : rule.tslintRule;
        var tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable' : tsRuleName;
        buffer.push('|');
        buffer.push(available + "|");
        buffer.push("[" + rule.eslintRule + "](" + rule.eslintUrl + ")|");
        buffer.push(tsRule + "|");
        buffer.push(rule.description + "|");
        buffer.push('\n');
    });
    return buffer.join('');
}
function updateReadme(cb) {
    fs.readFile('README.md', 'utf8', function (readErr, data) {
        if (readErr) {
            return console.error(readErr);
        }
        var content = data.replace(/^<!-- Start:AutoTable((.*?(\n))+.*?)End:AutoTable -->$/gm, '<!-- Start:AutoTable:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n' +
            createRuleTable() +
            '<!-- End:AutoTable -->');
        fs.writeFile('README.md', content, { encoding: 'utf8' }, function (writeErr) {
            if (writeErr) {
                return console.error(writeErr);
            }
            console.log('[DONE] updating README.md ...');
            cb();
        });
    });
}
exports.updateReadme = updateReadme;
function createRuleContent(rule) {
    var ruleName = rules_1.toCamelCase(rule.tslintRule);
    var moduleName = "../rules/" + ruleName + "Rule.js";
    var module = require(moduleName);
    var metaData = module.Rule.metadata;
    var srcBase = 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src';
    var ruleBadge = 'https://img.shields.io/badge/%F0%9F%93%8F%20rule-source-green.svg';
    var testBadge = 'https://img.shields.io/badge/%F0%9F%93%98%20test-source-blue.svg';
    if (metaData) {
        if (metaData.ruleName !== rule.tslintRule) {
            console.warn('[WARNING]: metadata.ruleName !== rule.tslintRule');
            console.warn("           " + metaData.ruleName + " !== " + rule.tslintRule);
        }
        if (metaData.description !== rule.description) {
            console.warn('[WARNING]: metadata.description !== rule.description');
            console.warn("           " + metaData.description + " !== " + rule.description);
        }
        var examples = metaData.optionExamples.map(function (x) { return ['```json', x, '```'].join(''); }).join('\n\n');
        var schema = [
            '```json',
            JSON.stringify(metaData.options, null, 2),
            '```'
        ].join('\n');
        return [
            "## " + rule.tslintRule + " (ESLint: [" + rule.eslintRule + "](" + rule.eslintUrl + "))",
            "[![rule_source](" + ruleBadge + ")](" + srcBase + "/rules/" + ruleName + "Rule.ts)",
            "[![test_source](" + testBadge + ")](" + srcBase + "/test/rules/" + ruleName + "RuleTests.ts)",
            '',
            rule.description + "\n",
            "#### Rationale\n" + metaData.rationale,
            "### Config\n" + metaData.optionsDescription,
            "#### Examples\n\n" + examples,
            "#### Schema\n\n" + schema
        ].join('\n');
    }
    var usage = rule.usage ? "\n\n### Usage\n\n" + formatUsage(rule.usage) : '';
    var note = rule.note ? "\n\n### Note\n\n" + rule.note + "\n" : '';
    return "## " + rule.tslintRule + " (ESLint: [" + rule.eslintRule + "](" + rule.eslintUrl + "))\n[![rule_source](" + ruleBadge + ")](" + srcBase + "/rules/" + ruleName + "Rule.ts)\n[![test_source](" + testBadge + ")](" + srcBase + "/test/rules/" + ruleName + "RuleTests.ts)\n\n" + rule.description + usage + note + "\n";
}
function updateRuleFile(name, rule) {
    var baseUrl = 'https://github.com/buzinas/tslint-eslint-rules/blob/master';
    var docFileName = "src/docs/rules/" + name + "Rule.md";
    return new es6_promise_1.Promise(function (fulfill, reject) {
        fs.readFile(docFileName, 'utf8', function (readErr, data) {
            rule.tslintUrl = rule.tslintUrl || baseUrl + "/" + docFileName;
            var content = readErr || !data ? '<!-- Start:AutoDoc\n End:AutoDoc -->' : data;
            content = content.replace(/^<!-- Start:AutoDoc((.*?(\n))+.*?)End:AutoDoc -->$/gm, [
                '<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n',
                createRuleContent(rule),
                '\n<!-- End:AutoDoc -->' + (readErr ? '\n' : '')
            ].join(''));
            fs.writeFile(docFileName, content, { encoding: 'utf8' }, function (writeErr) {
                if (writeErr) {
                    return reject(writeErr);
                }
                console.log(" - " + name);
                fulfill();
            });
        });
    });
}
function updateRuleFiles(cb) {
    var ruleDir = 'src/rules/';
    var allFiles = fs.readdirSync(ruleDir).filter(function (file) { return fs.lstatSync(path.join(ruleDir, file)).isFile(); });
    var ruleNames = allFiles
        .filter(function (name) { return /\.ts$/.test(name); })
        .map(function (name) { return name.substr(0, name.length - 7); });
    var allPromises = [];
    ruleNames.forEach(function (name) {
        allPromises.push(updateRuleFile(name, rules_1.ruleTSMap[name]));
    });
    es6_promise_1.Promise.all(allPromises).then(function () {
        console.log('[DONE] processing rule files ...');
        cb();
    });
}
exports.updateRuleFiles = updateRuleFiles;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxVQUFDLFFBQVE7Z0JBQ2hFLElBQUksUUFBUSxFQUFFO29CQUNaLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQU0sSUFBTSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEVBQVk7SUFDbkMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDO0lBQzdCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUM3QyxVQUFBLElBQUksSUFBSSxPQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBL0MsQ0FBK0MsQ0FDeEQsQ0FBQztJQUNGLElBQU0sU0FBUyxHQUFHLFFBQVE7U0FDdkIsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQztTQUNsQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDaEQsSUFBTSxXQUFXLEdBQW9CLEVBQUUsQ0FBQztJQUN4QyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtRQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBS0MsMENBQWUiLCJmaWxlIjoicmVhZG1lL2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
