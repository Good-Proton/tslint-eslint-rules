"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-extra-boolean-cast';
var scripts = {
    valid: [
        'if (!foo) {}',
        'const x = !foo;',
        'const foo = true;',
        'const foo = !!bar;',
        'function foo() { return !!bar }',
        'const foo = bar ? !!x : !!y;`'
    ],
    invalid: [
        'if (!!foo) {}',
        'const foo = !!!bar;',
        'const foo = !!bar ? baz : bat;',
        'const foo = Boolean(!!bar);',
        'const foo = new Boolean(!!bar);',
        'while (!!foo) {}',
        'do {} while (!!foo);',
        'for (; !!foo; ) {}`',
        'if (!!lastUpdated && !!savedJwt) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using valid boolean casts outside of a boolean context', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using redundant boolean casts in a boolean context', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeHRyYUJvb2xlYW5DYXN0UnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsY0FBYztRQUNkLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLGlDQUFpQztRQUNqQywrQkFBK0I7S0FDaEM7SUFDRCxPQUFPLEVBQUU7UUFDUCxlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLGdDQUFnQztRQUNoQyw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHFDQUFxQztLQUN0QztDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsSUFBSTtJQUMxQixFQUFFLENBQUMseUVBQXlFLEVBQUUsU0FBUyxTQUFTO1FBQzlGLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUUsU0FBUyxXQUFXO1FBQzVGLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vRXh0cmFCb29sZWFuQ2FzdFJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
