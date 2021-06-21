"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTest = exports.testScript = void 0;
var chai_1 = require("chai");
var Lint = require("tslint");
var options = {
    fix: false,
    formatter: 'json',
    formattersDirectory: 'dist/formatters/',
    rulesDirectory: 'dist/rules/'
};
function testScript(rule, scriptText, config) {
    var linter = new Lint.Linter(options);
    linter.lint(rule + ".ts", scriptText, Lint.Configuration.parseConfigFile(config));
    var failures = JSON.parse(linter.getResult().output);
    return failures.length === 0;
}
exports.testScript = testScript;
function makeTest(rule, scripts, expected, config) {
    if (!config) {
        config = {
            rules: {}
        };
        config.rules[rule] = true;
    }
    scripts.forEach(function (code) {
        var res = testScript(rule, code, config);
        chai_1.expect(res).to.equal(expected, code);
    });
}
exports.makeTest = makeTest;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZCQUE4QjtBQUM5Qiw2QkFBK0I7QUFFL0IsSUFBTSxPQUFPLEdBQXdCO0lBQ25DLEdBQUcsRUFBRSxLQUFLO0lBQ1YsU0FBUyxFQUFFLE1BQU07SUFDakIsbUJBQW1CLEVBQUUsa0JBQWtCO0lBQ3ZDLGNBQWMsRUFBRSxhQUFhO0NBQzlCLENBQUM7QUFLRixTQUFnQixVQUFVLENBQUMsSUFBWSxFQUFFLFVBQWtCLEVBQUUsTUFBVztJQUN0RSxJQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBSSxJQUFJLFFBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUVsRixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2RCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFQRCxnQ0FPQztBQUtELFNBQWdCLFFBQVEsQ0FBQyxJQUFZLEVBQUUsT0FBc0IsRUFBRSxRQUFpQixFQUFFLE1BQXNCO0lBQ3RHLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUc7WUFDUCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztLQUMzQjtJQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1FBQ25CLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFiRCw0QkFhQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL2hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
