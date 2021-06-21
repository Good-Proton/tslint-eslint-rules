"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-unexpected-multiline', true);
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[0],
            startPosition: new ruleTester_1.Position(err[1], err[2]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when using expected parenthesis, brackets, or templates', [
    '(x || y).aFunction()',
    '[a, b, c].forEach(doSomething)',
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    var a = b;\n    (x || y).doSomething()\n    "], ["\n    var a = b;\n    (x || y).doSomething()\n    "]))),
    ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    var a = b\n    ;(x || y).doSomething()\n    "], ["\n    var a = b\n    ;(x || y).doSomething()\n    "]))),
    ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    var a = b\n    void (x || y).doSomething()\n    "], ["\n    var a = b\n    void (x || y).doSomething()\n    "]))),
    ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    var a = b;\n    [1, 2, 3].forEach(console.log)\n    "], ["\n    var a = b;\n    [1, 2, 3].forEach(console.log)\n    "]))),
    ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    var a = b\n    void [1, 2, 3].forEach(console.log)\n    "], ["\n    var a = b\n    void [1, 2, 3].forEach(console.log)\n    "]))),
    ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n    'abc    (123)    '\n    "], ["\n    'abc\\\n    (123)\\\n    '\n    "]))),
    ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    var a = (\n    (123)\n    )\n    "], ["\n    var a = (\n    (123)\n    )\n    "]))),
    ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n    var x = {\n      foo: 1,\n      bar: 2,\n      baz: 3\n    };\n    "], ["\n    var x = {\n      foo: 1,\n      bar: 2,\n      baz: 3\n    };\n    "]))),
    ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n    function a() {\n\n    }\n    "], ["\n    function a() {\n\n    }\n    "]))),
    ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n    if (a === 1\n      && (b === 2 || c === 3)) { }\n    "], ["\n    if (a === 1\n      && (b === 2 || c === 3)) { }\n    "]))),
    ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n    myArray\n      .map();\n    "], ["\n    myArray\n      .map();\n    "]))),
    ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n    tag `hello world`\n    "], ["\n    tag \\`hello world\\`\n    "]))),
    ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n    tag `hello ${expression} world`\n    "], ["\n    tag \\`hello \\${expression} world\\`\n    "])))
]);
ruleTester.addTestGroup('invalid', 'should fail when using unexpected parenthesis, brackets, or templates', [
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      var a = b\n      (x || y).doSomething()\n      "], ["\n      var a = b\n      (x || y).doSomething()\n      "]))),
        errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n      var a = (a || b)\n      (x || y).doSomething()\n      "], ["\n      var a = (a || b)\n      (x || y).doSomething()\n      "]))),
        errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n      var a = b\n      [a, b, c].forEach(doSomething)\n      "], ["\n      var a = b\n      [a, b, c].forEach(doSomething)\n      "]))),
        errors: expecting([['unexpected newline between object and [ of property access', 1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n      var a = b\n          (x || y).doSomething()\n      "], ["\n      var a = b\n          (x || y).doSomething()\n      "]))),
        errors: expecting([['unexpected newline between function and ( of function call', 1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      var a = b\n        [a, b, c].forEach(doSomething)\n      "], ["\n      var a = b\n        [a, b, c].forEach(doSomething)\n      "]))),
        errors: expecting([['unexpected newline between object and [ of property access', 1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n      tag\n        `hello world`\n      "], ["\n      tag\n        \\`hello world\\`\n      "]))),
        errors: expecting([['unexpected newline between template tag and template literal', 1, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n      tag\n        `hello ${expression} world`\n      "], ["\n      tag\n        \\`hello \\${expression} world\\`\n      "]))),
        errors: expecting([['unexpected newline between template tag and template literal', 1, 0]])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9VbmV4cGVjdGVkTXVsdGlsaW5lUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxRTtBQUVyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFbkUsU0FBUyxTQUFTLENBQUMsTUFBa0M7SUFFbkQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscUVBQXFFLEVBQUU7SUFDdEcsc0JBQXNCO0lBQ3RCLGdDQUFnQztJQUNoQyxtQkFBTSwrSEFBQSxvREFHSDtJQUNILG1CQUFNLCtIQUFBLG9EQUdIO0lBQ0gsbUJBQU0sbUlBQUEsd0RBR0g7SUFDSCxtQkFBTSx1SUFBQSw0REFHSDtJQUNILG1CQUFNLDJJQUFBLGdFQUdIO0lBQ0gsbUJBQU0sMkdBQUEsd0NBSUg7SUFDSCxtQkFBTSxvSEFBQSx5Q0FJSDtJQUNILG1CQUFNLHNKQUFBLDJFQU1IO0lBQ0gsbUJBQU0sZ0hBQUEscUNBSUg7SUFDSCxtQkFBTSwwSUFBQSw2REFHSDtJQUNILG1CQUFNLGlIQUFBLG9DQUdIO0lBQ0gsbUJBQU0sNEdBQUEsbUNBRUg7SUFDSCxtQkFBTSwwSEFBQSxtREFFSDtDQUNKLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLHVFQUF1RSxFQUFFO0lBQzFHO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHNJQUFBLHlEQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw0REFBNEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDZJQUFBLGdFQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw0REFBNEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDhJQUFBLGlFQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw0REFBNEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDBJQUFBLDZEQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw0REFBNEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLGdKQUFBLG1FQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw0REFBNEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHlIQUFBLGdEQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw4REFBOEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHVJQUFBLGdFQUdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyw4REFBOEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
