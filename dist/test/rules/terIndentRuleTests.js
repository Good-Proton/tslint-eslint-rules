"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-indent', true);
function expecting(errors, indentType) {
    if (indentType === void 0) { indentType = 'space'; }
    return errors.map(function (err) {
        var message;
        if (typeof err[1] === 'string' && typeof err[2] === 'string') {
            message = "Expected indentation of " + err[1] + " but found " + err[2] + ".";
        }
        else {
            var chars = indentType + (err[1] === 1 ? '' : 's');
            message = "Expected indentation of " + err[1] + " " + chars + " but found " + err[2] + ".";
        }
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(err[0]),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroup('no-options', 'should capture the correct indentation with defaults', [
    'export let upgradeModule = angular.module("ui.router.upgrade", ["ui.router"]);',
    'switch (0) {\n}',
    'switch(value){ default: a(); break; }\n',
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    return (\n        foo\n    );"], ["\n    return (\n        foo\n    );"]))),
    ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    return (\n        foo\n    )"], ["\n    return (\n        foo\n    )"]))),
    ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    const array = [\n        ,\n        'd',\n        3\n    ];\n    "], ["\n    const array = [\n        ,\n        'd',\n        3\n    ];\n    "]))),
    ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        switch(x){\n        case '1':\n            break;\n        case '2':\n            a = 6;\n            break;\n        }\n    }"], ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        switch(x){\n        case '1':\n            break;\n        case '2':\n            a = 6;\n            break;\n        }\n    }"]))),
    ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        if(x){\n            a = 2;\n        }\n        else{\n            a = 6;\n        }\n    }"], ["\n    switch (a) {\n    case 'foo':\n        a();\n        break;\n    case 'bar':\n        if(x){\n            a = 2;\n        }\n        else{\n            a = 6;\n        }\n    }"]))),
    ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        if(x){\n            a = 2;\n        }\n        else\n            a = 6;\n    }"], ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        if(x){\n            a = 2;\n        }\n        else\n            a = 6;\n    }"]))),
    ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        a(); break;\n    case \"baz\":\n        a(); break;\n    }"], ["\n    switch (a) {\n    case \"foo\":\n        a();\n        break;\n    case \"bar\":\n        a(); break;\n    case \"baz\":\n        a(); break;\n    }"]))),
    ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n    function foo() {\n        var a = \"a\";\n        switch(a) {\n        case \"a\":\n            return \"A\";\n        case \"b\":\n            return \"B\";\n        }\n    }\n    foo();"], ["\n    function foo() {\n        var a = \"a\";\n        switch(a) {\n        case \"a\":\n            return \"A\";\n        case \"b\":\n            return \"B\";\n        }\n    }\n    foo();"]))),
    ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n    var obj = {foo: 1, bar: 2};\n    with (obj) {\n        console.log(foo + bar);\n    }\n    "], ["\n    var obj = {foo: 1, bar: 2};\n    with (obj) {\n        console.log(foo + bar);\n    }\n    "]))),
    ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n    var a = 1\n       ,b = 2\n       ;\n    "], ["\n    var a = 1\n       ,b = 2\n       ;\n    "]))),
    ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n    const a: number = 1\n         ,b: number = 2\n         ;\n    "], ["\n    const a: number = 1\n         ,b: number = 2\n         ;\n    "]))),
    ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n    const someOtherFunction = argument => {\n            console.log(argument);\n        },\n        someOtherValue = 'someOtherValue';\n    "], ["\n    const someOtherFunction = argument => {\n            console.log(argument);\n        },\n        someOtherValue = 'someOtherValue';\n    "]))),
    ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n    if (a) {\n        (1 + 2 + 3);\n    }\n    "], ["\n    if (a) {\n        (1 + 2 + 3);\n    }\n    "])))
]);
ruleTester.addTestGroup('indent-number', 'should force a certain indentation number', [
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      /**\n       * @var {string}\n       */\n      const FOO = 'bar';"], ["\n      /**\n       * @var {string}\n       */\n      const FOO = 'bar';"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n      /**\n       * @var {string}\n       */\n       const FOO = 'bar';"], ["\n      /**\n       * @var {string}\n       */\n       const FOO = 'bar';"]))),
        options: [4],
        errors: expecting([[4, 0, 1]])
    },
    {
        code: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n      /**\n       * @param {string} text\n       */\n      const log = (text) => console.log(text);"], ["\n      /**\n       * @param {string} text\n       */\n      const log = (text) => console.log(text);"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      var x = ['a',\n          'b',\n          'c',\n      ];"], ["\n      var x = ['a',\n          'b',\n          'c',\n      ];"]))),
        options: [4]
    },
    {
        code: "import {addons} from 'react/addons'\nimport React from 'react'",
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], ["\n      bridge.callHandler(\n        'getAppVersion', 'test23', function(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "], ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        }\n      );\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "], ["\n      bridge.callHandler(\n        'getAppVersion',\n        null,\n        function responseCallback(responseData) {\n          window.ah.mobileAppVersion = responseData;\n        });\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n      function doStuff(keys) {\n          _.forEach(\n              keys,\n              key => {\n                  doSomething(key);\n              }\n         );\n      }\n      "], ["\n      function doStuff(keys) {\n          _.forEach(\n              keys,\n              key => {\n                  doSomething(key);\n              }\n         );\n      }\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n      example(\n          function () {\n              console.log('example');\n          }\n      );\n      "], ["\n      example(\n          function () {\n              console.log('example');\n          }\n      );\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["\n      let foo = somethingList\n          .filter(x => {\n              return x;\n          })\n          .map(x => {\n              return 100 * x;\n          });\n      "], ["\n      let foo = somethingList\n          .filter(x => {\n              return x;\n          })\n          .map(x => {\n              return 100 * x;\n          });\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          };\n      "], ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          };\n      "]))),
        options: [4]
    },
    {
        code: [
            'var x = 0 &&',
            '\t{',
            '\t\ta: 1,',
            '\t\tb: 2',
            '\t};'
        ].join('\n'),
        options: ['tab']
    },
    {
        code: ruleTester_1.dedent(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          }||\n          {\n              c: 3,\n              d: 4\n          };\n      "], ["\n      var x = 0 &&\n          {\n              a: 1,\n              b: 2\n          }||\n          {\n              c: 3,\n              d: 4\n          };\n      "]))),
        options: [4]
    },
    {
        code: 'var x = 0 && 1;',
        options: [4]
    },
    {
        code: 'var x = 0 && { a: 1, b: 2 };',
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["\n      var x = 0 &&\n          (\n              1\n          );"], ["\n      var x = 0 &&\n          (\n              1\n          );"]))),
        options: [4]
    },
    {
        code: 'var x = 0 && { a: 1, b: 2 };',
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["\n      require('http').request({hostname: 'localhost',\n        port: 80}, function(res) {\n        res.end();\n      });\n      "], ["\n      require('http').request({hostname: 'localhost',\n        port: 80}, function(res) {\n        res.end();\n      });\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["\n      function test() {\n        return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n            // hi\n          })\n          .then(function () {\n            return FunctionalHelpers.clearBrowserState(self, {\n              contentServer: true,\n              contentServer1: true\n            });\n          });\n      }"], ["\n      function test() {\n        return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n            // hi\n          })\n          .then(function () {\n            return FunctionalHelpers.clearBrowserState(self, {\n              contentServer: true,\n              contentServer1: true\n            });\n          });\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["\n      it('should... some lengthy test description that is forced to be' +\n        'wrapped into two lines since the line length limit is set', () => {\n        expect(true).toBe(true);\n      });\n      "], ["\n      it('should... some lengthy test description that is forced to be' +\n        'wrapped into two lines since the line length limit is set', () => {\n        expect(true).toBe(true);\n      });\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n              .then(function (result) {\n                  var x = 1;\n                  var y = 1;\n              }, function(err){\n                  var o = 1 - 2;\n                  var y = 1 - 2;\n                  return true;\n              })\n      }"], ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n              .then(function (result) {\n                  var x = 1;\n                  var y = 1;\n              }, function(err){\n                  var o = 1 - 2;\n                  var y = 1 - 2;\n                  return true;\n              })\n      }"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["\n      if (1 < 2){\n      //hi sd\n      }"], ["\n      if (1 < 2){\n      //hi sd\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["\n      while (1 < 2){\n        //hi sd\n      }"], ["\n      while (1 < 2){\n        //hi sd\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_35 || (templateObject_35 = tslib_1.__makeTemplateObject(["\n      while (1 < 2) console.log('hi');"], ["\n      while (1 < 2) console.log('hi');"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_36 || (templateObject_36 = tslib_1.__makeTemplateObject(["\n      [a, b,\n          c].forEach((index) => {\n              index;\n          });\n      "], ["\n      [a, b,\n          c].forEach((index) => {\n              index;\n          });\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_37 || (templateObject_37 = tslib_1.__makeTemplateObject(["\n      [a, b, c].forEach((index) => {\n          index;\n      });\n      "], ["\n      [a, b, c].forEach((index) => {\n          index;\n      });\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_38 || (templateObject_38 = tslib_1.__makeTemplateObject(["\n      [a, b, c].forEach(function(index){\n          return index;\n      });\n      "], ["\n      [a, b, c].forEach(function(index){\n          return index;\n      });\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_39 || (templateObject_39 = tslib_1.__makeTemplateObject(["\n      var a = 1,\n          b = 2,\n          c = 3;\n      "], ["\n      var a = 1,\n          b = 2,\n          c = 3;\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_40 || (templateObject_40 = tslib_1.__makeTemplateObject(["\n      var a = 1\n         ,b = 2\n         ,c = 3;\n      "], ["\n      var a = 1\n         ,b = 2\n         ,c = 3;\n      "]))),
        options: [4]
    },
    {
        code: "while (1 < 2) console.log('hi')\n",
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_41 || (templateObject_41 = tslib_1.__makeTemplateObject(["\n      module.exports =\n      {\n        'Unit tests':\n        {\n          rootPath: './',\n          environment: 'node',\n          tests:\n          [\n            'test/test-*.js'\n          ],\n          sources:\n          [\n            '*.js',\n            'test/**.js'\n          ]\n        }\n      };"], ["\n      module.exports =\n      {\n        'Unit tests':\n        {\n          rootPath: './',\n          environment: 'node',\n          tests:\n          [\n            'test/test-*.js'\n          ],\n          sources:\n          [\n            '*.js',\n            'test/**.js'\n          ]\n        }\n      };"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_42 || (templateObject_42 = tslib_1.__makeTemplateObject(["\n      var path     = require('path')\n        , crypto    = require('crypto')\n        ;\n      "], ["\n      var path     = require('path')\n        , crypto    = require('crypto')\n        ;\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_43 || (templateObject_43 = tslib_1.__makeTemplateObject(["\n      export function create (some,\n                              argument) {\n        return Object.create({\n          a: some,\n          b: argument\n        });\n      };"], ["\n      export function create (some,\n                              argument) {\n        return Object.create({\n          a: some,\n          b: argument\n        });\n      };"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_44 || (templateObject_44 = tslib_1.__makeTemplateObject(["\n      export function create (id, xfilter, rawType,\n                              width=defaultWidth, height=defaultHeight,\n                              footerHeight=defaultFooterHeight,\n                              padding=defaultPadding) {\n        // ... function body, indented two spaces\n      }\n      "], ["\n      export function create (id, xfilter, rawType,\n                              width=defaultWidth, height=defaultHeight,\n                              footerHeight=defaultFooterHeight,\n                              padding=defaultPadding) {\n        // ... function body, indented two spaces\n      }\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_45 || (templateObject_45 = tslib_1.__makeTemplateObject(["\n      var obj = {\n        foo: function () {\n          return new p()\n            .then(function (ok) {\n              return ok;\n            }, function () {\n              // ignore things\n            });\n        }\n      };\n      "], ["\n      var obj = {\n        foo: function () {\n          return new p()\n            .then(function (ok) {\n              return ok;\n            }, function () {\n              // ignore things\n            });\n        }\n      };\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_46 || (templateObject_46 = tslib_1.__makeTemplateObject(["\n      a.b()\n        .c(function(){\n          var a;\n        }).d.e;\n      "], ["\n      a.b()\n        .c(function(){\n          var a;\n        }).d.e;\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_47 || (templateObject_47 = tslib_1.__makeTemplateObject(["\n      var foo = 'foo',\n        bar = 'bar',\n        baz = function() {\n\n        }\n\n      function hello () {\n\n      }\n      "], ["\n      var foo = 'foo',\n        bar = 'bar',\n        baz = function() {\n\n        }\n\n      function hello () {\n\n      }\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_48 || (templateObject_48 = tslib_1.__makeTemplateObject(["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n            .then(function () {\n              return true;\n            }, function () {\n              return false;\n            });\n        }\n      };\n      "], ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n            .then(function () {\n              return true;\n            }, function () {\n              return false;\n            });\n        }\n      };\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_49 || (templateObject_49 = tslib_1.__makeTemplateObject(["\n      [\n        'a',\n        'b'\n      ].sort().should.deepEqual([\n        'x',\n        'y'\n      ]);\n      "], ["\n      [\n        'a',\n        'b'\n      ].sort().should.deepEqual([\n        'x',\n        'y'\n      ]);\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_50 || (templateObject_50 = tslib_1.__makeTemplateObject(["\n      var a = {\n        some: 1\n      , name: 2\n      };\n      "], ["\n      var a = {\n        some: 1\n      , name: 2\n      };\n      "]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_51 || (templateObject_51 = tslib_1.__makeTemplateObject(["\n      a.c = {\n          aa: function() {\n              'test1';\n              return 'aa';\n          }\n          , bb: function() {\n              return this.bb();\n          }\n      };\n      "], ["\n      a.c = {\n          aa: function() {\n              'test1';\n              return 'aa';\n          }\n          , bb: function() {\n              return this.bb();\n          }\n      };\n      "]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_52 || (templateObject_52 = tslib_1.__makeTemplateObject(["\n      const func = function (opts) {\n          return Promise.resolve()\n              .then(() => {\n                  [\n                      'ONE', 'TWO'\n                  ].forEach(command => { doSomething(); });\n              });\n      };"], ["\n      const func = function (opts) {\n          return Promise.resolve()\n              .then(() => {\n                  [\n                      'ONE', 'TWO'\n                  ].forEach(command => { doSomething(); });\n              });\n      };"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_53 || (templateObject_53 = tslib_1.__makeTemplateObject(["\n      var haveFun = function () {\n          SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], ["\n      var haveFun = function () {\n          SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_54 || (templateObject_54 = tslib_1.__makeTemplateObject(["\n      var haveFun = function () {\n          new SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"], ["\n      var haveFun = function () {\n          new SillyFunction(\n              {\n                  value: true,\n              },\n              {\n                  _id: true,\n              }\n          );\n      };"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_55 || (templateObject_55 = tslib_1.__makeTemplateObject(["\n      let object1 = {\n        doThing() {\n          return _.chain([])\n            .map(v => (\n              {\n                value: true,\n              }\n            ))\n            .value();\n        }\n      };"], ["\n      let object1 = {\n        doThing() {\n          return _.chain([])\n            .map(v => (\n              {\n                value: true,\n              }\n            ))\n            .value();\n        }\n      };"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_56 || (templateObject_56 = tslib_1.__makeTemplateObject(["\n      class Foo\n        extends Bar {\n        baz() {}\n      }"], ["\n      class Foo\n        extends Bar {\n        baz() {}\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_57 || (templateObject_57 = tslib_1.__makeTemplateObject(["\n      class Foo extends\n        Bar {\n        baz() {}\n      }"], ["\n      class Foo extends\n        Bar {\n        baz() {}\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_58 || (templateObject_58 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      } else if (baz) {\n        foobar();\n      } else if (qux) {\n        qux();\n      }"], ["\n      if (foo) {\n        bar();\n      } else if (baz) {\n        foobar();\n      } else if (qux) {\n        qux();\n      }"]))),
        options: [2]
    },
    {
        code: [
            'function foo() {',
            '  bar();',
            '   \t\t}'
        ].join('\n'),
        options: [2]
    },
    {
        code: [
            'function foo() {',
            '  bar();',
            '  \tbaz();',
            '\t   \t\t\t  \t\t\t  \t   \tqux();',
            '}'
        ].join('\n'),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_59 || (templateObject_59 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (bar === 1 || bar === 2 &&\n          (/Function/.test(grandparent.type))) &&\n          directives(parent).indexOf(node) >= 0;\n      }"], ["\n      function foo() {\n        return (bar === 1 || bar === 2 &&\n          (/Function/.test(grandparent.type))) &&\n          directives(parent).indexOf(node) >= 0;\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_60 || (templateObject_60 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (bar === 1 || bar === 2) &&\n          (z === 3 || z === 4);\n      }"], ["\n      function foo() {\n        return (bar === 1 || bar === 2) &&\n          (z === 3 || z === 4);\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_61 || (templateObject_61 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4)\n        );\n      }"], ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4)\n        );\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_62 || (templateObject_62 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4));\n      }"], ["\n      function foo() {\n        return ((bar === 1 || bar === 2) &&\n          (z === 3 || z === 4));\n      }"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_63 || (templateObject_63 = tslib_1.__makeTemplateObject(["\n      var foo = function() {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      };"], ["\n      var foo = function() {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      };"]))),
        options: [2]
    },
    {
        code: ruleTester_1.dedent(templateObject_64 || (templateObject_64 = tslib_1.__makeTemplateObject(["\n      /**\n       * foo\n       * @param bar\n       * @param baz\n       */\n      export const foo = function(bar, baz) {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      }"], ["\n      /**\n       * foo\n       * @param bar\n       * @param baz\n       */\n      export const foo = function(bar, baz) {\n        return bar(\n          [{\n          }].concat(baz)\n        );\n      }"]))),
        options: [2]
    }
]);
ruleTester.addTestGroup('indent-number-errors', 'should warn of indentation errors', [
    {
        code: ruleTester_1.dedent(templateObject_65 || (templateObject_65 = tslib_1.__makeTemplateObject(["\n      /**/var b; // NO ERROR: single line multi-line comments followed by code is OK\n      /*\n       *\n       */ var b; // ERROR: multi-line comments followed by code is not OK\n      "], ["\n      /**/var b; // NO ERROR: single line multi-line comments followed by code is OK\n      /*\n       *\n       */ var b; // ERROR: multi-line comments followed by code is not OK\n      "]))),
        options: [2],
        errors: expecting([[4, 0, 1]])
    },
    {
        code: ruleTester_1.dedent(templateObject_66 || (templateObject_66 = tslib_1.__makeTemplateObject(["\n      var a = b;\n      if (a) {\n      b();\n      }"], ["\n      var a = b;\n      if (a) {\n      b();\n      }"]))),
        options: [2],
        errors: expecting([[3, 2, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_67 || (templateObject_67 = tslib_1.__makeTemplateObject(["\n      if (array.some(function(){\n        return true;\n      })) {\n      a++; // ->\n        b++;\n          c++; // <-\n      }"], ["\n      if (array.some(function(){\n        return true;\n      })) {\n      a++; // ->\n        b++;\n          c++; // <-\n      }"]))),
        options: [2],
        errors: expecting([[4, 2, 0], [6, 2, 4]])
    },
    {
        code: '\nif (a){\n\tb=c;\n\t\tc=d;\ne=f;\n}',
        options: ['tab'],
        errors: expecting([
            [3, 1, 2],
            [4, 1, 0]
        ], 'tab')
    },
    {
        code: '\nif (a){\n    b=c;\n      c=d;\n e=f;\n}',
        options: [4],
        errors: expecting([[3, 4, 6], [4, 4, 1]])
    },
    {
        code: ruleTester_1.dedent(templateObject_68 || (templateObject_68 = tslib_1.__makeTemplateObject(["\n      var x = 0 &&\n          {\n             a: 1,\n                b: 2\n          };"], ["\n      var x = 0 &&\n          {\n             a: 1,\n                b: 2\n          };"]))),
        options: [4],
        errors: expecting([[3, 8, 7], [4, 8, 10]])
    },
    {
        code: ruleTester_1.dedent(templateObject_69 || (templateObject_69 = tslib_1.__makeTemplateObject(["\n      switch(value){\n      case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], ["\n      switch(value){\n      case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"]))),
        options: [4],
        errors: expecting([
            [3, 4, 8],
            [4, 4, 8],
            [5, 0, 4],
            [6, 4, 8],
            [7, 0, 4],
            [8, 4, 8]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_70 || (templateObject_70 = tslib_1.__makeTemplateObject(["\n      var obj = {foo: 1, bar: 2};\n      with (obj) {\n      console.log(foo + bar);\n      }"], ["\n      var obj = {foo: 1, bar: 2};\n      with (obj) {\n      console.log(foo + bar);\n      }"]))),
        errors: expecting([[3, 4, 0]])
    },
    {
        code: '\nwhile (a)\nb();\n',
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: '\nfor (;;) \nb();\n',
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: '\nfor (a in x) \nb();',
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_71 || (templateObject_71 = tslib_1.__makeTemplateObject(["\n      do\n      b();\n      while(true)"], ["\n      do\n      b();\n      while(true)"]))),
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: '\nif(true) \nb();',
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_72 || (templateObject_72 = tslib_1.__makeTemplateObject(["\n      var test = {\n            a: 1,\n          b: 2\n          };"], ["\n      var test = {\n            a: 1,\n          b: 2\n          };"]))),
        options: [2],
        errors: expecting([
            [2, 2, 6],
            [3, 2, 4],
            [4, 0, 4]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_73 || (templateObject_73 = tslib_1.__makeTemplateObject(["\n      var a = function() {\n            a++;\n          b++;\n                c++;\n          },\n          b;"], ["\n      var a = function() {\n            a++;\n          b++;\n                c++;\n          },\n          b;"]))),
        options: [4],
        errors: expecting([
            [2, 8, 6],
            [3, 8, 4],
            [4, 8, 10]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_74 || (templateObject_74 = tslib_1.__makeTemplateObject(["\n      var a = 1,\n      b = 2,\n      c = 3;"], ["\n      var a = 1,\n      b = 2,\n      c = 3;"]))),
        options: [4],
        errors: expecting([
            [2, 4, 0],
            [3, 4, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_75 || (templateObject_75 = tslib_1.__makeTemplateObject(["\n      [a, b,\n      c].forEach((index) => {\n        index;\n      });"], ["\n      [a, b,\n      c].forEach((index) => {\n        index;\n      });"]))),
        options: [4],
        errors: expecting([[2, 4, 0], [3, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_76 || (templateObject_76 = tslib_1.__makeTemplateObject(["\n      [a, b,\n      c].forEach(function(index){\n        return index;\n      });"], ["\n      [a, b,\n      c].forEach(function(index){\n        return index;\n      });"]))),
        options: [4],
        errors: expecting([[2, 4, 0], [3, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_77 || (templateObject_77 = tslib_1.__makeTemplateObject(["\n      [a, b,\n      c].forEach(function(index){\n          return index;\n      });"], ["\n      [a, b,\n      c].forEach(function(index){\n          return index;\n      });"]))),
        options: [4],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_78 || (templateObject_78 = tslib_1.__makeTemplateObject(["\n      [a, b, c].forEach((index) => {\n        index;\n      });"], ["\n      [a, b, c].forEach((index) => {\n        index;\n      });"]))),
        options: [4],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_79 || (templateObject_79 = tslib_1.__makeTemplateObject(["\n      [a, b, c].forEach(function(index){\n        return index;\n      });"], ["\n      [a, b, c].forEach(function(index){\n        return index;\n      });"]))),
        options: [4],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: "\nwhile (1 < 2)\nconsole.log('foo')\n  console.log('bar')",
        options: [2],
        errors: expecting([
            [2, 2, 0],
            [3, 0, 2]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_80 || (templateObject_80 = tslib_1.__makeTemplateObject(["\n      var a = new Test({\n            a: 1\n        }),\n          b = 4;"], ["\n      var a = new Test({\n            a: 1\n        }),\n          b = 4;"]))),
        options: [4],
        errors: expecting([
            [2, 8, 6],
            [3, 4, 2]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_81 || (templateObject_81 = tslib_1.__makeTemplateObject(["\n      var path     = require('path')\n       , crypto    = require('crypto')\n      ;"], ["\n      var path     = require('path')\n       , crypto    = require('crypto')\n      ;"]))),
        options: [2],
        errors: expecting([[3, 1, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_82 || (templateObject_82 = tslib_1.__makeTemplateObject(["\n      var a = 1\n         ,b = 2\n      ;"], ["\n      var a = 1\n         ,b = 2\n      ;"]))),
        errors: expecting([[3, 3, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_83 || (templateObject_83 = tslib_1.__makeTemplateObject(["\n      {\n          if(a){\n              foo();\n          }\n        else{\n              bar();\n          }\n      }"], ["\n      {\n          if(a){\n              foo();\n          }\n        else{\n              bar();\n          }\n      }"]))),
        options: [4],
        errors: expecting([[5, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_84 || (templateObject_84 = tslib_1.__makeTemplateObject(["\n      {\n          if(a){\n              foo();\n          }\n        else\n              bar();\n\n      }"], ["\n      {\n          if(a){\n              foo();\n          }\n        else\n              bar();\n\n      }"]))),
        options: [4],
        errors: expecting([[5, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_85 || (templateObject_85 = tslib_1.__makeTemplateObject(["\n      {\n          if(a)\n              foo();\n        else\n              bar();\n      }"], ["\n      {\n          if(a)\n              foo();\n        else\n              bar();\n      }"]))),
        options: [4],
        errors: expecting([[4, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_86 || (templateObject_86 = tslib_1.__makeTemplateObject(["\n      if (foo) bar();\n      else if (baz) foobar();\n        else if (qux) qux();"], ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else if (qux) qux();"]))),
        options: [2],
        errors: expecting([[3, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_87 || (templateObject_87 = tslib_1.__makeTemplateObject(["\n      if (foo) bar();\n      else if (baz) foobar();\n        else qux();"], ["\n      if (foo) bar();\n      else if (baz) foobar();\n        else qux();"]))),
        options: [2],
        errors: expecting([[3, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_88 || (templateObject_88 = tslib_1.__makeTemplateObject(["\n      foo();\n        if (baz) foobar();\n        else qux();"], ["\n      foo();\n        if (baz) foobar();\n        else qux();"]))),
        options: [2],
        errors: expecting([[2, 0, 2], [3, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_89 || (templateObject_89 = tslib_1.__makeTemplateObject(["\n      if (foo) bar();\n      else if (baz) foobar();\n           else if (bip) {\n             qux();\n           }"], ["\n      if (foo) bar();\n      else if (baz) foobar();\n           else if (bip) {\n             qux();\n           }"]))),
        options: [2],
        errors: expecting([[3, 0, 5]])
    },
    {
        code: ruleTester_1.dedent(templateObject_90 || (templateObject_90 = tslib_1.__makeTemplateObject(["\n      if (foo) bar();\n      else if (baz) {\n          foobar();\n           } else if (boop) {\n             qux();\n           }"], ["\n      if (foo) bar();\n      else if (baz) {\n          foobar();\n           } else if (boop) {\n             qux();\n           }"]))),
        options: [2],
        errors: expecting([[3, 2, 4], [4, 0, 5]])
    },
    {
        code: '\nvar foo = bar;\n\t\t\tvar baz = qux;',
        options: [2],
        errors: expecting([[2, '0 spaces', '3 tabs']])
    },
    {
        code: '\nfunction foo() {\n\tbar();\n  baz();\n              qux();\n}',
        options: ['tab'],
        errors: expecting([[3, '1 tab', '2 spaces'], [4, '1 tab', '14 spaces']], 'tab')
    },
    {
        code: [
            '\nfunction foo() {',
            '  bar();',
            '\t\t}'
        ].join('\n'),
        options: [2],
        errors: expecting([[3, '0 spaces', '2 tabs']])
    },
    {
        code: ruleTester_1.dedent(templateObject_91 || (templateObject_91 = tslib_1.__makeTemplateObject(["\n      require('http').request({hostname: 'localhost',\n                        port: 80}, function(res) {\n        res.end();\n      });\n      "], ["\n      require('http').request({hostname: 'localhost',\n                        port: 80}, function(res) {\n        res.end();\n      });\n      "]))),
        options: [2],
        errors: expecting([[2, 2, 18]])
    },
    {
        code: ruleTester_1.dedent(templateObject_92 || (templateObject_92 = tslib_1.__makeTemplateObject(["\n      var x = ['a',\n               'b',\n               'c'\n      ];"], ["\n      var x = ['a',\n               'b',\n               'c'\n      ];"]))),
        output: ruleTester_1.dedent(templateObject_93 || (templateObject_93 = tslib_1.__makeTemplateObject(["\n      var x = ['a',\n          'b',\n          'c'\n      ];"], ["\n      var x = ['a',\n          'b',\n          'c'\n      ];"]))),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_94 || (templateObject_94 = tslib_1.__makeTemplateObject(["\n      var x = [\n               'a',\n               'b',\n               'c'\n      ];"], ["\n      var x = [\n               'a',\n               'b',\n               'c'\n      ];"]))),
        output: ruleTester_1.dedent(templateObject_95 || (templateObject_95 = tslib_1.__makeTemplateObject(["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"]))),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9],
            [4, 4, 9]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_96 || (templateObject_96 = tslib_1.__makeTemplateObject(["\n      var x = [\n               'a',\n               'b',\n               'c',\n      'd'];"], ["\n      var x = [\n               'a',\n               'b',\n               'c',\n      'd'];"]))),
        output: ruleTester_1.dedent(templateObject_97 || (templateObject_97 = tslib_1.__makeTemplateObject(["\n      var x = [\n          'a',\n          'b',\n          'c',\n          'd'];"], ["\n      var x = [\n          'a',\n          'b',\n          'c',\n          'd'];"]))),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9],
            [4, 4, 9],
            [5, 4, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_98 || (templateObject_98 = tslib_1.__makeTemplateObject(["\n      var x = [\n               'a',\n               'b',\n               'c'\n        ];"], ["\n      var x = [\n               'a',\n               'b',\n               'c'\n        ];"]))),
        output: ruleTester_1.dedent(templateObject_99 || (templateObject_99 = tslib_1.__makeTemplateObject(["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"], ["\n      var x = [\n          'a',\n          'b',\n          'c'\n      ];"]))),
        options: [4],
        errors: expecting([
            [2, 4, 9],
            [3, 4, 9],
            [4, 4, 9],
            [5, 0, 2]
        ])
    }
]);
ruleTester.addTestGroup('decorators', 'should handle properties with decorators', [
    {
        code: ruleTester_1.dedent(templateObject_100 || (templateObject_100 = tslib_1.__makeTemplateObject(["\n      class MyComponent {\n          @Input prop: number;\n      }\n    "], ["\n      class MyComponent {\n          @Input prop: number;\n      }\n    "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_101 || (templateObject_101 = tslib_1.__makeTemplateObject(["\n      class MyComponent {\n       @Input prop: number;\n      }\n    "], ["\n      class MyComponent {\n       @Input prop: number;\n      }\n    "]))),
        errors: expecting([[2, 4, 1]])
    }
]);
ruleTester.addTestGroup('member-expression', 'should handle member expression statements', [
    {
        code: ruleTester_1.dedent(templateObject_102 || (templateObject_102 = tslib_1.__makeTemplateObject(["\n      this.http.get('/')\n        .map(res => res.json())"], ["\n      this.http.get('/')\n        .map(res => res.json())"]))),
        options: [2, { MemberExpression: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_103 || (templateObject_103 = tslib_1.__makeTemplateObject(["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n              var x = 1;\n              var y = 1;\n          }, function(err){\n              var o = 1 - 2;\n              var y = 1 - 2;\n              return true;\n          });\n      }"], ["\n      function test() {\n          return client.signUp(email, PASSWORD, { preVerified: true })\n          .then(function (result) {\n              var x = 1;\n              var y = 1;\n          }, function(err){\n              var o = 1 - 2;\n              var y = 1 - 2;\n              return true;\n          });\n      }"]))),
        options: [4, { MemberExpression: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_104 || (templateObject_104 = tslib_1.__makeTemplateObject(["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n          .then(function () {\n            return true;\n          }, function () {\n            return false;\n          });\n        }\n      };\n      "], ["\n      var obj = {\n        send: function () {\n          return P.resolve({\n            type: 'POST'\n          })\n          .then(function () {\n            return true;\n          }, function () {\n            return false;\n          });\n        }\n      };\n      "]))),
        options: [2, { MemberExpression: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_105 || (templateObject_105 = tslib_1.__makeTemplateObject(["\n      const func = function (opts) {\n          return Promise.resolve()\n          .then(() => {\n              [\n                  'ONE', 'TWO'\n              ].forEach(command => { doSomething(); });\n          });\n      };"], ["\n      const func = function (opts) {\n          return Promise.resolve()\n          .then(() => {\n              [\n                  'ONE', 'TWO'\n              ].forEach(command => { doSomething(); });\n          });\n      };"]))),
        options: [4, { MemberExpression: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_106 || (templateObject_106 = tslib_1.__makeTemplateObject(["\n      Buffer.length\n      "], ["\n      Buffer.length\n      "]))),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_107 || (templateObject_107 = tslib_1.__makeTemplateObject(["\n      Buffer\n          .indexOf('a')\n          .toString()\n      "], ["\n      Buffer\n          .indexOf('a')\n          .toString()\n      "]))),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_108 || (templateObject_108 = tslib_1.__makeTemplateObject(["\n      Buffer.\n          length\n      "], ["\n      Buffer.\n          length\n      "]))),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_109 || (templateObject_109 = tslib_1.__makeTemplateObject(["\n      Buffer\n          .foo\n          .bar\n      "], ["\n      Buffer\n          .foo\n          .bar\n      "]))),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: [
            'Buffer',
            '\t.foo',
            '\t.bar'
        ].join('\n'),
        options: ['tab', { MemberExpression: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_110 || (templateObject_110 = tslib_1.__makeTemplateObject(["\n      Buffer\n          .foo\n          .bar"], ["\n      Buffer\n          .foo\n          .bar"]))),
        options: [2, { MemberExpression: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_111 || (templateObject_111 = tslib_1.__makeTemplateObject(["\n      MemberExpression\n      .\n        .o\n          .\n       .default();"], ["\n      MemberExpression\n      .\n        .o\n          .\n       .default();"]))),
        options: [4]
    },
    {
        code: ruleTester_1.dedent(templateObject_112 || (templateObject_112 = tslib_1.__makeTemplateObject(["\n      foo = bar.baz()\n              .bip();"], ["\n      foo = bar.baz()\n              .bip();"]))),
        options: [4, { MemberExpression: 1 }]
    },
    {
        code: '\nBuffer\n.toString()',
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_113 || (templateObject_113 = tslib_1.__makeTemplateObject(["\n      Buffer\n          .indexOf('a')\n      .toString()"], ["\n      Buffer\n          .indexOf('a')\n      .toString()"]))),
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[3, 4, 0]])
    },
    {
        code: '\nBuffer.\nlength',
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[2, 4, 0]])
    },
    {
        code: '\nBuffer.\n\t\tlength',
        options: ['tab', { MemberExpression: 1 }],
        errors: expecting([[2, 1, 2]], 'tab')
    },
    {
        code: '\nBuffer\n  .foo\n  .bar',
        options: [2, { MemberExpression: 2 }],
        errors: expecting([[2, 4, 2], [3, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_114 || (templateObject_114 = tslib_1.__makeTemplateObject(["\n      var foo = function(){\n          foo\n                .bar\n      }"], ["\n      var foo = function(){\n          foo\n                .bar\n      }"]))),
        options: [4, { MemberExpression: 1 }],
        errors: expecting([[3, 8, 10]])
    },
    {
        code: ruleTester_1.dedent(templateObject_115 || (templateObject_115 = tslib_1.__makeTemplateObject(["\n      var foo = function(){\n          foo\n                   .bar\n      }"], ["\n      var foo = function(){\n          foo\n                   .bar\n      }"]))),
        options: [4, { MemberExpression: 2 }],
        errors: expecting([[3, 12, 13]])
    },
    {
        code: ruleTester_1.dedent(templateObject_116 || (templateObject_116 = tslib_1.__makeTemplateObject(["\n      var foo = () => {\n          foo\n                   .bar\n      }"], ["\n      var foo = () => {\n          foo\n                   .bar\n      }"]))),
        options: [4, { MemberExpression: 2 }],
        errors: expecting([[3, 12, 13]])
    },
    {
        code: ruleTester_1.dedent(templateObject_117 || (templateObject_117 = tslib_1.__makeTemplateObject(["\n      TestClass.prototype.method = function () {\n        return Promise.resolve(3)\n            .then(function (x) {\n              return x;\n            });\n      };"], ["\n      TestClass.prototype.method = function () {\n        return Promise.resolve(3)\n            .then(function (x) {\n              return x;\n            });\n      };"]))),
        options: [2, { MemberExpression: 1 }],
        errors: expecting([[3, 4, 6]])
    }
]);
ruleTester.addTestGroup('fixture', 'should check the "indent-invalid.txt" fixture file', [
    {
        code: '\n' + ruleTester_1.readFixture('indent-invalid.txt'),
        options: [2, { SwitchCase: 1, MemberExpression: 1 }],
        errors: expecting([
            [5, 2, 4],
            [10, 4, 6],
            [11, 2, 4],
            [15, 4, 2],
            [16, 2, 4],
            [23, 2, 4],
            [29, 2, 4],
            [31, 4, 2],
            [36, 4, 6],
            [38, 2, 4],
            [39, 4, 2],
            [40, 2, 0],
            [46, 0, 1],
            [54, 2, 4],
            [114, 4, 2],
            [120, 4, 6],
            [124, 4, 2],
            [134, 4, 6],
            [138, 2, 3],
            [139, 2, 3],
            [143, 4, 0],
            [151, 4, 6],
            [159, 4, 2],
            [161, 4, 6],
            [175, 2, 0],
            [177, 2, 4],
            [189, 2, 0],
            [193, 6, 4],
            [195, 6, 8],
            [304, 4, 6],
            [306, 4, 8],
            [307, 2, 4],
            [308, 2, 4],
            [311, 4, 6],
            [312, 4, 6],
            [313, 4, 6],
            [314, 2, 4],
            [315, 2, 4],
            [318, 4, 6],
            [319, 4, 6],
            [320, 4, 6],
            [321, 2, 4],
            [322, 2, 4],
            [326, 2, 1],
            [327, 2, 1],
            [328, 2, 1],
            [329, 2, 1],
            [330, 2, 1],
            [331, 2, 1],
            [332, 2, 1],
            [333, 2, 1],
            [334, 2, 1],
            [335, 2, 1],
            [340, 2, 4],
            [341, 2, 0],
            [344, 2, 4],
            [345, 2, 0],
            [348, 2, 4],
            [349, 2, 0],
            [355, 2, 0],
            [357, 2, 4],
            [361, 4, 6],
            [362, 2, 4],
            [363, 2, 4],
            [368, 2, 0],
            [370, 2, 4],
            [374, 4, 6],
            [376, 4, 2],
            [383, 2, 0],
            [385, 2, 4],
            [390, 2, 0],
            [392, 2, 4],
            [409, 2, 0],
            [410, 2, 4],
            [416, 2, 0],
            [417, 2, 4],
            [422, 2, 4],
            [423, 2, 0],
            [427, 2, 6],
            [428, 2, 8],
            [429, 2, 4],
            [430, 0, 4],
            [433, 2, 4],
            [434, 0, 4],
            [437, 2, 0],
            [438, 0, 4],
            [451, 2, 0],
            [453, 2, 4],
            [499, 6, 8],
            [500, 10, 8],
            [501, 8, 6],
            [506, 6, 8]
        ])
    }
]);
ruleTester.addTestGroup('variable-declarator', 'should handle variable declarator options', [
    {
        code: ruleTester_1.dedent(templateObject_118 || (templateObject_118 = tslib_1.__makeTemplateObject(["\n      var geometry = 2,\n      rotate = 2;"], ["\n      var geometry = 2,\n      rotate = 2;"]))),
        options: [2, { VariableDeclarator: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_119 || (templateObject_119 = tslib_1.__makeTemplateObject(["\n      var geometry,\n          rotate;"], ["\n      var geometry,\n          rotate;"]))),
        options: [4, { VariableDeclarator: 1 }]
    },
    {
        code: [
            'var geometry,',
            '\trotate;'
        ].join('\n'),
        options: ['tab', { VariableDeclarator: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_120 || (templateObject_120 = tslib_1.__makeTemplateObject(["\n      var geometry,\n        rotate;"], ["\n      var geometry,\n        rotate;"]))),
        options: [2, { VariableDeclarator: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_121 || (templateObject_121 = tslib_1.__makeTemplateObject(["\n      var geometry,\n          rotate;"], ["\n      var geometry,\n          rotate;"]))),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_122 || (templateObject_122 = tslib_1.__makeTemplateObject(["\n      let geometry,\n          rotate;"], ["\n      let geometry,\n          rotate;"]))),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_123 || (templateObject_123 = tslib_1.__makeTemplateObject(["\n      const geometry = 2,\n          rotate = 3;"], ["\n      const geometry = 2,\n          rotate = 3;"]))),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_124 || (templateObject_124 = tslib_1.__makeTemplateObject(["\n      var items = [\n        {\n          foo: 'bar'\n        }\n      ];\n      "], ["\n      var items = [\n        {\n          foo: 'bar'\n        }\n      ];\n      "]))),
        options: [2, { VariableDeclarator: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_125 || (templateObject_125 = tslib_1.__makeTemplateObject(["\n      const a = 1,\n            b = 2;\n      const items1 = [\n        {\n          foo: 'bar'\n        }\n      ];\n      const items2 = Items(\n        {\n          foo: 'bar'\n        }\n      );\n      "], ["\n      const a = 1,\n            b = 2;\n      const items1 = [\n        {\n          foo: 'bar'\n        }\n      ];\n      const items2 = Items(\n        {\n          foo: 'bar'\n        }\n      );\n      "]))),
        options: [2, { VariableDeclarator: 3 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_126 || (templateObject_126 = tslib_1.__makeTemplateObject(["\n      const geometry = 2,\n            rotate = 3;\n      var a = 1,\n        b = 2;\n      let light = true,\n          shadow = false;"], ["\n      const geometry = 2,\n            rotate = 3;\n      var a = 1,\n        b = 2;\n      let light = true,\n          shadow = false;"]))),
        options: [2, { VariableDeclarator: { const: 3, let: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_127 || (templateObject_127 = tslib_1.__makeTemplateObject(["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n        "], ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n        "]))),
        options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_128 || (templateObject_128 = tslib_1.__makeTemplateObject(["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n\n        if (YO) console.log(TE)"], ["\n        const YO = 'bah',\n              TE = 'mah'\n\n        var res,\n            a = 5,\n            b = 4\n\n        if (YO) console.log(TE)"]))),
        options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_129 || (templateObject_129 = tslib_1.__makeTemplateObject(["\n        var Command = function() {\n          var fileList = [],\n              files = []\n\n          files.concat(fileList)\n        };\n        "], ["\n        var Command = function() {\n          var fileList = [],\n              files = []\n\n          files.concat(fileList)\n        };\n        "]))),
        options: [2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }]
    },
    {
        code: '\nvar geometry,\nrotate;',
        options: [2, { VariableDeclarator: 1 }],
        errors: expecting([[2, 2, 0]])
    },
    {
        code: '\nvar geometry,\n  rotate;',
        options: [2, { VariableDeclarator: 2 }],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: '\nvar geometry,\n\trotate;',
        options: ['tab', { VariableDeclarator: 2 }],
        errors: expecting([[2, 2, 1]], 'tab')
    },
    {
        code: '\nlet geometry,\n  rotate;',
        options: [2, { VariableDeclarator: 2 }],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_130 || (templateObject_130 = tslib_1.__makeTemplateObject(["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n          rotate;"], ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n          rotate;"]))),
        options: [4, { VariableDeclarator: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_131 || (templateObject_131 = tslib_1.__makeTemplateObject(["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n         rotate;"], ["\n      /**\n       * @var {number}\n       * @var {number}\n       */\n      var geometry,\n         rotate;"]))),
        options: [4, { VariableDeclarator: 1 }],
        errors: expecting([[6, 4, 3]])
    },
    {
        code: ruleTester_1.dedent(templateObject_132 || (templateObject_132 = tslib_1.__makeTemplateObject(["\n      var a = new Test({\n            a: 1\n          }),\n          b = 4;\n      const a = new Test({\n            a: 1\n          }),\n          b = 4;"], ["\n      var a = new Test({\n            a: 1\n          }),\n          b = 4;\n      const a = new Test({\n            a: 1\n          }),\n          b = 4;"]))),
        options: [2, { VariableDeclarator: { var: 2 } }],
        errors: expecting([
            [6, 4, 6],
            [7, 2, 4],
            [8, 2, 4]
        ])
    }
]);
ruleTester.addTestGroup('switch-case', 'should handle switch case', [
    {
        code: ruleTester_1.dedent(templateObject_133 || (templateObject_133 = tslib_1.__makeTemplateObject(["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;\n      "], ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;\n      "]))),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_134 || (templateObject_134 = tslib_1.__makeTemplateObject(["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;\n      "], ["\n      var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth;\n      "]))),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_135 || (templateObject_135 = tslib_1.__makeTemplateObject(["\n      switch (x) {\n          case \"foo\":\n              a();\n              break;\n          case \"bar\":\n              switch (y) {\n                  case \"1\":\n                      break;\n                  case \"2\":\n                      a = 6;\n                      break;\n              }\n          case \"test\":\n              break;\n      }"], ["\n      switch (x) {\n          case \"foo\":\n              a();\n              break;\n          case \"bar\":\n              switch (y) {\n                  case \"1\":\n                      break;\n                  case \"2\":\n                      a = 6;\n                      break;\n              }\n          case \"test\":\n              break;\n      }"]))),
        options: [4, { SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_136 || (templateObject_136 = tslib_1.__makeTemplateObject(["\n      switch (x) {\n              case \"foo\":\n                  a();\n                  break;\n              case \"bar\":\n                  switch (y) {\n                          case \"1\":\n                              break;\n                          case \"2\":\n                              a = 6;\n                              break;\n                  }\n              case \"test\":\n                  break;\n      }"], ["\n      switch (x) {\n              case \"foo\":\n                  a();\n                  break;\n              case \"bar\":\n                  switch (y) {\n                          case \"1\":\n                              break;\n                          case \"2\":\n                              a = 6;\n                              break;\n                  }\n              case \"test\":\n                  break;\n      }"]))),
        options: [4, { SwitchCase: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_137 || (templateObject_137 = tslib_1.__makeTemplateObject(["\n      switch(value){\n          case \"1\":\n          case \"2\":\n              a();\n              break;\n          default:\n              a();\n              break;\n      }\n      switch(value){\n          case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"], ["\n      switch(value){\n          case \"1\":\n          case \"2\":\n              a();\n              break;\n          default:\n              a();\n              break;\n      }\n      switch(value){\n          case \"1\":\n              a();\n              break;\n          case \"2\":\n              break;\n          default:\n              break;\n      }"]))),
        options: [4, { SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_138 || (templateObject_138 = tslib_1.__makeTemplateObject(["\n        function salutation () {\n          switch (1) {\n            case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }\n        "], ["\n        function salutation () {\n          switch (1) {\n            case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }\n        "]))),
        options: [2, { SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_139 || (templateObject_139 = tslib_1.__makeTemplateObject(["\n        switch(value){\n            case \"1\":\n                a();\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n                break;\n        }"], ["\n        switch(value){\n            case \"1\":\n                a();\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n                break;\n        }"]))),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[4, 8, 4], [7, 8, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_140 || (templateObject_140 = tslib_1.__makeTemplateObject(["\n        switch(value){\n            case \"1\":\n                a();\n                break;\n            case \"2\":\n                a();\n                break;\n            default:\n            break;\n        }"], ["\n        switch(value){\n            case \"1\":\n                a();\n                break;\n            case \"2\":\n                a();\n                break;\n            default:\n            break;\n        }"]))),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[9, 8, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_141 || (templateObject_141 = tslib_1.__makeTemplateObject(["\n        switch(value){\n            case \"1\":\n            case \"2\":\n                a();\n                break;\n            default:\n                break;\n        }\n        switch(value){\n            case \"1\":\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n            break;\n        }"], ["\n        switch(value){\n            case \"1\":\n            case \"2\":\n                a();\n                break;\n            default:\n                break;\n        }\n        switch(value){\n            case \"1\":\n            break;\n            case \"2\":\n                a();\n            break;\n            default:\n                a();\n            break;\n        }"]))),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([[11, 8, 4], [14, 8, 4], [17, 8, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_142 || (templateObject_142 = tslib_1.__makeTemplateObject(["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"]))),
        options: [4, { SwitchCase: 1 }],
        errors: expecting([
            [2, 4, 0],
            [3, 8, 0],
            [4, 8, 0],
            [5, 4, 0],
            [6, 8, 0],
            [7, 8, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_143 || (templateObject_143 = tslib_1.__makeTemplateObject(["\n        function salutation () {\n          switch (1) {\n          case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }"], ["\n        function salutation () {\n          switch (1) {\n          case 0: return console.log('hi')\n            case 1: return console.log('hey')\n          }\n        }"]))),
        options: [2, { SwitchCase: 1 }],
        errors: expecting([
            [3, 4, 2]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_144 || (templateObject_144 = tslib_1.__makeTemplateObject(["\n        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;"], ["\n        var geometry, box, face1, face2, colorT, colorB, sprite, padding, maxWidth,\n        height, rotate;"]))),
        options: [2, { SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_145 || (templateObject_145 = tslib_1.__makeTemplateObject(["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"], ["\n        switch (a) {\n        case '1':\n        b();\n        break;\n        default:\n        c();\n        break;\n        }"]))),
        options: [4, { SwitchCase: 2 }],
        errors: expecting([
            [2, 8, 0],
            [3, 12, 0],
            [4, 12, 0],
            [5, 8, 0],
            [6, 12, 0],
            [7, 12, 0]
        ])
    }
]);
ruleTester.addTestGroup('var-dec/switch-case', 'should handle var declarator and switch cases', [
    {
        code: '// hi',
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: '  ',
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_146 || (templateObject_146 = tslib_1.__makeTemplateObject(["\n      if(data) {\n        console.log('hi');\n        b = true;};"], ["\n      if(data) {\n        console.log('hi');\n        b = true;};"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_147 || (templateObject_147 = tslib_1.__makeTemplateObject(["\n      foo = () => {\n        console.log('hi');\n        return true;};"], ["\n      foo = () => {\n        console.log('hi');\n        return true;};"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_148 || (templateObject_148 = tslib_1.__makeTemplateObject(["\n      function test(data) {\n        console.log('hi');\n        return true;};"], ["\n      function test(data) {\n        console.log('hi');\n        return true;};"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_149 || (templateObject_149 = tslib_1.__makeTemplateObject(["\n      var test = function(data) {\n        console.log('hi');\n      };"], ["\n      var test = function(data) {\n        console.log('hi');\n      };"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_150 || (templateObject_150 = tslib_1.__makeTemplateObject(["\n      arr.forEach(function(data) {\n        otherdata.forEach(function(zero) {\n          console.log('hi');\n        }) });"], ["\n      arr.forEach(function(data) {\n        otherdata.forEach(function(zero) {\n          console.log('hi');\n        }) });"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_151 || (templateObject_151 = tslib_1.__makeTemplateObject(["\n      a = [\n          ,3\n      ]"], ["\n      a = [\n          ,3\n      ]"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_152 || (templateObject_152 = tslib_1.__makeTemplateObject(["\n      [\n        ['gzip', 'gunzip'],\n        ['gzip', 'unzip'],\n        ['deflate', 'inflate'],\n        ['deflateRaw', 'inflateRaw'],\n      ].forEach(function(method) {\n        console.log(method);\n      });\n      "], ["\n      [\n        ['gzip', 'gunzip'],\n        ['gzip', 'unzip'],\n        ['deflate', 'inflate'],\n        ['deflateRaw', 'inflateRaw'],\n      ].forEach(function(method) {\n        console.log(method);\n      });\n      "]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_153 || (templateObject_153 = tslib_1.__makeTemplateObject(["\n      test(123, {\n          bye: {\n              hi: [1,\n                  {\n                      b: 2\n                  }\n              ]\n          }\n      });"], ["\n      test(123, {\n          bye: {\n              hi: [1,\n                  {\n                      b: 2\n                  }\n              ]\n          }\n      });"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_154 || (templateObject_154 = tslib_1.__makeTemplateObject(["\n      var xyz = 2,\n          lmn = [\n              {\n                  a: 1\n              }\n          ];"], ["\n      var xyz = 2,\n          lmn = [\n              {\n                  a: 1\n              }\n          ];"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_155 || (templateObject_155 = tslib_1.__makeTemplateObject(["\n      lmn = [{\n          a: 1\n      },\n      {\n          b: 2\n\n      {\n          x: 2\n      }];"], ["\n      lmn = [{\n          a: 1\n      },\n      {\n          b: 2\n\n      {\n          x: 2\n      }];"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_156 || (templateObject_156 = tslib_1.__makeTemplateObject(["\n      abc({\n          test: [\n              [\n                  c,\n                  xyz,\n                  2\n              ].join(',')\n          ]\n      });"], ["\n      abc({\n          test: [\n              [\n                  c,\n                  xyz,\n                  2\n              ].join(',')\n          ]\n      });"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_157 || (templateObject_157 = tslib_1.__makeTemplateObject(["\n      abc = {\n        test: [\n          [\n            c,\n            xyz,\n            2\n          ]\n        ]\n      };"], ["\n      abc = {\n        test: [\n          [\n            c,\n            xyz,\n            2\n          ]\n        ]\n      };"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_158 || (templateObject_158 = tslib_1.__makeTemplateObject(["\n      abc(\n        {\n          a: 1,\n          b: 2\n        }\n      );"], ["\n      abc(\n        {\n          a: 1,\n          b: 2\n        }\n      );"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_159 || (templateObject_159 = tslib_1.__makeTemplateObject(["\n      abc({\n          a: 1,\n          b: 2\n      });"], ["\n      abc({\n          a: 1,\n          b: 2\n      });"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_160 || (templateObject_160 = tslib_1.__makeTemplateObject(["\n      var abc =\n        [\n          c,\n          xyz,\n          {\n            a: 1,\n            b: 2\n          }\n        ];"], ["\n      var abc =\n        [\n          c,\n          xyz,\n          {\n            a: 1,\n            b: 2\n          }\n        ];"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_161 || (templateObject_161 = tslib_1.__makeTemplateObject(["\n      var abc = [\n        c,\n        xyz,\n        {\n          a: 1,\n          b: 2\n        }\n      ];"], ["\n      var abc = [\n        c,\n        xyz,\n        {\n          a: 1,\n          b: 2\n        }\n      ];"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_162 || (templateObject_162 = tslib_1.__makeTemplateObject(["\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };"], ["\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_163 || (templateObject_163 = tslib_1.__makeTemplateObject(["\n      var abc =\n          {\n            a: 1,\n            b: 2\n          };"], ["\n      var abc =\n          {\n            a: 1,\n            b: 2\n          };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_164 || (templateObject_164 = tslib_1.__makeTemplateObject(["\n      var a = new abc({\n              a: 1,\n              b: 2\n          }),\n          b = 2;"], ["\n      var a = new abc({\n              a: 1,\n              b: 2\n          }),\n          b = 2;"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_165 || (templateObject_165 = tslib_1.__makeTemplateObject(["\n      var a = 2,\n        c = {\n          a: 1,\n          b: 2\n        },\n        b = 2;"], ["\n      var a = 2,\n        c = {\n          a: 1,\n          b: 2\n        },\n        b = 2;"]))),
        options: [2, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_166 || (templateObject_166 = tslib_1.__makeTemplateObject(["\n      var x = 2,\n          y = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], ["\n      var x = 2,\n          y = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_167 || (templateObject_167 = tslib_1.__makeTemplateObject(["\n      var e = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"], ["\n      var e = {\n            a: 1,\n            b: 2\n          },\n          b = 2;"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_168 || (templateObject_168 = tslib_1.__makeTemplateObject(["\n      var a = {\n        a: 1,\n        b: 2\n      };"], ["\n      var a = {\n        a: 1,\n        b: 2\n      };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_169 || (templateObject_169 = tslib_1.__makeTemplateObject(["\n      function test() {\n        if (true ||\n                  false){\n          console.log(val);\n        }\n      }"], ["\n      function test() {\n        if (true ||\n                  false){\n          console.log(val);\n        }\n      }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_170 || (templateObject_170 = tslib_1.__makeTemplateObject(["\n      for (var val in obj)\n        if (true)\n          console.log(val);"], ["\n      for (var val in obj)\n        if (true)\n          console.log(val);"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_171 || (templateObject_171 = tslib_1.__makeTemplateObject(["\n      if(true)\n        if (true)\n          if (true)\n            console.log(val);"], ["\n      if(true)\n        if (true)\n          if (true)\n            console.log(val);"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_172 || (templateObject_172 = tslib_1.__makeTemplateObject(["\n      function hi(){     var a = 1;\n        y++;                   x++;\n      }"], ["\n      function hi(){     var a = 1;\n        y++;                   x++;\n      }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_173 || (templateObject_173 = tslib_1.__makeTemplateObject(["\n      for(;length > index; index++)if(NO_HOLES || index in self){\n        x++;\n      }"], ["\n      for(;length > index; index++)if(NO_HOLES || index in self){\n        x++;\n      }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_174 || (templateObject_174 = tslib_1.__makeTemplateObject(["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_175 || (templateObject_175 = tslib_1.__makeTemplateObject(["\n      const abc = 5,\n            c = 2,\n            xyz =\n            {\n              a: 1,\n              b: 2\n            };\n      let abc = 5,\n        c = 2,\n        xyz =\n        {\n          a: 1,\n          b: 2\n        };\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };\n      "], ["\n      const abc = 5,\n            c = 2,\n            xyz =\n            {\n              a: 1,\n              b: 2\n            };\n      let abc = 5,\n        c = 2,\n        xyz =\n        {\n          a: 1,\n          b: 2\n        };\n      var abc = 5,\n          c = 2,\n          xyz =\n          {\n            a: 1,\n            b: 2\n          };\n      "]))),
        options: [2, { VariableDeclarator: { var: 2, const: 3 }, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_176 || (templateObject_176 = tslib_1.__makeTemplateObject(["\n      var a = 1,\n          B = class {\n            constructor(){}\n            a(){}\n            get b(){}\n          };"], ["\n      var a = 1,\n          B = class {\n            constructor(){}\n            a(){}\n            get b(){}\n          };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_177 || (templateObject_177 = tslib_1.__makeTemplateObject(["\n      var a = 1,\n          B =\n          class {\n            constructor(){}\n            a(){}\n            get b(){}\n          },\n          c = 3;"], ["\n      var a = 1,\n          B =\n          class {\n            constructor(){}\n            a(){}\n            get b(){}\n          },\n          c = 3;"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_178 || (templateObject_178 = tslib_1.__makeTemplateObject(["\n      class A{\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], ["\n      class A{\n          constructor(){}\n          a(){}\n          get b(){}\n      }"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_179 || (templateObject_179 = tslib_1.__makeTemplateObject(["\n      var A = class {\n          constructor(){}\n          a(){}\n          get b(){}\n      }"], ["\n      var A = class {\n          constructor(){}\n          a(){}\n          get b(){}\n      }"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_180 || (templateObject_180 = tslib_1.__makeTemplateObject(["\n      var a =\n      {\n          actions:\n          [\n              {\n                  name: 'compile'\n              }\n          ]\n      };\n      "], ["\n      var a =\n      {\n          actions:\n          [\n              {\n                  name: 'compile'\n              }\n          ]\n      };\n      "]))),
        options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_181 || (templateObject_181 = tslib_1.__makeTemplateObject(["\n      var a =\n      [\n          {\n              name: 'compile'\n          }\n      ];\n      "], ["\n      var a =\n      [\n          {\n              name: 'compile'\n          }\n      ];\n      "]))),
        options: [4, { VariableDeclarator: 0, SwitchCase: 1 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_182 || (templateObject_182 = tslib_1.__makeTemplateObject(["\n      class A{\n        constructor(){}\n          a(){}\n          get b(){}\n      }"], ["\n      class A{\n        constructor(){}\n          a(){}\n          get b(){}\n      }"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
        errors: expecting([[2, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_183 || (templateObject_183 = tslib_1.__makeTemplateObject(["\n      var A = class {\n        constructor(){}\n          a(){}\n        get b(){}\n      };"], ["\n      var A = class {\n        constructor(){}\n          a(){}\n        get b(){}\n      };"]))),
        options: [4, { VariableDeclarator: 1, SwitchCase: 1 }],
        errors: expecting([[2, 4, 2], [4, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_184 || (templateObject_184 = tslib_1.__makeTemplateObject(["\n      var a = 1,\n          B = class {\n          constructor(){}\n            a(){}\n            get b(){}\n          };"], ["\n      var a = 1,\n          B = class {\n          constructor(){}\n            a(){}\n            get b(){}\n          };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([[3, 6, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_185 || (templateObject_185 = tslib_1.__makeTemplateObject(["\n        var abc = 5,\n            c = 2,\n            xyz =\n             {\n               a: 1,\n                b: 2\n             };"], ["\n        var abc = 5,\n            c = 2,\n            xyz =\n             {\n               a: 1,\n                b: 2\n             };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [4, 4, 5],
            [5, 6, 7],
            [6, 6, 8],
            [7, 4, 5]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_186 || (templateObject_186 = tslib_1.__makeTemplateObject(["\n        var abc =\n             {\n               a: 1,\n                b: 2\n             };"], ["\n        var abc =\n             {\n               a: 1,\n                b: 2\n             };"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 4, 5],
            [3, 6, 7],
            [4, 6, 8],
            [5, 4, 5]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_187 || (templateObject_187 = tslib_1.__makeTemplateObject(["\n        if(true)\n          if (true)\n            if (true)\n            console.log(val);"], ["\n        if(true)\n          if (true)\n            if (true)\n            console.log(val);"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [4, 6, 4]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_188 || (templateObject_188 = tslib_1.__makeTemplateObject(["\n        var a = {\n            a: 1,\n            b: 2\n        }"], ["\n        var a = {\n            a: 1,\n            b: 2\n        }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_189 || (templateObject_189 = tslib_1.__makeTemplateObject(["\n        var a = [\n            a,\n            b\n        ]"], ["\n        var a = [\n            a,\n            b\n        ]"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_190 || (templateObject_190 = tslib_1.__makeTemplateObject(["\n        let a = [\n            a,\n            b\n        ]"], ["\n        let a = [\n            a,\n            b\n        ]"]))),
        options: [2, { VariableDeclarator: { let: 2 }, SwitchCase: 1 }],
        errors: expecting([
            [2, 2, 4],
            [3, 2, 4]
        ])
    }
]);
ruleTester.addTestGroup('outer-iife-body', 'should handle outer IIFE body', [
    {
        code: ruleTester_1.dedent(templateObject_191 || (templateObject_191 = tslib_1.__makeTemplateObject(["\n      fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {\n        files[name] = foo;\n      });"], ["\n      fs.readdirSync(path.join(__dirname, '../rules')).forEach(name => {\n        files[name] = foo;\n      });"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_192 || (templateObject_192 = tslib_1.__makeTemplateObject(["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      })();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_193 || (templateObject_193 = tslib_1.__makeTemplateObject(["\n      (function(){\n              function foo(x) {\n                  return x + 1;\n              }\n      })();"], ["\n      (function(){\n              function foo(x) {\n                  return x + 1;\n              }\n      })();"]))),
        options: [4, { outerIIFEBody: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_194 || (templateObject_194 = tslib_1.__makeTemplateObject(["\n      (function(x, y){\n      function foo(x) {\n        return x + 1;\n      }\n      })(1, 2);"], ["\n      (function(x, y){\n      function foo(x) {\n        return x + 1;\n      }\n      })(1, 2);"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_195 || (templateObject_195 = tslib_1.__makeTemplateObject(["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }());"], ["\n      (function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }());"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_196 || (templateObject_196 = tslib_1.__makeTemplateObject(["\n      !function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }();"], ["\n      !function(){\n      function foo(x) {\n        return x + 1;\n      }\n      }();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: [
            '!function(){',
            '\t\t\tfunction foo(x) {',
            '\t\t\t\treturn x + 1;',
            '\t\t\t}',
            '}();'
        ].join('\n'),
        options: ['tab', { outerIIFEBody: 3 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_197 || (templateObject_197 = tslib_1.__makeTemplateObject(["\n      var out = function(){\n        function fooVar(x) {\n          return x + 1;\n        }\n      };"], ["\n      var out = function(){\n        function fooVar(x) {\n          return x + 1;\n        }\n      };"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_198 || (templateObject_198 = tslib_1.__makeTemplateObject(["\n      var ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], ["\n      var ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_199 || (templateObject_199 = tslib_1.__makeTemplateObject(["\n      ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"], ["\n      ns = function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_200 || (templateObject_200 = tslib_1.__makeTemplateObject(["\n      var ns = (function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }(x));"], ["\n      var ns = (function(){\n      function fooVar(x) {\n        return x + 1;\n      }\n      }(x));"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_201 || (templateObject_201 = tslib_1.__makeTemplateObject(["\n      var ns = (function(){\n              function fooVar(x) {\n                  return x + 1;\n              }\n      }(x));"], ["\n      var ns = (function(){\n              function fooVar(x) {\n                  return x + 1;\n              }\n      }(x));"]))),
        options: [4, { outerIIFEBody: 2 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_202 || (templateObject_202 = tslib_1.__makeTemplateObject(["\n      var obj = {\n        foo: function() {\n          return true;\n        }\n      };"], ["\n      var obj = {\n        foo: function() {\n          return true;\n        }\n      };"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_203 || (templateObject_203 = tslib_1.__makeTemplateObject(["\n      while (\n        function() {\n          return true;\n        }()) {\n\n        x = x + 1;\n      };"], ["\n      while (\n        function() {\n          return true;\n        }()) {\n\n        x = x + 1;\n      };"]))),
        options: [2, { outerIIFEBody: 20 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_204 || (templateObject_204 = tslib_1.__makeTemplateObject(["\n      (() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ["\n      (() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_205 || (templateObject_205 = tslib_1.__makeTemplateObject(["\n      function foo() {\n      }"], ["\n      function foo() {\n      }"]))),
        options: ['tab', { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_206 || (templateObject_206 = tslib_1.__makeTemplateObject(["\n      ;(() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"], ["\n      ;(() => {\n      function foo(x) {\n        return x + 1;\n      }\n      })();"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_207 || (templateObject_207 = tslib_1.__makeTemplateObject(["\n      if(data) {\n        console.log('hi');\n      }"], ["\n      if(data) {\n        console.log('hi');\n      }"]))),
        options: [2, { outerIIFEBody: 0 }]
    },
    {
        code: ruleTester_1.dedent(templateObject_208 || (templateObject_208 = tslib_1.__makeTemplateObject(["\n      (function(){\n        function foo(x) {\n          return x + 1;\n        }\n      })();"], ["\n      (function(){\n        function foo(x) {\n          return x + 1;\n        }\n      })();"]))),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[2, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_209 || (templateObject_209 = tslib_1.__makeTemplateObject(["\n      (function(){\n          function foo(x) {\n              return x + 1;\n          }\n      })();"], ["\n      (function(){\n          function foo(x) {\n              return x + 1;\n          }\n      })();"]))),
        options: [4, { outerIIFEBody: 2 }],
        errors: expecting([[2, 8, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_210 || (templateObject_210 = tslib_1.__makeTemplateObject(["\n      if(data) {\n      console.log('hi');\n      }"], ["\n      if(data) {\n      console.log('hi');\n      }"]))),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[2, 2, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_211 || (templateObject_211 = tslib_1.__makeTemplateObject(["\n      var ns = function(){\n          function fooVar(x) {\n              return x + 1;\n          }\n      }(x);"], ["\n      var ns = function(){\n          function fooVar(x) {\n              return x + 1;\n          }\n      }(x);"]))),
        options: [4, { outerIIFEBody: 2 }],
        errors: expecting([[2, 8, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_212 || (templateObject_212 = tslib_1.__makeTemplateObject(["\n      var obj = {\n        foo: function() {\n        return true;\n        }()\n      };"], ["\n      var obj = {\n        foo: function() {\n        return true;\n        }()\n      };"]))),
        options: [2, { outerIIFEBody: 0 }],
        errors: expecting([[3, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_213 || (templateObject_213 = tslib_1.__makeTemplateObject(["\n      typeof function() {\n          function fooVar(x) {\n            return x + 1;\n          }\n      }();"], ["\n      typeof function() {\n          function fooVar(x) {\n            return x + 1;\n          }\n      }();"]))),
        options: [2, { outerIIFEBody: 2 }],
        errors: expecting([[2, 2, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_214 || (templateObject_214 = tslib_1.__makeTemplateObject(["\n      {\n      \t!function(x) {\n      \t\t\t\treturn x + 1;\n      \t}()\n      };"], ["\n      {\n      \\t!function(x) {\n      \\t\\t\\t\\treturn x + 1;\n      \\t}()\n      };"]))),
        options: ['tab', { outerIIFEBody: 3 }],
        errors: expecting([[3, 2, 4]], 'tab')
    }
]);
ruleTester.addTestGroup('functions', 'should handle functions body and parameters', [
    {
        code: ruleTester_1.dedent(templateObject_215 || (templateObject_215 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n        bbb, ccc, ddd) {\n          bar();\n      }"], ["\n      function foo(aaa,\n        bbb, ccc, ddd) {\n          bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_216 || (templateObject_216 = tslib_1.__makeTemplateObject(["\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], ["\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_217 || (templateObject_217 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n          bbb,\n          ccc) {\n                  bar();\n      }"], ["\n      function foo(aaa,\n          bbb,\n          ccc) {\n                  bar();\n      }"]))),
        options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_218 || (templateObject_218 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n                   bbb, ccc,\n                   ddd, eee, fff) {\n        bar();\n      }"], ["\n      function foo(aaa,\n                   bbb, ccc,\n                   ddd, eee, fff) {\n        bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_219 || (templateObject_219 = tslib_1.__makeTemplateObject(["\n      function foo(aaa, bbb)\n      {\n            bar();\n      }"], ["\n      function foo(aaa, bbb)\n      {\n            bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_220 || (templateObject_220 = tslib_1.__makeTemplateObject(["\n      function foo(\n        aaa,\n        bbb) {\n          bar();\n      }"], ["\n      function foo(\n        aaa,\n        bbb) {\n          bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_221 || (templateObject_221 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n          bbb,\n          ccc,\n          ddd) {\n      bar();\n      }"], ["\n      var foo = function(aaa,\n          bbb,\n          ccc,\n          ddd) {\n      bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 2, body: 0 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_222 || (templateObject_222 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n        bbb,\n        ccc) {\n                          bar();\n      }"], ["\n      var foo = function(aaa,\n        bbb,\n        ccc) {\n                          bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 10 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_223 || (templateObject_223 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n                         bbb, ccc, ddd,\n                         eee, fff) {\n          bar();\n      }"], ["\n      var foo = function(aaa,\n                         bbb, ccc, ddd,\n                         eee, fff) {\n          bar();\n      }"]))),
        options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_224 || (templateObject_224 = tslib_1.__makeTemplateObject(["\n      var foo = function(\n        aaa, bbb, ccc,\n        ddd, eee) {\n            bar();\n      }"], ["\n      var foo = function(\n        aaa, bbb, ccc,\n        ddd, eee) {\n            bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_225 || (templateObject_225 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        function bar() {\n          baz();\n        }\n      }"], ["\n      function foo() {\n        function bar() {\n          baz();\n        }\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_226 || (templateObject_226 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        function bar(baz,\n            qux) {\n          foobar();\n        }\n      }"], ["\n      function foo() {\n        function bar(baz,\n            qux) {\n          foobar();\n        }\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_227 || (templateObject_227 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        var bar = function(baz,\n              qux) {\n          foobar();\n        };\n      }"], ["\n      function foo() {\n        var bar = function(baz,\n              qux) {\n          foobar();\n        };\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 3 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_228 || (templateObject_228 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        function bar() {\n              baz();\n        }\n      }"], ["\n      function foo() {\n        function bar() {\n              baz();\n        }\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1 } }],
        errors: expecting([[3, 4, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_229 || (templateObject_229 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        function bar(baz,\n          qux) {\n          foobar();\n        }\n      }"], ["\n      function foo() {\n        function bar(baz,\n          qux) {\n          foobar();\n        }\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([[3, 6, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_230 || (templateObject_230 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        var bar = function(baz,\n                qux) {\n          foobar();\n        };\n      }"], ["\n      function foo() {\n        var bar = function(baz,\n                qux) {\n          foobar();\n        };\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 3 } }],
        errors: expecting([[3, 8, 10]])
    },
    {
        code: ruleTester_1.dedent(templateObject_231 || (templateObject_231 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n      }"], ["\n      function foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 1, body: 2 } }],
        errors: expecting([[2, 2, 4], [3, 4, 6]])
    },
    {
        code: ruleTester_1.dedent(templateObject_232 || (templateObject_232 = tslib_1.__makeTemplateObject(["\n      function foo(aaa, bbb,\n        ccc, ddd) {\n      bar();\n      }\",\n      utput:\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"], ["\n      function foo(aaa, bbb,\n        ccc, ddd) {\n      bar();\n      }\",\n      utput:\n      function foo(aaa, bbb,\n            ccc, ddd) {\n        bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 3, body: 1 } }],
        errors: expecting([[2, 6, 2], [3, 2, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_233 || (templateObject_233 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n              bbb,\n        ccc) {\n            bar();\n      }"], ["\n      function foo(aaa,\n              bbb,\n        ccc) {\n            bar();\n      }"]))),
        options: [4, { FunctionDeclaration: { parameters: 1, body: 3 } }],
        errors: expecting([[2, 4, 8], [3, 4, 2], [4, 12, 6]])
    },
    {
        code: ruleTester_1.dedent(templateObject_234 || (templateObject_234 = tslib_1.__makeTemplateObject(["\n      function foo(aaa,\n        bbb, ccc,\n                         ddd, eee, fff) {\n         bar();\n      }"], ["\n      function foo(aaa,\n        bbb, ccc,\n                         ddd, eee, fff) {\n         bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 1 } }],
        errors: expecting([[2, 13, 2], [3, 13, 19], [4, 2, 3]])
    },
    {
        code: ruleTester_1.dedent(templateObject_235 || (templateObject_235 = tslib_1.__makeTemplateObject(["\n      function foo(aaa, bbb)\n      {\n      bar();\n      }"], ["\n      function foo(aaa, bbb)\n      {\n      bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 3 } }],
        errors: expecting([[3, 6, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_236 || (templateObject_236 = tslib_1.__makeTemplateObject(["\n      function foo(aaa, bbb)\n        {\n      bar();\n      }"], ["\n      function foo(aaa, bbb)\n        {\n      bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 3 } }],
        errors: expecting([[2, 0, 2], [3, 6, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_237 || (templateObject_237 = tslib_1.__makeTemplateObject(["\n      function foo(\n        aaa,\n        bbb\n       )\n      {\n        bar();\n      }"], ["\n      function foo(\n        aaa,\n        bbb\n       )\n      {\n        bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([
            [2, 4, 2],
            [3, 4, 2],
            [4, 0, 1]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_238 || (templateObject_238 = tslib_1.__makeTemplateObject(["\n      {\n        function foo(\n       )\n         {\n          return null;\n        }\n      }"], ["\n      {\n        function foo(\n       )\n         {\n          return null;\n        }\n      }"]))),
        options: [2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
        errors: expecting([[3, 2, 1], [4, 2, 3]])
    },
    {
        code: ruleTester_1.dedent(templateObject_239 || (templateObject_239 = tslib_1.__makeTemplateObject(["\n      function foo(\n      aaa,\n          bbb) {\n      bar();\n      }"], ["\n      function foo(\n      aaa,\n          bbb) {\n      bar();\n      }"]))),
        options: [2, { FunctionDeclaration: { parameters: 'first', body: 2 } }],
        errors: expecting([[3, 0, 4], [4, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_240 || (templateObject_240 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n        bbb,\n          ccc,\n            ddd) {\n        bar();\n      }"], ["\n      var foo = function(aaa,\n        bbb,\n          ccc,\n            ddd) {\n        bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 2, body: 0 } }],
        errors: expecting([[2, 4, 2], [4, 4, 6], [5, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_241 || (templateObject_241 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n         bbb,\n       ccc) {\n        bar();\n      }"], ["\n      var foo = function(aaa,\n         bbb,\n       ccc) {\n        bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 10 } }],
        errors: expecting([[2, 2, 3], [3, 2, 1], [4, 20, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_242 || (templateObject_242 = tslib_1.__makeTemplateObject(["\n      var foo = function(aaa,\n        bbb, ccc, ddd,\n                              eee, fff) {\n              bar();\n      }"], ["\n      var foo = function(aaa,\n        bbb, ccc, ddd,\n                              eee, fff) {\n              bar();\n      }"]))),
        options: [4, { FunctionExpression: { parameters: 'first', body: 1 } }],
        errors: expecting([[2, 19, 2], [3, 19, 24], [4, 4, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_243 || (templateObject_243 = tslib_1.__makeTemplateObject(["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee) {\n        bar();\n      }"], ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee) {\n        bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 'first', body: 3 } }],
        errors: expecting([[3, 0, 4], [4, 6, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_244 || (templateObject_244 = tslib_1.__makeTemplateObject(["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee)\n           {\n        bar();\n      }"], ["\n      var foo = function(\n      aaa, bbb, ccc,\n          ddd, eee)\n           {\n        bar();\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 3 } }],
        errors: expecting([
            [2, 2, 0],
            [3, 2, 4],
            [4, 0, 5],
            [5, 6, 2]
        ])
    }
]);
ruleTester.addTestGroup('methods', 'should handle methods body and parameters', [
    {
        code: ruleTester_1.dedent(templateObject_245 || (templateObject_245 = tslib_1.__makeTemplateObject(["\n      class A {\n        foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], ["\n      class A {\n        foo(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_246 || (templateObject_246 = tslib_1.__makeTemplateObject(["\n      class A {\n        constructor(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"], ["\n      class A {\n        constructor(aaa,\n          bbb, ccc, ddd) {\n            bar();\n        }\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_247 || (templateObject_247 = tslib_1.__makeTemplateObject(["\n      class A {\n        foo(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n       }"], ["\n      class A {\n        foo(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n       }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }],
        errors: expecting([
            [3, 4, 3],
            [5, 4, 5],
            [7, 2, 1],
            [8, 2, 3],
            [11, 0, 1]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_248 || (templateObject_248 = tslib_1.__makeTemplateObject(["\n      class A {\n        constructor(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n      }"], ["\n      class A {\n        constructor(\n         aaa,\n          bbb,\n           ccc,\n          ddd\n       )\n         {\n            bar();\n        }\n      }"]))),
        output: ruleTester_1.dedent(templateObject_249 || (templateObject_249 = tslib_1.__makeTemplateObject(["\n      class A {\n        constructor(\n          aaa,\n          bbb,\n          ccc,\n          ddd\n        )\n        {\n            bar();\n        }\n      }"], ["\n      class A {\n        constructor(\n          aaa,\n          bbb,\n          ccc,\n          ddd\n        )\n        {\n            bar();\n        }\n      }"]))),
        options: [2, { FunctionExpression: { parameters: 1, body: 2 } }],
        errors: expecting([
            [3, 4, 3],
            [5, 4, 5],
            [7, 2, 1],
            [8, 2, 3]
        ])
    }
]);
ruleTester.addTestGroup('call-expression', 'should handle call expressions', [
    {
        code: ruleTester_1.dedent(templateObject_250 || (templateObject_250 = tslib_1.__makeTemplateObject(["\n      foo(\n        bar,\n        baz,\n        qux\n      );\""], ["\n      foo(\n        bar,\n        baz,\n        qux\n      );\""]))),
        options: [2, { CallExpression: { arguments: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_251 || (templateObject_251 = tslib_1.__makeTemplateObject(["\n      foo(\n      \tbar,\n      \tbaz,\n      \tqux\n      );\""], ["\n      foo(\n      \\tbar,\n      \\tbaz,\n      \\tqux\n      );\""]))),
        options: ['tab', { CallExpression: { arguments: 1 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_252 || (templateObject_252 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n              baz,\n              qux);\""], ["\n      foo(bar,\n              baz,\n              qux);\""]))),
        options: [4, { CallExpression: { arguments: 2 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_253 || (templateObject_253 = tslib_1.__makeTemplateObject(["\n      foo(\n      bar,\n      baz,\n      qux\n      );\""], ["\n      foo(\n      bar,\n      baz,\n      qux\n      );\""]))),
        options: [2, { CallExpression: { arguments: 0 } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_254 || (templateObject_254 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n          baz,\n          qux\n      );\""], ["\n      foo(bar,\n          baz,\n          qux\n      );\""]))),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_255 || (templateObject_255 = tslib_1.__makeTemplateObject(["\n      foo(bar, baz,\n          qux, barbaz,\n          barqux, bazqux);\""], ["\n      foo(bar, baz,\n          qux, barbaz,\n          barqux, bazqux);\""]))),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_256 || (templateObject_256 = tslib_1.__makeTemplateObject(["\n      foo(\n                              bar, baz,\n                              qux);\""], ["\n      foo(\n                              bar, baz,\n                              qux);\""]))),
        options: [2, { CallExpression: { arguments: 'first' } }]
    },
    {
        code: ruleTester_1.dedent(templateObject_257 || (templateObject_257 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n              1 + 2,\n              !baz,\n              new Car('!')\n      );\""], ["\n      foo(bar,\n              1 + 2,\n              !baz,\n              new Car('!')\n      );\""]))),
        options: [2, { CallExpression: { arguments: 4 } }]
    }
]);
ruleTester.addTestGroup('new-batch', 'should handle try/catch/do and return statements', [
    {
        code: ruleTester_1.dedent(templateObject_258 || (templateObject_258 = tslib_1.__makeTemplateObject(["\n      {\n          try {\n          }\n      catch (err) {\n          }\n      finally {\n          }\n      }"], ["\n      {\n          try {\n          }\n      catch (err) {\n          }\n      finally {\n          }\n      }"]))),
        output: ruleTester_1.dedent(templateObject_259 || (templateObject_259 = tslib_1.__makeTemplateObject(["\n      {\n          try {\n          }\n          catch (err) {\n          }\n          finally {\n          }\n      }"], ["\n      {\n          try {\n          }\n          catch (err) {\n          }\n          finally {\n          }\n      }"]))),
        errors: expecting([
            [4, 4, 0],
            [6, 4, 0]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_260 || (templateObject_260 = tslib_1.__makeTemplateObject(["\n      {\n          do {\n          }\n      while (true)\n      }"], ["\n      {\n          do {\n          }\n      while (true)\n      }"]))),
        output: ruleTester_1.dedent(templateObject_261 || (templateObject_261 = tslib_1.__makeTemplateObject(["\n      {\n          do {\n          }\n          while (true)\n      }"], ["\n      {\n          do {\n          }\n          while (true)\n      }"]))),
        errors: expecting([[4, 4, 0]])
    },
    {
        code: ruleTester_1.dedent(templateObject_262 || (templateObject_262 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        bar();\n      \t\t}"], ["\n      function foo() {\n        bar();\n      \\t\\t}"]))),
        output: ruleTester_1.dedent(templateObject_263 || (templateObject_263 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        bar();\n      }"], ["\n      function foo() {\n        bar();\n      }"]))),
        options: [2],
        errors: expecting([[3, '0 spaces', '2 tabs']])
    },
    {
        code: ruleTester_1.dedent(templateObject_264 || (templateObject_264 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (\n          1\n          )\n      }"], ["\n      function foo() {\n        return (\n          1\n          )\n      }"]))),
        output: ruleTester_1.dedent(templateObject_265 || (templateObject_265 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (\n          1\n        )\n      }"], ["\n      function foo() {\n        return (\n          1\n        )\n      }"]))),
        options: [2],
        errors: expecting([[4, '2 spaces', '4']])
    },
    {
        code: ruleTester_1.dedent(templateObject_266 || (templateObject_266 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (\n          1\n          );\n      }"], ["\n      function foo() {\n        return (\n          1\n          );\n      }"]))),
        output: ruleTester_1.dedent(templateObject_267 || (templateObject_267 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return (\n          1\n        );\n      }"], ["\n      function foo() {\n        return (\n          1\n        );\n      }"]))),
        options: [2],
        errors: expecting([[4, '2 spaces', '4']])
    },
    {
        code: ruleTester_1.dedent(templateObject_268 || (templateObject_268 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        bar();\n      \t\t}"], ["\n      function foo() {\n        bar();\n      \\t\\t}"]))),
        output: ruleTester_1.dedent(templateObject_269 || (templateObject_269 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        bar();\n      }"], ["\n      function foo() {\n        bar();\n      }"]))),
        options: [2],
        errors: expecting([[3, '0 spaces', '2 tabs']])
    },
    {
        code: ruleTester_1.dedent(templateObject_270 || (templateObject_270 = tslib_1.__makeTemplateObject(["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n          return fn.call(that, a);\n          };\n        }\n      }"], ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n          return fn.call(that, a);\n          };\n        }\n      }"]))),
        output: ruleTester_1.dedent(templateObject_271 || (templateObject_271 = tslib_1.__makeTemplateObject(["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"], ["\n      function test(){\n        switch(length){\n          case 1: return function(a){\n            return fn.call(that, a);\n          };\n        }\n      }"]))),
        options: [2, { VariableDeclarator: 2, SwitchCase: 1 }],
        errors: expecting([[4, '6 spaces', '4']])
    },
    {
        code: ruleTester_1.dedent(templateObject_272 || (templateObject_272 = tslib_1.__makeTemplateObject(["\n      function foo() {\n         return 1\n      }"], ["\n      function foo() {\n         return 1\n      }"]))),
        output: ruleTester_1.dedent(templateObject_273 || (templateObject_273 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return 1\n      }"], ["\n      function foo() {\n        return 1\n      }"]))),
        options: [2],
        errors: expecting([[2, '2 spaces', '3']])
    },
    {
        code: ruleTester_1.dedent(templateObject_274 || (templateObject_274 = tslib_1.__makeTemplateObject(["\n      function foo() {\n         return 1;\n      }"], ["\n      function foo() {\n         return 1;\n      }"]))),
        output: ruleTester_1.dedent(templateObject_275 || (templateObject_275 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return 1;\n      }"], ["\n      function foo() {\n        return 1;\n      }"]))),
        options: [2],
        errors: expecting([[2, '2 spaces', '3']])
    },
    {
        code: ruleTester_1.dedent(templateObject_276 || (templateObject_276 = tslib_1.__makeTemplateObject(["\n      foo(\n      bar,\n        baz,\n          qux);"], ["\n      foo(\n      bar,\n        baz,\n          qux);"]))),
        output: ruleTester_1.dedent(templateObject_277 || (templateObject_277 = tslib_1.__makeTemplateObject(["\n      foo(\n        bar,\n        baz,\n        qux);"], ["\n      foo(\n        bar,\n        baz,\n        qux);"]))),
        options: [2, { CallExpression: { arguments: 1 } }],
        errors: expecting([[2, 2, 0], [4, 2, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_278 || (templateObject_278 = tslib_1.__makeTemplateObject(["\n      foo(\n      \tbar,\n      \tbaz);"], ["\n      foo(\n      \\tbar,\n      \\tbaz);"]))),
        output: ruleTester_1.dedent(templateObject_279 || (templateObject_279 = tslib_1.__makeTemplateObject(["\n      foo(\n          bar,\n          baz);"], ["\n      foo(\n          bar,\n          baz);"]))),
        options: [2, { CallExpression: { arguments: 2 } }],
        errors: expecting([[2, '4 spaces', '1 tab'], [3, '4 spaces', '1 tab']])
    },
    {
        code: ruleTester_1.dedent(templateObject_280 || (templateObject_280 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n      \t\tbaz,\n      \t\tqux);"], ["\n      foo(bar,\n      \\t\\tbaz,\n      \\t\\tqux);"]))),
        output: ruleTester_1.dedent(templateObject_281 || (templateObject_281 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n      \tbaz,\n      \tqux);"], ["\n      foo(bar,\n      \\tbaz,\n      \\tqux);"]))),
        options: ['tab', { CallExpression: { arguments: 1 } }],
        errors: expecting([[2, 1, 2], [3, 1, 2]], 'tab')
    },
    {
        code: ruleTester_1.dedent(templateObject_282 || (templateObject_282 = tslib_1.__makeTemplateObject(["\n      foo(bar, baz,\n               qux);"], ["\n      foo(bar, baz,\n               qux);"]))),
        output: ruleTester_1.dedent(templateObject_283 || (templateObject_283 = tslib_1.__makeTemplateObject(["\n      foo(bar, baz,\n          qux);"], ["\n      foo(bar, baz,\n          qux);"]))),
        options: [2, { CallExpression: { arguments: 'first' } }],
        errors: expecting([[2, 4, 9]])
    },
    {
        code: ruleTester_1.dedent(templateObject_284 || (templateObject_284 = tslib_1.__makeTemplateObject(["\n      foo(\n                bar,\n          baz);"], ["\n      foo(\n                bar,\n          baz);"]))),
        output: ruleTester_1.dedent(templateObject_285 || (templateObject_285 = tslib_1.__makeTemplateObject(["\n      foo(\n                bar,\n                baz);"], ["\n      foo(\n                bar,\n                baz);"]))),
        options: [2, { CallExpression: { arguments: 'first' } }],
        errors: expecting([[3, 10, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_286 || (templateObject_286 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n        1 + 2,\n                    !baz,\n              new Car('!')\n      );"], ["\n      foo(bar,\n        1 + 2,\n                    !baz,\n              new Car('!')\n      );"]))),
        output: ruleTester_1.dedent(templateObject_287 || (templateObject_287 = tslib_1.__makeTemplateObject(["\n      foo(bar,\n            1 + 2,\n            !baz,\n            new Car('!')\n      );"], ["\n      foo(bar,\n            1 + 2,\n            !baz,\n            new Car('!')\n      );"]))),
        options: [2, { CallExpression: { arguments: 3 } }],
        errors: expecting([[2, 6, 2], [3, 6, 14], [4, 6, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_288 || (templateObject_288 = tslib_1.__makeTemplateObject(["\n      return (\n          foo\n          );"], ["\n      return (\n          foo\n          );"]))),
        output: ruleTester_1.dedent(templateObject_289 || (templateObject_289 = tslib_1.__makeTemplateObject(["\n      return (\n          foo\n      );"], ["\n      return (\n          foo\n      );"]))),
        errors: expecting([[3, 0, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_290 || (templateObject_290 = tslib_1.__makeTemplateObject(["\n      return (\n          foo\n          )"], ["\n      return (\n          foo\n          )"]))),
        output: ruleTester_1.dedent(templateObject_291 || (templateObject_291 = tslib_1.__makeTemplateObject(["\n      return (\n          foo\n      )"], ["\n      return (\n          foo\n      )"]))),
        errors: expecting([[3, 0, 4]])
    },
    {
        code: ruleTester_1.dedent(templateObject_292 || (templateObject_292 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n              /* comment */bar();\n      }"], ["\n      if (foo) {\n              /* comment */bar();\n      }"]))),
        output: ruleTester_1.dedent(templateObject_293 || (templateObject_293 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n          /* comment */bar();\n      }"], ["\n      if (foo) {\n          /* comment */bar();\n      }"]))),
        errors: expecting([[2, 4, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_294 || (templateObject_294 = tslib_1.__makeTemplateObject(["\n      foo('bar',\n              /** comment */{\n              ok: true    });"], ["\n      foo('bar',\n              /** comment */{\n              ok: true    });"]))),
        output: ruleTester_1.dedent(templateObject_295 || (templateObject_295 = tslib_1.__makeTemplateObject(["\n      foo('bar',\n          /** comment */{\n              ok: true    });"], ["\n      foo('bar',\n          /** comment */{\n              ok: true    });"]))),
        errors: expecting([[2, 4, 8]])
    },
    {
        code: ruleTester_1.dedent(templateObject_296 || (templateObject_296 = tslib_1.__makeTemplateObject(["\n      foo('bar',\n              {\n              ok: true    });"], ["\n      foo('bar',\n              {\n              ok: true    });"]))),
        output: ruleTester_1.dedent(templateObject_297 || (templateObject_297 = tslib_1.__makeTemplateObject(["\n      foo('bar',\n          {\n              ok: true    });"], ["\n      foo('bar',\n          {\n              ok: true    });"]))),
        errors: expecting([[2, 4, 8]])
    }
]);
ruleTester.addTestGroup('variable-declaration', 'should handle variable declarations', [
    {
        code: ruleTester_1.dedent(templateObject_298 || (templateObject_298 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n      const getState = (store: Store) => store.foo\n      "], ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n      const getState = (store: Store) => store.foo\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_299 || (templateObject_299 = tslib_1.__makeTemplateObject(["\n      const getState = (store: Store) => store.foo\n      "], ["\n      const getState = (store: Store) => store.foo\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_300 || (templateObject_300 = tslib_1.__makeTemplateObject(["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n        const getState = (store: Store) => store.foo\n      "], ["\n      /**\n       * Returns the local state from inside the full redux store's state.\n       */\n        const getState = (store: Store) => store.foo\n      "]))),
        errors: expecting([[4, 0, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_301 || (templateObject_301 = tslib_1.__makeTemplateObject(["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n      ;(client.defaults as any).jar = jar\n      "], ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n      ;(client.defaults as any).jar = jar\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_302 || (templateObject_302 = tslib_1.__makeTemplateObject(["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n       ;(client.defaults as any).jar = jar\n      "], ["\n      const tough = require('tough-cookie')\n      const jar = previousJar || new tough.CookieJar()\n       ;(client.defaults as any).jar = jar\n      "]))),
        errors: expecting([[3, 0, 1]])
    }
]);
ruleTester.addTestGroup('interfaces', 'should check indentation on interfaces', [
    {
        code: ruleTester_1.dedent(templateObject_303 || (templateObject_303 = tslib_1.__makeTemplateObject(["\n      interface Foo {\n        a: number;\n      }\n      "], ["\n      interface Foo {\n        a: number;\n      }\n      "]))),
        output: ruleTester_1.dedent(templateObject_304 || (templateObject_304 = tslib_1.__makeTemplateObject(["\n      interface Foo {\n          a: number;\n      }\n      "], ["\n      interface Foo {\n          a: number;\n      }\n      "]))),
        errors: expecting([[2, 4, 2]])
    },
    {
        code: ruleTester_1.dedent(templateObject_305 || (templateObject_305 = tslib_1.__makeTemplateObject(["\n      interface Foo extends Bar {\n        a: number;\n          b: {\n             c: string;\n           };\n        }\n      "], ["\n      interface Foo extends Bar {\n        a: number;\n          b: {\n             c: string;\n           };\n        }\n      "]))),
        output: ruleTester_1.dedent(templateObject_306 || (templateObject_306 = tslib_1.__makeTemplateObject(["\n      interface Foo extends Bar {\n          a: number;\n          b: {\n              c: string;\n          };\n      }\n      "], ["\n      interface Foo extends Bar {\n          a: number;\n          b: {\n              c: string;\n          };\n      }\n      "]))),
        errors: expecting([
            [2, 4, 2],
            [4, 8, 7],
            [5, 4, 5],
            [6, 0, 2]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_307 || (templateObject_307 = tslib_1.__makeTemplateObject(["\n      interface Foo extends Bar {\n        a: number;\n        b: {\n          c: string;\n        };\n      }\n      "], ["\n      interface Foo extends Bar {\n        a: number;\n        b: {\n          c: string;\n        };\n      }\n      "]))),
        options: [2]
    }
]);
ruleTester.addTestGroupWithConfig('issue-254', 'reporting as a false positive', [
    2,
    {
        'SwitchCase': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': {
            'parameters': 1
        },
        'FunctionExpression': {
            'parameters': 1
        },
        'CallExpression': {
            arguments: 1
        }
    }
], [
    {
        code: ruleTester_1.dedent(templateObject_308 || (templateObject_308 = tslib_1.__makeTemplateObject(["\n      foo = this.actions$\n        .ofType(\n          'foo',\n          'bar'\n        );\n      "], ["\n      foo = this.actions$\n        .ofType(\n          'foo',\n          'bar'\n        );\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_309 || (templateObject_309 = tslib_1.__makeTemplateObject(["\n      foo = this\n        .actions$\n        .ofType(\n          'foo',\n          'bar'\n        );\n      "], ["\n      foo = this\n        .actions$\n        .ofType(\n          'foo',\n          'bar'\n        );\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_310 || (templateObject_310 = tslib_1.__makeTemplateObject(["\n      foo = this.actions$.ofType(\n        'foo',\n        'bar'\n      );\n      "], ["\n      foo = this.actions$.ofType(\n        'foo',\n        'bar'\n      );\n      "])))
    },
    {
        code: ruleTester_1.dedent(templateObject_311 || (templateObject_311 = tslib_1.__makeTemplateObject(["\n      foo = this.actions$.ofType\n        (\n          'foo',\n          'bar'\n        );\n      "], ["\n      foo = this.actions$.ofType\n        (\n          'foo',\n          'bar'\n        );\n      "])))
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67, templateObject_68, templateObject_69, templateObject_70, templateObject_71, templateObject_72, templateObject_73, templateObject_74, templateObject_75, templateObject_76, templateObject_77, templateObject_78, templateObject_79, templateObject_80, templateObject_81, templateObject_82, templateObject_83, templateObject_84, templateObject_85, templateObject_86, templateObject_87, templateObject_88, templateObject_89, templateObject_90, templateObject_91, templateObject_92, templateObject_93, templateObject_94, templateObject_95, templateObject_96, templateObject_97, templateObject_98, templateObject_99, templateObject_100, templateObject_101, templateObject_102, templateObject_103, templateObject_104, templateObject_105, templateObject_106, templateObject_107, templateObject_108, templateObject_109, templateObject_110, templateObject_111, templateObject_112, templateObject_113, templateObject_114, templateObject_115, templateObject_116, templateObject_117, templateObject_118, templateObject_119, templateObject_120, templateObject_121, templateObject_122, templateObject_123, templateObject_124, templateObject_125, templateObject_126, templateObject_127, templateObject_128, templateObject_129, templateObject_130, templateObject_131, templateObject_132, templateObject_133, templateObject_134, templateObject_135, templateObject_136, templateObject_137, templateObject_138, templateObject_139, templateObject_140, templateObject_141, templateObject_142, templateObject_143, templateObject_144, templateObject_145, templateObject_146, templateObject_147, templateObject_148, templateObject_149, templateObject_150, templateObject_151, templateObject_152, templateObject_153, templateObject_154, templateObject_155, templateObject_156, templateObject_157, templateObject_158, templateObject_159, templateObject_160, templateObject_161, templateObject_162, templateObject_163, templateObject_164, templateObject_165, templateObject_166, templateObject_167, templateObject_168, templateObject_169, templateObject_170, templateObject_171, templateObject_172, templateObject_173, templateObject_174, templateObject_175, templateObject_176, templateObject_177, templateObject_178, templateObject_179, templateObject_180, templateObject_181, templateObject_182, templateObject_183, templateObject_184, templateObject_185, templateObject_186, templateObject_187, templateObject_188, templateObject_189, templateObject_190, templateObject_191, templateObject_192, templateObject_193, templateObject_194, templateObject_195, templateObject_196, templateObject_197, templateObject_198, templateObject_199, templateObject_200, templateObject_201, templateObject_202, templateObject_203, templateObject_204, templateObject_205, templateObject_206, templateObject_207, templateObject_208, templateObject_209, templateObject_210, templateObject_211, templateObject_212, templateObject_213, templateObject_214, templateObject_215, templateObject_216, templateObject_217, templateObject_218, templateObject_219, templateObject_220, templateObject_221, templateObject_222, templateObject_223, templateObject_224, templateObject_225, templateObject_226, templateObject_227, templateObject_228, templateObject_229, templateObject_230, templateObject_231, templateObject_232, templateObject_233, templateObject_234, templateObject_235, templateObject_236, templateObject_237, templateObject_238, templateObject_239, templateObject_240, templateObject_241, templateObject_242, templateObject_243, templateObject_244, templateObject_245, templateObject_246, templateObject_247, templateObject_248, templateObject_249, templateObject_250, templateObject_251, templateObject_252, templateObject_253, templateObject_254, templateObject_255, templateObject_256, templateObject_257, templateObject_258, templateObject_259, templateObject_260, templateObject_261, templateObject_262, templateObject_263, templateObject_264, templateObject_265, templateObject_266, templateObject_267, templateObject_268, templateObject_269, templateObject_270, templateObject_271, templateObject_272, templateObject_273, templateObject_274, templateObject_275, templateObject_276, templateObject_277, templateObject_278, templateObject_279, templateObject_280, templateObject_281, templateObject_282, templateObject_283, templateObject_284, templateObject_285, templateObject_286, templateObject_287, templateObject_288, templateObject_289, templateObject_290, templateObject_291, templateObject_292, templateObject_293, templateObject_294, templateObject_295, templateObject_296, templateObject_297, templateObject_298, templateObject_299, templateObject_300, templateObject_301, templateObject_302, templateObject_303, templateObject_304, templateObject_305, templateObject_306, templateObject_307, templateObject_308, templateObject_309, templateObject_310, templateObject_311;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVySW5kZW50UnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFrRjtBQUtsRixJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXRELFNBQVMsU0FBUyxDQUFDLE1BQXVDLEVBQUUsVUFBNEI7SUFBNUIsMkJBQUEsRUFBQSxvQkFBNEI7SUFDdEYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM1RCxPQUFPLEdBQUcsNkJBQTJCLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQU0sS0FBSyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsT0FBTyxHQUFHLDZCQUEyQixHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQUksS0FBSyxtQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztTQUM3RTtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsT0FBTztZQUNoQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxzREFBc0QsRUFBRTtJQUM1RixnRkFBZ0Y7SUFDaEYs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QUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNwRCxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVCxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsR0FBRyxFQUFFLENBQUMsRUFB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RDtRQUNFLElBQUksRUFBRSxtQkFBTSw0TUFBQSw2SEFNUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2RCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDaEM7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxtS0FBQSxvRkFJUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSw0UEFBQSw2S0FTUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSwyS0FBQSw0RkFLUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxT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RUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNoRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyRDtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLHVLQUFBLHdGQUtSLElBQUE7UUFDSixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDakUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxrTkFBQSxtSUFLUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3RFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa0xBQUEs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RSxJQUFJLEVBQUUsbUJBQU0seU1BQUEsMEhBT1QsSUFBQTtRQUNILE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNiO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLHNCQUFzQixDQUMvQixXQUFXLEVBQ1gsK0JBQStCLEVBQy9CO0lBQ0UsQ0FBQztJQUNEO1FBQ0UsWUFBWSxFQUFFLENBQUM7UUFDZixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLHFCQUFxQixFQUFFO1lBQ3JCLFlBQVksRUFBRSxDQUFDO1NBQ2hCO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEIsWUFBWSxFQUFFLENBQUM7U0FDaEI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixTQUFTLEVBQUUsQ0FBQztTQUNiO0tBQ0Y7Q0FDRixFQUNEO0lBQ0U7UUFDRSxJQUFJLEVBQUUsbUJBQU0scUxBQUEsc0dBTVgsSUFBQTtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sK0xBQUEsZ0hBT1gsSUFBQTtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0scUtBQUEsc0ZBS1gsSUFBQTtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0scUxBQUEsc0dBTVgsSUFBQTtLQUNGO0NBQ0YsQ0FDRixDQUFDO0FBRUYsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvdGVySW5kZW50UnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
