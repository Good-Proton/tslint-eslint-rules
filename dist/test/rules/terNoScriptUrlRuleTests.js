"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-no-script-url');
var noScriptUrlError = {
    failure: 'Script URL is a form of eval.',
    startPosition: new ruleTester_1.Position(0),
    endPosition: new ruleTester_1.Position(0)
};
ruleTester.addTestGroup('valid', 'no javascript: url', [
    'var a = "Hello World!";',
    'var a = 10;',
    'var url = "xjavascript:"'
]);
ruleTester.addTestGroup('invalid', 'with javascript: url', [
    { code: 'var a = "javascript:void(0);";', errors: [noScriptUrlError] },
    { code: 'var a = "javascript:";', errors: [noScriptUrlError] }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTm9TY3JpcHRVcmxSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0Q7QUFFcEQsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFdkQsSUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPLEVBQUUsK0JBQStCO0lBQ3hDLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLENBQUMsQ0FBQyxDQUFDO0NBQzdCLENBQUM7QUFFRixVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRTtJQUNyRCx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLDBCQUEwQjtDQUMzQixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxzQkFBc0IsRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0lBQ3RFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Q0FDL0QsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyTm9TY3JpcHRVcmxSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
