"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('brace-style');
var fail = {
    open: 'Opening curly brace does not appear on the same line as controlling statement.',
    openAllman: 'Opening curly brace appears on the same line as controlling statement.',
    body: 'Statement inside of curly braces should be on next line.',
    close: 'Closing curly brace does not appear on the same line as the subsequent block.',
    closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
    closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
};
function expecting(errors) {
    return errors.map(function (err) {
        return {
            failure: err,
            startPosition: new ruleTester_1.Position(),
            endPosition: new ruleTester_1.Position()
        };
    });
}
ruleTester.addTestGroupWithConfig('onetbs-valid', 'should pass when "1tbs"', ['1tbs'], [
    ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    function foo() {\n      return true;\n    }"], ["\n    function foo() {\n      return true;\n    }"]))),
    ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    if (foo) {\n      bar();\n    }"], ["\n    if (foo) {\n      bar();\n    }"]))),
    ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    if (foo) {\n      bar();\n    } else {\n      baz();\n    }"], ["\n    if (foo) {\n      bar();\n    } else {\n      baz();\n    }"]))),
    ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    } catch(e) {\n      handleError();\n    }"], ["\n    try {\n      somethingRisky();\n    } catch(e) {\n      handleError();\n    }"]))),
    ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    } catch(e) {\n      handleError();\n    } finally() {\n      doSomething();\n    }"], ["\n    try {\n      somethingRisky();\n    } catch(e) {\n      handleError();\n    } finally() {\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    } finally() {\n      doSomething();\n    } catch(e) {\n      handleError();\n    }"], ["\n    try {\n      somethingRisky();\n    } finally() {\n      doSomething();\n    } catch(e) {\n      handleError();\n    }"]))),
    ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    } finally() {\n      doSomething();\n    }"], ["\n    try {\n      somethingRisky();\n    } finally() {\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n    if (foo) bar();\n    else if (baz) boom();"], ["\n    if (foo) bar();\n    else if (baz) boom();"])))
]);
ruleTester.addTestGroupWithConfig('onetbs-invalid', 'should fail when "1tbs"', ['1tbs'], [
    {
        code: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n      function foo()\n      {\n        return true;\n      }"], ["\n      function foo()\n      {\n        return true;\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n      if (foo)\n      {\n        bar();\n      }"], ["\n      if (foo)\n      {\n        bar();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }\n      } finally(e)\n      {\n        doSomething();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }\n      } finally(e)\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } finally(e)\n      {\n        doSomething();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } finally(e)\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }"], ["\n      if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      } else { baz(); }"], ["\n      if (foo) {\n        bar();\n      } else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    }
]);
ruleTester.addTestGroupWithConfig('stroustrup-valid', 'should pass when "stroustrup"', ['stroustrup'], [
    ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n    function foo() {\n      return true;\n    }"], ["\n    function foo() {\n      return true;\n    }"]))),
    ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n    if (foo) {\n      bar();\n    }"], ["\n    if (foo) {\n      bar();\n    }"]))),
    ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n    if (foo) {\n      bar();\n    }\n    else {\n      baz();\n    }"], ["\n    if (foo) {\n      bar();\n    }\n    else {\n      baz();\n    }"]))),
    ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    }\n    catch(e) {\n      handleError();\n    }"], ["\n    try {\n      somethingRisky();\n    }\n    catch(e) {\n      handleError();\n    }"]))),
    ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    }\n    catch(e) {\n      handleError();\n    }\n    finally() {\n      doSomething();\n    }\n    "], ["\n    try {\n      somethingRisky();\n    }\n    catch(e) {\n      handleError();\n    }\n    finally() {\n      doSomething();\n    }\n    "]))),
    ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n    try {\n      somethingRisky();\n    }\n    finally {\n      doSomething();\n    }"], ["\n    try {\n      somethingRisky();\n    }\n    finally {\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n    if (foo) bar();\n    else if (baz) boom();"], ["\n    if (foo) bar();\n    else if (baz) boom();"])))
]);
ruleTester.addTestGroupWithConfig('stroustrup-invalid', 'should fail when "stroustrup"', ['stroustrup'], [
    {
        code: ruleTester_1.dedent(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n      function foo()\n      {\n        return true;\n      }"], ["\n      function foo()\n      {\n        return true;\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n      if (foo)\n      {\n        bar();\n      }"], ["\n      if (foo)\n      {\n        bar();\n      }"]))),
        errors: expecting([fail.open])
    },
    {
        code: ruleTester_1.dedent(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"]))),
        errors: expecting([fail.open, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.open, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.open, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      } else {\n        baz();\n      }"], ["\n      if (foo) {\n        bar();\n      } else {\n        baz();\n      }"]))),
        errors: expecting([fail.openAllman])
    }
]);
ruleTester.addTestGroupWithConfig('allman-valid', 'should pass when "allman"', ['allman'], [
    ruleTester_1.dedent(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["\n    function foo()\n    {\n      return true;\n    }"], ["\n    function foo()\n    {\n      return true;\n    }"]))),
    ruleTester_1.dedent(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["\n    if (foo)\n    {\n      bar();\n    }"], ["\n    if (foo)\n    {\n      bar();\n    }"]))),
    ruleTester_1.dedent(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["\n    if (foo)\n    {\n      bar();\n    }\n    else\n    {\n      baz();\n    }"], ["\n    if (foo)\n    {\n      bar();\n    }\n    else\n    {\n      baz();\n    }"]))),
    ruleTester_1.dedent(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["\n    try\n    {\n      somethingRisky();\n    }\n    catch(e)\n    {\n      handleError();\n    }"], ["\n    try\n    {\n      somethingRisky();\n    }\n    catch(e)\n    {\n      handleError();\n    }"]))),
    ruleTester_1.dedent(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["\n    try\n    {\n      somethingRisky();\n    }\n    catch(e)\n    {\n      handleError();\n    }\n    finally()\n    {\n      doSomething();\n    }"], ["\n    try\n    {\n      somethingRisky();\n    }\n    catch(e)\n    {\n      handleError();\n    }\n    finally()\n    {\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["\n    try\n    {\n      somethingRisky();\n    }\n    finally()\n    {\n      doSomething();\n    }"], ["\n    try\n    {\n      somethingRisky();\n    }\n    finally()\n    {\n      doSomething();\n    }"]))),
    ruleTester_1.dedent(templateObject_35 || (templateObject_35 = tslib_1.__makeTemplateObject(["\n    if (foo) bar();\n    else if (baz) boom();"], ["\n    if (foo) bar();\n    else if (baz) boom();"])))
]);
ruleTester.addTestGroupWithConfig('allman-invalid', 'should fail when "allman"', ['allman'], [
    {
        code: ruleTester_1.dedent(templateObject_36 || (templateObject_36 = tslib_1.__makeTemplateObject(["\n      function foo() {\n        return true;\n      }"], ["\n      function foo() {\n        return true;\n      }"]))),
        errors: expecting([fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_37 || (templateObject_37 = tslib_1.__makeTemplateObject(["\n      if (foo)\n      {\n        bar(); }"], ["\n      if (foo)\n      {\n        bar(); }"]))),
        errors: expecting([fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_38 || (templateObject_38 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"], ["\n      try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }"]))),
        errors: expecting([fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_39 || (templateObject_39 = tslib_1.__makeTemplateObject(["\n      try {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }"], ["\n      try {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      } finally()\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_40 || (templateObject_40 = tslib_1.__makeTemplateObject(["\n      try {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }"], ["\n      try {\n        somethingRisky();\n      } finally()\n      {\n        doSomething();\n      }"]))),
        errors: expecting([fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_41 || (templateObject_41 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      } else {\n        baz();\n      }"], ["\n      if (foo) {\n        bar();\n      } else {\n        baz();\n      }"]))),
        errors: expecting([fail.openAllman])
    }
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-onetbs', 'should pass when "1tbs" and "allowSingleLine" is true', ['1tbs', { allowSingleLine: true }], [
    "function nop() { return; }",
    "if (foo) { bar(); }",
    "if (foo) { bar(); } else { baz(); }",
    "try { somethingRisky(); } catch(e) { handleError(); }",
    "try { somethingRisky(); } catch(e) { handleError(); } finally() { doSomething(); }",
    "try { somethingRisky(); } finally(e) { doSomething(); }",
    ruleTester_1.dedent(templateObject_42 || (templateObject_42 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      } else { baz(); }"], ["\n      if (foo) {\n        bar();\n      } else { baz(); }"]))),
    ruleTester_1.dedent(templateObject_43 || (templateObject_43 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      } catch(e) { bar(); }"], ["\n      try {\n        foo();\n      } catch(e) { bar(); }"]))),
    ruleTester_1.dedent(templateObject_44 || (templateObject_44 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      } catch(e) { bar(); }\n      } finally() { doSomething(); }"], ["\n      try {\n        foo();\n      } catch(e) { bar(); }\n      } finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_45 || (templateObject_45 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      } finally() { doSomething(); }"], ["\n      try {\n        foo();\n      } finally() { doSomething(); }"])))
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-onetbs-invalid', 'should fail when "1tbs" and "allowSingleLine" is false', ['1tbs', { allowSingleLine: false }], [
    {
        code: "function nop() { return; }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "if (foo) { bar(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "if (foo) { bar(); } else { baz(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "try { somethingRisky(); } catch(e) { handleError(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "try { somethingRisky(); } catch(e) { handleError(); } finally() { doSomething(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "try { somethingRisky(); } finally(e) { doSomething(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_46 || (templateObject_46 = tslib_1.__makeTemplateObject(["\n        if (foo) {\n          bar();\n        } else { baz(); }"], ["\n        if (foo) {\n          bar();\n        } else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_47 || (templateObject_47 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        } catch(e) { bar(); }"], ["\n        try {\n          foo();\n        } catch(e) { bar(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_48 || (templateObject_48 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        } catch(e) { bar(); }\n        } finally() { doSomething(); }"], ["\n        try {\n          foo();\n        } catch(e) { bar(); }\n        } finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_49 || (templateObject_49 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        } finally() { doSomething(); }"], ["\n        try {\n          foo();\n        } finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    }
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-stroustrup', 'should pass when "stroustrup" and "allowSingleLine" is true', ['stroustrup', { allowSingleLine: true }], [
    "function nop() { return; }",
    "if (foo) { bar(); }",
    ruleTester_1.dedent(templateObject_50 || (templateObject_50 = tslib_1.__makeTemplateObject(["\n      if (foo) { bar(); }\n      else { baz(); }"], ["\n      if (foo) { bar(); }\n      else { baz(); }"]))),
    ruleTester_1.dedent(templateObject_51 || (templateObject_51 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }"], ["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }"]))),
    ruleTester_1.dedent(templateObject_52 || (templateObject_52 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }\n      finally() { doSomething(); }"], ["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }\n      finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_53 || (templateObject_53 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      finally() { doSomething(); }"], ["\n      try { somethingRisky(); }\n      finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_54 || (templateObject_54 = tslib_1.__makeTemplateObject(["\n      if (foo) {\n        bar();\n      }\n      else { baz(); }"], ["\n      if (foo) {\n        bar();\n      }\n      else { baz(); }"]))),
    ruleTester_1.dedent(templateObject_55 || (templateObject_55 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      }\n      catch(e) { bar(); }"], ["\n      try {\n        foo();\n      }\n      catch(e) { bar(); }"]))),
    ruleTester_1.dedent(templateObject_56 || (templateObject_56 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      }\n      catch(e) { bar(); }\n      finally() { doSomething(); }"], ["\n      try {\n        foo();\n      }\n      catch(e) { bar(); }\n      finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_57 || (templateObject_57 = tslib_1.__makeTemplateObject(["\n      try {\n        foo();\n      }\n      finally() { doSomething(); }"], ["\n      try {\n        foo();\n      }\n      finally() { doSomething(); }"])))
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-stroustrup-invalid', 'should fail when "stroustrup" and "allowSingleLine" is false', ['stroustrup', { allowSingleLine: false }], [
    {
        code: "function nop() { return; }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: "if (foo) { bar(); }",
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_58 || (templateObject_58 = tslib_1.__makeTemplateObject(["\n        if (foo) { bar(); }\n        else { baz(); }"], ["\n        if (foo) { bar(); }\n        else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_59 || (templateObject_59 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }"], ["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_60 || (templateObject_60 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }\n        finally() { doSomething(); }"], ["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_61 || (templateObject_61 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        finally() { doSomething(); }"], ["\n        try { somethingRisky(); }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_62 || (templateObject_62 = tslib_1.__makeTemplateObject(["\n        if (foo) {\n          bar();\n        }\n        else { baz(); }"], ["\n        if (foo) {\n          bar();\n        }\n        else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_63 || (templateObject_63 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        }\n        catch(e) { bar(); }"], ["\n        try {\n          foo();\n        }\n        catch(e) { bar(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_64 || (templateObject_64 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }"], ["\n        try {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    },
    {
        code: ruleTester_1.dedent(templateObject_65 || (templateObject_65 = tslib_1.__makeTemplateObject(["\n        try {\n          foo();\n        }\n        finally() { doSomething(); }"], ["\n        try {\n          foo();\n        }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle])
    }
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-allman', 'should pass when "allman" and "allowSingleLine" is true', ['allman', { allowSingleLine: true }], [
    "function nop() { return; }",
    "if (foo) { bar(); }",
    ruleTester_1.dedent(templateObject_66 || (templateObject_66 = tslib_1.__makeTemplateObject(["\n      if (foo) { bar(); }\n      else { baz(); }"], ["\n      if (foo) { bar(); }\n      else { baz(); }"]))),
    ruleTester_1.dedent(templateObject_67 || (templateObject_67 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }"], ["\n      try { somethingRisky(); }\n      catch(e) { handleError(); }"]))),
    ruleTester_1.dedent(templateObject_68 || (templateObject_68 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      catch(e) { handleError(); },\n      finally() { doSomething(); }"], ["\n      try { somethingRisky(); }\n      catch(e) { handleError(); },\n      finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_69 || (templateObject_69 = tslib_1.__makeTemplateObject(["\n      try { somethingRisky(); }\n      finally(e) { doSomething(); }"], ["\n      try { somethingRisky(); }\n      finally(e) { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_70 || (templateObject_70 = tslib_1.__makeTemplateObject(["\n      if (foo)\n      {\n        bar();\n      } else { baz(); }"], ["\n      if (foo)\n      {\n        bar();\n      } else { baz(); }"]))),
    ruleTester_1.dedent(templateObject_71 || (templateObject_71 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        foo();\n      }\n      catch(e) { bar(); }"], ["\n      try\n      {\n        foo();\n      }\n      catch(e) { bar(); }"]))),
    ruleTester_1.dedent(templateObject_72 || (templateObject_72 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        foo();\n      }\n      catch(e) { bar(); }\n      finally() { doSomething(); }"], ["\n      try\n      {\n        foo();\n      }\n      catch(e) { bar(); }\n      finally() { doSomething(); }"]))),
    ruleTester_1.dedent(templateObject_73 || (templateObject_73 = tslib_1.__makeTemplateObject(["\n      try\n      {\n        foo();\n      }\n      finally() { doSomething(); }"], ["\n      try\n      {\n        foo();\n      }\n      finally() { doSomething(); }"])))
]);
ruleTester.addTestGroupWithConfig('allowSingleLine-allman-invalid', 'should fail when "allman" and "allowSingleLine" is false', ['allman', { allowSingleLine: false }], [
    {
        code: "function nop() { return; }",
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: "if (foo) { bar(); }",
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_74 || (templateObject_74 = tslib_1.__makeTemplateObject(["\n        if (foo) { bar(); }\n        else { baz(); }"], ["\n        if (foo) { bar(); }\n        else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_75 || (templateObject_75 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }"], ["\n        try { somethingRisky(); }\n        catch(e) { handleError(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_76 || (templateObject_76 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        catch(e) { handleError(); },\n        finally() { doSomething(); }"], ["\n        try { somethingRisky(); }\n        catch(e) { handleError(); },\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_77 || (templateObject_77 = tslib_1.__makeTemplateObject(["\n        try { somethingRisky(); }\n        finally(e) { doSomething(); }"], ["\n        try { somethingRisky(); }\n        finally(e) { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_78 || (templateObject_78 = tslib_1.__makeTemplateObject(["\n        if (foo)\n        {\n          bar();\n        } else { baz(); }"], ["\n        if (foo)\n        {\n          bar();\n        } else { baz(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_79 || (templateObject_79 = tslib_1.__makeTemplateObject(["\n        try\n        {\n          foo();\n        }\n        catch(e) { bar(); }"], ["\n        try\n        {\n          foo();\n        }\n        catch(e) { bar(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_80 || (templateObject_80 = tslib_1.__makeTemplateObject(["\n        try\n        {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }"], ["\n        try\n        {\n          foo();\n        }\n        catch(e) { bar(); }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    },
    {
        code: ruleTester_1.dedent(templateObject_81 || (templateObject_81 = tslib_1.__makeTemplateObject(["\n        try\n        {\n          foo();\n        }\n        finally() { doSomething(); }"], ["\n        try\n        {\n          foo();\n        }\n        finally() { doSomething(); }"]))),
        errors: expecting([fail.body, fail.closeSingle, fail.openAllman])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67, templateObject_68, templateObject_69, templateObject_70, templateObject_71, templateObject_72, templateObject_73, templateObject_74, templateObject_75, templateObject_76, templateObject_77, templateObject_78, templateObject_79, templateObject_80, templateObject_81;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvYnJhY2VTdHlsZVJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBcUU7QUFFckUsSUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRWpELElBQU0sSUFBSSxHQUFHO0lBQ1gsSUFBSSxFQUFFLGdGQUFnRjtJQUN0RixVQUFVLEVBQUUsd0VBQXdFO0lBQ3BGLElBQUksRUFBRSwwREFBMEQ7SUFDaEUsS0FBSyxFQUFFLCtFQUErRTtJQUN0RixXQUFXLEVBQUUsZ0hBQWdIO0lBQzdILHFCQUFxQixFQUFFLHVFQUF1RTtDQUMvRixDQUFDO0FBS0YsU0FBUyxTQUFTLENBQUMsTUFBZ0I7SUFDakMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUc7WUFDWixhQUFhLEVBQUUsSUFBSSxxQkFBUSxFQUFFO1lBQzdCLFdBQVcsRUFBRSxJQUFJLHFCQUFRLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNyRixtQkFBTSw4SEFBQSxtREFHRjtJQUNKLG1CQUFNLGtIQUFBLHVDQUdGO0lBQ0osbUJBQU0sOElBQUEsbUVBS0Y7SUFDSixtQkFBTSxnS0FBQSxxRkFLRjtJQUNKLG1CQUFNLHlNQUFBLDhIQU9GO0lBQ0osbUJBQU0seU1BQUEsOEhBT0Y7SUFDSixtQkFBTSxpS0FBQSxzRkFLRjtJQUVKLG1CQUFNLDZIQUFBLGtEQUVrQjtDQUN6QixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUN2RjtRQUNFLElBQUksRUFBRSxtQkFBTSwySUFBQSxn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SUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2xFO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0seUpBQUEsNEVBSVEsSUFBQTtRQUNwQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRTtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLGlLQUFBLG9GQUtVLElBQUE7UUFDdEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbEU7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSx1TUFBQSwwSEFNbUIsSUFBQTtRQUMvQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRTtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFNLDBLQUFBLDZGQUttQixJQUFBO1FBQy9CLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2xFO0NBQ0YsQ0FDRixDQUFDO0FBRUYsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6InRlc3QvcnVsZXMvYnJhY2VTdHlsZVJ1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
