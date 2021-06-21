"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-multi-spaces');
function expecting(errors) {
    return errors.map(function (token) {
        return {
            failure: "Multiple spaces found before '" + token + "'.",
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when avoiding unnecessary spaces', [
    'var a = 1;',
    'var a=1;',
    'var a = 1, b = 2;',
    'var arr = [1, 2];',
    'var arr = [ (1), (2) ];',
    "var obj = {'a': 1, 'b': (2)};",
    "var obj = {'a': 1,\n      'b': (2)};",
    '\t\tvar x = 5,\n\t\t    y = 2;',
    'a, b',
    'a >>> b',
    'a ^ b',
    '(a) | (b)',
    'a & b',
    'a << b',
    'a !== b',
    'a >>>= b',
    'if (a & b) { }',
    'function foo(a,b) {}',
    'function foo(a, b) {}',
    'if ( a === 3 && b === 4) {}',
    'if ( a === 3||b === 4 ) {}',
    'if ( a <= 4) {}',
    'var foo = bar === 1 ? 2: 3',
    '[1, , 3]',
    '[1, ]',
    '[ ( 1 ) , ( 2 ) ]',
    'a = 1, b = 2;',
    '(function(a, b){})',
    'x.in = 0;',
    '(function(a,/* b, */c){})',
    '(function(a,/*b,*/c){})',
    '(function(a, /*b,*/c){})',
    '(function(a,/*b,*/ c){})',
    '(function(a, /*b,*/ c){})',
    '(function(/*a, b, */c){})',
    '(function(/*a, */b, c){})',
    '(function(a, b/*, c*/){})',
    '(function(a, b/*,c*/){})',
    '(function(a, b /*,c*/){})',
    '(function(a/*, b ,c*/){})',
    '(function(a /*, b ,c*/){})',
    '(function(a /*, b        ,c*/){})',
    '/**\n * hello\n * @param {foo} int hi\n *      set.\n * @private\n*/',
    '/**\n * hello\n * @param {foo} int hi\n *      set.\n *      set.\n * @private\n*/',
    'var a,/* b,*/c;',
    'var foo = [1,/* 2,*/3];',
    'var bar = {a: 1,/* b: 2*/c: 3};',
    'var foo = \'hello     world\';',
    'var foo = \'    \';',
    'var foo = `    `;',
    'var foo = "    ";',
    'var foo = "    \'  ";',
    'function foo() {\n    return;\n}',
    'function foo() {\n    if (foo) {\n        return;\n    }\n}',
    'var foo = `hello     world`;',
    '({ a:  b })',
    "message += type === 'ERROR' ? `${chalk.bgRed('ERROR')}  ` : ''",
    "message += type === 'ERROR' ? `  ${chalk.bgRed('ERROR')}` : ''",
    "message += type === 'ERROR' ? `${chalk.bgRed('ERROR')}  and  ${x}` : ''"
]);
ruleTester.addTestGroup('invalid', 'should fail when using multiple spaces', [
    {
        code: 'function foo(a,  b) {}',
        errors: expecting(['b'])
    },
    {
        code: 'var foo = (a,  b) => {}',
        errors: expecting(['b'])
    },
    {
        code: 'var a =  1',
        errors: expecting(['1'])
    },
    {
        code: 'var a = 1,  b = 2;',
        errors: expecting(['b'])
    },
    {
        code: 'a <<  b',
        errors: expecting(['b'])
    },
    {
        code: "var arr = {'a': 1,   'b': 2};",
        errors: expecting(["'b'"])
    },
    {
        code: 'if (a &  b) { }',
        errors: expecting(['b'])
    },
    {
        code: 'if ( a === 3  &&  b === 4) {}',
        errors: expecting(['&&', 'b'])
    },
    {
        code: 'var foo = bar === 1 ?  2:  3',
        errors: expecting(['2', '3'])
    },
    {
        code: 'var a = [1,  2,  3,  4]',
        errors: expecting(['2', '3', '4'])
    },
    {
        code: 'var arr = [1,  2];',
        errors: expecting(['2'])
    },
    {
        code: '[  , 1,  , 3,  ,  ]',
        errors: expecting([',', ',', ',', ']'])
    },
    {
        code: 'a >>>  b',
        errors: expecting(['b'])
    },
    {
        code: 'a = 1,  b =  2;',
        errors: expecting(['b', '2'])
    },
    {
        code: '(function(a,  b){})',
        errors: expecting(['b'])
    },
    {
        code: 'function foo(a,  b){}',
        errors: expecting(['b'])
    },
    {
        code: 'var o = { fetch: function    () {} };',
        errors: expecting(['('])
    },
    {
        code: 'function foo      () {}',
        errors: expecting(['('])
    },
    {
        code: 'if (foo)      {}',
        errors: expecting(['{'])
    },
    {
        code: 'function    foo(){}',
        errors: expecting(['foo'])
    },
    {
        code: 'if    (foo) {}',
        errors: expecting(['('])
    },
    {
        code: 'try    {} catch(ex) {}',
        errors: expecting(['{'])
    },
    {
        code: 'try {} catch    (ex) {}',
        errors: expecting(['('])
    },
    {
        code: 'var o = { fetch: function    () {} };',
        errors: expecting(['('])
    },
    {
        code: 'throw  error;',
        errors: expecting(['error'])
    },
    {
        code: 'function foo() { return      bar; }',
        errors: expecting(['bar'])
    },
    {
        code: 'switch   (a) {default: foo(); break;}',
        errors: expecting(['('])
    },
    {
        code: 'var  answer = 6 *  7;',
        errors: expecting(['answer', '7'])
    },
    {
        code: '({ a:  6  * 7 })',
        errors: expecting(['*'])
    },
    {
        code: '({ a:    (   6    /   4    * 7)   })',
        errors: expecting(['6', '/', '4', '*', '}'])
    },
    {
        code: 'var foo = { bar: function() { return 1    + 2; } };',
        errors: expecting(['+'])
    },
    {
        code: '\t\tvar x = 5,\n\t\t    y =  2;',
        errors: expecting(['2'])
    },
    {
        code: 'var x =\t  5;',
        errors: expecting(['5'])
    }
]);
ruleTester.addTestGroup('property-assignment', 'should report error when PropertyAssignment exception is off', [
    {
        code: '({ a: b })',
        options: [{ exceptions: { PropertyAssignment: false } }]
    },
    {
        code: '({ a:    (   6    /   4    * 7)   })',
        options: [{ exceptions: { PropertyAssignment: false } }],
        errors: expecting(['(', '6', '/', '4', '*', '}'])
    },
    {
        code: '({ a:   b })',
        options: [{ exceptions: { PropertyAssignment: false } }],
        errors: expecting(['b'])
    }
]);
ruleTester.addTestGroup('exceptions', 'should not report when exceptions are turn on', [
    {
        code: 'var  answer = 6 *  7;',
        options: [{ exceptions: { VariableDeclaration: true, BinaryExpression: true } }]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9NdWx0aVNwYWNlc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2RDtBQUc3RCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVyRCxTQUFTLFNBQVMsQ0FBQyxNQUFnQjtJQUNqQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO1FBQ3RCLE9BQU87WUFDTCxPQUFPLEVBQUUsbUNBQWlDLEtBQUssT0FBSTtZQUNuRCxhQUFhLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1lBQzdCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLDhDQUE4QyxFQUFFO0lBQy9FLFlBQVk7SUFDWixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsK0JBQStCO0lBQy9CLHNDQUFzQztJQUN0QyxnQ0FBZ0M7SUFDaEMsTUFBTTtJQUNOLFNBQVM7SUFDVCxPQUFPO0lBQ1AsV0FBVztJQUNYLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2Qiw2QkFBNkI7SUFDN0IsNEJBQTRCO0lBQzVCLGlCQUFpQjtJQUNqQiw0QkFBNEI7SUFDNUIsVUFBVTtJQUNWLE9BQU87SUFDUCxtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG9CQUFvQjtJQUNwQixXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMz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c0M7UUFDNUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM3QztJQUNEO1FBQ0UsSUFBSSxFQUFFLHFEQUFxRDtRQUMzRCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7SUFDRDtRQUNFLElBQUksRUFBRSxpQ0FBaUM7UUFDdkMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLDhEQUE4RCxFQUFFO0lBQzdHO1FBQ0UsSUFBSSxFQUFFLFlBQVk7UUFDbEIsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0tBQ3pEO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsc0NBQXNDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN4RCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNsRDtJQUNEO1FBQ0UsSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLCtDQUErQyxFQUFFO0lBQ3JGO1FBQ0UsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQ2pGO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9NdWx0aVNwYWNlc1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
