"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-empty-character-class';
var scripts = {
    valid: [
        'var foo = /^abc[a-zA-Z]/;',
        'var regExp = new RegExp(\'^abc[]\');',
        'var foo = /^abc/;',
        'var foo = /[\\[]/;',
        'var foo = /[\\]]/;',
        'var foo = /[a-zA-Z\\[]/;',
        'var foo = /[[]/;',
        'var foo = /[\\[a-z[]]/;',
        'var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;',
        'var foo = /\\s*:\\s*/gim;'
    ],
    invalid: [
        'var foo = /^abc[]/;',
        'var foo = /foo[]bar/;',
        'if (foo.match(/^abc[]/)) {}',
        'if (/^abc[]/.test(foo)) {}',
        'var foo = /[]]/;',
        'var foo = /\\[[]/;',
        'var foo = /\\[\\[\\]a-z[]/;'
    ]
};
describe(rule, function test() {
    it('should pass when not using empty character classes in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using empty character classes in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FbXB0eUNoYXJhY3RlckNsYXNzUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLDBCQUEwQixDQUFDO0FBQ3hDLElBQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsMkJBQTJCO1FBQzNCLHNDQUFzQztRQUN0QyxtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQiwwQkFBMEI7UUFDMUIsa0JBQWtCO1FBQ2xCLHlCQUF5QjtRQUN6QixpRUFBaUU7UUFDakUsMkJBQTJCO0tBQzVCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNEJBQTRCO1FBQzVCLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsNkJBQTZCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxJQUFJO0lBQzFCLEVBQUUsQ0FBQywyRUFBMkUsRUFBRSxTQUFTLFNBQVM7UUFDaEcsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1RUFBdUUsRUFBRSxTQUFTLFdBQVc7UUFDOUYsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvbm9FbXB0eUNoYXJhY3RlckNsYXNzUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
