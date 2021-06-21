"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-inner-declarations');
var Decl;
(function (Decl) {
    Decl[Decl["Func"] = 0] = "Func";
    Decl[Decl["Var"] = 1] = "Var";
})(Decl || (Decl = {}));
var Root;
(function (Root) {
    Root[Root["Prog"] = 0] = "Prog";
    Root[Root["Func"] = 1] = "Func";
})(Root || (Root = {}));
function expecting(errors) {
    return errors.map(function (err) {
        var decl = err[2] === Decl.Func ? 'function' : 'variable';
        var root = err[3] === Root.Prog ? 'program' : 'function body';
        var msg = "move " + decl + " declaration to " + root + " root";
        return {
            failure: msg,
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroupWithConfig('valid-function', 'should pass when not using inner declaration functions', ['functions'], [
    'function doSomething() { }',
    'function doSomething() { function somethingElse() { } }',
    '(function() { function doSomething() { } }());',
    'if (test) { var fn = function() { }; }',
    'if (test) { var fn = function expr() { }; }',
    'function decl() { var fn = function expr() { }; }',
    'function decl(arg) { var fn; if (arg) { fn = function() { }; } }',
    'var x = {doSomething() {function doSomethingElse() {}}}',
    'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
    'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
    'if (test) { var foo; }',
    'function doSomething() { while (test) { var foo; } }',
    'foo(() => { function bar() { } });',
    'namespace something { function decl(arg) { var foo; } }',
    'class MyClass { constructor(arg) { function decl(x) { var foo; } } }'
]);
ruleTester.addTestGroupWithConfig('valid-both', 'should pass when not using inner declaration functions and variables', ['both'], [
    'if (test) { let x = 1; }',
    'if (test) { const x = 1; }',
    'var foo;',
    'var foo = 42;',
    'function doSomething() { var foo; }',
    '(function() { var foo; }());',
    'var fn = () => {var foo;}',
    'var x = {doSomething() {var foo;}}'
]);
ruleTester.addTestGroupWithConfig('invalid-function', 'should fail when using inner declaration functions', ['functions'], [
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        function doSomething() {\n          do {\n            function somethingElse() {\n            }\n          } while (test);\n        }"], ["\n        function doSomething() {\n          do {\n            function somethingElse() {\n            }\n          } while (test);\n        }"]))),
        errors: expecting([
            [3, 4, Decl.Func, Root.Func]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        (function() {\n          if (test) {\n            function doSomething() {\n            }\n          }\n        }());"], ["\n        (function() {\n          if (test) {\n            function doSomething() {\n            }\n          }\n        }());"]))),
        errors: expecting([
            [3, 4, Decl.Func, Root.Func]
        ])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-both', 'should fail when using inner declaration functions or variables', ['both'], [
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        if (test) {\n          function doSomething() {\n          }\n        }"], ["\n        if (test) {\n          function doSomething() {\n          }\n        }"]))),
        errors: expecting([
            [2, 2, Decl.Func, Root.Prog]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        while (test) {\n          var foo;\n        }"], ["\n        while (test) {\n          var foo;\n        }"]))),
        errors: expecting([
            [2, 2, Decl.Var, Root.Prog]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        function doSomething() {\n          if (test) {\n            var foo = 42;\n          }\n        }"], ["\n        function doSomething() {\n          if (test) {\n            var foo = 42;\n          }\n        }"]))),
        errors: expecting([
            [3, 4, Decl.Var, Root.Func]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        (function() {\n          if (test) {\n            var foo;\n          }\n        }());"], ["\n        (function() {\n          if (test) {\n            var foo;\n          }\n        }());"]))),
        errors: expecting([
            [3, 4, Decl.Var, Root.Func]
        ])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Jbm5lckRlY2xhcmF0aW9uc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBcUU7QUFFckUsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFM0QsSUFBSyxJQUFrQjtBQUF2QixXQUFLLElBQUk7SUFBRywrQkFBSSxDQUFBO0lBQUUsNkJBQUcsQ0FBQTtBQUFDLENBQUMsRUFBbEIsSUFBSSxLQUFKLElBQUksUUFBYztBQUN2QixJQUFLLElBQWtCO0FBQXZCLFdBQUssSUFBSTtJQUFHLCtCQUFJLENBQUE7SUFBRSwrQkFBSSxDQUFBO0FBQUEsQ0FBQyxFQUFsQixJQUFJLEtBQUosSUFBSSxRQUFjO0FBRXZCLFNBQVMsU0FBUyxDQUFDLE1BQXNDO0lBQ3ZELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzVELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztRQUNoRSxJQUFNLEdBQUcsR0FBRyxVQUFRLElBQUksd0JBQW1CLElBQUksVUFBTyxDQUFDO1FBQ3ZELE9BQU87WUFDTCxPQUFPLEVBQUUsR0FBRztZQUNaLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsc0JBQXNCLENBQy9CLGdCQUFnQixFQUNoQix3REFBd0QsRUFDeEQsQ0FBQyxXQUFXLENBQUMsRUFDYjtJQUNFLDRCQUE0QjtJQUM1Qix5REFBeUQ7SUFDekQsZ0RBQWdEO0lBQ2hELHdDQUF3QztJQUN4Qyw2Q0FBNkM7SUFDN0MsbURBQW1EO0lBQ25ELGtFQUFrRTtJQUNsRSx5REFBeUQ7SUFDekQsdUVBQXVFO0lBQ3ZFLHVFQUF1RTtJQUN2RSx3QkFBd0I7SUFDeEIsc0RBQXNEO0lBQ3RELG9DQUFvQztJQUNwQyx5REFBeUQ7SUFDekQsc0VBQXNFO0NBQ3ZFLENBQ0YsQ0FBQztBQUVGLFVBQVUsQ0FBQyxzQkFBc0IsQ0FDL0IsWUFBWSxFQUNaLHNFQUFzRSxFQUN0RSxDQUFDLE1BQU0sQ0FBQyxFQUNSO0lBQ0UsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1QixVQUFVO0lBQ1YsZUFBZTtJQUNmLHFDQUFxQztJQUNyQyw4QkFBOEI7SUFDOUIsMkJBQTJCO0lBQzNCLG9DQUFvQztDQUNyQyxDQUNGLENBQUM7QUFFRixVQUFVLENBQUMsc0JBQXNCLENBQy9CLGtCQUFrQixFQUNsQixvREFBb0QsRUFDcEQsQ0FBQyxXQUFXLENBQUMsRUFDYjtJQUNFO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDROQUFBLGlKQU1SLElBQUE7UUFDSixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sNE1BQUEsaUlBTUosSUFBQTtRQUNSLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM3QixDQUFDO0tBQ0g7Q0FDRixDQUNGLENBQUM7QUFFRixVQUFVLENBQUMsc0JBQXNCLENBQy9CLGNBQWMsRUFDZCxpRUFBaUUsRUFDakUsQ0FBQyxNQUFNLENBQUMsRUFDUjtJQUNFO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDhKQUFBLG1GQUlSLElBQUE7UUFDSixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sb0lBQUEseURBR1IsSUFBQTtRQUNKLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM1QixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSx5TEFBQSw4R0FLUixJQUFBO1FBQ0osTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzVCLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDZLQUFBLGtHQUtKLElBQUE7UUFDUixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDNUIsQ0FBQztLQUNIO0NBQ0YsQ0FDRixDQUFDO0FBRUYsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9Jbm5lckRlY2xhcmF0aW9uc1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
