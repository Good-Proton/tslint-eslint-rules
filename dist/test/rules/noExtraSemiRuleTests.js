"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-extra-semi');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: 'unnecessary semicolon',
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when no extra-semi colons exist', [
    'const x = 5;',
    'function foo() { }',
    'for(;;);',
    'while(0);',
    'do;while(0);',
    'for(a in b);',
    'for(a of b);',
    'class A { }',
    'const A = class { };',
    "\n      class A {\n        foo = 'bar';\n        a() {\n          this;\n        }\n      }\n    ",
    "\n      const A = class {\n        a() {\n          this;\n          this.foo = 'bar';\n        }\n      };\n    ",
    'class A { } a;'
]);
ruleTester.addTestGroup('invalid', 'should fail when using invalid strings', [
    { code: 'const x = 5;;', errors: expecting([[0, 12]]) },
    { code: 'let y = "foo";;', errors: expecting([[0, 14]]) },
    { code: 'const z = {};;', errors: expecting([[0, 13]]) },
    { code: 'function foo() {};', errors: expecting([[0, 17]]) },
    { code: 'for(;;);;', errors: expecting([[0, 8]]) },
    { code: 'while(0);;', errors: expecting([[0, 9]]) },
    { code: 'do;while(0);;', errors: expecting([[0, 12]]) },
    { code: 'for(a in b);;', errors: expecting([[0, 12]]) },
    { code: 'for(a of b);;', errors: expecting([[0, 12]]) },
    { code: 'class A { ; }', errors: expecting([[0, 10]]) },
    { code: 'class A { /*a*/; }', errors: expecting([[0, 15]]) },
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      class A {\n        ; a() {\n\n        }\n      }"], ["\n      class A {\n        ; a() {\n\n        }\n      }"]))),
        errors: expecting([[2, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      class A {\n        a() {\n\n        };\n      }"], ["\n      class A {\n        a() {\n\n        };\n      }"]))),
        errors: expecting([[4, 3]])
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      class A {\n        a() {\n\n        };\n        b() {\n\n        }\n      }"], ["\n      class A {\n        a() {\n\n        };\n        b() {\n\n        }\n      }"]))),
        errors: expecting([[4, 3]])
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      class A {\n        ; a() {\n\n        };\n        b() {\n\n        };\n      }"], ["\n      class A {\n        ; a() {\n\n        };\n        b() {\n\n        };\n      }"]))),
        errors: expecting([
            [2, 2],
            [4, 3],
            [7, 3]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      class A {\n        a() {\n\n        };\n        get b() {\n\n        }\n      }"], ["\n      class A {\n        a() {\n\n        };\n        get b() {\n\n        }\n      }"]))),
        errors: expecting([[4, 3]])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeHRyYVNlbWlSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFFO0FBRXJFLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUduRCxTQUFTLFNBQVMsQ0FBQyxNQUEwQjtJQUMzQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLE9BQU87WUFDTCxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRTtJQUM5RSxjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixXQUFXO0lBQ1gsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtR0FPRztJQUNILG1IQU9HO0lBQ0gsZ0JBQWdCO0NBQ2pCLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLHdDQUF3QyxFQUFFO0lBQzNFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ2xELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDNUQ7UUFDRSxJQUFJLEVBQUUsbUJBQU0scUlBQUEsMERBS1IsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sb0lBQUEseURBS1IsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sZ0tBQUEscUZBUVIsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sbUtBQUEsd0ZBUVIsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ1AsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sb0tBQUEseUZBUVIsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9FeHRyYVNlbWlSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
