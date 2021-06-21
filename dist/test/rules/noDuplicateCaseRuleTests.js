"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-duplicate-case';
var scripts = {
    duplicateNumbers: [
        "switch (a) {\n       case 1:\n         break;\n       case 2:\n         break;\n       case 1:\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateStrings: [
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateVariables: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case foo:\n         break;\n       default:\n         break;\n     }"
    ],
    noDupes: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case qux:\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'qux':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 0:\n         break;\n       case 1:\n         break;\n       case 2:\n         break;\n       case 3:\n         break;\n       default:\n         break;\n     }"
    ]
};
describe(rule, function test() {
    it('should pass when there is no duplicate cases', function testNoDupes() {
        helper_1.makeTest(rule, scripts.noDupes, true);
    });
    it('should fail when there is duplicate numbers', function testDupNumbers() {
        helper_1.makeTest(rule, scripts.duplicateNumbers, false);
    });
    it('should fail when there is duplicate strings', function testDupStrings() {
        helper_1.makeTest(rule, scripts.duplicateStrings, false);
    });
    it('should fail when there is duplicate variables', function testDupVariables() {
        helper_1.makeTest(rule, scripts.duplicateVariables, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9EdXBsaWNhdGVDYXNlUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDO0FBQ2pDLElBQU0sT0FBTyxHQUFHO0lBQ2QsZ0JBQWdCLEVBQUU7UUFDaEIsMkpBU0c7S0FDSjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLDRNQVdHO0tBQ0o7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixvTUFXRztLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ1AseU9BYUc7UUFDSCw0TUFXRztRQUNILDRMQVdHO0tBQ0o7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLElBQUk7SUFDMUIsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLFNBQVMsV0FBVztRQUNyRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLFNBQVMsY0FBYztRQUN2RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkNBQTZDLEVBQUUsU0FBUyxjQUFjO1FBQ3ZFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxTQUFTLGdCQUFnQjtRQUMzRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
