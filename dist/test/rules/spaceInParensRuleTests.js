"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('space-in-parens', true);
var MISSING_SPACE_ERROR = 'there must be a space inside this paren.';
var REJECTED_SPACE_ERROR = 'there should be no spaces inside this paren.';
function expecting(errors) {
    return errors.map(function (err) {
        if (err.message && err.column) {
            return {
                failure: err.message,
                startPosition: new ruleTester_1.Position(err.line, err.column),
                endPosition: new ruleTester_1.Position(err.line, err.column)
            };
        }
        return {
            failure: err.message,
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid-function-calls', 'should pass for valid function calls', [
    { code: 'foo()', options: ['always'] },
    { code: 'foo\n(\nbar\n)\n', options: ['always'] },
    { code: 'foo\n(  \nbar\n )\n', options: ['always'] },
    { code: 'foo\n(\n bar  \n)\n', options: ['always'] },
    { code: 'foo\n( \n  bar \n  )\n', options: ['always'] },
    { code: 'foo\n(\t\nbar\n)', options: ['always'] },
    { code: '\tfoo(\n\t\tbar\n\t)', options: ['always'] },
    { code: '\tfoo\n(\t\n\t\tbar\t\n\t)', options: ['always'] },
    { code: 'foo()', options: [] },
    { code: 'foo(bar)', options: ['never'] },
    { code: 'foo(bar)\n', options: ['never'] },
    { code: '\tfoo(bar)', options: ['never'] },
    { code: 'foo(bar)\t', options: ['never'] },
    { code: 'foo()' },
    { code: 'foo(bar)' },
    { code: 'foo(bar)\n' },
    { code: '\tfoo(bar)' },
    { code: 'foo(bar)\t' }
]);
ruleTester.addTestGroup('valid-expressions', 'should pass for valid expressions', [
    { code: 'var x = ( 1 + 2 ) * 3', options: ['always'] },
    { code: 'var x = `foo(bar)`', options: ['always'] },
    { code: 'var x = "bar( baz )"', options: ['always'] },
    { code: 'var foo = `(bar)`;', options: ['always'] },
    { code: 'var foo = `(bar ${baz})`;', options: ['always'] },
    { code: 'var foo = `(bar ${( 1 + 2 )})`;', options: ['always'] },
    { code: 'new MyClass( somethimg )', options: ['always'] },
    { code: 'bar()', options: ['never'] },
    { code: 'bar(baz)', options: ['never'] },
    { code: 'var x = (4 + 5) * 6', options: ['never'] },
    { code: 'foo\n(\nbar\n)\n', options: ['never'] },
    { code: 'foo\n(  \nbar\n )\n', options: ['never'] },
    { code: 'foo\n(\n bar  \n)\n', options: ['never'] },
    { code: 'foo\n( \n  bar \n  )\n', options: ['never'] },
    { code: 'var foo = `( bar )`;', options: ['never'] },
    { code: 'var foo = `( bar ${baz} )`;', options: ['never'] },
    { code: 'var foo = `(bar ${(1 + 2)})`;', options: ['never'] },
    { code: 'new MyClass(somethimg)', options: ['never'] },
    { code: 'bar()' },
    { code: 'bar(baz)' },
    { code: 'var x = (4 + 5) * 6' },
    { code: 'foo\n(\nbar\n)\n' },
    { code: 'foo\n(  \nbar\n )\n' },
    { code: 'foo\n(\n bar  \n)\n' },
    { code: 'foo\n( \n  bar \n  )\n' },
    { code: 'var foo = `( bar )`;' },
    { code: 'var foo = `( bar ${baz} )`;' },
    { code: 'var foo = `(bar ${(1 + 2)})`;' },
    { code: 'new MyClass(somethimg)' }
]);
ruleTester.addTestGroup('valid-conditions-and-loops', 'should pass for valid conditions and loops', [
    { code: 'if ( true ) {}', options: ['always'] },
    { code: 'if (true) {}', options: ['never'] },
    { code: 'if (true) {}' },
    { code: 'while ( true ) {}', options: ['always'] },
    { code: 'while (true) {}', options: ['never'] },
    { code: 'while (true) {}' },
    { code: 'for ( let i=0; i<100; i++ ) {}', options: ['always'] },
    { code: 'for (let i=0; i<100; i++) {}', options: ['never'] },
    { code: 'for (let i=0; i<100; i++) {}' },
    { code: 'for ( let i in foo ) {}', options: ['always'] },
    { code: 'for (let i in foo) {}', options: ['never'] },
    { code: 'for (let i in foo) {}' },
    { code: 'for ( let i of foo ) {}', options: ['always'] },
    { code: 'for (let i of foo) {}', options: ['never'] },
    { code: 'for (let i of foo) {}' }
]);
ruleTester.addTestGroup('valid-classes', 'should pass for valid classes', [
    { code: 'class Test { foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }' },
    { code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }' }
]);
ruleTester.addTestGroup('valid-function-declarations', 'should pass for valid function declarations', [
    { code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}' },
    { code: 'function ( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function (bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'function (bar:string, asdsd:number, asd:any) : void {}' }
]);
ruleTester.addTestGroup('valid-constructors', 'should pass for valid constructors', [
    { code: 'constructor( bar:string, asdsd:number, asd:any ){}', options: ['always'] },
    { code: 'constructor(bar:string, asdsd:number, asd:any){}', options: ['never'] },
    { code: 'constructor(bar:string, asdsd:number, asd:any){}' }
]);
ruleTester.addTestGroup('valid-exceptions', 'should pass for valid exceptions', [
    { code: 'foo({ bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: ['[]', '()'] }] },
    { code: 'foo( 1, { bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({ bar: "baz" }, 1 )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({\nbar: "baz",\nbaz: "bar"\n})', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({ bar: "baz" })', options: ['never', { exceptions: ['[]', '()'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo(1, { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( { bar: "baz" }, 1)', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( {\nbar: "baz",\nbaz: "bar"\n} )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo([ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo( [ 1, 2 ] )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( 1, [ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([ 1, 2 ], 1 )', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([\n1,\n2\n])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([ 1, 2 ])', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo(1, [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo( [ 1, 2 ], 1)', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo( [\n1,\n2\n] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo(( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo( ( 1 + 2 ) )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( 1 / ( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo(( 1 + 2 ) / 1 )', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo((\n1 + 2\n))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo((1 + 2))', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo(1 / (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo( (1 + 2) / 1)', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo( (\n1 + 2\n) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo()', options: ['always', { exceptions: ['empty'] }] },
    { code: 'foo( )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo(\n1 + 2\n)', options: ['always', { exceptions: ['empty'] }] },
    { code: 'foo()', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( )', options: ['never', { exceptions: ['empty'] }] },
    { code: 'foo( \n1 + 2\n )', options: ['never', { exceptions: ['empty'] }] },
    { code: 'foo({ bar: "baz" }, [ 1, 2 ])', options: ['always', { exceptions: ['{}', '[]'] }] },
    { code: 'foo({\nbar: "baz"\n}, [\n1,\n2\n])', options: ['always', { exceptions: ['{}', '[]'] }] },
    { code: 'foo(); bar({bar:"baz"}); baz([1,2])', options: ['always', { exceptions: ['{}', '[]', '()'] }] },
    { code: 'foo( { bar: "baz" }, [ 1, 2 ] )', options: ['never', { exceptions: ['{}', '[]'] }] },
    { code: 'foo( {\nbar: "baz"\n}, [\n1,\n2\n] )', options: ['never', { exceptions: ['{}', '[]'] }] },
    { code: 'foo( ); bar( {bar:"baz"} ); baz( [1,2] )', options: ['never', { exceptions: ['{}', '[]', 'empty'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: [] }] }
]);
ruleTester.addTestGroup('invalid-function-calls', 'should fail when declaring invalid spaces in function calls', [
    {
        code: 'foo( bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 8 }])
    },
    {
        code: 'foo( bar)',
        output: 'foo(bar)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 4 }])
    },
    {
        code: 'foo( bar)',
        output: 'foo(bar)',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 4 }])
    },
    {
        code: 'foo(bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 4 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 7 }
        ])
    },
    {
        code: 'foo( bar )',
        output: 'foo(bar)',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
        ])
    },
    {
        code: 'foo( bar )',
        output: 'foo(bar)',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
        ])
    },
    {
        code: 'var x = ( 1 + 2) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'var x = ( 1 + 2) * 3',
        output: 'var x = (1 + 2) * 3',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = ( 1 + 2) * 3',
        output: 'var x = (1 + 2) * 3',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = (1 + 2 ) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = (1 + 2 ) * 3',
        output: 'var x = (1 + 2) * 3',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'var x = (1 + 2 ) * 3',
        output: 'var x = (1 + 2) * 3',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'foo\n(bar\n)\n',
        output: 'foo\n( bar\n)\n',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 1, column: 1 }])
    },
    {
        code: 'foo\n( bar\n)\n',
        output: 'foo\n(bar\n)\n',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 1, column: 1 }])
    },
    {
        code: 'foo\n( bar\n)\n',
        output: 'foo\n(bar\n)\n',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 1, column: 1 }])
    },
    {
        code: 'bar(baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 8 }])
    },
    {
        code: 'bar(baz )',
        output: 'bar(baz)',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 8 }])
    },
    {
        code: 'bar(baz        )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'bar(baz        )',
        output: 'bar(baz)',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'bar( baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
        ])
    },
    {
        code: 'bar( baz )',
        output: 'bar(baz)',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
        ])
    },
    {
        code: 'bar(     baz         )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    },
    {
        code: 'bar(     baz         )',
        output: 'bar(baz)',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    }
]);
ruleTester.addTestGroup('invalid-expressions', 'should fail when declaring invalid spaces in expressions', [
    {
        code: 'var x = ( 4 + 5) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = ( 4 + 5) * 6',
        output: 'var x = (4 + 5) * 6',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = (4 + 5    ) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 18 }])
    },
    {
        code: 'var x = (4 + 5    ) * 6',
        output: 'var x = (4 + 5) * 6',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 18 }])
    },
    {
        code: 'var x = (4 + 5 ) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'var x = (4 + 5 ) * 6',
        output: 'var x = (4 + 5) * 6',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    }
]);
ruleTester.addTestGroup('invalid-classes', 'should fail when declaring invalid spaces in methods', [
    {
        code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 62 }
        ])
    },
    {
        code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 62 }
        ])
    },
    {
        code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        output: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 27 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 60 }
        ])
    },
    {
        code: 'new MyClass( hey)',
        output: 'new MyClass( hey )',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 16 }])
    },
    {
        code: 'new MyClass( hey)',
        output: 'new MyClass(hey)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
    },
    {
        code: 'new MyClass( hey)',
        output: 'new MyClass(hey)',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
    },
    {
        code: 'new MyClass(      hey)',
        output: 'new MyClass(hey)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
    },
    {
        code: 'new MyClass(      hey)',
        output: 'new MyClass(hey)',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
    }
]);
ruleTester.addTestGroup('invalid-function-declarations', 'should fail when declaring invalid spaces in functions', [
    {
        code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
        ])
    },
    {
        code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
        ])
    },
    {
        code: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        output: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 46 }
        ])
    },
    {
        code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function (bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 45 }
        ])
    },
    {
        code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function (bar:string, asdsd:number, asd:any) : void {}',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 45 }
        ])
    },
    {
        code: 'function (bar:string, asdsd:number, asd:any) : void {}',
        output: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 43 }
        ])
    },
    {
        code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 47 }
        ])
    },
    {
        code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 47 }
        ])
    },
    {
        code: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        output: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 12 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 45 }
        ])
    }
]);
ruleTester.addTestGroup('invalid-exceptions', 'should fail when declaring invalid spaces', [
    {
        code: 'fooa({ bar: "baz" })',
        output: 'fooa( { bar: "baz" } )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
        ])
    },
    {
        code: 'foob( { bar: "baz" } )',
        output: 'foob({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    },
    {
        code: 'fooc({ bar: "baz" })',
        output: 'fooc( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
        ])
    },
    {
        code: 'food( { bar: "baz" } )',
        output: 'food({ bar: "baz" })',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    },
    {
        code: 'foo1( { bar: "baz" })',
        output: 'foo1({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo2( { bar: "baz" })',
        output: 'foo2( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 20 }])
    },
    {
        code: 'foo3({ bar: "baz" } )',
        output: 'foo3({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 20 }])
    },
    {
        code: 'foo4({ bar: "baz" } )',
        output: 'foo4( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo6([ 1, 2 ])',
        output: 'foo6( [ 1, 2 ] )',
        options: ['always', { exceptions: ['empty'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: 'foo7( [ 1, 2 ] )',
        output: 'foo7([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
        ])
    },
    {
        code: 'fooq([ 1, 2 ])',
        output: 'fooq( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: 'foow( [ 1, 2 ] )',
        output: 'foow([ 1, 2 ])',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
        ])
    },
    {
        code: 'fooe([ 1, 2 ] )',
        output: 'fooe([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 14 }])
    },
    {
        code: 'foor([ 1, 2 ] )',
        output: 'foor( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foot( [ 1, 2 ])',
        output: 'foot([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'fooy( [ 1, 2 ])',
        output: 'fooy( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 14 }])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '( ( 1 + 2 ))',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 1 }])
    },
    {
        code: '( (1 + 2))',
        output: '( (1 + 2) )',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: '(( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 11 }])
    },
    {
        code: '((1 + 2) )',
        output: '( (1 + 2) )',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 1 }])
    },
    {
        code: 'var result = ( 1 / ( 1 + 2 ) ) + 3',
        output: 'var result = ( 1 / ( 1 + 2 )) + 3',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 29 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'var result = ( 1 / ( 1 + 2)) + 3',
        output: 'var result = ( 1 / ( 1 + 2 )) + 3',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 26 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'foo\n(\nbar )\n',
        output: 'foo\n(\nbar)\n',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 4 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${(1 + 2)})`;',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'foo\n(\nbar )\n',
        output: 'foo\n(\nbar)\n',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 4 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${(1 + 2)})`;',
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${( 1 + 2 )})`;',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 19 }])
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvc3BhY2VJblBhcmVuc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2RDtBQUU3RCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0QsSUFBTSxtQkFBbUIsR0FBRywwQ0FBMEMsQ0FBQztBQUN2RSxJQUFNLG9CQUFvQixHQUFHLDhDQUE4QyxDQUFDO0FBRTVFLFNBQVMsU0FBUyxDQUFDLE1BQTJEO0lBQzVFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTztnQkFDTCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87Z0JBQ3BCLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUNqRCxXQUFXLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUNoRCxDQUFDO1NBQ0g7UUFDRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ3BCLGFBQWEsRUFBRSxJQUFJLHFCQUFRLEVBQUU7WUFDN0IsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxzQ0FBc0MsRUFBRTtJQUN0RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdEMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7SUFDOUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMxQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDMUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtJQUNqQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO0lBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtJQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxtQ0FBbUMsRUFBRTtJQUNoRixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNyRCxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNoRSxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDckMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ2hELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3BELEVBQUUsSUFBSSxFQUFFLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLCtCQUErQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzdELEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtJQUNqQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFDcEIsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7SUFDNUIsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7SUFDbEMsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7SUFDaEMsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUU7SUFDdkMsRUFBRSxJQUFJLEVBQUUsK0JBQStCLEVBQUU7SUFDekMsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7Q0FDbkMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSw0Q0FBNEMsRUFBRTtJQUNsRyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUMvQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFO0lBQ3hCLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ2xELEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQy9DLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFO0lBQzNCLEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFO0lBQ2pDLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFO0NBQ2xDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLCtCQUErQixFQUFFO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLG1FQUFtRSxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ2xHLEVBQUUsSUFBSSxFQUFFLGlFQUFpRSxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQy9GLEVBQUUsSUFBSSxFQUFFLGlFQUFpRSxFQUFFO0lBQzNFLEVBQUUsSUFBSSxFQUFFLDZFQUE2RSxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQzVHLEVBQUUsSUFBSSxFQUFFLDJFQUEyRSxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3pHLEVBQUUsSUFBSSxFQUFFLDJFQUEyRSxFQUFFO0NBQ3RG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S0FDM0U7SUFDRDtRQUNFLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsTUFBTSxFQUFFLGlDQUFpQztRQUN6QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzNFO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNFO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE1BQU0sRUFBRSwrQkFBK0I7UUFDdkMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzVFO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0U7SUFDRDtRQUNFLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsTUFBTSxFQUFFLCtCQUErQjtRQUN2QyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1RTtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdDQUFnQztRQUN0QyxNQUFNLEVBQUUsaUNBQWlDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzRTtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3NwYWNlSW5QYXJlbnNSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
