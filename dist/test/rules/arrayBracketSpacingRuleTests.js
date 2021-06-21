"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('array-bracket-spacing', true);
function expecting(errors) {
    return errors.map(function (err) {
        var status = err[2] ? 'A space is required' : 'There should be no space';
        var token = err[3] === 'before' ? ']' : '[';
        return {
            failure: status + " " + err[3] + " \"" + token + "\"",
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'simple valid space test', [
    { code: 'var foo = obj[ 1 ]', options: ['always'] },
    { code: "var foo = obj[ 'foo' ];", options: ['always'] },
    { code: 'var foo = obj[ [ 1, 1 ] ];', options: ['always'] }
]);
ruleTester.addTestGroup('always-single', 'should pass single value', [
    { code: "var foo = ['foo']", options: ['always', { singleValue: false }] },
    { code: 'var foo = [2]', options: ['always', { singleValue: false }] },
    { code: 'var foo = [[ 1, 1 ]]', options: ['always', { singleValue: false }] },
    { code: "var foo = [{ 'foo': 'bar' }]", options: ['always', { singleValue: false }] },
    { code: 'var foo = [bar]', options: ['always', { singleValue: false }] }
]);
ruleTester.addTestGroup('always-obj-in-arr', 'should pass with objects in arrays', [
    { code: "var foo = [{ 'bar': 'baz' }, 1,  5 ];", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [ 1, 5, { 'bar': 'baz' }];", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [{\n'bar': 'baz', \n'qux': [{ 'bar': 'baz' }], \n'quxx': 1 \n}]", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [{ 'bar': 'baz' }]", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [{ 'bar': 'baz' }, 1, { 'bar': 'baz' }];", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [ 1, { 'bar': 'baz' }, 5 ];", options: ['always', { objectsInArrays: false }] },
    { code: "var foo = [ 1, { 'bar': 'baz' }, [{ 'bar': 'baz' }] ];", options: ['always', { objectsInArrays: false }] },
    { code: 'var foo = [ function(){} ];', options: ['always', { objectsInArrays: false }] }
]);
ruleTester.addTestGroup('valid-arr-in-arrs', 'should pass when always with arrays exceptions', [
    { code: 'var arr = [[ 1, 2 ], 2, 3, 4 ];', options: ['always', { arraysInArrays: false }] },
    { code: 'var arr = [[ 1, 2 ], [[[ 1 ]]], 3, 4 ];', options: ['always', { arraysInArrays: false }] },
    { code: 'var foo = [ arr[i], arr[j] ];', options: ['always', { arraysInArrays: false }] }
]);
ruleTester.addTestGroup('valid-arr-obj', 'should pass with array and obj exception', [
    { code: "var arr = [[ 1, 2 ], 2, 3, { 'foo': 'bar' }];", options: ['always', { arraysInArrays: false, objectsInArrays: false }] }
]);
ruleTester.addTestGroup('valid-arr-obj-single', 'should pass with all exceptions', [
    { code: "var arr = [[ 1, 2 ], [2], 3, { 'foo': 'bar' }];", options: ['always', { arraysInArrays: false, objectsInArrays: false, singleValue: false }] }
]);
ruleTester.addTestGroup('valid-always', 'should pass with always', [
    { code: 'obj[ foo ]', options: ['always'] },
    { code: 'obj[\nfoo\n]', options: ['always'] },
    { code: "obj[ 'foo' ]", options: ['always'] },
    { code: "obj[ 'foo' + 'bar' ]", options: ['always'] },
    { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
    { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['always'] },
    { code: "obj[ 'map' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
    { code: "obj[ 'for' + 'Each' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
    { code: 'var arr = [ 1, 2, 3, 4 ];', options: ['always'] },
    { code: 'var arr = [ [ 1, 2 ], 2, 3, 4 ];', options: ['always'] },
    { code: 'var arr = [\n1, 2, 3, 4\n];', options: ['always'] },
    { code: 'var foo = [];', options: ['always'] }
]);
ruleTester.addTestGroup('valid-ex', 'should with exceptions', [
    {
        code: "this.db.mappings.insert([\n { alias: 'a', url: 'http://www.amazon.de' },\n { alias: 'g', url: 'http://www.google.de' }\n], function() {});",
        options: ['always', { singleValue: false, objectsInArrays: true, arraysInArrays: true }]
    }
]);
ruleTester.addTestGroup('valid-always-destruct', 'should pass with always destructuring assignment', [
    { code: 'var [ x, y ] = z', options: ['always'] },
    { code: 'var [ x,y ] = z', options: ['always'] },
    { code: 'var [ x, y\n] = z', options: ['always'] },
    { code: 'var [\nx, y ] = z', options: ['always'] },
    { code: 'var [\nx, y\n] = z', options: ['always'] },
    { code: 'var [\nx, y\n] = z', options: ['always'] },
    { code: 'var [\nx,,,\n] = z', options: ['always'] },
    { code: 'var [ ,x, ] = z', options: ['always'] },
    { code: 'var [\nx, ...y\n] = z', options: ['always'] },
    { code: 'var [\nx, ...y ] = z', options: ['always'] },
    { code: 'var [[ x, y ], z ] = arr;', options: ['always', { arraysInArrays: false }] },
    { code: 'var [ x, [ y, z ]] = arr;', options: ['always', { arraysInArrays: false }] },
    { code: '[{ x, y }, z ] = arr;', options: ['always', { objectsInArrays: false }] },
    { code: '[ x, { y, z }] = arr;', options: ['always', { objectsInArrays: false }] }
]);
ruleTester.addTestGroup('never', 'should pass when never', [
    { code: 'obj[foo]', options: ['never'] },
    { code: "obj['foo']", options: ['never'] },
    { code: "obj['foo' + 'bar']", options: ['never'] },
    { code: "obj['foo'+'bar']", options: ['never'] },
    { code: 'obj[obj2[foo]]', options: ['never'] },
    { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['never'] },
    { code: "obj['map'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: 'var arr = [1, 2, 3, 4];', options: ['never'] },
    { code: 'var arr = [[1, 2], 2, 3, 4];', options: ['never'] },
    { code: 'var arr = [\n1, 2, 3, 4\n];', options: ['never'] },
    { code: 'obj[\nfoo]', options: ['never'] },
    { code: 'obj[foo\n]', options: ['never'] },
    { code: 'var arr = [1,\n2,\n3,\n4\n];', options: ['never'] },
    { code: 'var arr = [\n1,\n2,\n3,\n4];', options: ['never'] }
]);
ruleTester.addTestGroup('never-destruct', 'should pass with destructuring assignment', [
    { code: 'var [x, y] = z', options: ['never'] },
    { code: 'var [x,y] = z', options: ['never'] },
    { code: 'var [x, y\n] = z', options: ['never'] },
    { code: 'var [\nx, y] = z', options: ['never'] },
    { code: 'var [\nx, y\n] = z', options: ['never'] },
    { code: 'var [\nx, y\n] = z', options: ['never'] },
    { code: 'var [\nx,,,\n] = z', options: ['never'] },
    { code: 'var [,x,] = z', options: ['never'] },
    { code: 'var [\nx, ...y\n] = z', options: ['never'] },
    { code: 'var [\nx, ...y] = z', options: ['never'] },
    { code: 'var [ [x, y], z] = arr;', options: ['never', { arraysInArrays: true }] },
    { code: 'var [x, [y, z] ] = arr;', options: ['never', { arraysInArrays: true }] },
    { code: '[ { x, y }, z] = arr;', options: ['never', { objectsInArrays: true }] },
    { code: '[x, { y, z } ] = arr;', options: ['never', { objectsInArrays: true }] }
]);
ruleTester.addTestGroup('never-single', 'should pass with never single exception', [
    { code: "var foo = [ 'foo' ]", options: ['never', { singleValue: true }] },
    { code: 'var foo = [ 2 ]', options: ['never', { singleValue: true }] },
    { code: 'var foo = [ [1, 1] ]', options: ['never', { singleValue: true }] },
    { code: "var foo = [ {'foo': 'bar'} ]", options: ['never', { singleValue: true }] },
    { code: 'var foo = [ bar ]', options: ['never', { singleValue: true }] }
]);
ruleTester.addTestGroup('never-obj-in-arr', 'should pass with never obj in arr exception', [
    { code: "var foo = [ {'bar': 'baz'}, 1, 5];", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [1, 5, {'bar': 'baz'} ];", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [ {\n'bar': 'baz', \n'qux': [ {'bar': 'baz'} ], \n'quxx': 1 \n} ]", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [ {'bar': 'baz'} ]", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [ {'bar': 'baz'}, 1, {'bar': 'baz'} ];", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [1, {'bar': 'baz'} , 5];", options: ['never', { objectsInArrays: true }] },
    { code: "var foo = [1, {'bar': 'baz'}, [ {'bar': 'baz'} ]];", options: ['never', { objectsInArrays: true }] },
    { code: 'var foo = [function(){}];', options: ['never', { objectsInArrays: true }] },
    { code: 'var foo = [];', options: ['never', { objectsInArrays: true }] }
]);
ruleTester.addTestGroup('never-arr-in-arr', 'should pass with never arr in arr exception', [
    { code: 'var arr = [ [1, 2], 2, 3, 4];', options: ['never', { arraysInArrays: true }] },
    { code: 'var foo = [arr[i], arr[j]];', options: ['never', { arraysInArrays: true }] },
    { code: 'var foo = [];', options: ['never', { arraysInArrays: true }] }
]);
ruleTester.addTestGroup('never-ex', 'should pass with never and other exceptions', [
    { code: "var arr = [ [1, 2], 2, 3, {'foo': 'bar'} ];", options: ['never', { arraysInArrays: true, objectsInArrays: true }] },
    { code: 'var arr = [ [1, 2], [ [ [ 1 ] ] ], 3, 4];', options: ['never', { arraysInArrays: true, singleValue: true }] }
]);
ruleTester.addTestGroup('no-warn', 'should not warn', [
    { code: 'var foo = {};', options: ['never'] },
    { code: 'var foo = [];', options: ['never'] },
    { code: "var foo = [{'bar':'baz'}, 1, {'bar': 'baz'}];", options: ['never'] },
    { code: "var foo = [{'bar': 'baz'}];", options: ['never'] },
    { code: "var foo = [{\n'bar': 'baz', \n'qux': [{'bar': 'baz'}], \n'quxx': 1 \n}]", options: ['never'] },
    { code: "var foo = [1, {'bar': 'baz'}, 5];", options: ['never'] },
    { code: "var foo = [{'bar': 'baz'}, 1,  5];", options: ['never'] },
    { code: "var foo = [1, 5, {'bar': 'baz'}];", options: ['never'] },
    { code: "var obj = {'foo': [1, 2]}", options: ['never'] }
]);
ruleTester.addTestGroup('with-types', 'should handle types', [
    { code: '([ a, b ]: Array<any>) => {}', options: ['always'] },
    { code: '([a, b]: Array< any >) => {}', options: ['never'] }
]);
ruleTester.addTestGroup('invalid', 'simple invalid space test', [
    {
        code: 'var foo = [ ]',
        output: 'var foo = []',
        options: ['never'],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    }
]);
ruleTester.addTestGroup('invalid-obj-in-arr', 'should handle the objects in arrays exception', [
    {
        code: "var foo = [ { 'bar': 'baz' }, 1,  5];",
        output: "var foo = [{ 'bar': 'baz' }, 1,  5 ];",
        options: ['always', { objectsInArrays: false }],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 35, true, 'before']
        ])
    },
    {
        code: "var foo = [1, 5, { 'bar': 'baz' } ];",
        output: "var foo = [ 1, 5, { 'bar': 'baz' }];",
        options: ['always', { objectsInArrays: false }],
        errors: expecting([
            [0, 10, true, 'after'],
            [0, 34, false, 'before']
        ])
    },
    {
        code: "var foo = [ { 'bar':'baz' }, 1, { 'bar': 'baz' } ];",
        output: "var foo = [{ 'bar':'baz' }, 1, { 'bar': 'baz' }];",
        options: ['always', { objectsInArrays: false }],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 49, false, 'before']
        ])
    }
]);
ruleTester.addTestGroup('invalid-single-value', 'should handle single value exceptions', [
    {
        code: "var obj = [ 'foo' ];",
        output: "var obj = ['foo'];",
        options: ['always', { singleValue: false }],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 18, false, 'before']
        ])
    },
    {
        code: "var obj = ['foo' ];",
        output: "var obj = ['foo'];",
        options: ['always', { singleValue: false }],
        errors: expecting([
            [0, 17, false, 'before']
        ])
    },
    {
        code: "var obj = ['foo'];",
        output: "var obj = [ 'foo' ];",
        options: ['never', { singleValue: true }],
        errors: expecting([
            [0, 10, true, 'after'],
            [0, 16, true, 'before']
        ])
    }
]);
ruleTester.addTestGroup('always-arr-in-arr', 'should handle array and arrays exception', [
    {
        code: 'var arr = [ [ 1, 2 ], 2, 3, 4 ];',
        output: 'var arr = [[ 1, 2 ], 2, 3, 4 ];',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    },
    {
        code: 'var arr = [ 1, 2, 2, [ 3, 4 ] ];',
        output: 'var arr = [ 1, 2, 2, [ 3, 4 ]];',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 30, false, 'before']
        ])
    },
    {
        code: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ] ];',
        output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 33, false, 'before']
        ])
    },
    {
        code: 'var arr = [ [ 1, 2 ], 2, [ 3, 4 ]];',
        output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    },
    {
        code: 'var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];',
        output: 'var arr = [[ 1, 2 ], 2, [ 3, 4 ]];',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 34, false, 'before']
        ])
    }
]);
ruleTester.addTestGroup('always-destructuring', 'should array destructuring', [
    {
        code: 'var [x,y] = y',
        output: 'var [ x,y ] = y',
        options: ['always'],
        errors: expecting([
            [0, 4, true, 'after'],
            [0, 8, true, 'before']
        ])
    },
    {
        code: 'var [x,y ] = y',
        output: 'var [ x,y ] = y',
        options: ['always'],
        errors: expecting([
            [0, 4, true, 'after']
        ])
    },
    {
        code: 'var [,,,x,,] = y',
        output: 'var [ ,,,x,, ] = y',
        options: ['always'],
        errors: expecting([
            [0, 4, true, 'after'],
            [0, 11, true, 'before']
        ])
    },
    {
        code: 'var [ ,,,x,,] = y',
        output: 'var [ ,,,x,, ] = y',
        options: ['always'],
        errors: expecting([
            [0, 12, true, 'before']
        ])
    },
    {
        code: 'var [...horse] = y',
        output: 'var [ ...horse ] = y',
        options: ['always'],
        errors: expecting([
            [0, 4, true, 'after'],
            [0, 13, true, 'before']
        ])
    },
    {
        code: 'var [...horse ] = y',
        output: 'var [ ...horse ] = y',
        options: ['always'],
        errors: expecting([
            [0, 4, true, 'after']
        ])
    },
    {
        code: 'var [ [ x, y ], z ] = arr;',
        output: 'var [[ x, y ], z ] = arr;',
        options: ['always', { arraysInArrays: false }],
        errors: expecting([
            [0, 4, false, 'after']
        ])
    },
    {
        code: '[ { x, y }, z ] = arr;',
        output: '[{ x, y }, z ] = arr;',
        options: ['always', { objectsInArrays: false }],
        errors: expecting([
            [0, 0, false, 'after']
        ])
    },
    {
        code: '[ x, { y, z } ] = arr;',
        output: '[ x, { y, z }] = arr;',
        options: ['always', { objectsInArrays: false }],
        errors: expecting([
            [0, 14, false, 'before']
        ])
    }
]);
ruleTester.addTestGroup('never-arr-in-arr', 'should handle arrays in arrays exception when never', [
    {
        code: 'var arr = [[1, 2], 2, [3, 4]];',
        output: 'var arr = [ [1, 2], 2, [3, 4] ];',
        options: ['never', { arraysInArrays: true }],
        errors: expecting([
            [0, 10, true, 'after'],
            [0, 28, true, 'before']
        ])
    },
    {
        code: 'var arr = [ ];',
        output: 'var arr = [];',
        options: ['never', { arraysInArrays: true }],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    }
]);
ruleTester.addTestGroup('never-obj-in-arr', 'should handle object in arrays exception when never', [
    {
        code: 'var arr = [ ];',
        output: 'var arr = [];',
        options: ['never', { objectsInArrays: true }],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    }
]);
ruleTester.addTestGroup('always-fail', 'should handle always', [
    {
        code: 'var arr = [1, 2, 3, 4];',
        output: 'var arr = [ 1, 2, 3, 4 ];',
        options: ['always'],
        errors: expecting([
            [0, 10, true, 'after'],
            [0, 21, true, 'before']
        ])
    },
    {
        code: 'var arr = [1, 2, 3, 4 ];',
        output: 'var arr = [ 1, 2, 3, 4 ];',
        options: ['always'],
        errors: expecting([
            [0, 10, true, 'after']
        ])
    },
    {
        code: 'var arr = [ 1, 2, 3, 4];',
        output: 'var arr = [ 1, 2, 3, 4 ];',
        options: ['always'],
        errors: expecting([
            [0, 22, true, 'before']
        ])
    }
]);
ruleTester.addTestGroup('never-fail', 'should handle never', [
    {
        code: 'var arr = [ 1, 2, 3, 4 ];',
        output: 'var arr = [1, 2, 3, 4];',
        options: ['never'],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 23, false, 'before']
        ])
    },
    {
        code: 'var arr = [1, 2, 3, 4 ];',
        output: 'var arr = [1, 2, 3, 4];',
        options: ['never'],
        errors: expecting([
            [0, 22, false, 'before']
        ])
    },
    {
        code: 'var arr = [ 1, 2, 3, 4];',
        output: 'var arr = [1, 2, 3, 4];',
        options: ['never'],
        errors: expecting([
            [0, 10, false, 'after']
        ])
    },
    {
        code: 'var arr = [ [ 1], 2, 3, 4];',
        output: 'var arr = [[1], 2, 3, 4];',
        options: ['never'],
        errors: expecting([
            [0, 10, false, 'after'],
            [0, 12, false, 'after']
        ])
    },
    {
        code: 'var arr = [[1 ], 2, 3, 4 ];',
        output: 'var arr = [[1], 2, 3, 4];',
        options: ['never'],
        errors: expecting([
            [0, 14, false, 'before'],
            [0, 25, false, 'before']
        ])
    }
]);
ruleTester.addTestGroup('with-types', 'should handle always and never with types', [
    {
        code: '([ a, b ]: Array<any>) => {}',
        output: '([a, b]: Array<any>) => {}',
        options: ['never'],
        errors: expecting([
            [0, 1, false, 'after'],
            [0, 8, false, 'before']
        ])
    },
    {
        code: '([a, b]: Array< any >) => {}',
        output: '([ a, b ]: Array< any >) => {}',
        options: ['always'],
        errors: expecting([
            [0, 1, true, 'after'],
            [0, 6, true, 'before']
        ])
    }
]);
ruleTester.addTestGroup('issue162', 'should handle comments', [
    {
        code: 'const foo = [42/* , 51 */];',
        options: ['never']
    },
    {
        code: 'const foo = [42/* , 51 */  ];',
        output: 'const foo = [42/* , 51 */];',
        options: ['never'],
        errors: expecting([
            [0, 27, false, 'before']
        ])
    },
    {
        code: 'const foo = [ /*39, */ 41, 42/* , 51 */ ];',
        output: 'const foo = [/*39, */ 41, 42/* , 51 */];',
        options: ['never'],
        errors: expecting([
            [0, 12, false, 'after'],
            [0, 40, false, 'before']
        ])
    },
    {
        code: "const foo = [ /*\n      39, */ 41, 42/* , 51\n      */ ];",
        options: ['never']
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYXJyYXlCcmFja2V0U3BhY2luZ1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2RDtBQUc3RCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFakUsU0FBUyxTQUFTLENBQUMsTUFBdUQ7SUFFeEUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQztRQUMzRSxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM5QyxPQUFPO1lBQ0wsT0FBTyxFQUFLLE1BQU0sU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQUssS0FBSyxPQUFHO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUM1RCxDQUFDLENB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LE9BQU8sQ0FBQztLQUNuQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxNQUFNLEVBQUUsNkJBQTZCO1FBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1NBQ3pCLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLDRDQUE0QztRQUNsRCxNQUFNLEVBQUUsMENBQTBDO1FBQ2xELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1NBQ3pCLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLDJEQUVFO1FBQ1IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQ25CO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvYXJyYXlCcmFja2V0U3BhY2luZ1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
