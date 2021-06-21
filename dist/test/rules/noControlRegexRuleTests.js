"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-control-regex';
var scripts = {
    'valid': [
        'var regex = /x1f/',
        'var regex = new RegExp("x1f")',
        'var regex = RegExp("x1f")',
        'new RegExp("[")',
        'RegExp("[")',
        'new (function foo(){})("\\x1f")'
    ],
    'invalid': [
        'var regex = /\\\u001f/',
        'var regex = new RegExp("\\x1f")',
        'var regex = RegExp("\\x1f")'
    ]
};
describe(rule, function test() {
    it('should pass when there are no control characters in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when there are control characters in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9Db250cm9sUmVnZXhSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFDaEMsSUFBTSxPQUFPLEdBQUc7SUFDZCxPQUFPLEVBQUU7UUFDUCxtQkFBbUI7UUFDbkIsK0JBQStCO1FBQy9CLDJCQUEyQjtRQUMzQixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLGlDQUFpQztLQUNsQztJQUNELFNBQVMsRUFBRTtRQUNULHdCQUF3QjtRQUN4QixpQ0FBaUM7UUFDakMsNkJBQTZCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxJQUFJO0lBQzFCLEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxTQUFTLFNBQVM7UUFDOUYsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxTQUFTLFdBQVc7UUFDN0YsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9Db250cm9sUmVnZXhSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
