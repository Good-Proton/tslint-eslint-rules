"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('handle-callback-err');
var error = {
    failure: 'Expected error to be handled',
    startPosition: new ruleTester_1.Position(),
    endPosition: new ruleTester_1.Position()
};
var strictError = {
    failure: 'Expected error to be handled without property access at least once',
    startPosition: new ruleTester_1.Position(),
    endPosition: new ruleTester_1.Position()
};
ruleTester.addTestGroup('standard-pass', 'should pass with standard config', [
    'function(stream) {}',
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    function loadData (err, data) {\n      if (err) {\n          console.log(err.stack);\n      }\n      doSomething();\n    }"], ["\n    function loadData (err, data) {\n      if (err) {\n          console.log(err.stack);\n      }\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    function loadData (Err, data) {\n      if (Err) {\n          console.log(Err.stack);\n      }\n      doSomething();\n    }"], ["\n    function loadData (Err, data) {\n      if (Err) {\n          console.log(Err.stack);\n      }\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    function test (cb) {\n      doSomething(function (err) {\n        cb(err)\n      })\n    }"], ["\n    function test (cb) {\n      doSomething(function (err) {\n        cb(err)\n      })\n    }"]))),
    ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    app.listen(PORT, err => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], ["\n    app.listen(PORT, err => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "]))),
    ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    app.listen(PORT, (err) => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "], ["\n    app.listen(PORT, (err) => {\n      if (err) {\n        console.log(err);\n        return;\n      }\n    }\n    "]))),
    "function handle (arg, err) {}"
]);
ruleTester.addTestGroup('standard-fail', 'should fail with standard config', [
    {
        code: "function(err, stream) { stream.on('done', function(){exit(0)} }",
        errors: [error]
    },
    {
        code: "function loadData (err, data) { doSomething(); }",
        errors: [error]
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      test(function (err) {\n        console.log('hello world')\n      })"], ["\n      test(function (err) {\n        console.log('hello world')\n      })"]))),
        errors: [error]
    },
    { code: "test(err => undefined)", errors: [error] },
    { code: "const cb = (err) => null", errors: [error] },
    { code: "var cb = function (err) {}", errors: [error] },
    { code: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    function loadData (err, data) {\n      if (error) {\n          console.log(error.stack);\n      }\n      doSomething();\n    }"], ["\n    function loadData (err, data) {\n      if (error) {\n          console.log(error.stack);\n      }\n      doSomething();\n    }"]))), errors: [error] }
]);
ruleTester.addTestGroup('custom-error-name-pass', 'should pass with custom error name', [
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n      function isRecoverable (error: TSError) {\n        return error.diagnostics.every(x => RECOVERY_CODES.indexOf(x.code) > -1)\n     }"], ["\n      function isRecoverable (error: TSError) {\n        return error.diagnostics.every(x => RECOVERY_CODES.indexOf(x.code) > -1)\n     }"]))),
        options: ['error']
    },
    {
        code: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"]))),
        options: ['error']
    },
    { code: "function(errorMsg, stream) { console.error(errorMsg) }", options: ['errorMsg'] },
    { code: "function(err, stream) { }", options: ['errorMsg'] }
]);
ruleTester.addTestGroup('custom-error-name-fail', 'should fail with custom error name', [
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n      const foo = (error: TSError) => {\n        return one.two.three.error.four.five(0);\n      }"], ["\n      const foo = (error: TSError) => {\n        return one.two.three.error.four.five(0);\n      }"]))),
        options: ['error'],
        errors: [error]
    },
    {
        code: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"], ["\n      const foo = (error: TSError) => {\n        return error.one.two.three.four.five(0);\n      }"]))),
        options: ['error', { allowProperties: false }],
        errors: [strictError]
    },
    { code: "function(errorMsg, stream) { }", options: ['errorMsg'], errors: [error] },
    {
        code: "error => console.error('Could not print the document');",
        options: ['error'],
        errors: [error]
    },
    {
        code: "error => something.something.error.something.err('Could not print the document');",
        options: ['^(err|error)$'],
        errors: [error]
    },
    {
        code: "error => console.error(error.stack);",
        options: ['^(err|error)$']
    },
    {
        code: "error => console.error(error.stack);",
        options: ['^(err|error)$', { allowProperties: false }],
        errors: [strictError]
    },
    {
        code: 'var test = err => err.message;',
        options: [{ allowProperties: false }],
        errors: [strictError]
    },
    {
        code: "error => error ? console.error(error.stack) : console.log('no error');",
        options: ['^(err|error)$']
    },
    {
        code: "error => error ? console.error(error.stack) : console.log('no error');",
        options: ['^(err|error)$', { allowProperties: false }]
    }
]);
ruleTester.addTestGroup('custom-error-regex-pass', 'should pass with custom error regex', [
    {
        code: "function(errorMsg, stream) { console.error(errorMsg) }",
        options: ['^(err|error|errorMsg)$']
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      function query (cb) {\n        doThing(function (err) {\n          closeConnection(function (closeErr) {\n            cb(err || closeErr)\n          })\n        })\n      }"], ["\n      function query (cb) {\n        doThing(function (err) {\n          closeConnection(function (closeErr) {\n            cb(err || closeErr)\n          })\n        })\n      }"]))),
        options: ['^(err|closeErr)$']
    }
]);
ruleTester.addTestGroup('custom-error-regex-fail', 'should fail with custom error regex', [
    {
        code: "function(err, stream) { }",
        options: ['^(err|error|errorMsg)$'],
        errors: [error]
    },
    {
        code: "function(error, stream) { }",
        options: ['^(err|error|errorMsg)$'],
        errors: [error]
    },
    {
        code: "function(errorMsg, stream) { }",
        options: ['^(err|error|errorMsg)$'],
        errors: [error]
    }
]);
ruleTester.addTestGroup('eslint-valid', 'should pass eslint valid tests', [
    'function test(error) {}',
    'function test(err) {console.log(err);}',
    "function test(err, data) {if(err){ data = 'ERROR';}}",
    'var test = function(err) {console.log(err);};',
    'var test = function(err) {if(err){/* do nothing */}};',
    'var test = function(err) {if(!err){doSomethingHere();}else{};}',
    'var test = function(err, data) {if(!err) { good(); } else { bad(); }}',
    'try { } catch(err) {}',
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      function test(err) {\n        try {\n          console.log('error', err);\n          throw Error('some error');\n        } catch (err) {\n          console.log('Did you handle the original error?', err);\n        }\n      }"], ["\n      function test(err) {\n        try {\n          console.log('error', err);\n          throw Error('some error');\n        } catch (err) {\n          console.log('Did you handle the original error?', err);\n        }\n      }"])))
    },
    ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n    getData(function(err, data) {\n      if (err) {}\n      getMoreDataWith(data, function(err, moreData) {\n        if (err) {}\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], ["\n    getData(function(err, data) {\n      if (err) {}\n      getMoreDataWith(data, function(err, moreData) {\n        if (err) {}\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"]))),
    'var test = function(err) {if(! err){doSomethingHere();}};',
    ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n    function test(err, data) {\n      if (data) {\n        doSomething(function(err) {\n          console.error(err);\n        });\n      } else if (err) {\n        console.log(err);\n      }\n    }"], ["\n    function test(err, data) {\n      if (data) {\n        doSomething(function(err) {\n          console.error(err);\n        });\n      } else if (err) {\n        console.log(err);\n      }\n    }"]))),
    ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n    function handler(err, data) {\n      if (data) {\n        doSomethingWith(data);\n      } else if (err) {\n        console.log(err);\n      }\n    }"], ["\n    function handler(err, data) {\n      if (data) {\n        doSomethingWith(data);\n      } else if (err) {\n        console.log(err);\n      }\n    }"]))),
    'function handler(err) {logThisAction(function(err) {if (err) {}}); console.log(err);}',
    'function userHandler(err) {process.nextTick(function() {if (err) {}})}',
    ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n    function help() {\n      function userHandler(err) {\n        function tester() {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], ["\n    function help() {\n      function userHandler(err) {\n        function tester() {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"]))),
    "function help(done) { var err = new Error('error'); done(); }",
    { code: 'var test = err => err;' },
    { code: 'var test = err => !err;' },
    { code: 'var test = err => err.message;' },
    { code: 'var test = function(error) {if(error){/* do nothing */}};', options: ['error'] },
    { code: 'var test = (error) => {if(error){/* do nothing */}};', options: ['error'] },
    { code: 'var test = function(error) {if(! error){doSomethingHere();}};', options: ['error'] },
    { code: 'var test = function(err) { console.log(err); };', options: ['^(err|error)$'] },
    { code: 'var test = function(error) { console.log(error); };', options: ['^(err|error)$'] },
    { code: 'var test = function(anyError) { console.log(anyError); };', options: ['^.+Error$'] },
    { code: 'var test = function(any_error) { console.log(anyError); };', options: ['^.+Error$'] },
    {
        code: 'var test = function(any_error) { console.log(any_error); };',
        options: ['^.+(e|E)rror$']
    }
]);
ruleTester.addTestGroup('eslint-invalid', 'should fail eslint invalid tests', [
    { code: 'function test(err) {}', errors: [error] },
    { code: 'function test(err, data) {}', errors: [error] },
    { code: 'function test(err) {errorLookingWord();}', errors: [error] },
    { code: 'function test(err) {try{} catch(err) {}}', errors: [error] },
    {
        code: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n      function test(err) {\n        try{}\n        catch(err) {\n          console.log('did not handle the test err', err);\n        }\n      }"], ["\n      function test(err) {\n        try{}\n        catch(err) {\n          console.log('did not handle the test err', err);\n        }\n      }"]))),
        errors: [error]
    },
    { code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n      function test(err, callback) {\n        foo(function(err, callback) {\n        });\n      }"], ["\n      function test(err, callback) {\n        foo(function(err, callback) {\n        });\n      }"]))), errors: [error, error] },
    { code: 'var test = (err) => {};', errors: [error] },
    { code: 'var test = function(err) {};', errors: [error] },
    { code: 'var test = function test(err, data) {};', errors: [error] },
    { code: 'var test = function test(err) {/* if(err){} */};', errors: [error] },
    { code: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n      function test(err) {\n        doSomethingHere(function(err){\n          console.log(err);\n        })\n      }"], ["\n      function test(err) {\n        doSomethingHere(function(err){\n          console.log(err);\n        })\n      }"]))), errors: [error] },
    { code: 'function test(error) {}', options: ['error'], errors: [error] },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n      getData(function(err, data) {\n        getMoreDataWith(data, function(err, moreData) {\n          if (err) {}\n          getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n            if (err) {}\n          });\n        });\n      });"], ["\n      getData(function(err, data) {\n        getMoreDataWith(data, function(err, moreData) {\n          if (err) {}\n          getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n            if (err) {}\n          });\n        });\n      });"]))),
        errors: [error]
    },
    { code: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n    getData(function(err, data) {\n      getMoreDataWith(data, function(err, moreData) {\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"], ["\n    getData(function(err, data) {\n      getMoreDataWith(data, function(err, moreData) {\n        getEvenMoreDataWith(moreData, function(err, allOfTheThings) {\n          if (err) {}\n        });\n      });\n    });"]))), errors: [error, error] },
    { code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n    function userHandler(err) {\n      logThisAction(function(err) {\n        if (err) {\n          console.log(err);\n        }\n      })\n    }"], ["\n    function userHandler(err) {\n      logThisAction(function(err) {\n        if (err) {\n          console.log(err);\n        }\n      })\n    }"]))), errors: [error] },
    { code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n    function help() {\n      function userHandler(err) {\n        function tester(err) {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"], ["\n    function help() {\n      function userHandler(err) {\n        function tester(err) {\n          err;\n          process.nextTick(function() {\n            err;\n          });\n        }\n      }\n    }"]))), errors: [error] },
    {
        code: 'var test = function(anyError) { console.log(otherError); };',
        options: ['^.+Error$'],
        errors: [error]
    },
    {
        code: 'var test = function(anyError) { };',
        options: ['^.+Error$'],
        errors: [error]
    },
    {
        code: 'var test = function(err) { console.log(error); };',
        options: ['^(err|error)$'],
        errors: [error]
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFFO0FBR3JFLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRXpELElBQU0sS0FBSyxHQUFZO0lBQ3JCLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsYUFBYSxFQUFFLElBQUkscUJBQVEsRUFBRTtJQUM3QixXQUFXLEVBQUUsSUFBSSxxQkFBUSxFQUFFO0NBQzVCLENBQUM7QUFDRixJQUFNLFdBQVcsR0FBWTtJQUMzQixPQUFPLEVBQUUsb0VBQW9FO0lBQzdFLGFBQWEsRUFBRSxJQUFJLHFCQUFRLEVBQUU7SUFDN0IsV0FBVyxFQUFFLElBQUkscUJBQVEsRUFBRTtDQUM1QixDQUFDO0FBRUYsVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0NBQWtDLEVBQUU7SUFDM0UscUJBQXFCO0lBQ3JCLG1CQUFNLDZNQUFBLGtJQU1GO0lBQ0osbUJBQU0sNk1BQUEsa0lBTUY7SUFDSixtQkFBTSw2S0FBQSxrR0FLRjtJQUNKLG1CQUFNLGdNQUFBLHFIQU9IO0lBQ0gsbUJBQU0sa01BQUEsdUhBT0g7SUFDSCwrQkFBK0I7Q0FDaEMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0NBQWtDLEVBQUU7SUFDM0U7UUFDRSxJQUFJLEVBQUUsaUVBQWlFO1FBQ3ZFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGtEQUFrRDtRQUN4RCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSx3SkFBQSw2RUFHUCxJQUFBO1FBQ0wsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsbUJBQU0saU5BQUEsc0lBTVYsSUFBQSxFQUNGLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNoQjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsb0NBQW9DLEVBQUU7SUFDdEY7UUFDRSxJQUFJLEVBQUUsbUJBQU0sd05BQUEsNklBR1QsSUFBQTtRQUNILE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNuQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLGlMQUFBLHNHQUdSLElBQUE7UUFDSixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbkI7SUFDRCxFQUFFLElBQUksRUFBRSx3REFBd0QsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUN6RixFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtDQUM3RCxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLG9DQUFvQyxFQUFFO0lBQ3RGO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLG1MQUFBLHNHQUdSLElBQUE7UUFDSixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sbUxBQUEsc0dBR1IsSUFBQTtRQUNKLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM5QyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7S0FDdEI7SUFDRCxFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNsRjtRQUNFLElBQUksRUFBRSx5REFBeUQ7UUFDL0QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1GQUFtRjtRQUN6RixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDMUIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsc0NBQXNDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUMzQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDdEQsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQ3RCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE9BQU8sRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUN0QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHdFQUF3RTtRQUM5RSxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7S0FDM0I7SUFDRDtRQUNFLElBQUksRUFBRSx3RUFBd0U7UUFDOUUsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQ3ZEO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSxxQ0FBcUMsRUFBRTtJQUN4RjtRQUNFLElBQUksRUFBRSx3REFBd0Q7UUFDOUQsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7S0FDcEM7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxtUUFBQSxzTEFPUixJQUFBO1FBQ0osT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7S0FDOUI7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUF5QixFQUFFLHFDQUFxQyxFQUFFO0lBQ3hGO1FBQ0UsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztRQUNuQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRDtRQUNFLElBQUksRUFBRSw2QkFBNkI7UUFDbkMsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDbkMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ25DLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLGdDQUFnQyxFQUFFO0lBQ3hFLHlCQUF5QjtJQUN6Qix3Q0FBd0M7SUFDeEMsc0RBQXNEO0lBQ3RELCtDQUErQztJQUMvQyx1REFBdUQ7SUFDdkQsZ0VBQWdFO0lBQ2hFLHVFQUF1RTtJQUN2RSx1QkFBdUI7SUFDdkI7UUFDRSxJQUFJLEVBQUUsbUJBQU0sc1RBQUEseU9BUVIsSUFBQTtLQUNMO0lBQ0QsbUJBQU0sZ1ZBQUEsbVFBU0E7SUFDTiwyREFBMkQ7SUFDM0QsbUJBQU0sdVJBQUEsME1BU0Y7SUFDSixtQkFBTSx5T0FBQSw0SkFPRjtJQUNKLHVGQUF1RjtJQUN2Rix3RUFBd0U7SUFDeEUsbUJBQU0sMlJBQUEsOE1BVUY7SUFDSiwrREFBK0Q7SUFDL0QsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7SUFDbEMsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUU7SUFDbkMsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUU7SUFDMUMsRUFBRSxJQUFJLEVBQUUsMkRBQTJELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDekYsRUFBRSxJQUFJLEVBQUUsc0RBQXNELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDcEYsRUFBRSxJQUFJLEVBQUUsK0RBQStELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDN0YsRUFBRSxJQUFJLEVBQUUsaURBQWlELEVBQUUsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDdkYsRUFBRSxJQUFJLEVBQUUscURBQXFELEVBQUUsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDM0YsRUFBRSxJQUFJLEVBQUUsMkRBQTJELEVBQUUsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDN0YsRUFBRSxJQUFJLEVBQUUsNERBQTRELEVBQUUsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDOUY7UUFDRSxJQUFJLEVBQUUsNkRBQTZEO1FBQ25FLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUMzQjtDQUNGLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsa0NBQWtDLEVBQUU7SUFDNUUsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsMENBQTBDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDckUsRUFBRSxJQUFJLEVBQUUsMENBQTBDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDckU7UUFDRSxJQUFJLEVBQUUsbUJBQU0sZ09BQUEsbUpBTVIsSUFBQTtRQUNKLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUNELEVBQUUsSUFBSSxFQUFFLG1CQUFNLGtMQUFBLHFHQUlSLElBQUEsRUFDSixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQ3ZCO0lBQ0QsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUseUNBQXlDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDcEUsRUFBRSxJQUFJLEVBQUUsa0RBQWtELEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDN0UsRUFBRSxJQUFJLEVBQUUsbUJBQU0scU1BQUEsd0hBS1IsSUFBQSxFQUNKLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNoQjtJQUNELEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ3hFO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDZVQUFBLGdRQVFOLElBQUE7UUFDTixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRCxFQUFFLElBQUksRUFBRSxtQkFBTSx3U0FBQSwyTkFPUixJQUFBLEVBQ0osTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUN2QjtJQUNELEVBQUUsSUFBSSxFQUFFLG1CQUFNLGtPQUFBLHFKQU9WLElBQUEsRUFDRixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBQztJQUNsQixFQUFFLElBQUksRUFBRSxtQkFBTSw4UkFBQSxpTkFVVixJQUFBLEVBQ0YsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsNkRBQTZEO1FBQ25FLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN0QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRDtRQUNFLElBQUksRUFBRSxvQ0FBb0M7UUFDMUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUFDO0lBQ2xCO1FBQ0UsSUFBSSxFQUFFLG1EQUFtRDtRQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDMUIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
