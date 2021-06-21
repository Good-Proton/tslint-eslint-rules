"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-invalid-regexp';
var scripts = {
    valid: [
        'RegExp(\'\')',
        'RegExp()',
        'RegExp(\'.\', \'g\')',
        'new RegExp(\'.\')',
        'new RegExp',
        'new RegExp(\'.\', \'im\')',
        'global.RegExp(\'\\\\\')'
    ],
    invalid: [
        'RegExp(\'[\');',
        'RegExp(\'.\', \'z\');',
        'new RegExp(\')\');'
    ]
};
describe(rule, function test() {
    it('should pass when using valid regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using invalid regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9JbnZhbGlkUmVnZXhwUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDO0FBQ2pDLElBQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsY0FBYztRQUNkLFVBQVU7UUFDVixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWiwyQkFBMkI7UUFDM0IseUJBQXlCO0tBQzFCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsZ0JBQWdCO1FBQ2hCLHVCQUF1QjtRQUN2QixvQkFBb0I7S0FDckI7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLElBQUk7SUFDMUIsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLFNBQVMsU0FBUztRQUN2RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLFNBQVMsV0FBVztRQUMzRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub0ludmFsaWRSZWdleHBSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
