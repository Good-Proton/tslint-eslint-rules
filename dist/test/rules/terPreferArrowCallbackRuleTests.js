"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-prefer-arrow-callback');
var errors = [{
        failure: 'Unexpected function expression.',
        startPosition: new ruleTester_1.Position(),
        endPosition: new ruleTester_1.Position()
    }];
ruleTester.addTestGroup('valid', 'should not complain about function expressions', [
    'foo(a => a);',
    'foo(function*() {});',
    'foo(function() { this; });',
    'foo(function() { (() => this); });',
    'foo(function() { this; }.bind(obj));',
    'foo(function() { this; }.call(this));',
    'foo(a => { (function() {}); });',
    'var foo = function foo() {};',
    '(function foo() {})();',
    'foo(function bar() { bar; });',
    'foo(function bar() { arguments; });',
    'foo(function bar() { arguments; }.bind(this));',
    'foo(function bar() { super.a; });',
    'foo(function bar() { super.a; }.bind(this));',
    'foo(function bar() { new.target; });',
    'foo(function bar() { new.target; }.bind(this));',
    'foo(function bar() { this; }.bind(this, somethingElse));'
]);
ruleTester.addTestGroup('allow-named-functions', 'should allow named functions', [
    { code: 'foo(function bar() {});', options: [{ allowNamedFunctions: true }] },
    {
        code: 'foo(function() {});',
        options: [{ allowNamedFunctions: true }],
        errors: errors
    }
]);
ruleTester.addTestGroup('invalid', 'should alert of function expression usage', [
    {
        code: 'foo(function (x) { console.log("arguments", x) })',
        errors: errors
    },
    {
        code: 'foo(function bar(x) { console.log("tricked you, not recursive: bar(x - 1)") })',
        errors: errors
    },
    {
        code: 'foo(function bar() {});',
        errors: errors
    },
    {
        code: 'foo(function bar() {});',
        options: [{ allowNamedFunctions: false }],
        errors: errors,
        output: 'foo(() => {});'
    },
    {
        code: 'foo(function() {});',
        errors: errors,
        output: 'foo(() => {});'
    },
    {
        code: 'foo(nativeCb || function() {});',
        errors: errors,
        output: 'foo(nativeCb || () => {});'
    },
    {
        code: 'foo(bar ? function() {} : function() {});',
        errors: [errors[0], errors[0]],
        output: 'foo(bar ? () => {} : () => {});'
    },
    {
        code: 'foo(function() { (function() { this; }); });',
        errors: errors,
        output: 'foo(() => { (function() { this; }); });'
    },
    {
        code: 'foo(function() { this; }.bind(this));',
        errors: errors,
        output: 'foo(() => { this; });'
    },
    {
        code: 'foo(function() { (() => this); }.bind(this));',
        errors: errors,
        output: 'foo(() => { (() => this); });'
    },
    {
        code: 'foo(function bar(a) { a; });',
        errors: errors,
        output: 'foo((a) => { a; });'
    },
    {
        code: 'foo(function(a) { a; });',
        errors: errors,
        output: 'foo((a) => { a; });'
    },
    {
        code: 'foo(function(arguments) { arguments; });',
        errors: errors,
        output: 'foo((arguments) => { arguments; });'
    },
    {
        code: 'foo(function() { this; });',
        options: [{ allowUnboundThis: false }],
        errors: errors,
        output: 'foo(function() { this; });'
    },
    {
        code: 'foo(function() { (() => this); });',
        options: [{ allowUnboundThis: false }],
        errors: errors,
        output: 'foo(function() { (() => this); });'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * 2; })',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * 2; })'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * bar; }.bind(this))',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * bar; })'
    },
    {
        code: 'qux(function(foo, bar, baz) { return foo * this.qux; }.bind(this))',
        errors: errors,
        output: 'qux((foo, bar, baz) => { return foo * this.qux; })'
    },
    {
        code: 'qux(function(foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) { return foo + bar; });',
        errors: errors,
        output: 'qux((foo = 1, [bar = 2] = [], {qux: baz = 3} = {foo: "bar"}) => { return foo + bar; });'
    },
    {
        code: 'qux(function(baz, baz) { })',
        errors: errors,
        output: 'qux(function(baz, baz) { })'
    },
    {
        code: 'qux(function( /* no params */ ) { })',
        errors: errors,
        output: 'qux(( /* no params */ ) => { })'
    },
    {
        code: 'qux(function( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) { return foo; })',
        errors: errors,
        output: 'qux(( /* a */ foo /* b */ , /* c */ bar /* d */ , /* e */ baz /* f */ ) => { return foo; })'
    },
    {
        code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return baz; })',
        output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return baz; })',
        errors: errors
    },
    {
        code: 'qux(async function (foo = 1, bar = 2, baz = 3) { return this; }.bind(this))',
        output: 'qux(async (foo = 1, bar = 2, baz = 3) => { return this; })',
        errors: errors
    }
]);
ruleTester.addTestGroup('docs-bad', 'should consider these as problems', [
    { code: 'foo(function(a) { return a; });', errors: errors },
    { code: 'foo(function() { return this.a; }.bind(this));', errors: errors }
]);
ruleTester.addTestGroup('docs-good', 'should not be considered as problems', [
    'foo(a => a);',
    'foo(function*() { yield; });',
    'var foo = function foo(a) { return a; };',
    'foo(function() { return this.a; });',
    'foo(function bar(n) { return n && n + bar(n - 1); });'
]);
ruleTester.addTestGroup('docs-allow-unbound-this', 'should allow the use of "this"', [
    { code: 'foo(function() { this.a; });', errors: errors, options: [{ allowUnboundThis: false }] },
    { code: 'foo(function() { (() => this); });', errors: errors, options: [{ allowUnboundThis: false }] },
    {
        code: 'someArray.map(function (itm) { return this.doSomething(itm); }, someObject);',
        errors: errors,
        options: [{ allowUnboundThis: false }]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyUHJlZmVyQXJyb3dDYWxsYmFja1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvRDtBQUdwRCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUMvRCxJQUFNLE1BQU0sR0FBRyxDQUFDO1FBQ2QsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxhQUFhLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1FBQzdCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7S0FDNUIsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0RBQWdELEVBQUU7SUFDakYsY0FBYztJQUNkLHNCQUFzQjtJQUN0Qiw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBQ3BDLHNDQUFzQztJQUN0Qyx1Q0FBdUM7SUFDdkMsaUNBQWlDO0lBQ2pDLDhCQUE4QjtJQUM5Qix3QkFBd0I7SUFDeEIsK0JBQStCO0lBQy9CLHFDQUFxQztJQUNyQyxnREFBZ0Q7SUFDaEQsbUNBQW1DO0lBQ25DLDhDQUE4QztJQUM5QyxzQ0FBc0M7SUFDdEMsaURBQWlEO0lBQ2pELDBEQUEwRDtDQUMzRCxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLDhCQUE4QixFQUFFO0lBQy9FLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtJQUM3RTtRQUNFLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsT0FBTyxFQUFFLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxNQUFNLFFBQUE7S0FDUDtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLDJDQUEyQyxFQUFFO0lBQzlFO1FBQ0UsSUFBSSxFQUFFLG1EQUFtRDtR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O1FBQ3BFLE1BQU0sUUFBQTtLQUNQO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsbUNBQW1DLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxRQUFBLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsZ0RBQWdELEVBQUUsTUFBTSxRQUFBLEVBQUU7Q0FDbkUsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsc0NBQXNDLEVBQUU7SUFDM0UsY0FBYztJQUNkLDhCQUE4QjtJQUM5QiwwQ0FBMEM7SUFDMUMscUNBQXFDO0lBQ3JDLHVEQUF1RDtDQUN4RCxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUF5QixFQUFFLGdDQUFnQyxFQUFFO0lBQ25GLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtJQUN4RixFQUFFLElBQUksRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7SUFDOUY7UUFDRSxJQUFJLEVBQUUsOEVBQThFO1FBQ3BGLE1BQU0sUUFBQTtRQUNOLE9BQU8sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDdkM7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJQcmVmZXJBcnJvd0NhbGxiYWNrUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
