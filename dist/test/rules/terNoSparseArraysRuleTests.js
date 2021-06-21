"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-no-sparse-arrays');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: 'unexpected comma in middle of array',
            startPosition: new ruleTester_1.Position(err[0], err[1]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass when using valid arrays or trailing comma', [
    'const items = [];',
    'const colors = [ "red", "blue", ];',
    'const arr = new Array(23);'
]);
ruleTester.addTestGroup('invalid', 'should fail when using double comma in arrays', [
    { code: 'const items = [,,];', errors: expecting([[0, 14]]) },
    { code: 'const arr = [,];', errors: expecting([[0, 12]]) },
    { code: 'const colors = [ "red",, "blue" ];', errors: expecting([[0, 15]]) },
    { code: 'const foo = ["tire", 1, , "small ball"];', errors: expecting([[0, 12]]) }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTm9TcGFyc2VBcnJheXNSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBNkQ7QUFFN0QsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFMUQsU0FBUyxTQUFTLENBQUMsTUFBMEI7SUFFM0MsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsdURBQXVELEVBQUU7SUFDeEYsbUJBQW1CO0lBQ25CLG9DQUFvQztJQUNwQyw0QkFBNEI7Q0FDN0IsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsK0NBQStDLEVBQUU7SUFDbEYsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUM3RCxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDNUUsRUFBRSxJQUFJLEVBQUUsMENBQTBDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNuRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJOb1NwYXJzZUFycmF5c1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
