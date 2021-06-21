"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-computed-property-spacing', true);
function expecting(errors) {
    var errorMessages = {
        yesBefore: "A space is required before ']'.",
        yesAfter: "A space is required after '['.",
        noBefore: "There should be no space before ']'.",
        noAfter: "There should be no space after '['."
    };
    return errors.map(function (err) {
        var message = errorMessages[err[0]];
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(0, err[1]),
            endPosition: new ruleTester_1.Position(0, err[1] + 1)
        };
    });
}
ruleTester.addTestGroup('default-never-valid', 'default is never', [
    { code: 'obj[foo]' },
    { code: "obj['foo']" },
    { code: 'var x = {[b]: a}' }
]);
ruleTester.addTestGroup('always-valid', 'when always, spaces are required', [
    { code: 'obj[ foo ]', options: ['always'] },
    { code: 'obj[\nfoo\n]', options: ['always'] },
    { code: "obj[ 'foo' ]", options: ['always'] },
    { code: "obj[ 'foo' + 'bar' ]", options: ['always'] },
    { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
    { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['always'] },
    { code: "obj[ 'map' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
    { code: "obj[ 'for' + 'Each' ](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['always'] },
    { code: 'obj[ obj2[ foo ] ]', options: ['always'] },
    { code: 'var foo = obj[ 1 ]', options: ['always'] },
    { code: "var foo = obj[ 'foo' ];", options: ['always'] },
    { code: 'var foo = obj[ [1, 1] ];', options: ['always'] }
]);
ruleTester.addTestGroup('always-valid-objectLiteralComputedProperties', 'when always, spaces are required inside a computed property name', [
    { code: 'var x = {[ "a" ]: a}', options: ['always'] },
    { code: 'var y = {[ x ]: a}', options: ['always'] },
    { code: 'var x = {[ "a" ]() {}}', options: ['always'] },
    { code: 'var y = {[ x ]() {}}', options: ['always'] }
]);
ruleTester.addTestGroup('always-valid-unrelatedCases', "defining an empty object or array doesn't require spaces", [
    { code: 'var foo = {};', options: ['always'] },
    { code: 'var foo = [];', options: ['always'] }
]);
ruleTester.addTestGroup('never-valid', 'when never, accept no spaces', [
    { code: 'obj[foo]', options: ['never'] },
    { code: "obj['foo']", options: ['never'] },
    { code: "obj['foo' + 'bar']", options: ['never'] },
    { code: "obj['foo'+'bar']", options: ['never'] },
    { code: 'obj[obj2[foo]]', options: ['never'] },
    { code: 'obj.map(function(item) { return [\n1,\n2,\n3,\n4\n]; })', options: ['never'] },
    { code: "obj['map'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: "obj['for' + 'Each'](function(item) { return [\n1,\n2,\n3,\n4\n]; })", options: ['never'] },
    { code: 'obj[\nfoo]', options: ['never'] },
    { code: 'obj[foo\n]', options: ['never'] },
    { code: 'var foo = obj[1]', options: ['never'] },
    { code: "var foo = obj['foo'];", options: ['never'] },
    { code: 'var foo = obj[[ 1, 1 ]];', options: ['never'] }
]);
ruleTester.addTestGroup('never-valid-objectLiteralComputedProperties', 'when never, spaces are forbidden inside a computed property name', [
    { code: 'var x = {["a"]: a}', options: ['never'] },
    { code: 'var y = {[x]: a}', options: ['never'] },
    { code: 'var x = {["a"]() {}}', options: ['never'] },
    { code: 'var y = {[x]() {}}', options: ['never'] }
]);
ruleTester.addTestGroup('never-valid-unrelatedCases', "defining an empty object or array doesn't require spaces", [
    { code: 'var foo = {};', options: ['never'] },
    { code: 'var foo = [];', options: ['never'] }
]);
ruleTester.addTestGroup('always-invalid', 'when always, no spaces are forbidden', [
    {
        code: 'var foo = obj[ 1];',
        output: 'var foo = obj[ 1 ];',
        options: ['always'],
        errors: expecting([['yesBefore', 16]])
    },
    {
        code: 'var foo = obj[1 ];',
        output: 'var foo = obj[ 1 ];',
        options: ['always'],
        errors: expecting([['yesAfter', 13]])
    },
    {
        code: 'var foo = obj[ 1];',
        output: 'var foo = obj[ 1 ];',
        options: ['always'],
        errors: expecting([['yesBefore', 16]])
    },
    {
        code: 'var foo = obj[1 ];',
        output: 'var foo = obj[ 1 ];',
        options: ['always'],
        errors: expecting([['yesAfter', 13]])
    },
    {
        code: 'var foo = obj[1]',
        output: 'var foo = obj[ 1 ]',
        options: ['always'],
        errors: expecting([
            ['yesAfter', 13],
            ['yesBefore', 15]
        ])
    }
]);
ruleTester.addTestGroup('never-invalid', 'when never, spaces are prohibited', [
    {
        code: 'var foo = obj[ 1];',
        output: 'var foo = obj[1];',
        options: ['never'],
        errors: expecting([['noAfter', 13]])
    },
    {
        code: 'var foo = obj[1 ];',
        output: 'var foo = obj[1];',
        options: ['never'],
        errors: expecting([['noBefore', 16]])
    },
    {
        code: 'obj[ foo ]',
        output: 'obj[foo]',
        options: ['never'],
        errors: expecting([
            ['noAfter', 3],
            ['noBefore', 9]
        ])
    },
    {
        code: 'obj[foo ]',
        output: 'obj[foo]',
        options: ['never'],
        errors: expecting([['noBefore', 8]])
    },
    {
        code: 'obj[ foo]',
        output: 'obj[foo]',
        options: ['never'],
        errors: expecting([['noAfter', 3]])
    }
]);
ruleTester.addTestGroup('always-invalid-objectLiteralComputedProperties', 'when always, space is required inside object literal computed properties', [
    {
        code: 'var x = {[a]: b}',
        output: 'var x = {[ a ]: b}',
        options: ['always'],
        errors: expecting([
            ['yesAfter', 9],
            ['yesBefore', 11]
        ])
    },
    {
        code: 'var x = {[a ]: b}',
        output: 'var x = {[ a ]: b}',
        options: ['always'],
        errors: expecting([['yesAfter', 9]])
    },
    {
        code: 'var x = {[ a]: b}',
        output: 'var x = {[ a ]: b}',
        options: ['always'],
        errors: expecting([['yesBefore', 12]])
    }
]);
ruleTester.addTestGroup('never-invalid-objectLiteralComputedProperties', 'when never, spaces prohibited inside object literal computed properties', [
    {
        code: 'var x = {[ a ]: b}',
        output: 'var x = {[a]: b}',
        options: ['never'],
        errors: expecting([
            ['noAfter', 9],
            ['noBefore', 13]
        ])
    },
    {
        code: 'var x = {[a ]: b}',
        output: 'var x = {[a]: b}',
        options: ['never'],
        errors: expecting([['noBefore', 12]])
    },
    {
        code: 'var x = {[ a]: b}',
        output: 'var x = {[a]: b}',
        options: ['never'],
        errors: expecting([['noAfter', 9]])
    },
    {
        code: 'var x = {[ a\n]: b}',
        output: 'var x = {[a\n]: b}',
        options: ['never'],
        errors: expecting([['noAfter', 9]])
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyQ29tcHV0ZWRQcm9wZXJ0eVNwYWNpbmdSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBNkQ7QUFFN0QsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXpFLFNBQVMsU0FBUyxDQUFDLE1BQXNFO0lBQ3ZGLElBQU0sYUFBYSxHQUFHO1FBQ3BCLFNBQVMsRUFBRSxpQ0FBaUM7UUFDNUMsUUFBUSxFQUFFLGdDQUFnQztRQUMxQyxRQUFRLEVBQUUsc0NBQXNDO1FBQ2hELE9BQU8sRUFBRSxxQ0FBcUM7S0FDL0MsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsSUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRDLE9BQU87WUFDTCxPQUFPLEVBQUUsT0FBTztZQUNoQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsV0FBVyxFQUFFLElBQUkscUJBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRTtJQUNqRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO0lBQ3RCLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO0NBQzdCLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLGtDQUFrQyxFQUFFO0lBQzFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxR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Q0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUUsVUFBVSxFQUFFLENBQUMsQ0FBRTtZQUNqQixDQUFFLFdBQVcsRUFBRSxFQUFFLENBQUU7U0FDcEIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFFLFVBQVUsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFFLFdBQVcsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO0tBQ3pDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQywrQ0FBK0MsRUFBRSx5RUFBeUUsRUFBRTtJQUNsSjtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFFLFNBQVMsRUFBRSxDQUFDLENBQUU7WUFDaEIsQ0FBRSxVQUFVLEVBQUUsRUFBRSxDQUFFO1NBQ25CLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBRSxVQUFVLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztLQUN4QztJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztLQUN0QztJQUNEO1FBQ0UsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztLQUN0QztDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL3RlckNvbXB1dGVkUHJvcGVydHlTcGFjaW5nUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
