"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('no-regex-spaces');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: "spaces are hard to count - use {" + err[2] + "}",
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when not using multiple spaces in regular expressions', [
    'var foo = /bar {3}baz/;',
    'var foo = /bar\t\t\tbaz/;'
]);
ruleTester.addTestGroup('invalid', 'should fail when using multiple spaces in regular expressions', [
    { code: 'var foo = /bar    baz/;', errors: expecting([[0, 10, 4]]) },
    { code: 'var foo = /bar      baz/;', errors: expecting([[0, 10, 6]]) }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9SZWdleFNwYWNlc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2RDtBQUU3RCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVyRCxTQUFTLFNBQVMsQ0FBQyxNQUFrQztJQUVuRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLE9BQU87WUFDTCxPQUFPLEVBQUUscUNBQW1DLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBRztZQUNyRCxhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUVBQW1FLEVBQUU7SUFDcEcseUJBQXlCO0lBQ3pCLDJCQUEyQjtDQUM1QixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSwrREFBK0QsRUFBRTtJQUNsRyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNwRSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUN2RSxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub1JlZ2V4U3BhY2VzUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
