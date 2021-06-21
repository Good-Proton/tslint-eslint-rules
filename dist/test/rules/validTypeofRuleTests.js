"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('valid-typeof');
function expecting(errors) {
    return [{
            failure: 'invalid typeof comparison value',
            startPosition: new ruleTester_1.Position(0, errors[0]),
            endPosition: new ruleTester_1.Position(0, errors[1])
        }];
}
ruleTester.addTestGroup('valid', 'should pass when using valid strings or variables', [
    'if (typeof foo === "string") {}',
    'if (typeof bar == \'undefined\') {}',
    'if (typeof foo === baz) {}',
    'if (typeof bar === typeof qux) {}'
]);
ruleTester.addTestGroup('invalid', 'should fail when using invalid strings', [
    { code: 'if (typeof foo === "strnig") {}', errors: expecting([4, 14]) },
    { code: 'if (typeof fooz == "undefimed") {}', errors: expecting([4, 15]) },
    { code: 'if (typeof bar != \'nunber\') {}', errors: expecting([4, 14]) },
    { code: 'if (typeof barz !== "fucntion") {}', errors: expecting([4, 15]) }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdmFsaWRUeXBlb2ZSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBNkQ7QUFFN0QsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBR2xELFNBQVMsU0FBUyxDQUFDLE1BQXdCO0lBQ3pDLE9BQU8sQ0FBQztZQUNOLE9BQU8sRUFBRSxpQ0FBaUM7WUFDMUMsYUFBYSxFQUFFLElBQUkscUJBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbURBQW1ELEVBQUU7SUFDcEYsaUNBQWlDO0lBQ2pDLHFDQUFxQztJQUNyQyw0QkFBNEI7SUFDNUIsbUNBQW1DO0NBQ3BDLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLHdDQUF3QyxFQUFFO0lBQzNFLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDMUUsRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtDQUMzRSxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy92YWxpZFR5cGVvZlJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
