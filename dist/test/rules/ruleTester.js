"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFixture = exports.RuleTester = exports.TestGroup = exports.Position = exports.dedent = void 0;
var tslib_1 = require("tslib");
var chai_1 = require("chai");
var Lint = require("tslint");
var fs = require("fs");
var path = require("path");
var BenchMark = require("benchmark");
var dedent = Lint.Utils.dedent;
exports.dedent = dedent;
var empty = '░';
var Position = (function () {
    function Position(line, character, position) {
        this.line = line;
        this.character = character;
        this.position = position;
    }
    Position.prototype.toString = function () {
        var line = this.line === undefined ? empty : this.line;
        var char = this.character === undefined ? empty : this.character;
        var pos = this.position === undefined ? empty : this.position;
        return "[" + line + ":" + char + "|" + pos + "]";
    };
    Position.prototype.getComparablePosition = function (obj) {
        var line = this.line === undefined ? undefined : obj.line;
        var char = this.character === undefined ? undefined : obj.character;
        var pos = this.position === undefined ? undefined : obj.position;
        return new Position(line, char, pos);
    };
    return Position;
}());
exports.Position = Position;
var LintFailure = (function () {
    function LintFailure(name, ruleName, failure, start, end) {
        this.name = name;
        this.ruleName = ruleName;
        this.failure = failure;
        this.startPosition = start || new Position();
        this.endPosition = end || new Position();
    }
    LintFailure.prototype.toString = function () {
        var pos = this.name + "@{" + this.startPosition + " -> " + this.endPosition + "}";
        return "[" + pos + "] " + this.ruleName + ": " + this.failure;
    };
    LintFailure.prototype.getComparableFailure = function (obj) {
        return new LintFailure(obj.name, obj.ruleName, obj.failure, this.startPosition.getComparablePosition(obj.startPosition), this.endPosition.getComparablePosition(obj.endPosition));
    };
    return LintFailure;
}());
var Test = (function () {
    function Test(name, code, output, options, errors, testFixer) {
        if (testFixer === void 0) { testFixer = false; }
        this.name = name;
        this.code = code;
        this.output = output;
        this.options = options;
        this.errors = errors;
        this.testFixer = testFixer;
    }
    Test.prototype.runTest = function (skipErrorCheck) {
        if (skipErrorCheck === void 0) { skipErrorCheck = false; }
        var options = {
            fix: false,
            formatter: 'json',
            formattersDirectory: 'dist/formatters/',
            rulesDirectory: 'dist/rules/'
        };
        var linter = new Lint.Linter(options);
        linter.lint(this.name, this.code, this.options);
        if (skipErrorCheck)
            return;
        var failures = JSON.parse(linter.getResult().output);
        this.compareErrors(this.errors || [], failures.map(function (error) {
            var start = error.startPosition;
            var end = error.endPosition;
            return new LintFailure(error.name, error.ruleName, error.failure, new Position(start.line, start.character, start.position), new Position(end.line, end.character, end.position));
        }), linter);
    };
    Test.prototype.compareErrors = function (expectedErrors, foundErrors, linter) {
        var _this = this;
        var expected = this.arrayDiff(expectedErrors, foundErrors);
        var found = this.arrayDiff(foundErrors, expectedErrors, false);
        var codeLines = this.code.split('\n');
        var total = codeLines.length.toString().length;
        var codeStr = codeLines.map(function (x, i) { return "     " + _this.pad(i, total) + "| " + x; }).join('\n');
        var expectedStr = expected.length ? "Expected:\n       " + expected.join('\n       ') : '';
        var foundStr = found.length ? "Found:\n       " + found.join('\n       ') : '';
        var msg = [
            "Error mismatch in " + this.name + ":",
            '',
            codeStr,
            '',
            "     " + expectedStr,
            '',
            "     " + foundStr,
            ''
        ].join('\n');
        chai_1.assert(expected.length === 0 && found.length === 0, msg);
        if (this.testFixer && this.output) {
            var fixes = linter.getResult().failures.filter(function (f) { return f.hasFix(); }).map(function (f) { return f.getFix(); });
            var fixedCode = Lint.Replacement.applyFixes(this.code, fixes);
            var fixerMsg = [
                "Fixer output mismatch in " + this.name + ":",
                '',
                codeStr,
                '',
                '      '
            ].join('\n');
            chai_1.expect(fixedCode).to.equal(this.output, fixerMsg);
        }
    };
    Test.prototype.arrayDiff = function (source, target, compareToTarget) {
        var _this = this;
        if (compareToTarget === void 0) { compareToTarget = true; }
        return source
            .filter(function (item) { return _this.findIndex(target, item, compareToTarget) === -1; })
            .map(function (x) {
            if (compareToTarget) {
                return x.toString();
            }
            else {
                return target.length ? target[0].getComparableFailure(x).toString() : x.toString();
            }
        });
    };
    Test.prototype.findIndex = function (source, error, compareToError) {
        if (compareToError === void 0) { compareToError = true; }
        var len = source.length;
        var k = 0;
        while (k < len) {
            if (compareToError && "" + error === "" + error.getComparableFailure(source[k])) {
                return k;
            }
            else if ("" + source[k] === "" + source[k].getComparableFailure(error)) {
                return k;
            }
            k++;
        }
        return -1;
    };
    Test.prototype.pad = function (n, width) {
        var numStr = n.toString();
        var padding = new Array(width - numStr.length + 1).join(' ');
        return numStr.length >= width ? numStr : padding + numStr;
    };
    return Test;
}());
var TestGroup = (function () {
    function TestGroup(name, description, ruleName, tests, testFixer, groupConfig) {
        if (testFixer === void 0) { testFixer = false; }
        if (groupConfig === void 0) { groupConfig = null; }
        this.name = name;
        this.ruleName = ruleName;
        this.description = description;
        this.tests = tests.map(function (test, index) {
            var _a;
            var config = { rules: (_a = {}, _a[ruleName] = true, _a) };
            var codeFileName = name + "-" + index + ".ts";
            if (typeof test === 'string') {
                if (groupConfig) {
                    config.rules[ruleName] = tslib_1.__spreadArray([true], groupConfig);
                }
                var configuration = Lint.Configuration.parseConfigFile(config);
                return new Test(codeFileName, test, '', configuration, []);
            }
            if (test.options) {
                config.rules[ruleName] = tslib_1.__spreadArray([true], test.options);
            }
            else if (groupConfig) {
                config.rules[ruleName] = tslib_1.__spreadArray([true], groupConfig);
            }
            var configFile = Lint.Configuration.parseConfigFile(config);
            var failures = (test.errors || []).map(function (error) {
                return new LintFailure(codeFileName, ruleName, error.failure, error.startPosition, error.endPosition);
            });
            return new Test(codeFileName, test.code, test.output || '', configFile, failures, testFixer);
        });
    }
    return TestGroup;
}());
exports.TestGroup = TestGroup;
var RuleTester = (function () {
    function RuleTester(ruleName, testFixer) {
        if (testFixer === void 0) { testFixer = false; }
        this.groups = [];
        this.ruleName = ruleName;
        this.testFixer = testFixer;
    }
    RuleTester.prototype.addTestGroup = function (name, description, tests) {
        this.groups.push(new TestGroup(name, description, this.ruleName, tests, this.testFixer));
        return this;
    };
    RuleTester.prototype.addTestGroupWithConfig = function (name, description, groupConfig, tests) {
        this.groups.push(new TestGroup(name, description, this.ruleName, tests, this.testFixer, groupConfig));
        return this;
    };
    RuleTester.prototype.runTests = function () {
        var _this = this;
        var singleTest = JSON.parse(process.env.SINGLE_TEST || 'null');
        var runGroup = singleTest === null || singleTest.group === null;
        var runIndex = singleTest === null || singleTest.num === null;
        var benchmark = process.env.BENCHMARK !== 'undefined';
        describe(this.ruleName, function () {
            _this.groups.forEach(function (group) {
                if (runGroup || group.name === singleTest.group) {
                    it(group.name + " - " + group.description, function () {
                        if (benchmark) {
                            console.log('');
                        }
                        group.tests.forEach(function (test, index) {
                            if (runIndex || singleTest.num === index) {
                                test.runTest();
                                if (benchmark) {
                                    var suite_1 = new BenchMark.Suite();
                                    suite_1
                                        .add("      [" + index + "]:", function () { return test.runTest(true); })
                                        .on('cycle', function (event) { return console.log(String(event.target)); })
                                        .run({ async: false });
                                }
                            }
                        });
                    });
                }
            });
        });
    };
    return RuleTester;
}());
exports.RuleTester = RuleTester;
function readFixture(name) {
    return fs.readFileSync(path.join(__dirname, "../../../src/test/fixtures/" + name), 'utf8');
}
exports.readFixture = readFixture;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxPQUFPLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQzt5Q0FDOUQsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7aUNBQzFCOzZCQUNGO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxpQkFBQztBQUFELENBaEVBLEFBZ0VDLElBQUE7QUFXQyxnQ0FBVTtBQVRaLFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDL0IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUE4QixJQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBUUMsa0NBQVciLCJmaWxlIjoidGVzdC9ydWxlcy9ydWxlVGVzdGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
