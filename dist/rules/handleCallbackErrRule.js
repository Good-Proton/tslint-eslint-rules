"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'handle-callback-err';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'enforce error handling in callbacks',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      In Node.js, a common pattern for dealing with asynchronous behavior is called the callback\n      pattern. This pattern expects an Error object or null as the first argument of the callback.\n      Forgetting to handle these errors can lead to some really strange behavior in your\n      application.\n      "], ["\n      In Node.js, a common pattern for dealing with asynchronous behavior is called the callback\n      pattern. This pattern expects an Error object or null as the first argument of the callback.\n      Forgetting to handle these errors can lead to some really strange behavior in your\n      application.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      The rule takes a string option: the name of the error parameter. The default is\n      `\"err\"`.\n\n      Sometimes the name of the error variable is not consistent across the project, so you need a\n      more flexible configuration to ensure that the rule reports all unhandled errors.\n\n      If the configured name of the error variable begins with a `^` it is considered to be a\n      regexp pattern.\n\n      - If the option is `\"^(err|error|anySpecificError)$\"`, the rule reports unhandled errors\n        where the parameter name can be `err`, `error` or `anySpecificError`.\n      - If the option is `\"^.+Error$\"`, the rule reports unhandled errors where the parameter\n        name ends with `Error` (for example, `connectionError` or `validationError` will\n        match).\n      - If the option is `\"^.*(e|E)rr\"`, the rule reports unhandled errors where the parameter\n        name matches any string that contains `err` or `Err` (for example, `err`, `error`,\n        `anyError`, `some_err` will match).\n\n      In addition to the string we may specify an options object with the following property:\n\n      - `allowProperties`: (`true` by default) When this is set to `false` the rule will not\n        report unhandled errors as long as the error object is handled without accessing any of its\n        properties at least once. For instance, `(err) => console.log(err.stack)` would report an\n        issue when `allowProperties` is set to `false` because `err` is not handled on its\n        own.\n      "], ["\n      The rule takes a string option: the name of the error parameter. The default is\n      \\`\"err\"\\`.\n\n      Sometimes the name of the error variable is not consistent across the project, so you need a\n      more flexible configuration to ensure that the rule reports all unhandled errors.\n\n      If the configured name of the error variable begins with a \\`^\\` it is considered to be a\n      regexp pattern.\n\n      - If the option is \\`\"^(err|error|anySpecificError)$\"\\`, the rule reports unhandled errors\n        where the parameter name can be \\`err\\`, \\`error\\` or \\`anySpecificError\\`.\n      - If the option is \\`\"^.+Error$\"\\`, the rule reports unhandled errors where the parameter\n        name ends with \\`Error\\` (for example, \\`connectionError\\` or \\`validationError\\` will\n        match).\n      - If the option is \\`\"^.*(e|E)rr\"\\`, the rule reports unhandled errors where the parameter\n        name matches any string that contains \\`err\\` or \\`Err\\` (for example, \\`err\\`, \\`error\\`,\n        \\`anyError\\`, \\`some_err\\` will match).\n\n      In addition to the string we may specify an options object with the following property:\n\n      - \\`allowProperties\\`: (\\`true\\` by default) When this is set to \\`false\\` the rule will not\n        report unhandled errors as long as the error object is handled without accessing any of its\n        properties at least once. For instance, \\`(err) => console.log(err.stack)\\` would report an\n        issue when \\`allowProperties\\` is set to \\`false\\` because \\`err\\` is not handled on its\n        own.\n      "]))),
        options: {
            type: 'array',
            items: [{
                    type: 'string'
                }, {
                    type: 'object',
                    properties: {
                        allowProperties: 'boolean'
                    },
                    additionalProperties: false
                }],
            minLength: 0,
            maxLength: 2
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"error\"]\n        "], ["\n        \"", "\": [true, \"error\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"^(err|error|anySpecificError)$\"]\n        "], ["\n        \"", "\": [true, \"^(err|error|anySpecificError)$\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"allowProperties\": false }]\n        "], ["\n        \"", "\": [true, { \"allowProperties\": false }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"^(err|error|anySpecificError)$\", { \"allowProperties\": false }]\n        "], ["\n        \"", "\": [true, \"^(err|error|anySpecificError)$\", { \"allowProperties\": false }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'maintainability'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ErrCallbackHandlerWalker = (function (_super) {
    tslib_1.__extends(ErrCallbackHandlerWalker, _super);
    function ErrCallbackHandlerWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.stack = [];
        _this.allowProperties = true;
        var opt = _this.getOptions();
        var errorArgument = 'err';
        var optObj = opt[0];
        if (typeof opt[0] === 'string') {
            errorArgument = opt[0];
            optObj = opt[1];
        }
        if (optObj) {
            _this.allowProperties = optObj.allowProperties !== false;
        }
        if (errorArgument.charAt(0) === '^') {
            _this.errorCheck = RegExp.prototype.test.bind(new RegExp(errorArgument));
        }
        else {
            _this.errorCheck = (function (name) { return name === errorArgument; });
        }
        _this.firstParameterName = function (node) {
            var param = node.parameters[0];
            return param ? param.name.getText(sourceFile) : undefined;
        };
        return _this;
    }
    ErrCallbackHandlerWalker.prototype.enterScope = function (firstParamName) {
        this.stack.push({
            firstParamName: firstParamName,
            hasFirstParam: false
        });
    };
    ErrCallbackHandlerWalker.prototype.exitScope = function () {
        return this.stack.pop();
    };
    ErrCallbackHandlerWalker.prototype.visitSourceFile = function (node) {
        this.stack = [];
        _super.prototype.visitSourceFile.call(this, node);
    };
    ErrCallbackHandlerWalker.prototype.visitFunctionDeclaration = function (node) {
        this.enterScope(this.firstParameterName(node));
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.exitFunction(node);
    };
    ErrCallbackHandlerWalker.prototype.visitFunctionExpression = function (node) {
        this.enterScope(this.firstParameterName(node));
        _super.prototype.visitFunctionExpression.call(this, node);
        this.exitFunction(node);
    };
    ErrCallbackHandlerWalker.prototype.visitArrowFunction = function (node) {
        this.enterScope(this.firstParameterName(node));
        _super.prototype.visitArrowFunction.call(this, node);
        this.exitFunction(node);
    };
    ErrCallbackHandlerWalker.prototype.visitCatchClause = function (node) {
        this.enterScope(node.variableDeclaration ? node.variableDeclaration.name.getText() : undefined);
        _super.prototype.visitCatchClause.call(this, node);
        this.exitScope();
    };
    ErrCallbackHandlerWalker.prototype.exitFunction = function (node) {
        var scopeInfo = this.exitScope();
        var param = scopeInfo.firstParamName;
        if (param && this.errorCheck(param) && !scopeInfo.hasFirstParam) {
            var name = node.parameters[0].name;
            var strictMsg = !this.allowProperties ? ' without property access at least once' : '';
            var msg = "Expected error to be handled" + strictMsg;
            var failure = this.createFailure(name.getStart(this.getSourceFile()), name.getWidth(this.getSourceFile()), msg);
            this.addFailure(failure);
        }
    };
    ErrCallbackHandlerWalker.prototype.isPropAccess = function (node) {
        return node.kind === ts.SyntaxKind.PropertyAccessExpression;
    };
    ErrCallbackHandlerWalker.prototype.visitNode = function (node) {
        if (this.stack.length > 0 &&
            node.kind === ts.SyntaxKind.Identifier &&
            node.parent &&
            node.parent.kind !== ts.SyntaxKind.Parameter) {
            var doCheck = false;
            var inPropertyAccess = this.isPropAccess(node.parent);
            if (!this.allowProperties) {
                doCheck = !inPropertyAccess;
            }
            else if (inPropertyAccess) {
                doCheck = node.parent.expression === node;
            }
            else {
                doCheck = true;
            }
            if (doCheck) {
                var text = node.text;
                var i = this.stack.length;
                while (i--) {
                    var info = this.stack[i];
                    if (text === info.firstParamName) {
                        info.hasFirstParam = true;
                        break;
                    }
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return ErrCallbackHandlerWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2hhbmRsZUNhbGxiYWNrRXJyUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztBQUV4QztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBd0VBLENBQUM7SUFIUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQXRFYSxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSx5WUFBQSw4VEFLekIsSUFBQTtRQUNILGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxrbERBQUEsdW1EQTBCbEMsSUFBQTtRQUNILE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLFFBQVE7aUJBQ2YsRUFBRTtvQkFDRCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsZUFBZSxFQUFFLFNBQVM7cUJBQzNCO29CQUNELG9CQUFvQixFQUFFLEtBQUs7aUJBQzVCLENBQUM7WUFDRixTQUFTLEVBQUUsQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxjQUFjLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sNEhBQUEsY0FDWixFQUFTLGlDQUNYLEtBREUsU0FBUztZQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxxSkFBQSxjQUNaLEVBQVMsMERBQ1gsS0FERSxTQUFTO1lBRWQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGlKQUFBLGNBQ1osRUFBUyxzREFDWCxLQURFLFNBQVM7WUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0scUxBQUEsY0FDWixFQUFTLDBGQUNYLEtBREUsU0FBUztTQUVmO1FBQ0QsY0FBYyxFQUFFLEtBQUs7UUFDckIsSUFBSSxFQUFFLGlCQUFpQjtLQUN4QixDQUFDO0lBS0osV0FBQztDQXhFRCxBQXdFQyxDQXhFeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBd0VoRDtBQXhFWSxvQkFBSTtBQStFakI7SUFBdUMsb0RBQWU7SUFNcEQsa0NBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNFLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FzQjNCO1FBNUJPLFdBQUssR0FBcUIsRUFBRSxDQUFDO1FBRzdCLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBSXRDLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzlCLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsS0FBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQztTQUN6RDtRQUVELElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDbkMsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUN6RTthQUFNO1lBQ0wsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLGFBQWEsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsS0FBSSxDQUFDLGtCQUFrQixHQUFHLFVBQUMsSUFBZ0M7WUFDekQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM1RCxDQUFDLENBQUM7O0lBQ0osQ0FBQztJQU1PLDZDQUFVLEdBQWxCLFVBQW1CLGNBQXVCO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2QsY0FBYyxnQkFBQTtZQUNkLGFBQWEsRUFBRSxLQUFLO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLTyw0Q0FBUyxHQUFqQjtRQUVFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUcsQ0FBQztJQUMzQixDQUFDO0lBRVMsa0RBQWUsR0FBekIsVUFBMEIsSUFBbUI7UUFFM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQU0sZUFBZSxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUywyREFBd0IsR0FBbEMsVUFBbUMsSUFBNEI7UUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBTSx3QkFBd0IsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUywwREFBdUIsR0FBakMsVUFBa0MsSUFBMkI7UUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBTSx1QkFBdUIsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxxREFBa0IsR0FBekIsVUFBMEIsSUFBc0I7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBTSxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyxtREFBZ0IsR0FBMUIsVUFBMkIsSUFBb0I7UUFHN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hHLGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU8sK0NBQVksR0FBcEIsVUFBcUIsSUFBZ0M7UUFDbkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUM7UUFDdkMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDL0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3hGLElBQU0sR0FBRyxHQUFHLGlDQUErQixTQUFXLENBQUM7WUFDdkQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFDbkMsR0FBRyxDQUNKLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVPLCtDQUFZLEdBQXBCLFVBQXFCLElBQWE7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUM7SUFDOUQsQ0FBQztJQUVTLDRDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFFL0IsSUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVO1lBQ3RDLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQzVDO1lBQ0EsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDO2FBQzdCO2lCQUFNLElBQUksZ0JBQWdCLEVBQUU7Z0JBRTNCLE9BQU8sR0FBSSxJQUFJLENBQUMsTUFBc0MsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO2FBQzVFO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7WUFFRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFNLElBQUksR0FBSSxJQUFzQixDQUFDLElBQUksQ0FBQztnQkFHMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7b0JBQ1YsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTt3QkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQzFCLE1BQU07cUJBQ1A7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsaUJBQU0sU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDSCwrQkFBQztBQUFELENBM0lBLEFBMklDLENBM0lzQyxJQUFJLENBQUMsVUFBVSxHQTJJckQiLCJmaWxlIjoicnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
