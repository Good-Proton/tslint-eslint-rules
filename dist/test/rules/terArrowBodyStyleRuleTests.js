"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-arrow-body-style');
function expecting(errors) {
    return errors.map(function (err) {
        var val = err[2] ? 'Expected' : 'Unexpected';
        var message = val + " block statement surrounding arrow body.";
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass with no options', [
    'var foo = () => {};',
    'var foo = () => 0;',
    'var addToB = (a) => { b =  b + a };',
    'var foo = () => { /* do nothing */ };',
    'var foo = () => {\n /* do nothing */ \n};',
    'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
    'var foo = () => ({});',
    'var foo = () => bar();',
    'var foo = () => { bar(); };',
    'var foo = () => { b = a };',
    'var foo = () => { bar: 1 };'
]);
ruleTester.addTestGroup('valid-always', 'should pass when braces are "always" required', [
    { code: 'var foo = () => { return 0; };', options: ['always'] },
    { code: 'var foo = () => { return bar(); };', options: ['always'] }
]);
ruleTester.addTestGroup('valid-never', 'should pass when braces are "never" required', [
    { code: 'var foo = () => 0;', options: ['never'] },
    { code: 'var foo = () => ({ foo: 0 });', options: ['never'] }
]);
ruleTester.addTestGroup('valid-as-needed', 'should pass when braces are required "as-needed"', [
    { code: 'var foo = () => {};', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
    { code: 'var foo = () => 0;', options: ['as-needed', { requireReturnForObjectLiteral: true }] },
    {
        code: 'var addToB = (a) => { b =  b + a };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { /* do nothing */ };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => {\n /* do nothing */ \n};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => bar();',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { bar(); };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var addToB = (a) => { b =  b + a };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    },
    {
        code: 'var foo = () => { return { bar: 0 }; };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }]
    }
]);
ruleTester.addTestGroup('invalid', 'should fail with no options', [
    {
        code: 'var foo = () => {\nreturn bar;\n};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => {\nreturn bar;};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => {return bar;\n};',
        output: 'var foo = () => bar;',
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      var foo = () => {\n        return foo\n          .bar;\n      };"], ["\n      var foo = () => {\n        return foo\n          .bar;\n      };"]))),
        output: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      var foo = () => foo\n          .bar;"], ["\n      var foo = () => foo\n          .bar;"]))),
        errors: expecting([
            [1, 16, false]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      var foo = () => {\n        return {\n          bar: 1,\n          baz: 2\n        };\n      };"], ["\n      var foo = () => {\n        return {\n          bar: 1,\n          baz: 2\n        };\n      };"]))),
        output: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      var foo = () => ({\n          bar: 1,\n          baz: 2\n        });"], ["\n      var foo = () => ({\n          bar: 1,\n          baz: 2\n        });"]))),
        errors: expecting([
            [1, 16, false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-always', 'should fail when braces are "always" required', [
    {
        code: 'var foo = () => 0;',
        output: 'var foo = () => {return 0};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => ({});',
        output: 'var foo = () => {return ({})};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => (((((((5)))))));',
        output: 'var foo = () => {return (((((((5)))))))};',
        options: ['always'],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ ( /* e */ 5 /* f */ ) /* g */ ;',
        output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ {return ( /* e */ 5 /* f */ )} /* g */ ;',
        options: ['always'],
        errors: expecting([
            [0, 49, true]
        ])
    }
]);
ruleTester.addTestGroup('invalid-never', 'should fail when braces are "never" required', [
    {
        code: 'var foo = () => {\nreturn 0;\n};',
        output: 'var foo = () => 0;',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar }\n' +
            '[1, 2, 3].map(foo)',
        output: 'var foo = () => { return bar }\n' +
            '[1, 2, 3].map(foo)',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar }\n' +
            '(1).toString();',
        output: 'var foo = () => { return bar }\n' +
            '(1).toString();',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar };\n' +
            '[1, 2, 3].map(foo)',
        output: 'var foo = () => bar;\n' +
            '[1, 2, 3].map(foo)',
        options: ['never'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        output: 'var foo = (retv, name) => {\nretv[name] = true;\nreturn retv;\n};',
        options: ['never'],
        errors: expecting([
            [0, 26, false]
        ])
    }
]);
ruleTester.addTestGroup('invalid-as-needed', 'should fail when braces are required "as-needed"', [
    {
        code: 'var foo = () => { return 0; };',
        output: 'var foo = () => 0;',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return 0 };',
        output: 'var foo = () => 0;',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar(); };',
        output: 'var foo = () => bar();',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return { bar: 0 }; };',
        output: 'var foo = () => ({ bar: 0 });',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return; };',
        output: 'var foo = () => { return; };',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return ( /* a */ {ok: true} /* b */ ) };',
        output: 'var foo = () => ( /* a */ {ok: true} /* b */ );',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: "var foo = () => { return '{' };",
        output: "var foo = () => '{';",
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return { bar: 0 }.bar; };',
        output: 'var foo = () => ({ bar: 0 }.bar);',
        options: ['as-needed'],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return 0; };',
        output: 'var foo = () => 0;',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => { return bar(); };',
        output: 'var foo = () => bar();',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, false]
        ])
    },
    {
        code: 'var foo = () => ({});',
        output: 'var foo = () => {return ({})};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = () => ({ bar: 0 });',
        output: 'var foo = () => {return ({ bar: 0 })};',
        options: ['as-needed', { requireReturnForObjectLiteral: true }],
        errors: expecting([
            [0, 16, true]
        ])
    },
    {
        code: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */ { /* e */ return /* f */ 5 /* g */ ; /* h */ } /* i */ ;',
        output: 'var foo = /* a */ ( /* b */ ) /* c */ => /* d */  /* e */  /* f */ 5 /* g */  /* h */  /* i */ ;',
        options: ['as-needed'],
        errors: expecting([
            [0, 49, false]
        ])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyQXJyb3dCb2R5U3R5bGVSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFFO0FBR3JFLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTFELFNBQVMsU0FBUyxDQUFDLE1BQW1DO0lBQ3BELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUMvQyxJQUFNLE9BQU8sR0FBTSxHQUFHLDZDQUEwQyxDQUFDO1FBQ2pFLE9BQU87WUFDTCxPQUFPLEVBQUUsT0FBTztZQUNoQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUU7SUFDOUQscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixxQ0FBcUM7SUFDckMsdUNBQXVDO0lBQ3ZDLDJDQUEyQztJQUMzQyxtRUFBbUU7SUFDbkUsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0IsNEJBQTRCO0lBQzVCLDZCQUE2QjtDQUM5QixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSwrQ0FBK0MsRUFBRTtJQUN2RixFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUMvRCxFQUFFLElBQUksRUFBRSxvQ0FBb0MsRUFBRSxPQUFPLEVBQUUsQ0FB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LE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQztTQUNmLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixNQUFNLEVBQUUsZ0NBQWdDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLDZCQUE2QixFQUFFLElBQUksRUFBRSxDQUFDO1FBQy9ELE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztTQUNkLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxNQUFNLEVBQUUsd0NBQXdDO1FBQ2hELE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLDZCQUE2QixFQUFFLElBQUksRUFBRSxDQUFDO1FBQy9ELE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztTQUNkLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLDJHQUEyRztRQUNqSCxNQUFNLEVBQUUsa0dBQWtHO1FBQzFHLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN0QixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUM7U0FDZixDQUFDO0tBQ0g7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJBcnJvd0JvZHlTdHlsZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
