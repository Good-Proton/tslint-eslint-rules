"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-no-mixed-spaces-and-tabs');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err[2],
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('allow-unmixed-indentation', 'should pass with default option of unmixed indentation', [
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  function testFn() {\n   let foo = 1;\n  \t\t\tlet bar = 2;\n    if (foo === bar) {\n      console.log('foo equals bar');\n  \t\t}\n  }"], ["\n  function testFn() {\n   let foo = 1;\n  \\t\\t\\tlet bar = 2;\n    if (foo === bar) {\n      console.log('foo equals bar');\n  \\t\\t}\n  }"])))
]);
ruleTester.addTestGroup('allow-tabs', 'should pass with option of "tabs"', [
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tlet foo = 1;\n    \tlet bar = 2;\n    \tif (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tlet foo = 1;\n    \\tlet bar = 2;\n    \\tif (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs' }]
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tlet foo = 1;\n    \tlet bar = 2;\n    \tif (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tlet foo = 1;\n    \\tlet bar = 2;\n    \\tif (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs', smartTabs: true }]
    }
]);
ruleTester.addTestGroup('allow-spaces', 'should pass with option of "spaces"', [
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n      console.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n      console.log('foo equals bar');\n     }\n    }"]))),
        options: [{ type: 'spaces' }]
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n      console.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n      console.log('foo equals bar');\n     }\n    }"]))),
        options: [{ type: 'spaces', smartTabs: true }]
    }
]);
ruleTester.addTestGroup('fail-mixed', 'should fail mixed indentation', [
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n     \tconsole.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n     \\tconsole.log('foo equals bar');\n     }\n    }"]))),
        options: [],
        errors: expecting([
            [5, 0, 'indentation has mixed tabs and spaces']
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \t console.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \\t console.log('foo equals bar');\n     }\n    }"]))),
        options: [],
        errors: expecting([
            [5, 0, 'indentation has mixed tabs and spaces']
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n     \tconsole.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n     \\tconsole.log('foo equals bar');\n     }\n    }"]))),
        options: [{ smartTabs: true }],
        errors: expecting([
            [5, 0, 'indentation has mixed tabs and spaces']
        ])
    }
]);
ruleTester.addTestGroup('fail-wrong-indent-type', 'should fail spaces in tabs or tabs in spaces', [
    {
        code: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tlet foo = 1;\n    \tlet bar = 2;\n    \tif (foo === bar) {\n      console.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tlet foo = 1;\n    \\tlet bar = 2;\n    \\tif (foo === bar) {\n      console.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs' }],
        errors: expecting([
            [5, 0, 'tab indentation expected']
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n     }\n    }"]))),
        options: [{ type: 'spaces' }],
        errors: expecting([
            [5, 0, 'space indentation expected']
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tlet foo = 1;\n    \tlet bar = 2;\n    \tif (foo === bar) {\n      console.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tlet foo = 1;\n    \\tlet bar = 2;\n    \\tif (foo === bar) {\n      console.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs', smartTabs: true }]
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n     }\n    }"], ["\n    function testFn() {\n     let foo = 1;\n     let bar = 2;\n     if (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n     }\n    }"]))),
        options: [{ type: 'spaces', smartTabs: true }],
        errors: expecting([
            [5, 0, 'space indentation expected']
        ])
    }
]);
ruleTester.addTestGroup('smart-tabs', 'should pass with smart tabs and fail without', [
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tconst foo = 1,\n    \t      bar = 2;\n    \tif (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tconst foo = 1,\n    \\t      bar = 2;\n    \\tif (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs' }],
        errors: expecting([
            [3, 0, 'tab indentation expected']
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n    function testFn() {\n    \tconst foo = 1,\n    \t      bar = 2;\n    \tif (foo === bar) {\n    \t\tconsole.log('foo equals bar');\n    \t}\n    }"], ["\n    function testFn() {\n    \\tconst foo = 1,\n    \\t      bar = 2;\n    \\tif (foo === bar) {\n    \\t\\tconsole.log('foo equals bar');\n    \\t}\n    }"]))),
        options: [{ type: 'tabs', smartTabs: true }]
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTm9NaXhlZFNwYWNlc0FuZFRhYnNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFFO0FBRXJFLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRWxFLFNBQVMsU0FBUyxDQUFDLE1BQWtDO0lBQ25ELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsT0FBTztZQUNMLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsMkJBQTJCLEVBQUUsd0RBQXdELEVBQUU7SUFDN0csbUJBQU0sdU5BQUEsaUpBT0o7Q0FDSCxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxtQ0FBbUMsRUFBRTtJQUN6RTtRQUNFLElBQUksRUFBRSxtQkFBTSxnT0FBQSwySkFPVixJQUFBO1FBQ0YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7S0FDNUI7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxnT0FBQSwySkFPVixJQUFBO1FBQ0YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUM3QztDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLHFDQUFxQyxFQUFFO0lBQzdFO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDBOQUFBLCtJQU9WLElBQUE7UUFDRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztLQUM5QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDBOQUFBLCtJQU9WLElBQUE7UUFDRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQy9DO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsK0JBQStCLEVBQUU7SUFDckU7UUFDRSxJQUFJLEVBQUUsbUJBQU0sMk5BQUEsaUpBT1YsSUFBQTtRQUNGLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsdUNBQXVDLENBQUM7U0FDaEQsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sMk5BQUEsaUpBT1YsSUFBQTtRQUNGLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsdUNBQXVDLENBQUM7U0FDaEQsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sMk5BQUEsaUpBT1YsSUFBQTtRQUNGLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzlCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHVDQUF1QyxDQUFDO1NBQ2hELENBQUM7S0FDSDtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsOENBQThDLEVBQUU7SUFDaEc7UUFDRSxJQUFJLEVBQUUsbUJBQU0sOE5BQUEsdUpBT1YsSUFBQTtRQUNGLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLDBCQUEwQixDQUFDO1NBQ25DLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDhOQUFBLG1KQU9WLElBQUE7UUFDRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSw0QkFBNEIsQ0FBQztTQUNyQyxDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxnT0FBQSx1SkFPVixJQUFBO1FBQ0YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUM3QztJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDhOQUFBLG1KQU9WLElBQUE7UUFDRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzlDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLDRCQUE0QixDQUFDO1NBQ3JDLENBQUM7S0FDSDtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLDhDQUE4QyxFQUFFO0lBQ3BGO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHNPQUFBLCtKQU9WLElBQUE7UUFDRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSwwQkFBMEIsQ0FBQztTQUNuQyxDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxzT0FBQSwrSkFPVixJQUFBO1FBQ0YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUM3QztDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3Rlck5vTWl4ZWRTcGFjZXNBbmRUYWJzUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
