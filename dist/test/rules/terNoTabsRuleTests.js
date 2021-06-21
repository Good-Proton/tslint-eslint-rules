"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-no-tabs');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: 'Unexpected tab character.',
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when not using tabs', [
    'function test(){\n}',
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  function test(){\n    //   sdfdsf\n  }"], ["\n  function test(){\n    //   sdfdsf\n  }"])))
]);
ruleTester.addTestGroup('invalid', 'should fail when using tabs', [
    {
        code: 'function test(){\t}',
        errors: expecting([[0, 16]])
    },
    {
        code: '/** \t comment test */',
        errors: expecting([[0, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    function\t test(){\n      //   sdfdsf\n    }"], ["\n    function\\t test(){\n      //   sdfdsf\n    }"]))),
        errors: expecting([[1, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    function test(){\n      //   \tsdfdsf\n    }"], ["\n    function test(){\n      //   \\tsdfdsf\n    }"]))),
        errors: expecting([[2, 7]])
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    function\t test(){\n      //   \tsdfdsf\n    }"], ["\n    function\\t test(){\n      //   \\tsdfdsf\n    }"]))),
        errors: expecting([[1, 8], [2, 7]])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTm9UYWJzUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxRTtBQUVyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHakQsU0FBUyxTQUFTLENBQUMsTUFBMEI7SUFDM0MsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUU7SUFDbEUscUJBQXFCO0lBQ3JCLG1CQUFNLHVIQUFBLDRDQUdKO0NBQ0gsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsNkJBQTZCLEVBQUU7SUFDaEU7UUFDRSxJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sK0hBQUEscURBR1YsSUFBQTtRQUNGLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sK0hBQUEscURBR1YsSUFBQTtRQUNGLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0saUlBQUEsd0RBR1YsSUFBQTtRQUNGLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyTm9UYWJzUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
