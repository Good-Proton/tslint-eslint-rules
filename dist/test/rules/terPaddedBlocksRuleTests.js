"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var terPaddedBlocksRule_1 = require("../../rules/terPaddedBlocksRule");
var ruleTester = new ruleTester_1.RuleTester('ter-padded-blocks', true);
var FAILURE_STRING = terPaddedBlocksRule_1.Rule.FAILURE_STRING;
function expecting(errors) {
    return errors.map(function (_a) {
        var message = _a[0], line = _a[1], column = _a[2];
        return {
            failure: FAILURE_STRING[message],
            startPosition: new ruleTester_1.Position(line, column),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid', 'should pass valid code', [
    '{\n\na();\n\n}',
    '{\n\n\na();\n\n\n}',
    '{\n\n//comment\na();\n\n}',
    '{\n\na();\n//comment\n\n}',
    '{\n\na()\n//comment\n\n}',
    '{\n\na = 1\n\n}',
    '{//comment\n\na();\n\n}',
    '{ /* comment */\n\na();\n\n}',
    '{\n\n/* comment \n */\n\na();\n\n}',
    '{\n\n/* comment \n */ /* another comment \n */\n\na();\n\n}',
    '{\n\n/* comment \n */ /* another comment \n */\n\na();\n\n/* comment \n */ /* another comment \n */\n\n}',
    '{\n\na();\n\n/* comment */ \n\n}',
    { code: '{\n\na();\n\n/* comment */ \n\n}', options: ['always'] },
    { code: '{\n\na();\n\n/* comment */ \n\n}', options: [{ blocks: 'always' }] },
    { code: 'switch (a) {}', options: [{ switches: 'always' }] },
    { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: ['always'] },
    { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: [{ switches: 'always' }] },
    { code: 'switch (a) {\n\n//comment\ncase 0: foo();//comment\n\n}', options: [{ switches: 'always' }] },
    { code: 'switch (a) {//coment\n\ncase 0: foo();\ncase 1: bar();\n\n/* comment */\n\n}', options: [{ switches: 'always' }] },
    { code: 'class A{\n\nfoo(){}\n\n}' },
    { code: 'class A{\n\nfoo(){}\n\n}', options: ['always'] },
    { code: 'class A{}', options: [{ classes: 'always' }] },
    { code: 'class A{\n\n}', options: [{ classes: 'always' }] },
    { code: 'class A{\n\nfoo(){}\n\n}', options: [{ classes: 'always' }] },
    { code: 'class A extends B{\nfoo(){}\n}', options: ['never'] },
    { code: 'class A extends B<C> {\n       foo(){\n   }\n}', options: ['never'] },
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      @Annotation()\n      class A implements B<C> {\n        method(a: IInterfaceA): IInterfaceB {\n        }\n      }\n    "], ["\n      @Annotation()\n      class A implements B<C> {\n        method(a: IInterfaceA): IInterfaceB {\n        }\n      }\n    "]))),
        options: ['never']
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        /**\n         * Comment on method\n         */\n        someMethod() {\n          // some comment on method\n        }\n      }\n    "], ["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        /**\n         * Comment on method\n         */\n        someMethod() {\n          // some comment on method\n        }\n      }\n    "]))),
        options: ['never']
    },
    { code: '{\na();\n}', options: ['never'] },
    { code: '{\na();}', options: ['never'] },
    { code: '{a();\n}', options: ['never'] },
    { code: '{a();}', options: ['never'] },
    { code: '{//comment\na();}', options: ['never'] },
    { code: '{\n//comment\na()\n}', options: ['never'] },
    { code: '{a();//comment\n}', options: ['never'] },
    { code: '{\na();\n//comment\n}', options: ['never'] },
    { code: '{\na()\n//comment\n}', options: ['never'] },
    { code: '{\na()\n//comment\nb()\n}', options: ['never'] },
    { code: 'function a() {\n/* comment */\nreturn;\n/* comment*/\n}', options: ['never'] },
    { code: '{\n// comment\ndebugger;\n// comment\n}', options: ['never'] },
    { code: '{\n\n// comment\nif (\n// comment\n a) {}\n\n }', options: ['always'] },
    { code: '{\n// comment\nif (\n// comment\n a) {}\n }', options: ['never'] },
    { code: '{\n// comment\nif (\n// comment\n a) {}\n }', options: [{ blocks: 'never' }] },
    { code: 'switch (a) {\ncase 0: foo();\n}', options: ['never'] },
    { code: 'switch (a) {\ncase 0: foo();\n}', options: [{ switches: 'never' }] },
    { code: 'class A{\nfoo(){}\n}', options: ['never'] },
    { code: 'class A{\nfoo(){}\n}', options: [{ classes: 'never' }] },
    { code: '{\na();\n}', options: [{ switches: 'always' }] },
    { code: '{\n\na();\n\n}', options: [{ switches: 'never' }] },
    { code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}', options: [{ blocks: 'always', classes: 'always' }] },
    { code: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}', options: [{ blocks: 'never', classes: 'never' }] },
    { code: 'class A{\nfoo(){}\n}', options: [{ blocks: 'always' }] },
    { code: 'class A{\n\nfoo(){}\n\n}', options: [{ blocks: 'never' }] }
]);
ruleTester.addTestGroup('invalid-1', 'should fail invalid code', [
    {
        code: '{\n//comment\na();\n\n}',
        output: '{\n\n//comment\na();\n\n}',
        errors: expecting([
            ['always', 0, 0]
        ])
    },
    {
        code: '{ //comment\na();\n\n}',
        output: '{ //comment\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0]
        ])
    },
    {
        code: '{\n\na();\n//comment\n}',
        output: '{\n\na();\n//comment\n\n}',
        errors: expecting([
            ['always', 4, 0]
        ])
    },
    {
        code: '{\n\na()\n//comment\n}',
        output: '{\n\na()\n//comment\n\n}',
        errors: expecting([
            ['always', 4, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-2', 'should fail invalid code', [
    {
        code: '{\na();\n\n}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0]
        ])
    },
    {
        code: '{\n\na();\n}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 3, 0]
        ])
    },
    {
        code: '{\na();\n}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0],
            ['always', 2, 0]
        ])
    },
    {
        code: '{\r\na();\r\n}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0],
            ['always', 2, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-3', 'should fail invalid code', [
    {
        code: '{\na();}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0],
            ['always', 1, 4]
        ])
    },
    {
        code: '{a();\n}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0],
            ['always', 1, 0]
        ])
    },
    {
        code: '{a();\n}',
        output: '{\n\na();\n\n}',
        options: [{ blocks: 'always' }],
        errors: expecting([
            ['always', 0, 0],
            ['always', 1, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-4', 'should fail invalid code', [
    {
        code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}',
        output: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}',
        options: ['always'],
        errors: expecting([
            ['always', 0, 11],
            ['always', 3, 0]
        ])
    },
    {
        code: 'switch (a) {\ncase 0: foo();\ncase 1: bar();\n}',
        output: 'switch (a) {\n\ncase 0: foo();\ncase 1: bar();\n\n}',
        options: [{ switches: 'always' }],
        errors: expecting([
            ['always', 0, 11],
            ['always', 3, 0]
        ])
    },
    {
        code: 'switch (a) {\n//comment\ncase 0: foo();//comment\n}',
        output: 'switch (a) {\n\n//comment\ncase 0: foo();//comment\n\n}',
        options: [{ switches: 'always' }],
        errors: expecting([
            ['always', 0, 11],
            ['always', 3, 0]
        ])
    },
    {
        code: 'class A {\nconstructor(){}\n}',
        output: 'class A {\n\nconstructor(){}\n\n}',
        options: ['always'],
        errors: expecting([
            ['always', 0, 8],
            ['always', 2, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-5', 'should fail invalid code', [
    {
        code: 'class A {\nconstructor(){}\n}',
        output: 'class A {\n\nconstructor(){}\n\n}',
        options: [{ classes: 'always' }],
        errors: expecting([
            ['always', 0, 8],
            ['always', 2, 0]
        ])
    },
    {
        code: '{a();}',
        output: '{\n\na();\n\n}',
        errors: expecting([
            ['always', 0, 0],
            ['always', 0, 5]
        ])
    },
    {
        code: '{\na()\n//comment\n\n}',
        output: '{\na()\n//comment\n}',
        options: ['never'],
        errors: expecting([
            ['never', 4, 0]
        ])
    },
    {
        code: '{\n\na();\n\n}',
        output: '{\na();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0],
            ['never', 4, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-6', 'should fail invalid code', [
    {
        code: '{\r\n\r\na();\r\n\r\n}',
        output: '{\na();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0],
            ['never', 4, 0]
        ])
    },
    {
        code: '{\n\n\n  a();\n\n\n}',
        output: '{\n  a();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0],
            ['never', 6, 0]
        ])
    },
    {
        code: '{\n\na();\n}',
        output: '{\na();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0]
        ])
    },
    {
        code: '{\n\n\ta();\n}',
        output: '{\n\ta();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-7', 'should fail invalid code', [
    {
        code: '{\na();\n\n}',
        output: '{\na();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 3, 0]
        ])
    },
    {
        code: '  {\n    a();\n\n  }',
        output: '  {\n    a();\n  }',
        options: ['never'],
        errors: expecting([
            ['never', 3, 2]
        ])
    },
    {
        code: '{\n// comment\nif (\n// comment\n a) {}\n\n}',
        output: '{\n\n// comment\nif (\n// comment\n a) {}\n\n}',
        options: ['always'],
        errors: expecting([
            ['always', 0, 0]
        ])
    },
    {
        code: '{\n\n// comment\nif (\n// comment\n a) {}\n}',
        output: '{\n// comment\nif (\n// comment\n a) {}\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 0]
        ])
    }
]);
ruleTester.addTestGroup('invalid-8', 'should fail invalid code', [
    {
        code: '{\n\n// comment\nif (\n// comment\n a) {}\n}',
        output: '{\n// comment\nif (\n// comment\n a) {}\n}',
        options: [{ blocks: 'never' }],
        errors: expecting([
            ['never', 0, 0]
        ])
    },
    {
        code: 'switch (a) {\n\ncase 0: foo();\n\n}',
        output: 'switch (a) {\ncase 0: foo();\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 11],
            ['never', 4, 0]
        ])
    },
    {
        code: 'switch (a) {\n\ncase 0: foo();\n}',
        output: 'switch (a) {\ncase 0: foo();\n}',
        options: [{ switches: 'never' }],
        errors: expecting([
            ['never', 0, 11]
        ])
    },
    {
        code: 'switch (a) {\ncase 0: foo();\n\n  }',
        output: 'switch (a) {\ncase 0: foo();\n  }',
        options: [{ switches: 'never' }],
        errors: expecting([
            ['never', 3, 2]
        ])
    }
]);
ruleTester.addTestGroup('invalid-9', 'should fail invalid code', [
    {
        code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
        output: 'class A {\nconstructor(){\nfoo();\n}\n}',
        options: ['never'],
        errors: expecting([
            ['never', 0, 8],
            ['never', 2, 13],
            ['never', 6, 0],
            ['never', 8, 0]
        ])
    },
    {
        code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
        output: 'class A {\nconstructor(){\n\nfoo();\n\n}\n}',
        options: [{ classes: 'never' }],
        errors: expecting([
            ['never', 0, 8],
            ['never', 8, 0]
        ])
    },
    {
        code: 'class A {\n\nconstructor(){\n\nfoo();\n\n}\n\n}',
        output: 'class A {\nconstructor(){\nfoo();\n}\n}',
        options: [{ blocks: 'never', classes: 'never' }],
        errors: expecting([
            ['never', 0, 8],
            ['never', 2, 13],
            ['never', 6, 0],
            ['never', 8, 0]
        ])
    },
    {
        code: 'function foo() { // a\n\n  b;\n}',
        output: 'function foo() { // a\n  b;\n}',
        options: ['never'],
        errors: expecting([['never', 0, 15]])
    }
]);
ruleTester.addTestGroup('invalid-10', 'should fail invalid code', [
    {
        code: 'function foo() {\n\n  bar;\n/* a\n */}',
        output: 'function foo() {\n\n  bar;\n/* a\n */\n\n}',
        options: ['always'],
        errors: expecting([['always', 4, 3]])
    },
    {
        code: 'function foo() { /* a\n */\n/* b\n */\n  bar;\n}',
        output: 'function foo() {\n\n/* a\n */\n/* b\n */\n  bar;\n\n}',
        options: ['always'],
        errors: expecting([['always', 0, 15], ['always', 5, 0]])
    },
    {
        code: 'function foo() { /* a\n */ /* b\n */\n  bar;\n}',
        output: 'function foo() {\n\n/* a\n */ /* b\n */\n  bar;\n\n}',
        options: ['always'],
        errors: expecting([['always', 0, 15], ['always', 4, 0]])
    },
    {
        code: 'function foo() { /* a\n */ /* b\n */\n  bar;\n/* c\n *//* d\n */}',
        output: 'function foo() {\n\n/* a\n */ /* b\n */\n  bar;\n/* c\n *//* d\n */\n\n}',
        options: ['always'],
        errors: expecting([['always', 0, 15], ['always', 6, 3]])
    }
]);
ruleTester.addTestGroupWithConfig('with-never', 'should pass with never', ['never'], [
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        ...\n      }\n      "], ["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        ...\n      }\n      "]))),
        errors: expecting([])
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n        ...\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n        ...\n      }\n      "], ["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n        ...\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n        ...\n      }\n      "]))),
        errors: expecting([])
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      @Injectable()\n      export asbtract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n        }\n      }\n      "], ["\n      @Injectable()\n      export asbtract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n        }\n      }\n      "]))),
        errors: expecting([])
    }
]);
ruleTester.addTestGroupWithConfig('with-never-fail', 'should fail with never', ['never'], [
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n\n        ...\n\n      }\n      "], ["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n\n        ...\n\n      }\n      "]))),
        output: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        ...\n      }\n      "], ["\n      import * as React from 'react';\n\n      // Some comment on my class\n      export class MyClass extends React.Component {\n        ...\n      }\n      "]))),
        errors: expecting([
            ['never', 4, 45],
            ['never', 8, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n\n        ...\n\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n\n        ...\n      }\n      "], ["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n\n        ...\n\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n\n        ...\n      }\n      "]))),
        output: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n        ...\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n        ...\n      }\n      "], ["\n      import * as React from 'react';\n\n      export class FirstClass extends React.Component {\n        ...\n      }\n\n      // tslint:disable-next-line max-classes-per-file\n      export class MyClass extends React.Component {\n        ...\n      }\n      "]))),
        errors: expecting([
            ['never', 3, 48],
            ['never', 7, 0],
            ['never', 10, 45]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n      @Injectable()\n      export abstract class A extends B {\n\n        /**\n         * @param a\n         */\n        method() {\n        }\n\n      }\n      "], ["\n      @Injectable()\n      export abstract class A extends B {\n\n        /**\n         * @param a\n         */\n        method() {\n        }\n\n      }\n      "]))),
        output: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n      @Injectable()\n      export abstract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n        }\n      }\n      "], ["\n      @Injectable()\n      export abstract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n        }\n      }\n      "]))),
        errors: expecting([
            ['never', 2, 34],
            ['never', 10, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      @Injectable()\n      export abstract class A extends B {\n\n\n\n        /**\n         * @param a\n         */\n        method() {\n\n        }\n\n\n\n      }\n      "], ["\n      @Injectable()\n      export abstract class A extends B {\n\n\n\n        /**\n         * @param a\n         */\n        method() {\n\n        }\n\n\n\n      }\n      "]))),
        output: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      @Injectable()\n      export abstract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n\n        }\n      }\n      "], ["\n      @Injectable()\n      export abstract class A extends B {\n        /**\n         * @param a\n         */\n        method() {\n\n        }\n      }\n      "]))),
        errors: expecting([
            ['never', 2, 34],
            ['never', 15, 0]
        ])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyUGFkZGVkQmxvY2tzUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWtCQSwyQ0FBcUU7QUFDckUsdUVBQTJFO0FBRTNFLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBRywwQkFBZ0IsQ0FBQyxjQUFjLENBQUM7QUFFdkQsU0FBUyxTQUFTLENBQUMsTUFBOEM7SUFDL0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBeUI7WUFBdkIsT0FBTyxRQUFBLEVBQUUsSUFBSSxRQUFBLEVBQUUsTUFBTSxRQUFBO1FBQ3hDLE9BQU87WUFDTCxPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNoQyxhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7WUFDekMsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUU7SUFDekQsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLDhCQUE4QjtJQUM5QixvQ0FBb0M7SUFDcEMsNkRBQTZEO0lBQzdELDBHQUEwRztJQUUxRyxrQ0FBa0M7SUFDbEMsRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakUsRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRTtJQUU3RSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFF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O1FBQ0UsSUFBSSxFQUFFLG1CQUFNLG1WQUFBLHdRQVdULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztLQUN0QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDRPQUFBLGlLQVNULElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztLQUN0QjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3hGO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLGlQQUFBLHNLQVNULElBQUE7UUFDSCxNQUFNLEVBQUUsbUJBQU0sNk9BQUEsa0tBT1gsSUFBQTtRQUNILE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hCLENBQUM7S0FDSDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHlWQUFBLDhRQWNULElBQUE7UUFDSCxNQUFNLEVBQUUsbUJBQU0sbVZBQUEsd1FBV1gsSUFBQTtRQUNILE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUNsQixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxrUEFBQSxxS0FXVCxJQUFBO1FBQ0gsTUFBTSxFQUFFLG1CQUFNLDhPQUFBLGlLQVNYLElBQUE7UUFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNqQixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSw0UEFBQSwrS0FnQlQsSUFBQTtRQUNILE1BQU0sRUFBRSxtQkFBTSxnUEFBQSxtS0FVWCxJQUFBO1FBQ0gsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakIsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVyUGFkZGVkQmxvY2tzUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
