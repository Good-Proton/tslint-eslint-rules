"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('object-curly-spacing', true);
function expecting(errors) {
    return errors.map(function (err) {
        var status = err[3] ? 'A space is required' : 'There should be no space';
        var token = err[2] === '}' ? "before '}'" : "after '{'";
        return {
            failure: status + " " + token,
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('always-obj', 'always with object literals', [
    { code: 'var obj = { foo: bar, baz: qux };', options: ['always'] },
    { code: 'var obj = { foo: { bar: quxx }, baz: qux };', options: ['always'] },
    { code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['always'] }
]);
ruleTester.addTestGroup('always-dest', 'always with destructuring', [
    { code: 'var { x } = y', options: ['always'] },
    { code: 'var { x, y } = y', options: ['always'] },
    { code: 'var { x,y } = y', options: ['always'] },
    { code: 'var {\nx,y } = y', options: ['always'] },
    { code: 'var {\nx,y\n} = z', options: ['always'] },
    { code: 'var { x = 10, y } = y', options: ['always'] },
    { code: 'var { x: { z }, y } = y', options: ['always'] },
    { code: 'var {\ny,\n} = x', options: ['always'] },
    { code: 'var { y, } = x', options: ['always'] },
    { code: 'var { y: x } = x', options: ['always'] }
]);
ruleTester.addTestGroup('always-imp-exp', 'always with import/export', [
    { code: "import door from 'room'", options: ['always'] },
    { code: "import * as door from 'room'", options: ['always'] },
    { code: "import { door } from 'room'", options: ['always'] },
    { code: "import {\ndoor } from 'room'", options: ['always'] },
    { code: "export { door } from 'room'", options: ['always'] },
    { code: "import { house, mouse } from 'caravan'", options: ['always'] },
    { code: "import house, { mouse } from 'caravan'", options: ['always'] },
    { code: "import door, { house, mouse } from 'caravan'", options: ['always'] },
    { code: 'export { door }', options: ['always'] },
    { code: "import 'room'", options: ['always'] },
    { code: "import { bar as x } from 'foo';", options: ['always'] },
    { code: "import { x, } from 'foo';", options: ['always'] },
    { code: "import {\nx,\n} from 'foo';", options: ['always'] },
    { code: "export { x, } from 'foo';", options: ['always'] },
    { code: "export {\nx,\n} from 'foo';", options: ['always'] }
]);
ruleTester.addTestGroup('empty-object', 'always with empty object', [
    { code: 'var foo = {};', options: ['always'] }
]);
ruleTester.addTestGroup('obj-obj', 'always with objects in objects', [
    { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};", options: ['always', { objectsInObjects: false }] },
    { code: 'var a = { noop: function () {} };', options: ['always', { objectsInObjects: false }] },
    { code: 'var { y: { z }} = x', options: ['always', { objectsInObjects: false }] }
]);
ruleTester.addTestGroup('arr-obj', 'always with arrays in objects', [
    { code: "var obj = { 'foo': [ 1, 2 ]};", options: ['always', { arraysInObjects: false }] },
    { code: 'var a = { thingInList: list[0] };', options: ['always', { arraysInObjects: false }] }
]);
ruleTester.addTestGroup('arr-obj-obj', '', [
    { code: "var obj = { 'qux': [ 1, 2 ], 'foo': { 'bar': 1, 'baz': 2 }};", options: ['always', { arraysInObjects: false, objectsInObjects: false }] },
    { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }, 'qux': [ 1, 2 ]};", options: ['always', { arraysInObjects: false, objectsInObjects: false }] }
]);
ruleTester.addTestGroup('never-obj', 'never with object literals', [
    { code: 'var obj = {foo: bar,\nbaz: qux\n};', options: ['never'] },
    { code: 'var obj = {\nfoo: bar,\nbaz: qux};', options: ['never'] },
    { code: 'var obj = {foo: bar, baz: qux};', options: ['never'] },
    { code: 'var obj = {foo: {bar: quxx}, baz: qux};', options: ['never'] },
    { code: 'var obj = {foo: {\nbar: quxx}, baz: qux\n};', options: ['never'] },
    { code: 'var obj = {foo: {\nbar: quxx\n}, baz: qux};', options: ['never'] },
    { code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['never'] }
]);
ruleTester.addTestGroup('never-dest', 'never with destructuring', [
    { code: 'var {x} = y', options: ['never'] },
    { code: 'var {x, y} = y', options: ['never'] },
    { code: 'var {x,y} = y', options: ['never'] },
    { code: 'var {\nx,y\n} = y', options: ['never'] },
    { code: 'var {x = 10} = y', options: ['never'] },
    { code: 'var {x = 10, y} = y', options: ['never'] },
    { code: 'var {x: {z}, y} = y', options: ['never'] },
    { code: 'var {\nx: {z\n}, y} = y', options: ['never'] },
    { code: 'var {\ny,\n} = x', options: ['never'] },
    { code: 'var {y,} = x', options: ['never'] },
    { code: 'var {y:x} = x', options: ['never'] }
]);
ruleTester.addTestGroup('never-imp-exp', 'never with import/export', [
    { code: "import door from 'room'", options: ['never'] },
    { code: "import * as door from 'room'", options: ['never'] },
    { code: "import {door} from 'room'", options: ['never'] },
    { code: "export {door} from 'room'", options: ['never'] },
    { code: "import {\ndoor} from 'room'", options: ['never'] },
    { code: "export {\ndoor\n} from 'room'", options: ['never'] },
    { code: "import {house,mouse} from 'caravan'", options: ['never'] },
    { code: "import {house, mouse} from 'caravan'", options: ['never'] },
    { code: 'export {door}', options: ['never'] },
    { code: "import 'room'", options: ['never'] },
    { code: "import x, {bar} from 'foo';", options: ['never'] },
    { code: "import x, {bar, baz} from 'foo';", options: ['never'] },
    { code: "import {bar as y} from 'foo';", options: ['never'] },
    { code: "import {x,} from 'foo';", options: ['never'] },
    { code: "import {\nx,\n} from 'foo';", options: ['never'] },
    { code: "export {x,} from 'foo';", options: ['never'] },
    { code: "export {\nx,\n} from 'foo';", options: ['never'] }
]);
ruleTester.addTestGroup('empty-object-never', 'never with empty object', [
    { code: 'var foo = {};', options: ['never'] }
]);
ruleTester.addTestGroup('never-obj-obj', 'never with objects in objects', [
    { code: "var obj = {'foo': {'bar': 1, 'baz': 2} };", options: ['never', { objectsInObjects: true }] }
]);
ruleTester.addTestGroup('empty-cases', 'empty cases: https://github.com/eslint/eslint/issues/3658', [
    { code: 'var {} = foo;' },
    { code: 'var [] = foo;' },
    { code: 'var { a: {} } = foo;' },
    { code: 'var { a: [] } = foo;' },
    { code: "import {} from 'foo';" },
    { code: "export {} from 'foo';" },
    { code: 'export {};' },
    { code: 'var {} = foo;', options: ['never'] },
    { code: 'var [] = foo;', options: ['never'] },
    { code: 'var {a: {}} = foo;', options: ['never'] },
    { code: 'var {a: []} = foo;', options: ['never'] },
    { code: "import {} from 'foo';", options: ['never'] },
    { code: "export {} from 'foo';", options: ['never'] },
    { code: 'export {};', options: ['never'] }
]);
ruleTester.addTestGroup('types', 'using types: https://github.com/eslint/eslint/issues/6940', [
    { code: 'function foo ({a, b}: Props) {\n}', options: ['never'] }
]);
ruleTester.addTestGroup('invalid', 'should fail with invalid code', [
    {
        code: "import {bar} from 'foo.js';",
        output: "import { bar } from 'foo.js';",
        options: ['always'],
        errors: expecting([
            [0, 7, '{', true],
            [0, 11, '}', true]
        ])
    },
    {
        code: "import { bar as y} from 'foo.js';",
        output: "import { bar as y } from 'foo.js';",
        options: ['always'],
        errors: expecting([
            [0, 17, '}', true]
        ])
    },
    {
        code: "import {bar as y} from 'foo.js';",
        output: "import { bar as y } from 'foo.js';",
        options: ['always'],
        errors: expecting([
            [0, 7, '{', true],
            [0, 16, '}', true]
        ])
    },
    {
        code: "import { bar} from 'foo.js';",
        output: "import { bar } from 'foo.js';",
        options: ['always'],
        errors: expecting([
            [0, 12, '}', true]
        ])
    },
    {
        code: "import x, { bar} from 'foo';",
        output: "import x, { bar } from 'foo';",
        options: ['always'],
        errors: expecting([
            [0, 15, '}', true]
        ])
    },
    {
        code: "import x, { bar, baz} from 'foo';",
        output: "import x, { bar, baz } from 'foo';",
        options: ['always'],
        errors: expecting([
            [0, 20, '}', true]
        ])
    },
    {
        code: "import x, {bar} from 'foo';",
        output: "import x, { bar } from 'foo';",
        options: ['always'],
        errors: expecting([
            [0, 10, '{', true],
            [0, 14, '}', true]
        ])
    },
    {
        code: "import x, {bar, baz} from 'foo';",
        output: "import x, { bar, baz } from 'foo';",
        options: ['always'],
        errors: expecting([
            [0, 10, '{', true],
            [0, 19, '}', true]
        ])
    },
    {
        code: "import {bar,} from 'foo';",
        output: "import { bar, } from 'foo';",
        options: ['always'],
        errors: expecting([
            [0, 7, '{', true],
            [0, 12, '}', true]
        ])
    },
    {
        code: "import { bar, } from 'foo';",
        output: "import {bar,} from 'foo';",
        options: ['never'],
        errors: expecting([
            [0, 7, '{', false],
            [0, 14, '}', false]
        ])
    },
    {
        code: 'export {bar};',
        output: 'export { bar };',
        options: ['always'],
        errors: expecting([
            [0, 7, '{', true],
            [0, 11, '}', true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-always-arr-obj', 'invalid always - arrays in objects', [
    {
        code: "var obj = { 'foo': [ 1, 2 ] };",
        output: "var obj = { 'foo': [ 1, 2 ]};",
        options: ['always', { arraysInObjects: false }],
        errors: expecting([
            [0, 28, '}', false]
        ])
    },
    {
        code: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ] };",
        output: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ]};",
        options: ['always', { arraysInObjects: false }],
        errors: expecting([
            [0, 54, '}', false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-obj-obj', 'invalid always - objects in objects', [
    {
        code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
        output: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};",
        options: ['always', { objectsInObjects: false }],
        errors: expecting([
            [0, 42, '}', false]
        ])
    },
    {
        code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
        output: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 }};",
        options: ['always', { objectsInObjects: false }],
        errors: expecting([
            [0, 60, '}', false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-always-dest', 'invalid always - destructuring trailing comma', [
    {
        code: 'var { a,} = x;',
        output: 'var { a, } = x;',
        options: ['always'],
        errors: expecting([
            [0, 8, '}', true]
        ])
    },
    {
        code: 'var {a, } = x;',
        output: 'var {a,} = x;',
        options: ['never'],
        errors: expecting([
            [0, 8, '}', false]
        ])
    },
    {
        code: 'var {a:b } = x;',
        output: 'var {a:b} = x;',
        options: ['never'],
        errors: expecting([
            [0, 9, '}', false]
        ])
    },
    {
        code: 'var { a:b } = x;',
        output: 'var {a:b} = x;',
        options: ['never'],
        errors: expecting([
            [0, 4, '{', false],
            [0, 10, '}', false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-never-obj-obj', 'invalid never - objects in objects', [
    {
        code: "var obj = {'foo': {'bar': 1, 'baz': 2}};",
        output: "var obj = {'foo': {'bar': 1, 'baz': 2} };",
        options: ['never', { objectsInObjects: true }],
        errors: expecting([
            [0, 38, '}', true]
        ])
    },
    {
        code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
        output: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2} };",
        options: ['never', { objectsInObjects: true }],
        errors: expecting([
            [0, 54, '}', true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-never-arr-obj', 'invalid never - arrays in objects', [
    {
        code: "var obj = {'foo': [1, 2]};",
        output: "var obj = {'foo': [1, 2] };",
        options: ['never', { arraysInObjects: true }],
        errors: expecting([
            [0, 24, '}', true]
        ])
    },
    {
        code: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux']};",
        output: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux'] };",
        options: ['never', { arraysInObjects: true }],
        errors: expecting([
            [0, 48, '}', true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-always-never', 'invalid always/never', [
    {
        code: 'var obj = {foo: bar, baz: qux};',
        output: 'var obj = { foo: bar, baz: qux };',
        options: ['always'],
        errors: expecting([
            [0, 10, '{', true],
            [0, 29, '}', true]
        ])
    },
    {
        code: 'var obj = {foo: bar, baz: qux };',
        output: 'var obj = { foo: bar, baz: qux };',
        options: ['always'],
        errors: expecting([
            [0, 10, '{', true]
        ])
    },
    {
        code: 'var obj = { foo: bar, baz: qux};',
        output: 'var obj = { foo: bar, baz: qux };',
        options: ['always'],
        errors: expecting([
            [0, 30, '}', true]
        ])
    },
    {
        code: 'var obj = { foo: bar, baz: qux };',
        output: 'var obj = {foo: bar, baz: qux};',
        options: ['never'],
        errors: expecting([
            [0, 10, '{', false],
            [0, 31, '}', false]
        ])
    },
    {
        code: 'var obj = {foo: bar, baz: qux };',
        output: 'var obj = {foo: bar, baz: qux};',
        options: ['never'],
        errors: expecting([
            [0, 30, '}', false]
        ])
    },
    {
        code: 'var obj = { foo: bar, baz: qux};',
        output: 'var obj = {foo: bar, baz: qux};',
        options: ['never'],
        errors: expecting([
            [0, 10, '{', false]
        ])
    },
    {
        code: 'var obj = { foo: { bar: quxx}, baz: qux};',
        output: 'var obj = {foo: {bar: quxx}, baz: qux};',
        options: ['never'],
        errors: expecting([
            [0, 10, '{', false],
            [0, 17, '{', false]
        ])
    },
    {
        code: 'var obj = {foo: {bar: quxx }, baz: qux };',
        output: 'var obj = {foo: {bar: quxx}, baz: qux};',
        options: ['never'],
        errors: expecting([
            [0, 27, '}', false],
            [0, 39, '}', false]
        ])
    },
    {
        code: 'export const thing = {value: 1 };',
        output: 'export const thing = { value: 1 };',
        options: ['always'],
        errors: expecting([
            [0, 21, '{', true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-dest', 'invalid destructuring', [
    {
        code: 'var {x, y} = y',
        output: 'var { x, y } = y',
        options: ['always'],
        errors: expecting([
            [0, 4, '{', true],
            [0, 9, '}', true]
        ])
    },
    {
        code: 'var { x, y} = y',
        output: 'var { x, y } = y',
        options: ['always'],
        errors: expecting([
            [0, 10, '}', true]
        ])
    },
    {
        code: 'var { x, y } = y',
        output: 'var {x, y} = y',
        options: ['never'],
        errors: expecting([
            [0, 4, '{', false],
            [0, 11, '}', false]
        ])
    },
    {
        code: 'var {x, y } = y',
        output: 'var {x, y} = y',
        options: ['never'],
        errors: expecting([
            [0, 10, '}', false]
        ])
    },
    {
        code: 'var { x=10} = y',
        output: 'var { x=10 } = y',
        options: ['always'],
        errors: expecting([
            [0, 10, '}', true]
        ])
    },
    {
        code: 'var {x=10 } = y',
        output: 'var { x=10 } = y',
        options: ['always'],
        errors: expecting([
            [0, 4, '{', true]
        ])
    }
]);
ruleTester.addTestGroup('eslint-6940', 'https://github.com/eslint/eslint/issues/6940', [
    {
        code: 'function foo ({a, b }: Props) {\n}',
        output: 'function foo ({a, b}: Props) {\n}',
        options: ['never'],
        errors: expecting([
            [0, 20, '}', false]
        ])
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvb2JqZWN0Q3VybHlTcGFjaW5nUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTZEO0FBRTdELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVoRSxTQUFTLFNBQVMsQ0FBQyxNQUE4QztJQUUvRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO1FBQzNFLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzFELE9BQU87WUFDTCxPQUFPLEVBQUssTUFBTSxTQUFJLEtBQU87WUFDN0IsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLDZCQUE2QixFQUFFO0lBQ25FLEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ2xFLEVBQUUsSUFBSSxFQUFFLDZDQUE2QyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQzVFLEVBQUUsSUFBSSxFQUFFLHNDQUFzQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0NBQ3RFLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsYUFB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QUFJLEVBQUUsa0NBQWtDO1FBQ3hDLE1BQU0sRUFBRSxtQ0FBbUM7UUFDM0MsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbkIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUNBQW1DO1FBQ3pDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMkNBQTJDO1FBQ2pELE1BQU0sRUFBRSx5Q0FBeUM7UUFDakQsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMkNBQTJDO1FBQ2pELE1BQU0sRUFBRSx5Q0FBeUM7UUFDakQsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUNBQW1DO1FBQ3pDLE1BQU0sRUFBRSxvQ0FBb0M7UUFDNUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbkIsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLEVBQUU7SUFDL0Q7UUFDRSxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDakIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbkIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbkIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDbEIsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsOENBQThDLEVBQUU7SUFDckY7UUFDRSxJQUFJLEVBQUUsb0NBQW9DO1FBQzFDLE1BQU0sRUFBRSxtQ0FBbUM7UUFDM0MsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDcEIsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvb2JqZWN0Q3VybHlTcGFjaW5nUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
