"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('ter-newline-after-var', true);
function expecting(errors) {
    var errorMessages = {
        expectedBlankLine: 'Expected blank line after variable declarations.',
        unexpectedBlankLine: 'Unexpected blank line after variable declarations.'
    };
    return errors.map(function (_a) {
        var type = _a[0], line = _a[1];
        var message = errorMessages[type];
        return {
            failure: message,
            startPosition: new ruleTester_1.Position(line),
            endPosition: new ruleTester_1.Position(line)
        };
    });
}
ruleTester.addTestGroup('always', 'should always require an empty line after variable declarations ', [
    {
        code: ruleTester_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n\n      // var name2 = require(\"world\");\n      console.log(greet, name);\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n\n      // var name2 = require(\"world\");\n      console.log(greet, name);\n      "]))),
        output: ruleTester_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n\n      // var name2 = require(\"world\");\n      console.log(greet, name);\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n\n      // var name2 = require(\"world\");\n      console.log(greet, name);\n      "]))),
        options: [],
        errors: expecting([
            ['expectedBlankLine', 1],
            ['expectedBlankLine', 5],
            ['expectedBlankLine', 10],
            ['expectedBlankLine', 14]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n      var greet = \"hello,\";\n\n      var name = \"world\";\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n      var greet = \"hello,\";\n\n      var name = \"world\";\n      "]))),
        options: ['always']
    },
    {
        code: ruleTester_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"], ["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"]))),
        output: ruleTester_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"], ["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"]))),
        options: ['always']
    },
    {
        code: ruleTester_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n         this.runMethod();\n\n       }\n\n     }"], ["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n         this.runMethod();\n\n       }\n\n     }"]))),
        output: ruleTester_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n\n         this.runMethod();\n\n       }\n\n     }"], ["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n\n         this.runMethod();\n\n       }\n\n     }"]))),
        options: ['always'],
        errors: expecting([
            ['expectedBlankLine', 5]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"]))),
        output: ruleTester_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"]))),
        options: ['always']
    },
    {
        code: ruleTester_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"]))),
        output: ruleTester_1.dedent(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"]))),
        options: ['always'],
        errors: expecting([
            ['expectedBlankLine', 1]
        ])
    }
]);
ruleTester.addTestGroup('never', 'should disallow empty lines after variable declarations ', [
    {
        code: ruleTester_1.dedent(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n\n\n      /* Multiline\n         comment */\n\n      alert(1);\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n\n\n      /* Multiline\n         comment */\n\n      alert(1);\n      "]))),
        output: ruleTester_1.dedent(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      /* Multiline\n         comment */\n      alert(1);\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      /* Multiline\n         comment */\n      alert(1);\n      "]))),
        options: ['never'],
        errors: expecting([
            ['unexpectedBlankLine', 1],
            ['unexpectedBlankLine', 6],
            ['unexpectedBlankLine', 12],
            ['unexpectedBlankLine', 17],
            ['unexpectedBlankLine', 23]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n      "], ["\n      var greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      let greet = \"hello,\",\n          name = \"world\";\n      console.log(greet, name);\n\n      var greet = \"hello,\";\n      const NAME = \"world\";\n      console.log(greet, NAME);\n\n      var greet = \"hello,\";\n      var name = \"world\";\n      // var name = require(\"world\");\n      console.log(greet, name);\n      "]))),
        options: ['never']
    },
    {
        code: ruleTester_1.dedent(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"], ["\n     try {\n\n         const result = await request.send();\n\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"]))),
        output: ruleTester_1.dedent(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n     try {\n\n         const result = await request.send();\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"], ["\n     try {\n\n         const result = await request.send();\n     } catch (err) {\n\n         throw new Error(err);\n\n     }"]))),
        options: ['never'],
        errors: expecting([
            ['unexpectedBlankLine', 3]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n\n         this.runMethod();\n\n       }\n\n     }"], ["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n\n         this.runMethod();\n\n       }\n\n     }"]))),
        output: ruleTester_1.dedent(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n         this.runMethod();\n\n       }\n\n     }"], ["\n     class Example {\n\n       constructor() {\n\n         const test = 'abc123';\n         this.runMethod();\n\n       }\n\n     }"]))),
        options: ['never'],
        errors: expecting([
            ['unexpectedBlankLine', 5]
        ])
    },
    {
        code: ruleTester_1.dedent(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"]))),
        output: ruleTester_1.dedent(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"]))),
        options: ['never']
    },
    {
        code: ruleTester_1.dedent(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n\n     value = '';"]))),
        output: ruleTester_1.dedent(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"], ["\n     const dateOfBirth: string = value.slice(1, 9); // yyyymmdd\n     value = '';"]))),
        options: ['never'],
        errors: expecting([
            ['unexpectedBlankLine', 1]
        ])
    }
]);
ruleTester.runTests();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvdGVyTmV3bGluZUFmdGVyVmFyUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxRTtBQUVyRSxJQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFakUsU0FBUyxTQUFTLENBQUUsTUFBK0Q7SUFDakYsSUFBTSxhQUFhLEdBQUc7UUFDcEIsaUJBQWlCLEVBQUUsa0RBQWtEO1FBQ3JFLG1CQUFtQixFQUFFLG9EQUFvRDtLQUMxRSxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBWTtZQUFYLElBQUksUUFBQSxFQUFFLElBQUksUUFBQTtRQUM1QixJQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsT0FBTztZQUNMLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGFBQWEsRUFBRSxJQUFJLHFCQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pDLFdBQVcsRUFBRSxJQUFJLHFCQUFRLENBQUMsSUFBSSxDQUFDO1NBQ2hDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxrRUFBa0UsRUFBRTtJQUNwRztRQUNFLElBQUksRUFBRSxtQkFBTSx3bUJBQUEsNmhCQXNCVCxJQUFBO1FBQ0gsTUFBTSxFQUFFLG1CQUFNLGduQkFBQSxxaUJBMEJYLElBQUE7UUFDSCxPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7WUFDekIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7U0FDMUIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sZ2tCQUFBLHFmQXdCVCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3BCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sOE1BQUEsbUlBU1QsSUFBQTtRQUNILE1BQU0sRUFBRSxtQkFBTSw4TUFBQSxtSUFTWCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3BCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa05BQUEsdUlBVVQsSUFBQTtRQUNILE1BQU0sRUFBRSxtQkFBTSxvTkFBQSx5SUFXWCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDekIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa0tBQUEsdUZBR0MsSUFBQTtRQUNiLE1BQU0sRUFBRSxtQkFBTSxrS0FBQSx1RkFHRCxJQUFBO1FBQ2IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3BCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa0tBQUEscUZBRUMsSUFBQTtRQUNiLE1BQU0sRUFBRSxtQkFBTSxvS0FBQSx1RkFHRCxJQUFBO1FBQ2IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDekIsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsMERBQTBELEVBQUU7SUFDM0Y7UUFDRSxJQUFJLEVBQUUsbUJBQU0sa29CQUFBLHFqQkE4QlQsSUFBQTtRQUNILE1BQU0sRUFBRSxtQkFBTSxvbkJBQUEsdWlCQXVCWCxJQUFBO1FBQ0gsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDaEIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUM7U0FDNUIsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQU0sNGZBQUEsK2FBaUJULElBQUE7UUFDSCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbkI7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxnTkFBQSxtSUFTVCxJQUFBO1FBQ0gsTUFBTSxFQUFFLG1CQUFNLDhNQUFBLGlJQVFYLElBQUE7UUFDSCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztTQUMzQixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxzTkFBQSx5SUFXVCxJQUFBO1FBQ0gsTUFBTSxFQUFFLG1CQUFNLG9OQUFBLHVJQVVYLElBQUE7UUFDSCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztTQUMzQixDQUFDO0tBQ0g7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxrS0FBQSxxRkFFQyxJQUFBO1FBQ2IsTUFBTSxFQUFFLG1CQUFNLGtLQUFBLHFGQUVELElBQUE7UUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbkI7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBTSxvS0FBQSx1RkFHQyxJQUFBO1FBQ2IsTUFBTSxFQUFFLG1CQUFNLGtLQUFBLHFGQUVELElBQUE7UUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNoQixDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztTQUMzQixDQUFDO0tBQ0g7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy90ZXJOZXdsaW5lQWZ0ZXJWYXJSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
