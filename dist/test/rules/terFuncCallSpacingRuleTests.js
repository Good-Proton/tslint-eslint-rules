"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var MISSING_SPACE = 'Missing space between function name and paren.';
var UNEXPECTED_SPACE = 'Unexpected space between function name and paren.';
var UNEXPECTED_NEWLINE = 'Unexpected newline between function name and paren.';
var ruleTester = new ruleTester_1.RuleTester('ter-func-call-spacing');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[2],
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('default-to-never', 'should pass with default option of "never"', [
    'f();',
    'f(a, b);',
    'f.b();',
    'f.b().c();',
    'f()()',
    '(function() {}())',
    'var f = new Foo()',
    'var f = new Foo',
    'f( (0) )',
    '( f )( 0 )',
    '( (f) )( (0) )',
    '( f()() )(0)',
    '(function(){ if (foo) { bar(); } }());',
    'f(0, (1))',
    "describe/**/('foo', function () {});",
    'new (foo())',
    'new Foo<Bar>()'
]);
ruleTester.addTestGroupWithConfig('specify-as-never', 'should pass when specifying "never"', ['never'], [
    'f();',
    'f(a, b);',
    'f.b();',
    'f.b().c();',
    'f()()',
    '(function() {}())',
    'var f = new Foo()',
    'var f = new Foo',
    'f( (0) )',
    '( f )( 0 )',
    '( (f) )( (0) )',
    '( f()() )(0)',
    '(function(){ if (foo) { bar(); } }());',
    'f(0, (1))',
    "describe/**/('foo', function () {});",
    'new (foo())',
    'new Foo<Bar>()'
]);
ruleTester.addTestGroupWithConfig('specify-as-always', 'should pass when specifying "always"', ['always'], [
    'f ();',
    'f (a, b);',
    'f.b ();',
    'f.b ().c ();',
    'f () ()',
    '(function() {} ())',
    'var f = new Foo ()',
    'var f = new Foo',
    'f ( (0) )',
    'f (0) (1)',
    '(f) (0)',
    'f ();\n t   ();',
    'foo<Bar> ()',
    'new Foo<Bar> ()'
]);
ruleTester.addTestGroupWithConfig('allow-new-lines', 'should pass when allowing new lines', ['always', { allowNewlines: true }], [
    'f\n();',
    'f.b \n ();',
    'f\n() ().b \n()\n ()',
    'var f = new Foo\n();',
    'f// comment\n()',
    'f // comment\n ()',
    'f// comment\n()',
    'f\n/*\n*/\n()',
    'f\r();',
    'f\u2028();',
    'f\u2029();',
    'f\r\n();',
    'foo<Bar> ()',
    'new Foo<Bar>\n()'
]);
ruleTester.addTestGroup('fix-default', 'should remove spaces with default config', [
    {
        code: 'f ();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f();'
    },
    {
        code: 'f (a, b);',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f(a, b);'
    },
    {
        code: 'f.b ();',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: 'f.b();'
    },
    {
        code: 'f.b().c ();',
        errors: expecting([
            [0, 7, UNEXPECTED_SPACE]
        ]),
        output: 'f.b().c();'
    },
    {
        code: 'f() ()',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: 'f()()'
    },
    {
        code: '(function() {} ())',
        errors: expecting([
            [0, 14, UNEXPECTED_SPACE]
        ]),
        output: '(function() {}())'
    },
    {
        code: 'var f = new Foo ()',
        errors: expecting([
            [0, 15, UNEXPECTED_SPACE]
        ]),
        output: 'var f = new Foo()'
    },
    {
        code: 'f ( (0) )',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f( (0) )'
    },
    {
        code: 'f(0) (1)',
        errors: expecting([
            [0, 4, UNEXPECTED_SPACE]
        ]),
        output: 'f(0)(1)'
    },
    {
        code: '(f) (0)',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: '(f)(0)'
    },
    {
        code: 'f ();\n t   ();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE],
            [1, 2, UNEXPECTED_SPACE]
        ]),
        output: 'f();\n t();'
    },
    {
        code: 'foo<Bar> ()',
        errors: expecting([
            [0, 8, UNEXPECTED_SPACE]
        ]),
        output: 'foo<Bar>()'
    },
    {
        code: 'new Foo<Bar> ()',
        errors: expecting([
            [0, 12, UNEXPECTED_SPACE]
        ]),
        output: 'new Foo<Bar>()'
    }
]);
ruleTester.addTestGroupWithConfig('fix-never', 'should remove spaces when configured as "never"', ['never'], [
    {
        code: 'f ();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f();'
    },
    {
        code: 'f (a, b);',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f(a, b);'
    },
    {
        code: 'f.b ();',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: 'f.b();'
    },
    {
        code: 'f.b().c ();',
        errors: expecting([
            [0, 7, UNEXPECTED_SPACE]
        ]),
        output: 'f.b().c();'
    },
    {
        code: 'f() ()',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: 'f()()'
    },
    {
        code: '(function() {} ())',
        errors: expecting([
            [0, 14, UNEXPECTED_SPACE]
        ]),
        output: '(function() {}())'
    },
    {
        code: 'var f = new Foo ()',
        errors: expecting([
            [0, 15, UNEXPECTED_SPACE]
        ]),
        output: 'var f = new Foo()'
    },
    {
        code: 'f ( (0) )',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f( (0) )'
    },
    {
        code: 'f(0) (1)',
        errors: expecting([
            [0, 4, UNEXPECTED_SPACE]
        ]),
        output: 'f(0)(1)'
    },
    {
        code: '(f) (0)',
        errors: expecting([
            [0, 3, UNEXPECTED_SPACE]
        ]),
        output: '(f)(0)'
    },
    {
        code: 'f ();\n t   ();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE],
            [1, 2, UNEXPECTED_SPACE]
        ]),
        output: 'f();\n t();'
    },
    {
        code: 'f\n();',
        errors: expecting([
            [0, 1, UNEXPECTED_NEWLINE]
        ]),
        output: 'f();'
    },
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      this.cancelled.add(request)\n      this.decrement(request)\n      (0, request.reject)(new api.Cancel())\n    "], ["\n      this.cancelled.add(request)\n      this.decrement(request)\n      (0, request.reject)(new api.Cancel())\n    "]))),
        errors: expecting([
            [2, 23, UNEXPECTED_NEWLINE]
        ]),
        output: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      this.cancelled.add(request)\n      this.decrement(request)(0, request.reject)(new api.Cancel())\n    "], ["\n      this.cancelled.add(request)\n      this.decrement(request)(0, request.reject)(new api.Cancel())\n    "])))
    },
    {
        code: 'var a = foo\n(function(global) {}(this));',
        errors: expecting([
            [0, 11, UNEXPECTED_NEWLINE]
        ]),
        output: 'var a = foo(function(global) {}(this));'
    },
    {
        code: 'var a = foo\n(0, baz())',
        errors: expecting([
            [0, 11, UNEXPECTED_NEWLINE]
        ]),
        output: 'var a = foo(0, baz())'
    },
    {
        code: 'f\r();',
        errors: expecting([
            [0, 1, UNEXPECTED_NEWLINE]
        ]),
        output: 'f();'
    },
    {
        code: 'f\u2028();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f();'
    },
    {
        code: 'f\u2029();',
        errors: expecting([
            [0, 1, UNEXPECTED_SPACE]
        ]),
        output: 'f();'
    },
    {
        code: 'f\r\n();',
        errors: expecting([
            [0, 1, UNEXPECTED_NEWLINE]
        ]),
        output: 'f();'
    },
    {
        code: 'foo<Bar> ()',
        errors: expecting([
            [0, 8, UNEXPECTED_SPACE]
        ]),
        output: 'foo<Bar>()'
    },
    {
        code: 'new Foo<Bar> ()',
        errors: expecting([
            [0, 12, UNEXPECTED_SPACE]
        ]),
        output: 'new Foo<Bar>()'
    }
]);
ruleTester.addTestGroupWithConfig('fix-always', 'should add a space when configured as "always"', ['always'], [
    {
        code: 'f();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f\n();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f(a, b);',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f (a, b);'
    },
    {
        code: 'f\n(a, b);',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f (a, b);'
    },
    {
        code: 'f.b();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ();'
    },
    {
        code: 'f.b\n();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ();'
    },
    {
        code: 'f.b().c ();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ().c ();'
    },
    {
        code: 'f.b\n().c ();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ().c ();'
    },
    {
        code: 'f() ()',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f () ()'
    },
    {
        code: 'f\n() ()',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f () ()'
    },
    {
        code: 'f\n()()',
        errors: expecting([
            [0, 1, MISSING_SPACE],
            [1, 2, MISSING_SPACE]
        ]),
        output: 'f () ()'
    },
    {
        code: '(function() {}())',
        errors: expecting([
            [0, 14, MISSING_SPACE]
        ]),
        output: '(function() {} ())'
    },
    {
        code: 'var f = new Foo()',
        errors: expecting([
            [0, 15, MISSING_SPACE]
        ]),
        output: 'var f = new Foo ()'
    },
    {
        code: 'f( (0) )',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ( (0) )'
    },
    {
        code: 'f(0) (1)',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f (0) (1)'
    },
    {
        code: '(f)(0)',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: '(f) (0)'
    },
    {
        code: 'f();\n t();',
        errors: expecting([
            [0, 1, MISSING_SPACE],
            [1, 2, MISSING_SPACE]
        ]),
        output: 'f ();\n t ();'
    },
    {
        code: 'f\r();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f\u2028();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f\u2029();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f\r\n();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'foo<Bar>()',
        errors: expecting([
            [0, 8, MISSING_SPACE]
        ]),
        output: 'foo<Bar> ()'
    },
    {
        code: 'new Foo<Bar>()',
        errors: expecting([
            [0, 12, MISSING_SPACE]
        ]),
        output: 'new Foo<Bar> ()'
    }
]);
ruleTester.addTestGroupWithConfig('fix-new-lines', 'should add a space when configured as "always" with new lines', ['always', { allowNewLines: true }], [
    {
        code: 'f();',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ();'
    },
    {
        code: 'f(a, b);',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f (a, b);'
    },
    {
        code: 'f.b();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ();'
    },
    {
        code: 'f.b().c ();',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: 'f.b ().c ();'
    },
    {
        code: 'f() ()',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f () ()'
    },
    {
        code: '(function() {}())',
        errors: expecting([
            [0, 14, MISSING_SPACE]
        ]),
        output: '(function() {} ())'
    },
    {
        code: 'var f = new Foo()',
        errors: expecting([
            [0, 15, MISSING_SPACE]
        ]),
        output: 'var f = new Foo ()'
    },
    {
        code: 'f( (0) )',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f ( (0) )'
    },
    {
        code: 'f(0) (1)',
        errors: expecting([
            [0, 1, MISSING_SPACE]
        ]),
        output: 'f (0) (1)'
    },
    {
        code: '(f)(0)',
        errors: expecting([
            [0, 3, MISSING_SPACE]
        ]),
        output: '(f) (0)'
    },
    {
        code: 'f();\n t();',
        errors: expecting([
            [0, 1, MISSING_SPACE],
            [1, 2, MISSING_SPACE]
        ]),
        output: 'f ();\n t ();'
    },
    {
        code: 'foo<Bar>()',
        errors: expecting([
            [0, 8, MISSING_SPACE]
        ]),
        output: 'foo<Bar> ()'
    },
    {
        code: 'new Foo<Bar>()',
        errors: expecting([
            [0, 12, MISSING_SPACE]
        ]),
        output: 'new Foo<Bar> ()'
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyRnVuY0NhbGxTcGFjaW5nUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxRTtBQUVyRSxJQUFNLGFBQWEsR0FBRyxnREFBZ0QsQ0FBQztBQUN2RSxJQUFNLGdCQUFnQixHQUFHLG1EQUFtRCxDQUFDO0FBQzdFLElBQU0sa0JBQWtCLEdBQUcscURBQXFELENBQUM7QUFFakYsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFM0QsU0FBUyxTQUFTLENBQUMsTUFBa0M7SUFDbkQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSw0Q0FBNEMsRUFBRTtJQUN4RixNQUFNO0lBQ04sVUFBVTtJQUNWLFFBQVE7SUFDUixZQUFZO0lBQ1osT0FBTztJQUNQLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCx3Q0FBd0M7SUFDeEMsV0FBVztJQUNYLHNDQUFzQztJQUN0QyxhQUFhO0lBQ2IsZ0JBQWdCO0NBQ2pCLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3RHLE1BQU07SUFDTixVQUFVO0lBQ1YsUUFBUTtJQUNSLFlBQVk7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Q0FBQyxFQUFFLGFBQWEsQ0FBQztTQUN0QixDQUFDO1FBQ0YsTUFBTSxFQUFFLFNBQVM7S0FDbEI7SUFDRDtRQUNFLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQztZQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDO1NBQ3RCLENBQUM7UUFDRixNQUFNLEVBQUUsZUFBZTtLQUN4QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFlBQVk7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDO1NBQ3RCLENBQUM7UUFDRixNQUFNLEVBQUUsYUFBYTtLQUN0QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUM7U0FDdkIsQ0FBQztRQUNGLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUI7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJGdW5jQ2FsbFNwYWNpbmdSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
