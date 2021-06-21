"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-constant-condition';
var scripts = {
    variables: [
        'const a = "1"; const b = "2"; if (+a > +b) {}',
        'const a = { value: true }; if (a.value) {}',
        'if (foo === true) {}',
        'if (!foo === true) {}',
        'if (bar === false) {}',
        'if (!bar === false) {}',
        'if (baz) {}',
        'if (!baz) {}',
        'if (qux == true) {}',
        'if (!(qux == true)) {}',
        'if (true == x) {}',
        'if (!(true == x)) {}',
        'if (false === y) {}',
        'if (!(false === y)) {}',
        'if (y === x) {}',
        'if (!(y === x)) {}',
        'if (x > 0) {}',
        'if (!(x > 0)) {}',
        'if (100 > x) {}',
        'if (!(100 > x)) {}',
        'if (x === -y) {}',
        'if (!(x === -y)) {}',
        'if (len--)'
    ],
    booleans: [
        'if (true) {}',
        'if (!true) {}',
        'if (false) {}',
        'if (!false) {}'
    ],
    numbers: [
        'if (0) {}',
        'if (!0) {}',
        'if (1) {}',
        'if (!1) {}',
        'if (100) {}',
        'if (!100) {}',
        'if (30.33) {}',
        'if (!30.33) {}',
        'if (-1) {}',
        'if (!-1) {}',
        'if (x = 1) {}',
        'if (!(x = 1)) {}'
    ],
    objects: [
        'if ({}) {}',
        'if (!{}) {}',
        'if ({ foo: "bar" }) {}',
        'if (!{ foo: "bar" }) {}'
    ],
    arrays: [
        'if ([]) {}',
        'if (![]) {}',
        'if ([1, 2, 3]) {}',
        'if (![1, 2, 3]) {}'
    ],
    binary: [
        'if (true === true) {}',
        'if (!(true === true)) {}',
        'if (100 > -5) {}',
        'if (!(100 > -5)) {}',
        'if (false != true) {}',
        'if (!(false != true)) {}',
        'if (false !== true && true === true) {}',
        'if (!(false !== true && true === true)) {}',
        'if (!(false !== true) && true === true) {}',
        'if (false !== true && !(true === true)) {}',
        'if (!(false !== true) && !(true === true)) {}'
    ],
    ternary: [
        'let foo = true ? 1 : 0;',
        'let foo = !true ? 1 : 0;',
        'let bar = false ? "a" : "b";',
        'let bar = !false ? "a" : "b";',
        'let baz = 100 ? "x" : "z";',
        'let baz = !100 ? "x" : "z";',
        'let qux = true === true ? "p": "w";',
        'let qux = !(true === true) ? "p": "w";'
    ],
    whileVars: [
        'while (y === x) {}',
        'while (!(y === x)) {}',
        'while (x > -5) {}',
        'while (!(x > -5)) {}',
        'while (100 > x) {}',
        'while (!(100 > x)) {}',
        'while (foo) {}',
        'while (!foo) {}'
    ],
    whileLiterals: [
        'while (true) {}',
        'while (!true) {}',
        'while (false) {}',
        'while (!false) {}',
        'while (-5) {}',
        'while (!-5) {}',
        'while (1) {}',
        'while (!1) {}',
        'while ({}) {}',
        'while (!{}) {}',
        'while ([]) {}',
        'while (![]) {}'
    ],
    doWhileVars: [
        'do {} while (y === x);',
        'do {} while (!(y === x);',
        'do {} while (x > -5);',
        'do {} while (!(x > -5));',
        'do {} while (100 > x);',
        'do {} while (!(100 > x));',
        'do {} while (foo);',
        'do {} while (!foo);'
    ],
    doWhileLiterals: [
        'do {} while (true);',
        'do {} while (!true);',
        'do {} while (false);',
        'do {} while (!false);',
        'do {} while (-5);',
        'do {} while (!-5);',
        'do {} while (1);',
        'do {} while (!1);',
        'do {} while ({});',
        'do {} while (!{});',
        'do {} while ([]);',
        'do {} while (![]);'
    ],
    forVars: [
        'for (;y === x;) {}',
        'for (;(!y === x);) {}',
        'for (;x > -5;) {}',
        'for (;!(x > -5);) {}',
        'for (;100 > x;) {}',
        'for (;!(100 > x);) {}',
        'for (;foo;) {}',
        'for (;!foo;) {}'
    ],
    forLiterals: [
        'for (;true;) {}',
        'for (;!true;) {}',
        'for (;false;) {}',
        'for (;!false;) {}',
        'for (;-5;) {}',
        'for (;!-5;) {}',
        'for (;1;) {}',
        'for (;!1;) {}',
        'for (;{};) {}',
        'for (;!{};) {}',
        'for (;[];) {}',
        'for (;![];) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using variables', function testVariables() {
        helper_1.makeTest(rule, scripts.variables, true);
    });
    it('should fail with literal booleans', function testBooleans() {
        helper_1.makeTest(rule, scripts.booleans, false);
    });
    it('should fail with literal numbers', function testNumbers() {
        helper_1.makeTest(rule, scripts.numbers, false);
    });
    it('should fail with literal objects', function testObjects() {
        helper_1.makeTest(rule, scripts.objects, false);
    });
    it('should fail with literal arrays', function testArrays() {
        helper_1.makeTest(rule, scripts.arrays, false);
    });
    it('should fail with literal on both sides of a binary expression', function testBinary() {
        helper_1.makeTest(rule, scripts.binary, false);
    });
    it('should fail on ternary literals (booleans / numbers)', function testTernary() {
        helper_1.makeTest(rule, scripts.ternary, false);
    });
    it('should pass on while variables', function testWhileVariables() {
        helper_1.makeTest(rule, scripts.whileVars, true);
    });
    it('should fail on while literals', function testWhileLiterals() {
        helper_1.makeTest(rule, scripts.whileLiterals, false);
    });
    it('should pass on do-while variables', function testDoWhileVariables() {
        helper_1.makeTest(rule, scripts.doWhileVars, true);
    });
    it('should fail on do-while literals', function testDoWhileLiterals() {
        helper_1.makeTest(rule, scripts.doWhileLiterals, false);
    });
    it('should pass on for variables', function testForVariables() {
        helper_1.makeTest(rule, scripts.forVars, true);
    });
    it('should fail on for literals', function testForLiterals() {
        helper_1.makeTest(rule, scripts.forLiterals, false);
    });
    it('should pass for literals in loops when checkLoops is false', function testCheckLoopsFalse() {
        var config = {
            rules: { 'no-constant-condition': [true, { checkLoops: false }] }
        };
        helper_1.makeTest(rule, scripts.forLiterals, true, config);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Db25zdGFudENvbmRpdGlvblJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyx1QkFBdUIsQ0FBQztBQUNyQyxJQUFNLE9BQU8sR0FBRztJQUNkLFNBQVMsRUFBRTtRQUNULCtDQUErQztRQUMvQyw0Q0FBNEM7UUFDNUMsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLGFBQWE7UUFDYixjQUFjO1FBQ2QscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixZQUFZO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixjQUFjO1FBQ2QsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7S0FDakI7SUFDRCxPQUFPLEVBQUU7UUFDUCxXQUFXO1FBQ1gsWUFBWTtRQUNaLFdBQVc7UUFDWCxZQUFZO1FBQ1osYUFBYTtRQUNiLGNBQWM7UUFDZCxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixhQUFhO1FBQ2IsZUFBZTtRQUNmLGtCQUFrQjtLQUNuQjtJQUNELE9BQU8sRUFBRTtRQUNQLFlBQVk7UUFDWixhQUFhO1FBQ2Isd0JBQXdCO1FBQ3hCLHlCQUF5QjtLQUMxQjtJQUNELE1BQU0sRUFBRTtRQUNOLFlBQVk7UUFDWixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLG9CQUFvQjtLQUNyQjtJQUNELE1BQU0sRUFBRTtRQUNOLHVCQUF1QjtRQUN2QiwwQkFBMEI7UUFDMUIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsMEJBQTBC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LENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUdILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxTQUFTLFdBQVc7UUFDN0UsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUdILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxTQUFTLGtCQUFrQjtRQUM5RCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFLFNBQVMsaUJBQWlCO1FBQzVELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFHSCxFQUFFLENBQUMsbUNBQW1DLEVBQUUsU0FBUyxvQkFBb0I7UUFDbkUsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxTQUFTLG1CQUFtQjtRQUNqRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBR0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFLFNBQVMsZ0JBQWdCO1FBQzFELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsU0FBUyxlQUFlO1FBQ3hELGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUUsU0FBUyxtQkFBbUI7UUFDM0YsSUFBTSxNQUFNLEdBQUc7WUFDYixLQUFLLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1NBQ2xFLENBQUM7UUFFRixpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9Db25zdGFudENvbmRpdGlvblJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
