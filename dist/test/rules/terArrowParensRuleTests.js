"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-arrow-parens');
var always = 'Expected parentheses around arrow function argument.';
var asNeeded = 'Unexpected parentheses around single function argument.';
var block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
var blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[4],
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position(err[2], err[3])
        };
    });
}
ruleTester.addTestGroup('valid-always', 'should pass with default values', [
    '() => {}',
    '(a) => {}',
    '(a) => a',
    '(a) => {\n}',
    'a.then((foo) => {});',
    'a.then((foo) => { if (true) {}; });',
    'a.then(async (foo) => { if (true) {}; });'
]);
ruleTester.addTestGroup('valid-always-explicit', 'should pass when always is on', [
    { code: '() => {}', options: ['always'] },
    { code: '(a) => {}', options: ['always'] },
    { code: '(a) => a', options: ['always'] },
    { code: '(a) => {\n}', options: ['always'] },
    { code: 'a.then((foo) => {});', options: ['always'] },
    { code: 'a.then((foo) => { if (true) {}; });', options: ['always'] },
    { code: 'a.then(async (foo) => { if (true) {}; });', options: ['always'] }
]);
ruleTester.addTestGroup('valid-as-needed', 'should pass with as-needed on', [
    { code: '() => {}', options: ['as-needed'] },
    { code: 'a => {}', options: ['as-needed'] },
    { code: 'a => a', options: ['as-needed'] },
    { code: '([a, b]) => {}', options: ['as-needed'] },
    { code: '({ a, b }) => {}', options: ['as-needed'] },
    { code: '(a = 10) => {}', options: ['as-needed'] },
    { code: '(...a) => a[0]', options: ['as-needed'] },
    { code: '(a, b) => {}', options: ['as-needed'] },
    { code: 'async ([a, b]) => {}', options: ['as-needed'] },
    { code: 'async (a, b) => {}', options: ['as-needed'] },
    { code: '(a: T) => a', options: ['as-needed'] },
    { code: '(a): T => a', options: ['as-needed'] }
]);
ruleTester.addTestGroup('valid-require-for-block', 'should pass with requireForBlockBody option', [
    { code: '() => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'a => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '([a, b]) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '([a, b]) => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '({ a, b }) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '({ a, b }) => a + b', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a = 10) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(...a) => a[0]', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a, b) => {}', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'async a => ({})', options: ['as-needed', { requireForBlockBody: true }] },
    { code: 'async a => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a: T) => a', options: ['as-needed', { requireForBlockBody: true }] },
    { code: '(a): T => a', options: ['as-needed', { requireForBlockBody: true }] }
]);
ruleTester.addTestGroup('invalid-always', 'should fail with always on', [
    {
        code: 'a => {}',
        output: '(a) => {}',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a => a',
        output: '(a) => a',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a => {\n}',
        output: '(a) => {\n}',
        errors: expecting([
            [0, 0, 0, 1, always]
        ])
    },
    {
        code: 'a.then(foo => {});',
        output: 'a.then((foo) => {});',
        errors: expecting([
            [0, 7, 0, 10, always]
        ])
    },
    {
        code: 'a.then(foo => a);',
        output: 'a.then((foo) => a);',
        errors: expecting([
            [0, 7, 0, 10, always]
        ])
    },
    {
        code: 'a(foo => { if (true) {}; });',
        output: 'a((foo) => { if (true) {}; });',
        errors: expecting([
            [0, 2, 0, 5, always]
        ])
    },
    {
        code: 'a(async foo => { if (true) {}; });',
        output: 'a(async (foo) => { if (true) {}; });',
        errors: expecting([
            [0, 8, 0, 11, always]
        ])
    }
]);
ruleTester.addTestGroup('invalid-as-needed', 'should fail with as-needed on', [
    {
        code: '(a) => a',
        output: 'a => a',
        options: ['as-needed'],
        errors: expecting([
            [0, 0, 0, 3, asNeeded]
        ])
    },
    {
        code: 'async (a) => a',
        output: 'async a => a',
        options: ['as-needed'],
        errors: expecting([
            [0, 6, 0, 9, asNeeded]
        ])
    }
]);
ruleTester.addTestGroup('invalid-require-for-block', 'should fail when using option', [
    {
        code: 'a => {}',
        output: '(a) => {}',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 0, 0, 1, blockNoParens]
        ])
    },
    {
        code: '(a) => a',
        output: 'a => a',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 0, 0, 3, block]
        ])
    },
    {
        code: 'async a => {}',
        output: 'async (a) => {}',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 6, 0, 7, blockNoParens]
        ])
    },
    {
        code: 'async (a) => a',
        output: 'async a => a',
        options: ['as-needed', { requireForBlockBody: true }],
        errors: expecting([
            [0, 6, 0, 9, block]
        ])
    }
]);
ruleTester.addTestGroup('tslint-valid-always', 'should pass with tslint tests', [
    'var a = (a) => {};',
    'var b = (a: number) => {};',
    'var c = (a, b) => {};',
    'var f = (...rest) => {};',
    'var f = a: number => {};',
    'class Foo { a: (a) =>{} }',
    'var bar = <T>(method: () => T) => { method(); };',
    'var barbar = <T>(method: (a: any) => T) => { method(""); };',
    'var barbarbar = <T>(method: (a) => T) => { method(""); };',
    'var piyo = <T, U>(method: () => T) => { method(); };',
    'var barbarbar = <T>(method: (a: T) => T = (x) => x) => { method(""); };',
    'const validAsync = async (param: any) => {};',
    'const validAsync = async (param) => {};'
]);
ruleTester.addTestGroup('tslint-invalid-always', 'should fail with tslint tests', [
    { code: 'var e = (a => {})(1);', errors: expecting([[0, 9, 0, 10, always]]) },
    { code: 'var f = ab => {};', errors: expecting([[0, 8, 0, 10, always]]) },
    {
        code: 'var barbarbar = <T>(method: (a: T) => T = x => x) => { method(""); };',
        errors: expecting([[0, 42, 0, 43, always]])
    }
]);
ruleTester.addTestGroup('generics-as-needed', 'should not complain with generics', [
    {
        code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
        options: ['as-needed']
    },
    {
        code: 'var barbarbar = <T>(method: (a) => T) => { method(""); };',
        options: ['as-needed', { requireForBlockBody: true }]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyQXJyb3dQYXJlbnNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBNkQ7QUFFN0QsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFdEQsSUFBTSxNQUFNLEdBQUcsc0RBQXNELENBQUM7QUFDdEUsSUFBTSxRQUFRLEdBQUcseURBQXlELENBQUM7QUFDM0UsSUFBTSxLQUFLLEdBQUcsNEZBQTRGLENBQUM7QUFDM0csSUFBTSxhQUFhLEdBQUcsc0ZBQXNGLENBQUM7QUFFN0csU0FBUyxTQUFTLENBQUMsTUFBa0Q7SUFFbkUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBRTtJQUN6RSxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHFDQUFxQztJQUNyQywyQ0FBMkM7Q0FDNUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSwrQkFBK0IsRUFBRTtJQUNoRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDekMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxD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Q0FBQyxFQUFFO0lBQzdFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDekU7UUFDRSxJQUFJLEVBQUUsdUVBQXVFO1FBQzdFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzVDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxtQ0FBbUMsRUFBRTtJQUNqRjtRQUNFLElBQUksRUFBRSwyREFBMkQ7UUFDakUsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQ3ZCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMkRBQTJEO1FBQ2pFLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDO0tBQ3REO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyQXJyb3dQYXJlbnNSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
