"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-max-len');
function expecting(errors) {
    return errors.map(function (err) {
        var message = "Line " + (err[0] + 1) + " exceeds the maximum line length of " + err[1] + ".";
        if (err[2]) {
            message = "Line " + (err[0] + 1) + " exceeds the maximum comment line length of " + err[1] + ".";
        }
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('no-options', 'should warn when the line exceeds the limit', [
    {
        code: ''
    },
    {
        code: 'var x = 5;\nvar x = 2;'
    },
    {
        code: 'var x = 5;\nvar x = 2;',
        options: [80]
    },
    {
        code: 'var one\t\t= 1;\nvar three\t= 3;',
        options: [16, 4]
    },
    {
        code: '\tvar one\t\t= 1;\n\tvar three\t= 3;',
        options: [20, 4]
    },
    {
        code: 'var i = 1;\r\nvar i = 1;\n',
        options: [10, 4]
    },
    {
        code: '\n// Blank line on top\nvar foo = module.exports = {};\n',
        options: [80, 4]
    },
    {
        code: '\n// Blank line on top\nvar foo = module.exports = {};\n'
    },
    {
        code: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar i = 1;',
        errors: expecting([[0, 80]])
    },
    {
        code: 'var x = 5, y = 2, z = 5;',
        options: [10],
        errors: expecting([[0, 10]])
    },
    {
        code: '\t\t\tvar i = 1;',
        options: [15],
        errors: expecting([[0, 15]])
    },
    {
        code: '\t\t\tvar i = 1;\n\t\t\tvar j = 1;',
        options: [15, { tabWidth: 4 }],
        errors: expecting([[0, 15], [1, 15]])
    }
]);
ruleTester.addTestGroup('patterns', 'should ignore specified patterns', [
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      var dep = require('really/really/really/really/really/really/really/long/module');\n      const dep = require('another/really/really/really/really/really/really/long/module');\n                       foobar = 'this line will be ignored because it starts with foobar ...';\n      "], ["\n      var dep = require('really/really/really/really/really/really/really/long/module');\n      const dep = require('another/really/really/really/really/really/really/long/module');\n                       foobar = 'this line will be ignored because it starts with foobar ...';\n      "]))),
        options: [50, { ignorePattern: '^\\s*(var|const)\\s.+=\\s*require\\s*\\(|^\\s*foobar' }]
    },
    {
        code: "foo(bar(bazz('this is a long'), 'line of'), 'stuff');",
        options: [40, 4, { ignorePattern: 'foo.+bazz\\(' }]
    },
    {
        code: "foo(bar(bazz('this is a long'), 'line of'), 'stuff');",
        options: [40, 4],
        errors: expecting([[0, 40]])
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      var foobar = 'this line isn\\'t matched by the regexp';\n      var fizzbuzz = 'but this one is matched by the regexp';\n      "], ["\n      var foobar = 'this line isn\\\\'t matched by the regexp';\n      var fizzbuzz = 'but this one is matched by the regexp';\n      "]))),
        options: [20, 4, { ignorePattern: 'fizzbuzz' }],
        errors: expecting([[1, 20]])
    }
]);
ruleTester.addTestGroup('imports', 'should ignore long module specifiers', [
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        import { obj1, obj2, obj3, obj4 } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        import {\n            obj1,\n            obj2,\n            obj3,\n            obj4,\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], ["\n        import { obj1, obj2, obj3, obj4 } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        import {\n            obj1,\n            obj2,\n            obj3,\n            obj4,\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "]))),
        options: [50, { ignoreImports: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        import {\n          obj1, obj2, obj3, obj4, just, trying, to, be, a, rebel, here\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "], ["\n        import {\n          obj1, obj2, obj3, obj4, just, trying, to, be, a, rebel, here\n        } from 'my-favorite-module/with/lots/of/deep/nested/modules';\n        "]))),
        options: [50, { ignoreImports: true }],
        errors: expecting([[2, 50]])
    }
]);
ruleTester.addTestGroup('urls', 'should ignore lines that contain urls', [
    {
        code: "foo('http://example.com/this/is/?a=longish&url=in#here');",
        options: [40, 4, { ignoreUrls: true }]
    },
    {
        code: "foo('http://example.com/this/is/?a=longish&url=in#here');",
        options: [40, 4],
        errors: expecting([[0, 40]])
    }
]);
ruleTester.addTestGroup('comments', 'should handle comments', [
    {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: 'foo(); \t// strips entire comment *and* trailing whitespace',
        options: [6, 4, { ignoreComments: true }]
    },
    {
        code: '// really long comment on its own line sitting here',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: 'var /*inline-comment*/ i = 1;'
    },
    {
        code: 'var /*inline-comment*/ i = 1; // with really long trailing comment',
        options: [40, 4, { ignoreComments: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      /* hey there! this is a multiline\n         comment with longish lines in various places\n         but\n         with a short line-length */"], ["\n      /* hey there! this is a multiline\n         comment with longish lines in various places\n         but\n         with a short line-length */"]))),
        options: [10, 4, { ignoreComments: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      // I like short comments\n      function butLongSourceLines() { weird(eh()) }"], ["\n      // I like short comments\n      function butLongSourceLines() { weird(eh()) }"]))),
        options: [80, { tabWidth: 4, comments: 30 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n      // Full line comment\n      someCode(); // With a long trailing comment."], ["\n      // Full line comment\n      someCode(); // With a long trailing comment."]))),
        options: [{ code: 30, tabWidth: 4, comments: 20, ignoreTrailingComments: true }]
    },
    {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreTrailingComments: true }]
    }, {
        code: 'var foo = module.exports = {}; // really long trailing comment',
        options: [40, 4, { ignoreComments: true, ignoreTrailingComments: false }]
    },
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n      function foo() {\n      //this line has 29 characters\n      }"], ["\n      function foo() {\n      //this line has 29 characters\n      }"]))),
        options: [40, 4, { comments: 29 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          //this line has 33 characters\n      }"], ["\n      function foo() {\n          //this line has 33 characters\n      }"]))),
        options: [40, 4, { comments: 33 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 21*/\n      }"], ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 21*/\n      }"]))),
        options: [40, 4, { comments: 29 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 25*/\n      }"], ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 25*/\n      }"]))),
        options: [40, 4, { comments: 33 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"]))),
        options: [40, 4, { comments: 36 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"]))),
        options: [43, 4, { comments: 33 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      function foo() {\n      //this line has 29 characters\n      }"], ["\n      function foo() {\n      //this line has 29 characters\n      }"]))),
        options: [40, 4, { comments: 28 }],
        errors: expecting([[2, 28, true]])
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          //this line has 33 characters\n      }"], ["\n      function foo() {\n          //this line has 33 characters\n      }"]))),
        options: [40, 4, { comments: 32 }],
        errors: expecting([[2, 32, true]])
    },
    {
        code: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 32 characters*/\n      }"], ["\n      function foo() {\n      /*this line has 29 characters\n      and this one has 32 characters*/\n      }"]))),
        options: [40, 4, { comments: 28 }],
        errors: expecting([
            [2, 28, true],
            [3, 28, true]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 36 characters*/\n      }"], ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 36 characters*/\n      }"]))),
        options: [40, 4, { comments: 32 }],
        errors: expecting([
            [2, 32, true],
            [3, 32, true]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"], ["\n      function foo() {\n          var a; /*this line has 40 characters\n          and this one has 36 characters*/\n      }"]))),
        options: [39, 4, { comments: 35 }],
        errors: expecting([
            [2, 39],
            [3, 35, true]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"], ["\n      function foo() {\n          /*this line has 33 characters\n          and this one has 43 characters*/ var a;\n      }"]))),
        options: [42, 4, { comments: 32 }],
        errors: expecting([
            [2, 32, true],
            [3, 42]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n      // This commented line has precisely 51 characters.\n      var x = 'This line also has exactly 51 characters';"], ["\n      // This commented line has precisely 51 characters.\n      var x = 'This line also has exactly 51 characters';"]))),
        options: [20, { ignoreComments: true }],
        errors: expecting([[2, 20]])
    },
    {
        code: 'var /*this is a long non-removed inline comment*/ i = 1;',
        options: [20, { tabWidth: 4, ignoreComments: true }],
        errors: expecting([[0, 20]])
    },
    {
        code: "var longLine = 'will trigger'; // even with a comment",
        options: [10, 4, { ignoreComments: true }],
        errors: expecting([[0, 10]])
    },
    {
        code: "var foo = module.exports = {}; // really long trailing comment",
        options: [40, 4],
        errors: expecting([[0, 40]])
    },
    {
        code: '// A comment that exceeds the max comment length.',
        options: [80, 4, { comments: 20 }],
        errors: expecting([[0, 20, true]])
    },
    {
        code: '// A comment that exceeds the max comment length.',
        options: [{ code: 20 }],
        errors: expecting([[0, 20]])
    },
    {
        code: '//This is very long comment with more than 40 characters which is invalid',
        options: [40, 4, { ignoreTrailingComments: true }],
        errors: expecting([[0, 40]])
    }
]);
ruleTester.addTestGroup('regex', 'should ignore long regular expression literals', [
    {
        code: 'var foo = /this is a very long pattern/;',
        options: [29, 4, { ignoreRegExpLiterals: true }]
    }
]);
ruleTester.addTestGroup('template-literals', 'should ignore template literals', [
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string`;',
        options: [29, 4, { ignoreTemplateLiterals: true }]
    },
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string\nand this is another line that is very long`;',
        options: [29, 4, { ignoreTemplateLiterals: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n        var foo = veryLongIdentifier;\n        var bar = `this is a very long string\n        and this is another line that is very long\n        and here is another\n         and another!`;"], ["\n        var foo = veryLongIdentifier;\n        var bar = \\`this is a very long string\n        and this is another line that is very long\n        and here is another\n         and another!\\`;"]))),
        options: [29, 4, { ignoreTemplateLiterals: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n        var foo = veryLongIdentifier;\n        var bar = `this is a very long string\n        and this is another line that is very long\n        and here is another with replacement ${x}\n         and another!`;"], ["\n        var foo = veryLongIdentifier;\n        var bar = \\`this is a very long string\n        and this is another line that is very long\n        and here is another with replacement \\${x}\n         and another!\\`;"]))),
        options: [29, 4, { ignoreTemplateLiterals: true }]
    }
]);
ruleTester.addTestGroup('strings', 'should ignore strings', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';",
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = \"this is a very long string\";",
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n      var str = \"this is a very long string      with continuation\";"], ["\n      var str = \"this is a very long string\\\n      with continuation\";"]))),
        options: [29, 4, { ignoreStrings: true }]
    },
    {
        code: 'var str = \"this is a very long string\\\nwith continuation\\\nand with another very very long continuation\\\nand ending\";',
        options: [29, 4, { ignoreStrings: true }]
    }
]);
ruleTester.addTestGroup('strings-regex', 'should handle ignoreStrings and ignoreRegExpLiterals options', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = /this is a very very long pattern/;",
        options: [29, { ignoreStrings: false, ignoreRegExpLiterals: false }],
        errors: expecting([[1, 29]])
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = new RegExp('this is a very very long pattern');",
        options: [29, { ignoreStrings: false, ignoreRegExpLiterals: true }],
        errors: expecting([[1, 29]])
    }
]);
ruleTester.addTestGroup('strings-templates', 'should handle the ignoreStrings and ignoreTemplateLiterals options', [
    {
        code: "var foo = veryLongIdentifier;\nvar bar = 'this is a very long string';",
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
        errors: expecting([[1, 29]])
    },
    {
        code: "var foo = veryLongIdentifier;\nvar bar = \"this is a very long string\";",
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: true }],
        errors: expecting([[1, 29]])
    },
    {
        code: 'var foo = veryLongIdentifier;\nvar bar = `this is a very long string`;',
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
        errors: expecting([[1, 29]])
    },
    {
        code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n      var foo = veryLongIdentifier;\n      var bar = `this is a very long string\n      and this is another line that is very long`;"], ["\n      var foo = veryLongIdentifier;\n      var bar = \\`this is a very long string\n      and this is another line that is very long\\`;"]))),
        options: [29, { ignoreStrings: false, ignoreTemplateLiterals: false }],
        errors: expecting([
            [2, 29],
            [3, 29]
        ])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTWF4TGVuUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxRTtBQUdyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFakQsU0FBUyxTQUFTLENBQUMsTUFBMkQ7SUFDNUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixJQUFJLE9BQU8sR0FBRyxXQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLDZDQUF1QyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztRQUNqRixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNWLE9BQU8sR0FBRyxXQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHFEQUErQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztTQUN0RjtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsT0FBTztZQUNoQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSw2Q0FBNkMsRUFBRTtJQUNuRjtRQUNFLElBQUksRUFBRSxFQUFFO0tBQ1Q7SUFDRDtRQUNFLElBQUksRUFBRSx3QkFBd0I7S0FDL0I7SUFDRDtRQUNFLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ2Q7SUFDRDtRQUNFLElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNqQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPLEVBQUUsQ0FBQyxFQUFF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QUFhLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3JFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMEVBQTBFO1FBQ2hGLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDckUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSx3RUFBd0U7UUFDOUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUN0RSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHFOQUFBLDRJQUdvQyxJQUFBO1FBQ2hELE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDdEUsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDUCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDUixDQUFDO0tBQ0g7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJNYXhMZW5SdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
