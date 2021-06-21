"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('block-spacing');
function expecting(errors) {
    return errors.map(function (err) {
        var status = err ? 'Requires a space' : 'Unexpected space(s)';
        return {
            failure: status,
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('always-valid', 'passes with "always" and there are spaces inside brackets', [
    "function foo() { return true; }",
    "if (foo) { bar = 0; }",
    "switch (myVar) { case 1: return true; }",
    "function foo() {}",
    "function foo() { }"
]);
ruleTester.addTestGroup('always-invalid', 'fails with "always" and missing spaces inside brackets', [
    { code: "function foo() {return true;}", errors: expecting([true]) },
    { code: "if (foo) { bar = 0;}", errors: expecting([true]) },
    { code: "switch (myVar) { case 1: return true;}", errors: expecting([true]) },
    { code: "switch (myVar) {case 1: return true; }", errors: expecting([true]) },
    { code: "switch (myVar) {case 1: return true;}", errors: expecting([true]) }
]);
ruleTester.addTestGroupWithConfig('never-valid', 'passes with "never" and missing spaces inside brackets', ['never'], [
    "function foo() {return true;}",
    "if (foo) {bar = 0;}",
    "switch (myVar) {case 1: return true;}",
    "function foo() {}",
    "function foo() { }"
]);
ruleTester.addTestGroupWithConfig('never-invalid', 'fails with "never" and there are spaces inside brackets', ['never'], [
    { code: "function foo() { return true; }", errors: expecting([false]) },
    { code: "if (foo) { bar = 0;}", errors: expecting([false]) },
    { code: "switch (myVar) { case 1: return true;}", errors: expecting([false]) },
    { code: "switch (myVar) {case 1: return true; }", errors: expecting([false]) },
    { code: "switch (myVar) { case 1: return true; }", errors: expecting([false]) }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYmxvY2tTcGFjaW5nUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTZEO0FBRTdELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUduRCxTQUFTLFNBQVMsQ0FBQyxNQUFpQjtJQUVsQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1FBQ3BCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1FBQ2hFLE9BQU87WUFDTCxPQUFPLEVBQUUsTUFBTTtZQUNmLGFBQWEsRUFBRSxJQUFJLHFCQUFRLEVBQUU7WUFDN0IsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsMkRBQTJELEVBQUU7SUFDbkcsaUNBQWlDO0lBQ2pDLHVCQUF1QjtJQUN2Qix5Q0FBeUM7SUFDekMsbUJBQW1CO0lBQ25CLG9CQUFvQjtDQUNyQixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLHdEQUF3RCxFQUFFO0lBQ2xHLEVBQUUsSUFBSSxFQUFFLCtCQUErQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQ3BFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQzdFLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQzdFLEVBQUUsSUFBSSxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0NBQzdFLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxzQkFBc0IsQ0FDL0IsYUFBYSxFQUNiLHdEQUF3RCxFQUN4RCxDQUFDLE9BQU8sQ0FBQyxFQUNUO0lBQ0UsK0JBQStCO0lBQy9CLHFCQUFxQjtJQUNyQix1Q0FBdUM7SUFDdkMsbUJBQW1CO0lBQ25CLG9CQUFvQjtDQUNyQixDQUNGLENBQUM7QUFFRixVQUFVLENBQUMsc0JBQXNCLENBQy9CLGVBQWUsRUFDZix5REFBeUQsRUFDekQsQ0FBQyxPQUFPLENBQUMsRUFDVDtJQUNFLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQzlFLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQzlFLEVBQUUsSUFBSSxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0NBQ2hGLENBQ0YsQ0FBQztBQUVGLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL2Jsb2NrU3BhY2luZ1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
