"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-no-proto');
var noProtoError = {
    failure: 'The `__proto__` property is deprecated.',
    startPosition: new ruleTester_1.Position(0),
    endPosition: new ruleTester_1.Position(0)
};
ruleTester.addTestGroup('valid', 'should pass when using __proto__ as variable name', ['var __proto__ = null;']);
ruleTester.addTestGroup('valid', 'should pass when using __proto__ variable as array index', ['var a = test[__proto__];']);
ruleTester.addTestGroup('invalid', 'should fail when using __proto__ string as array index', [
    {
        code: 'var a = test["__proto__"];',
        errors: [noProtoError]
    }
]);
ruleTester.addTestGroup('invalid', 'should fail when using __proto__ to get Object prototype', [
    {
        code: 'var a = test.__proto__;',
        errors: [noProtoError]
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTm9Qcm90b1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvRDtBQUVwRCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbEQsSUFBTSxZQUFZLEdBQUc7SUFDbkIsT0FBTyxFQUFFLHlDQUF5QztJQUNsRCxhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLENBQUMsQ0FBQztJQUM5QixXQUFXLEVBQUUsSUFBSSxxQkFBUSxDQUFDLENBQUMsQ0FBQztDQUM3QixDQUFDO0FBRUYsVUFBVSxDQUFDLFlBQVksQ0FDckIsT0FBTyxFQUNQLG1EQUFtRCxFQUNuRCxDQUFDLHVCQUF1QixDQUFDLENBQzFCLENBQUM7QUFFRixVQUFVLENBQUMsWUFBWSxDQUNyQixPQUFPLEVBQ1AsMERBQTBELEVBQzFELENBQUMsMEJBQTBCLENBQUMsQ0FDN0IsQ0FBQztBQUVGLFVBQVUsQ0FBQyxZQUFZLENBQ3JCLFNBQVMsRUFDVCx3REFBd0QsRUFDeEQ7SUFDRTtRQUNFLElBQUksRUFBRSw0QkFBNEI7UUFDbEMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQ3ZCO0NBQ0YsQ0FDRixDQUFDO0FBRUYsVUFBVSxDQUFDLFlBQVksQ0FDckIsU0FBUyxFQUNULDBEQUEwRCxFQUMxRDtJQUNFO1FBQ0UsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7S0FDdkI7Q0FDRixDQUNGLENBQUM7QUFFRixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJOb1Byb3RvUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
