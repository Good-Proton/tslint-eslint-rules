"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var MATCH_DESCRIPTION_TEST = '^[A-Z][A-Za-z0-9\\s]*[.]$';
var ruleTester = new ruleTester_1.RuleTester('valid-jsdoc');
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err,
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('valid-default', 'should pass when using valid JSDoc comments (default options)', [
    "/**\n    * Description\n     * @param {Object[]} screenings Array of screenings.\n     * @param {Number} screenings[].timestamp its a time stamp\n     @return {void} */\n    function foo(){}",
    "/**\n    * Description\n     */\n    var x = new Foo(function foo(){})",
    "/**\n    * Description\n    * @returns {void} */\n    function foo(){}",
    "/**\n    * Description\n    * @returns {undefined} */\n    function foo(){}",
    "/**\n    * Description\n    * @alias Test#test\n    * @returns {void} */\n    function foo(){}",
    "/**\n    * Description\n    *@extends MyClass\n    * @returns {void} */\n    function foo(){}",
    "/**\n    * Description\n    * @constructor */\n    function Foo(){}",
    "/**\n    * Description\n    * @class */\n    function Foo(){}",
    "/**\n    * Description\n    * @param {string} p bar\n    * @returns {string} desc */\n    function foo(p){}",
    "/**\n    * Description\n    * @arg {string} p bar\n    * @returns {string} desc */\n    function foo(p){}",
    "/**\n    * Description\n    * @argument {string} p bar\n    * @returns {string} desc */\n    function foo(p){}",
    "/**\n    * Description\n    * @param {string} [p] bar\n    * @returns {string} desc */\n    function foo(p){}",
    "/**\n    * Description\n    * @param {Object} p bar\n    * @param {string} p.name bar\n    * @returns {string} desc */\n    Foo.bar = function(p){};",
    "(function(){\n    /**\n    * Description\n    * @param {string} p bar\n    * @returns {string} desc */\n    function foo(p){}\n    }())",
    "var o = {\n    /**\n    * Description\n    * @param {string} p bar\n    * @returns {string} desc */\n    foo: function(p){}\n    };",
    "/**\n    * Description\n    * @param {Object} p bar\n    * @param {string[]} p.files qux\n    * @param {Function} cb baz\n    * @returns {void} */\n    function foo(p, cb){}",
    "/**\n    * Description\n    * @override */\n    function foo(arg1, arg2){ return ''; }",
    "/**\n    * Description\n    * @inheritdoc */\n    function foo(arg1, arg2){ return ''; }",
    "/**\n    * Description\n    * @inheritDoc */\n    function foo(arg1, arg2){ return ''; }",
    "/**\n    * Description\n    * @return {void} */\n    function foo(){}",
    "/**\n   * Description for A.\n   */\n  class A {\n      /**\n       * Description for constructor.\n       * @param {object[]} xs - xs\n       * @returns {void}\n       */\n      constructor(xs) {\n          this.a = xs;    }\n  }",
    "/**\n     * Description for A.\n     */\n    class A {\n        /**\n         * Description for constructor.\n         * @param {object[]} xs - xs\n         * @returns {void}\n         */\n        constructor(xs) {\n            this.a = xs;    }\n        /**\n         * Description for method.\n         * @param {object[]} xs - xs\n         * @returns {void}\n         */\n        print(xs) {\n            this.a = xs;    }\n    }"
]);
ruleTester.addTestGroupWithConfig('no-require-return', 'should pass when using valid JSDoc comments (requireReturn: false)', [{ requireReturn: false }], [
    "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = (p) => {};",
    "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = function({p}){};",
    "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = function(p){};",
    "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){return p;}};",
    "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){function func(){return p;}};",
    "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = false; if(t){ return; }};",
    "/**\n      * Description\n      * @param {string} p mytest\n      * @returns {void} */\n      Foo.bar = function(p){var t = false; if(t){ return; }};",
    "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){function name(){return p;}}};",
    "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){function name(){}; return name;}};",
    "var obj = {\n     /**\n     * Getter\n     * @type {string}\n     */\n     get location() {\n     return this._location;\n     }\n     }",
    "/**\n       * Description for A.\n       */\n       class A {\n       /**\n       * Description for constructor.\n       * @param {object[]} xs - xs\n       */\n       constructor(xs) {\n       /**\n       * Description for this.xs;\n       * @type {object[]}\n       */\n       this.xs = xs.filter(x => x != null);\n       }\n      }",
    "/** @returns {object} foo */ var foo = () => bar();",
    "/** @returns {object} foo */ var foo = () => { return bar(); };",
    "/** foo */ var foo = () => { bar(); };",
    "/**\n       * Description for A.\n       */\n      class A {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           */\n          constructor(xs) {\n              this.a = xs;    }\n      }"
]);
ruleTester.addTestGroupWithConfig('no-require-param-desc', 'should pass when using valid JSDoc comments (requireParamDescription: false)', [{ requireParamDescription: false }], [
    "/**\n      * Description\n      * @param {string} p\n      * @returns {void}*/\n      Foo.bar = function(p){var t = function(){function name(){}; return name;}};"
]);
ruleTester.addTestGroupWithConfig('no-require-ret-desc', 'should pass when using valid JSDoc comments (requireReturnDescription: false)', [{ requireReturnDescription: false }], [
    "/**\n      * Description\n      * @param {string} p mytest\n      * @returns {Object}*/\n      Foo.bar = function(p){return name;};"
]);
ruleTester.addTestGroupWithConfig('match-desc', 'should pass when using valid JSDoc comments (matchDescription: "regex")', [{ matchDescription: MATCH_DESCRIPTION_TEST }], [
    "/**\n      * Start with caps and end with period.\n      * @return {void} */\n      function foo(){}"
]);
ruleTester.addTestGroupWithConfig('prefer', 'should pass when using valid JSDoc comments (prefer: { return: "return" })', [{ prefer: { 'return': 'return' } }], [
    "/** Foo\n      @return {void} Foo\n       */\n      function foo(){}"
]);
ruleTester.addTestGroup('invalid', 'should fail when using invalid JSDoc comments (default)', [
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      /** @@foo */\n       function foo(){}"], ["\n      /** @@foo */\n       function foo(){}"]))),
        errors: expecting(['JSDoc syntax error'])
    },
    {
        code: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      /** @@returns {void} Foo */\n        function foo(){}"], ["\n      /** @@returns {void} Foo */\n        function foo(){}"]))),
        errors: expecting(['JSDoc syntax error'])
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      /** Foo\n        @returns {void Foo\n         */\n        function foo(){}"], ["\n      /** Foo\n        @returns {void Foo\n         */\n        function foo(){}"]))),
        errors: expecting(['JSDoc type missing brace'])
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      /** Foo\n       @param {void Foo\n        */\n       function foo(){}"], ["\n      /** Foo\n       @param {void Foo\n        */\n       function foo(){}"]))),
        errors: expecting(['JSDoc type missing brace'])
    },
    {
        code: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      /** Foo\n       @param {} p Bar\n        */\n       function foo(){}"], ["\n      /** Foo\n       @param {} p Bar\n        */\n       function foo(){}"]))),
        errors: expecting(['JSDoc syntax error'])
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      /** Foo\n       @param {void Foo */\n       function foo(){}"], ["\n      /** Foo\n       @param {void Foo */\n       function foo(){}"]))),
        errors: expecting(['JSDoc type missing brace'])
    },
    {
        code: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n      /** Foo\n       @param {void Foo */\n       function foo(){}"], ["\n      /** Foo\n       @param {void Foo */\n       function foo(){}"]))),
        errors: expecting(['JSDoc type missing brace'])
    },
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n      /** Foo\n       * @param p Desc\n       */\n       function foo(){}"], ["\n      /** Foo\n       * @param p Desc\n       */\n       function foo(){}"]))),
        errors: expecting([
            "missing JSDoc parameter type for 'p'",
            'missing JSDoc @returns for function'
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param {string} p\n       */\n       function foo(){}"], ["\n      /**\n       * Foo\n       * @param {string} p\n       */\n       function foo(){}"]))),
        errors: expecting([
            "missing JSDoc parameter description for 'p'",
            'missing JSDoc @returns for function'
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @returns {string}\n       */\n       function foo(){}"], ["\n      /**\n       * Foo\n       * @returns {string}\n       */\n       function foo(){}"]))),
        errors: expecting(['missing JSDoc return description'])
    },
    {
        code: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @returns {string} something\n       */\n       function foo(p){}"], ["\n      /**\n       * Foo\n       * @returns {string} something\n       */\n       function foo(p){}"]))),
        errors: expecting(["missing JSDoc for parameter 'p'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param {string} p desc\n       * @param {string} p desc\n       */\n       function foo(){}"], ["\n      /**\n       * Foo\n       * @param {string} p desc\n       * @param {string} p desc\n       */\n       function foo(){}"]))),
        errors: expecting([
            "duplicate JSDoc parameter 'p'",
            'missing JSDoc @returns for function'
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param {string} a desc\n       @returns {void}*/\n       function foo(b){}"], ["\n      /**\n       * Foo\n       * @param {string} a desc\n       @returns {void}*/\n       function foo(b){}"]))),
        errors: expecting(["expected JSDoc for 'b' but found 'a'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @override\n       * @param {string} a desc\n        */\n       function foo(b){}"], ["\n      /**\n       * Foo\n       * @override\n       * @param {string} a desc\n        */\n       function foo(b){}"]))),
        errors: expecting(["expected JSDoc for 'b' but found 'a'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @inheritdoc\n       * @param {string} a desc\n        */\n       function foo(b){}"], ["\n      /**\n       * Foo\n       * @inheritdoc\n       * @param {string} a desc\n        */\n       function foo(b){}"]))),
        errors: expecting(["expected JSDoc for 'b' but found 'a'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @inheritDoc\n       * @param {string} a desc\n        */\n       function foo(b){}"], ["\n      /**\n       * Foo\n       * @inheritDoc\n       * @param {string} a desc\n        */\n       function foo(b){}"]))),
        errors: expecting(["expected JSDoc for 'b' but found 'a'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n      /**\n       * @param fields [Array]\n        */\n        function foo(){}"], ["\n      /**\n       * @param fields [Array]\n        */\n        function foo(){}"]))),
        errors: expecting([
            "missing JSDoc parameter type for 'fields'",
            'missing JSDoc @returns for function'
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      /**\n        * Description for A.\n        */\n       class A {\n           /**\n            * Description for constructor.\n            * @param {object[]} xs - xs\n            * @returns {void}\n            */\n           constructor(xs) {\n               this.a = xs;    }\n           /**\n            * Description for method.\n            */\n           print(xs) {\n               this.a = xs;    }\n       }\n    "], ["\n      /**\n        * Description for A.\n        */\n       class A {\n           /**\n            * Description for constructor.\n            * @param {object[]} xs - xs\n            * @returns {void}\n            */\n           constructor(xs) {\n               this.a = xs;    }\n           /**\n            * Description for method.\n            */\n           print(xs) {\n               this.a = xs;    }\n       }\n    "]))),
        errors: expecting([
            'missing JSDoc @returns for function',
            "missing JSDoc for parameter 'xs'"
        ])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-pref-ret', 'should fail when using invalid JSDoc comments (prefer: { return: "returns" })', [{ prefer: { 'return': 'returns' } }], [
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n        /** Foo\n         @return {void} Foo\n          */\n         function foo(){}"], ["\n        /** Foo\n         @return {void} Foo\n          */\n         function foo(){}"]))),
        errors: expecting(['use @returns instead'])
    },
    {
        code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n        /** Foo\n         @return {void} Foo\n          */\n         foo.bar = () => {}"], ["\n        /** Foo\n         @return {void} Foo\n          */\n         foo.bar = () => {}"]))),
        errors: expecting(['use @returns instead'])
    },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n        /**\n        * Does something.\n       * @param {string} a - this is a\n       * @return {Array<number>} The result of doing it\n       */\n        export function doSomething(a) { }"], ["\n        /**\n        * Does something.\n       * @param {string} a - this is a\n       * @return {Array<number>} The result of doing it\n       */\n        export function doSomething(a) { }"]))),
        errors: expecting(['use @returns instead'])
    },
    {
        code: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n        /**\n          * Does something.\n         * @param {string} a - this is a\n         * @return {Array<number>} The result of doing it\n         */\n          export default function doSomething(a) { }\n      "], ["\n        /**\n          * Does something.\n         * @param {string} a - this is a\n         * @return {Array<number>} The result of doing it\n         */\n          export default function doSomething(a) { }\n      "]))),
        errors: expecting(['use @returns instead'])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-pref-arg', 'should fail when using invalid JSDoc comments (prefer: { argument: "arg" })', [{ prefer: { 'argument': 'arg' } }], [
    {
        code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n        /** Foo\n         @argument {int} bar baz\n          */\n         function foo(bar){}"], ["\n        /** Foo\n         @argument {int} bar baz\n          */\n         function foo(bar){}"]))),
        errors: expecting([
            'use @arg instead',
            'missing JSDoc @returns for function'
        ])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-pref-rets-ret', 'should fail when using invalid JSDoc comments (prefer: { returns: "return" })', [{ prefer: { 'returns': 'return' } }], [
    {
        code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n        /** Foo\n         */\n        function foo(){}"], ["\n        /** Foo\n         */\n        function foo(){}"]))),
        errors: expecting(['missing JSDoc @return for function'])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-match-desc', 'should fail when using invalid JSDoc comments (matchDescription: "regex")', [{ matchDescription: MATCH_DESCRIPTION_TEST }], [
    {
        code: ruleTester_1.dedent(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["\n        /**\n         * Start with caps and end with period\n         * @return {void} */\n         function foo(){}"], ["\n        /**\n         * Start with caps and end with period\n         * @return {void} */\n         function foo(){}"]))),
        errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-no-req-ret', 'should fail when using invalid JSDoc comments (requireReturn: false)', [{ requireReturn: false }], [
    {
        code: ruleTester_1.dedent(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["\n        /**\n         * Foo\n         * @param {string} a desc\n         */\n         function foo(a){var t = false; if(t) {return t;}}"], ["\n        /**\n         * Foo\n         * @param {string} a desc\n         */\n         function foo(a){var t = false; if(t) {return t;}}"]))),
        errors: expecting(['missing JSDoc @returns for function'])
    },
    {
        code: ruleTester_1.dedent(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["\n        /**\n         * Foo\n         * @param {string} a desc\n         */\n         function foo(a){var t = false; if(t) {return null;}}"], ["\n        /**\n         * Foo\n         * @param {string} a desc\n         */\n         function foo(a){var t = false; if(t) {return null;}}"]))),
        errors: expecting(['missing JSDoc @returns for function'])
    },
    {
        code: ruleTester_1.dedent(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["\n        /**\n         * Foo\n         * @param {string} a desc\n         @returns {MyClass}*/\n         function foo(a){var t = false; if(t) {process(t);}}"], ["\n        /**\n         * Foo\n         * @param {string} a desc\n         @returns {MyClass}*/\n         function foo(a){var t = false; if(t) {process(t);}}"]))),
        errors: expecting(['unexpected @returns tag; function has no return statement'])
    },
    {
        code: '/** foo */ var foo = () => bar();',
        errors: expecting(['missing JSDoc @returns for function'])
    },
    {
        code: '/** foo */ var foo = () => { return bar(); };',
        errors: expecting(['missing JSDoc @returns for function'])
    },
    {
        code: '/** @returns {object} foo */ var foo = () => { bar(); };',
        errors: expecting(['unexpected @returns tag; function has no return statement'])
    }
]);
ruleTester.addTestGroupWithConfig('invalid-req-ret-match', 'should fail when using invalid JSDoc comments (matchDescription: "regex", requireReturn: false)', [{
        requireReturn: false,
        matchDescription: MATCH_DESCRIPTION_TEST
    }], [
    {
        code: ruleTester_1.dedent(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["\n        /**\n          * Description for A\n          */\n         class A {\n             /**\n              * Description for constructor\n              * @param {object[]} xs - xs\n              */\n             constructor(xs) {\n                 this.a = xs;    }\n         }"], ["\n        /**\n          * Description for A\n          */\n         class A {\n             /**\n              * Description for constructor\n              * @param {object[]} xs - xs\n              */\n             constructor(xs) {\n                 this.a = xs;    }\n         }"]))),
        errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    },
    {
        code: ruleTester_1.dedent(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["\n        /**\n          * Description for a\n          */\n         var A = class {\n             /**\n              * Description for constructor.\n              * @param {object[]} xs - xs\n              */\n             constructor(xs) {\n                 this.a = xs;    }\n         };\n      "], ["\n        /**\n          * Description for a\n          */\n         var A = class {\n             /**\n              * Description for constructor.\n              * @param {object[]} xs - xs\n              */\n             constructor(xs) {\n                 this.a = xs;    }\n         };\n      "]))),
        errors: expecting(['JSDoc description does not satisfy the regex pattern'])
    }
]);
ruleTester.addTestGroupWithConfig('issue227', 'issue 227 - Should not complain about return in abstract method', {
    requireReturn: true
}, [
    {
        code: ruleTester_1.dedent(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["\n        class Foo {\n          /**\n           * @return {string} string\n           */\n          public abstract foo(): string;\n        }\n        "], ["\n        class Foo {\n          /**\n           * @return {string} string\n           */\n          public abstract foo(): string;\n        }\n        "])))
    }
]);
ruleTester.addTestGroup('issue178', 'issue 178 - Should not crash with incorrect jsdoc', [
    {
        code: ruleTester_1.dedent(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["\n      /**\n      * @return string\n      */\n      function foo() { return ''; }\n      "], ["\n      /**\n      * @return string\n      */\n      function foo() { return ''; }\n      "]))),
        options: {},
        errors: expecting(['missing JSDoc return type'])
    },
    {
        code: ruleTester_1.dedent(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["\n      /**\n      * @return {string}\n      */\n      function foo() { return ''; }\n      "], ["\n      /**\n      * @return {string}\n      */\n      function foo() { return ''; }\n      "]))),
        errors: expecting(['missing JSDoc return description'])
    },
    {
        code: ruleTester_1.dedent(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["\n      /**\n      * @return {some_type} some description\n      */\n      function foo() { return ''; }\n      "], ["\n      /**\n      * @return {some_type} some description\n      */\n      function foo() { return ''; }\n      "])))
    }
]);
ruleTester.addTestGroupWithConfig('issue238', "issue 238 - Cannot read property 'name' of null", [{
        requireReturn: false,
        requireReturnType: false
    }], [
    {
        code: ruleTester_1.dedent(templateObject_35 || (templateObject_35 = tslib_1.__makeTemplateObject(["\n        class MyPage {\n          /**\n           * Navigate to the page\n           * @returns a promise for the browser's navigation\n           */\n          public async navigateTo() { }\n        }\n        "], ["\n        class MyPage {\n          /**\n           * Navigate to the page\n           * @returns a promise for the browser's navigation\n           */\n          public async navigateTo() { }\n        }\n        "])))
    }
]);
ruleTester.addTestGroup('ret-type', 'should handle requireReturnType option', [
    {
        code: ruleTester_1.dedent(templateObject_36 || (templateObject_36 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param {string} a desc\n       * @return some string\n       */\n       function foo(a) { return '' }"], ["\n      /**\n       * Foo\n       * @param {string} a desc\n       * @return some string\n       */\n       function foo(a) { return '' }"]))),
        errors: expecting(['missing JSDoc return type'])
    },
    {
        code: ruleTester_1.dedent(templateObject_37 || (templateObject_37 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param {string} a desc\n       * @return some string\n       */\n       function foo(a) { return '' }"], ["\n      /**\n       * Foo\n       * @param {string} a desc\n       * @return some string\n       */\n       function foo(a) { return '' }"]))),
        options: [{ requireReturnType: false }]
    }
]);
ruleTester.addTestGroup('param-type', 'should handle requireParamType option', [
    {
        code: ruleTester_1.dedent(templateObject_38 || (templateObject_38 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param a desc\n       * @return {string} some string\n       */\n       function foo(a) { return '' }"], ["\n      /**\n       * Foo\n       * @param a desc\n       * @return {string} some string\n       */\n       function foo(a) { return '' }"]))),
        errors: expecting(["missing JSDoc parameter type for 'a'"])
    },
    {
        code: ruleTester_1.dedent(templateObject_39 || (templateObject_39 = tslib_1.__makeTemplateObject(["\n      /**\n       * Foo\n       * @param a desc\n       * @return {string} some string\n       */\n       function foo(a) { return '' }"], ["\n      /**\n       * Foo\n       * @param a desc\n       * @return {string} some string\n       */\n       function foo(a) { return '' }"]))),
        options: [{ requireParamType: false }]
    }
]);
ruleTester.addTestGroup('error-location', 'error location should span the comment', [
    {
        code: ruleTester_1.dedent(templateObject_40 || (templateObject_40 = tslib_1.__makeTemplateObject(["\n      /**\n       * Class\n       */\n      class Foo {\n\n        /**\n         * Function\n         */\n        public bar(x: any): void {\n        }\n\n      }"], ["\n      /**\n       * Class\n       */\n      class Foo {\n\n        /**\n         * Function\n         */\n        public bar(x: any): void {\n        }\n\n      }"]))),
        options: [{ requireReturn: false }],
        errors: [{
                failure: "missing JSDoc for parameter 'x'",
                startPosition: new ruleTester_1.Position(6, 2),
                endPosition: new ruleTester_1.Position(8, 5)
            }]
    }
]);
ruleTester.addTestGroup('never-or-void-return-type', 'functions that return "never" or "void" should not require @returns', [
    {
        code: ruleTester_1.dedent(templateObject_41 || (templateObject_41 = tslib_1.__makeTemplateObject(["\n      /**\n       * Has void return type.\n       */\n      function throwError(): void {\n        throw new Error('Foo');\n      }\n      "], ["\n      /**\n       * Has void return type.\n       */\n      function throwError(): void {\n        throw new Error('Foo');\n      }\n      "]))),
        options: [{ requireReturn: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_42 || (templateObject_42 = tslib_1.__makeTemplateObject(["\n      /**\n       * Has never return type.\n       */\n      function throwError(): never {\n        throw new Error('Foo');\n      }\n      "], ["\n      /**\n       * Has never return type.\n       */\n      function throwError(): never {\n        throw new Error('Foo');\n      }\n      "]))),
        options: [{ requireReturn: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_43 || (templateObject_43 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns result of never function, is void type, and does not have returns tag.\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Returns result of never function, is void type, and does not have returns tag.\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_44 || (templateObject_44 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns result of never function, is never type, and does not have returns tag.\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Returns result of never function, is never type, and does not have returns tag.\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_45 || (templateObject_45 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns result of never function, is void type, but has returns tag.\n       * @returns something\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Returns result of never function, is void type, but has returns tag.\n       * @returns something\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: false, requireReturnType: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_46 || (templateObject_46 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns result of never function, is never type, but has returns tag.\n       * @returns something\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Returns result of never function, is never type, but has returns tag.\n       * @returns something\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: false, requireReturnType: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_47 || (templateObject_47 = tslib_1.__makeTemplateObject(["\n      /**\n       * Is void type, but requires returns tag.\n       * @returns something\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       * @returns something\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Is void type, but requires returns tag.\n       * @returns something\n       */\n      function callInfinite(): void {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       * @returns something\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: true, requireReturnType: false }],
        errors: []
    },
    {
        code: ruleTester_1.dedent(templateObject_48 || (templateObject_48 = tslib_1.__makeTemplateObject(["\n      /**\n       * Is never type, but requires returns tag.\n       * @returns something\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       * @returns something\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "], ["\n      /**\n       * Is never type, but requires returns tag.\n       * @returns something\n       */\n      function callInfinite(): never {\n        return neverReturn();\n      }\n\n      /**\n       * Has never return type.\n       * @returns something\n       */\n      function neverReturn(): never {\n        while (true) {};\n      }\n      "]))),
        options: [{ requireReturn: true, requireReturnType: false }],
        errors: []
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdmFsaWRKc2RvY1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBcUU7QUFFckUsSUFBTSxzQkFBc0IsR0FBRywyQkFBMkIsQ0FBQztBQUMzRCxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHakQsU0FBUyxTQUFTLENBQUMsTUFBZ0I7SUFDakMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUc7WUFDWixhQUFhLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1lBQzdCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLCtEQUErRCxFQUFFO0lBQ3hHLGdNQUttQjtJQUNuQix3RUFHb0M7SUFDcEMsd0VBR21CO0lBQ25CLDZFQUdtQjtJQUNuQixnR0FJbUI7SUFDbkIsK0ZBSW1CO0lBQ25CLHFFQUdtQjtJQUNuQiwrREFHbUI7SUFDbkIsNkdBSW9CO0lBQ3BCLDJHQUlvQjtJQUNwQixnSEFJb0I7SUFDcEIsK0dBSW9CO0lBQ3BCLHNKQUsyQjtJQUMzQix5SUFNTztJQUNQLHFJQU1LO0lBQ0wsK0tBTXdCO0lBQ3hCLHdGQUd5QztJQUN6QywwRkFHeUM7SUFDekMsMEZBR3lDO0lBQ3pDLHVFQUdtQjtJQUNuQix3T0FXRTtJQUNGLGtiQWtCSTtDQUNMLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxzQkFBc0IsQ0FDL0IsbUJBQW1CLEVBQ25CLG9FQUFvRSxFQUNwRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQzFCO0lBQ0UsK0ZBSXVCO0lBQ3ZCLHFHQUk2QjtJQUM3QixtR0FJMkI7SUFDM0IsbUlBSXdEO0lBQ3hELGdJQUlxRDtJQUNyRCxxSUFJ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Q0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNuQyxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sOE5BQUEsaUpBT1QsSUFBQTtRQUNILE9BQU8sRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ25DLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSx3WkFBQSwyVUFjVCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDbkMsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDBaQUFBLDZVQWNULElBQUE7UUFDSCxPQUFPLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNuQyxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sMmFBQUEsOFZBZVQsSUFBQTtRQUNILE9BQU8sRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM3RCxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sNmFBQUEsZ1dBZVQsSUFBQTtRQUNILE9BQU8sRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM3RCxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sMmFBQUEsOFZBZ0JULElBQUE7UUFDSCxPQUFPLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDNUQsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDZhQUFBLGdXQWdCVCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzVELE1BQU0sRUFBRSxFQUFFO0tBQ1g7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy92YWxpZEpzZG9jUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
