"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ALPHA_ORDER_ERROR = function (x, y) { return "All imports of the same type must be sorted alphabetically. \"" + x + "\" must come before \"" + y + "\""; };
var TYPE_ORDER_ERROR = function (x, y) { return "All imports of type \"" + x + "\" must occur before all imports of type \"" + y + "\""; };
var MEMBER_SORT_ERROR = 'Member imports must be sorted alphabetically.';
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[0],
            startPosition: new ruleTester_1.Position(err[1], err[2]),
            endPosition: new ruleTester_1.Position(err[1], err[3])
        };
    });
}
var ruleTester = new ruleTester_1.RuleTester('sort-imports');
ruleTester.addTestGroup('valid', 'should pass ESLint valid tests', [
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    import a from 'foo';\n    import b from 'bar';\n    import c from 'baz';"], ["\n    import a from 'foo';\n    import b from 'bar';\n    import c from 'baz';"]))),
    ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    import * as B from 'foo';\n    import A from 'bar';"], ["\n    import * as B from 'foo';\n    import A from 'bar';"]))),
    ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    import * as B from 'foo';\n    import {a, b} from 'bar';"], ["\n    import * as B from 'foo';\n    import {a, b} from 'bar';"]))),
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      import A from 'bar';\n      import {b, c} from 'foo'"], ["\n      import A from 'bar';\n      import {b, c} from 'foo'"]))),
        options: [{ 'member-syntax-sort-order': ['single', 'multiple', 'none', 'all', 'alias'] }]
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      import createTheme from 'spectacle/lib/themes/default'\n      import {hot} from 'react-hot-loader'\n      import React from 'react'\n      "], ["\n      import createTheme from 'spectacle/lib/themes/default'\n      import {hot} from 'react-hot-loader'\n      import React from 'react'\n      "]))),
        options: ['ignore-case']
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      import createTheme from 'spectacle/lib/themes/default'\n      import { hot } from 'react-hot-loader'\n      import React from 'react'\n      "], ["\n      import createTheme from 'spectacle/lib/themes/default'\n      import { hot } from 'react-hot-loader'\n      import React from 'react'\n      "]))),
        options: ['ignore-case']
    },
    ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    import {a, b} from 'bar';\n    import {c, d} from 'foo';"], ["\n    import {a, b} from 'bar';\n    import {c, d} from 'foo';"]))),
    ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n    import A from 'foo';\n    import B from 'bar';"], ["\n    import A from 'foo';\n    import B from 'bar';"]))),
    ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n    import A from 'foo';\n    import a from 'bar';"], ["\n    import A from 'foo';\n    import a from 'bar';"]))),
    ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n    import a, * as b from 'foo';\n    import c from 'bar';"], ["\n    import a, * as b from 'foo';\n    import c from 'bar';"]))),
    ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n    import 'foo';\n    import a from 'bar';"], ["\n    import 'foo';\n    import a from 'bar';"]))),
    ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n    import B from 'foo.js';\n    import a from 'bar';"], ["\n    import B from 'foo.js';\n    import a from 'bar';"]))),
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import B from 'bar';"], ["\n      import a from 'foo';\n      import B from 'bar';"]))),
        options: ['ignore-case']
    },
    "import {a, b, c, d} from 'foo';",
    {
        code: "import {b, A, C, d} from 'foo';",
        options: ['ignore-member-sort']
    },
    {
        code: "import {B, a, C, d} from 'foo';",
        options: ['ignore-member-sort']
    },
    {
        code: "import {a, B, c, D} from 'foo';",
        options: ['ignore-case']
    },
    "import a, * as b from 'foo';",
    ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n    import * as a from 'foo';\n\n    import b from 'bar';"], ["\n    import * as a from 'foo';\n\n    import b from 'bar';"]))),
    ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n    import * as bar from 'bar';\n    import * as foo from 'foo';"], ["\n    import * as bar from 'bar';\n    import * as foo from 'foo';"]))),
    {
        code: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n      import 'foo';\n      import bar from 'bar';"], ["\n      import 'foo';\n      import bar from 'bar';"]))),
        options: ['ignore-case']
    },
    "import React, {Component} from 'react';"
]);
ruleTester.addTestGroup('invalid', 'should fail ESLint invalid tests', [
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import A from 'bar';"], ["\n      import a from 'foo';\n      import A from 'bar';"]))),
        errors: expecting([[ALPHA_ORDER_ERROR('A', 'a'), 2, 0, 20]])
    },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      import b from 'foo';\n      import a from 'bar';"], ["\n      import b from 'foo';\n      import a from 'bar';"]))),
        errors: expecting([[ALPHA_ORDER_ERROR('a', 'b'), 2, 0, 20]])
    },
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n      import {b, c} from 'foo';\n      import {a, d} from 'bar';"], ["\n      import {b, c} from 'foo';\n      import {a, d} from 'bar';"]))),
        errors: expecting([[ALPHA_ORDER_ERROR('a', 'b'), 2, 0, 25]])
    },
    {
        code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n      import * as foo from 'foo'\n      import * as bar from 'bar';"], ["\n      import * as foo from 'foo'\n      import * as bar from 'bar';"]))),
        errors: expecting([[ALPHA_ORDER_ERROR('bar', 'foo'), 2, 0, 27]])
    },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import {b, c} from 'bar';"], ["\n      import a from 'foo';\n      import {b, c} from 'bar';"]))),
        errors: expecting([[TYPE_ORDER_ERROR('Multiple', 'Single'), 2, 0, 25]])
    },
    {
        code: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import * as b from 'bar';"], ["\n      import a from 'foo';\n      import * as b from 'bar';"]))),
        errors: expecting([[TYPE_ORDER_ERROR('All', 'Single'), 2, 0, 25]])
    },
    {
        code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import 'bar';"], ["\n      import a from 'foo';\n      import 'bar';"]))),
        errors: expecting([[TYPE_ORDER_ERROR('None', 'Single'), 2, 0, 13]])
    },
    {
        code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n      import b from 'bar';\n      import * as a from 'foo';"], ["\n      import b from 'bar';\n      import * as a from 'foo';"]))),
        options: [{ 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }],
        errors: expecting([[TYPE_ORDER_ERROR('All', 'Single'), 2, 0, 25]])
    },
    {
        code: "import {b, a, d, c} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 19]])
    },
    {
        code: "import {a, B, c, D} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 19]])
    },
    {
        code: "import {zzzzz, /* comment */ aaaaa} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
    },
    {
        code: "import {zzzzz /* comment */, aaaaa} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
    },
    {
        code: "import {/* comment */ zzzzz, aaaaa} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
    },
    {
        code: "import {zzzzz, aaaaa /* comment */} from 'foo';",
        errors: expecting([[MEMBER_SORT_ERROR, 0, 7, 35]])
    },
    {
        code: ruleTester_1.dedent(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["\n      import {\n        boop,\n        foo,\n        zoo,\n        baz as qux,\n        bar,\n        beep\n      } from 'foo';\n    "], ["\n      import {\n        boop,\n        foo,\n        zoo,\n        baz as qux,\n        bar,\n        beep\n      } from 'foo';\n    "]))),
        errors: [{
                failure: MEMBER_SORT_ERROR,
                startPosition: new ruleTester_1.Position(1, 7),
                endPosition: new ruleTester_1.Position(8, 1)
            }]
    }
]);
ruleTester.addTestGroup('alias', 'should pass alias tests', [
    "import a = A.a;",
    ruleTester_1.dedent(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["\n    import x from 'foo';\n    import y = x.y;"], ["\n    import x from 'foo';\n    import y = x.y;"]))),
    {
        code: ruleTester_1.dedent(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["\n      import x = y.x;\n      import a from 'foo';"], ["\n      import x = y.x;\n      import a from 'foo';"]))),
        errors: expecting([[TYPE_ORDER_ERROR('Single', 'Alias'), 2, 0, 20]])
    },
    {
        code: ruleTester_1.dedent(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["\n      import x = y.x;\n      import a from 'foo';"], ["\n      import x = y.x;\n      import a from 'foo';"]))),
        options: [{ 'member-syntax-sort-order': ['alias', 'all', 'single', 'multiple', 'none'] }]
    },
    {
        code: ruleTester_1.dedent(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["\n      import a from 'foo';\n      import x = y.x;"], ["\n      import a from 'foo';\n      import x = y.x;"]))),
        options: [{ 'member-syntax-sort-order': ['alias', 'all', 'single', 'multiple', 'none'] }],
        errors: expecting([[TYPE_ORDER_ERROR('Alias', 'Single'), 2, 0, 15]])
    }
]);
ruleTester.addTestGroup('substring', 'imports that are a subset of other imports should come first', [
    ruleTester_1.dedent(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["\n    import {Foo} from 'bar';\n    import {Fooz} from 'buz';"], ["\n    import {Foo} from 'bar';\n    import {Fooz} from 'buz';"]))),
    {
        code: ruleTester_1.dedent(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["\n      import {Fooz} from 'buz';,\n      import {Foo} from 'bar';\n      "], ["\n      import {Fooz} from 'buz';,\n      import {Foo} from 'bar';\n      "]))),
        errors: expecting([[ALPHA_ORDER_ERROR('Foo', 'Fooz'), 2, 0, 24]])
    },
    ruleTester_1.dedent(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["\n    import 'foo';\n    import 'fooz'"], ["\n    import 'foo';\n    import 'fooz'"]))),
    ruleTester_1.dedent(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["\n    import {Foo, Gar} from 'a';\n    import {Fooz, Garz} from 'b';"], ["\n    import {Foo, Gar} from 'a';\n    import {Fooz, Garz} from 'b';"])))
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvc29ydEltcG9ydHNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFFO0FBRXJFLElBQU0saUJBQWlCLEdBQUcsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsbUVBQWdFLENBQUMsOEJBQXVCLENBQUMsT0FBRyxFQUE1RixDQUE0RixDQUFDO0FBQ2pKLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsMkJBQXdCLENBQUMsbURBQTRDLENBQUMsT0FBRyxFQUF6RSxDQUF5RSxDQUFDO0FBQzdILElBQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUM7QUFFMUUsU0FBUyxTQUFTLENBQUMsTUFBMEM7SUFFM0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUU7SUFDakUsbUJBQU0sMkpBQUEsZ0ZBR2lCO0lBQ3ZCLG1CQUFNLHNJQUFBLDJEQUVpQjtJQUN2QixtQkFBTSwySUFBQSxnRUFFc0I7SUFDNUI7UUFDRSxJQUFJLEVBQUUsbUJBQU0seUlBQUEsOERBRWUsSUFBQTtRQUMzQixPQUFPLEVBQUUsQ0FBQyxFQUFFLDBCQUEw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UUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQzFGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa0lBQUEscURBRU0sSUFBQTtRQUNsQixPQUFPLEVBQUUsQ0FBQyxFQUFFLDBCQUEwQixFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekYsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyRTtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLDhEQUE4RCxFQUFFO0lBQ25HLG1CQUFNLDRJQUFBLCtEQUVzQjtJQUM1QjtRQUNFLElBQUksRUFBRSxtQkFBTSx5SkFBQSw0RUFHVCxJQUFBO1FBQ0gsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsRTtJQUNELG1CQUFNLHFIQUFBLHdDQUVVO0lBQ2hCLG1CQUFNLG1KQUFBLHNFQUUwQjtDQUNqQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9zb3J0SW1wb3J0c1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
