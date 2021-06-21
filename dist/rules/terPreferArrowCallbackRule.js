"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-prefer-arrow-callback';
var OPTIONS;
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new RuleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'require arrow functions as callbacks',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Arrow functions are suited to callbacks, because:\n\n      * `this` keywords in arrow functions bind to the upper scope\u2019s.\n      * The notation of the arrow function is shorter than function expression\u2019s.\n      "], ["\n      Arrow functions are suited to callbacks, because:\n\n      * \\`this\\` keywords in arrow functions bind to the upper scope\u2019s.\n      * The notation of the arrow function is shorter than function expression\u2019s.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule takes one optional argument, an object which is an options object. This object\n      may specify the following properties:\n\n      * `\"allowNamedFunctions\"` (default false) When set to `true`, the rule doesn't warn on\n                                  named functions used as callback.\n      * `\"allowUnboundThis\"` (default true) When set to `false`, this option allows the use of\n                               `this` without restriction and checks for dynamically assigned\n                               `this` values such as when using `Array.prototype.map` with a\n                               `context` argument. Normally, the rule will flag the use of this\n                               whenever a function does not use `bind()` to specify the value of\n                               `this` constantly.\n      "], ["\n      This rule takes one optional argument, an object which is an options object. This object\n      may specify the following properties:\n\n      * \\`\"allowNamedFunctions\"\\` (default false) When set to \\`true\\`, the rule doesn't warn on\n                                  named functions used as callback.\n      * \\`\"allowUnboundThis\"\\` (default true) When set to \\`false\\`, this option allows the use of\n                               \\`this\\` without restriction and checks for dynamically assigned\n                               \\`this\\` values such as when using \\`Array.prototype.map\\` with a\n                               \\`context\\` argument. Normally, the rule will flag the use of this\n                               whenever a function does not use \\`bind()\\` to specify the value of\n                               \\`this\\` constantly.\n      "]))),
        options: {
            type: 'array',
            items: [{
                    type: 'object',
                    properties: {
                        allowNamedFunctions: {
                            type: 'boolean'
                        },
                        allowUnboundThis: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }],
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true\n        }]\n        "], ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true\n        }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, {\n          \"allowUnboundThis\": false\n        }]\n        "], ["\n        \"", "\": [true, {\n          \"allowUnboundThis\": false\n        }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true,\n          \"allowUnboundThis\": false\n        }]\n        "], ["\n        \"", "\": [true, {\n          \"allowNamedFunctions\": true,\n          \"allowUnboundThis\": false\n        }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'typescript'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function checkMetaProperty(node, name, prop) {
    return node.parent && node.parent.getFirstToken().getText() === name && node.name.text === prop;
}
function getCallbackInfo(func) {
    var retv = { isCallback: false, isLexicalThis: false };
    var node = func;
    var parent = node.parent;
    while (node && parent) {
        switch (parent.kind) {
            case ts.SyntaxKind.BinaryExpression:
            case ts.SyntaxKind.ConditionalExpression:
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (parent.name.kind === ts.SyntaxKind.Identifier &&
                    parent.name.text === 'bind' &&
                    parent.parent &&
                    parent.parent.kind === ts.SyntaxKind.CallExpression &&
                    parent.parent.expression === parent) {
                    retv.isLexicalThis = (parent.parent.arguments.length === 1 &&
                        parent.parent.arguments[0].kind === ts.SyntaxKind.ThisKeyword);
                    node = parent;
                    parent = parent.parent;
                }
                else {
                    return retv;
                }
                break;
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
                if (parent.expression !== node) {
                    retv.isCallback = true;
                }
                return retv;
            default:
                return retv;
        }
        node = parent;
        parent = node.parent;
    }
    throw new Error('unreachable');
}
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.stack = [];
        OPTIONS = {
            allowUnboundThis: true,
            allowNamedFunctions: null
        };
        var userOptions = _this.getOptions()[0];
        if (userOptions) {
            OPTIONS.allowUnboundThis = userOptions.allowUnboundThis !== false;
            OPTIONS.allowNamedFunctions = userOptions.allowNamedFunctions;
        }
        return _this;
    }
    RuleWalker.prototype.enterScope = function (functionName) {
        this.stack.push({
            functionName: functionName,
            isRecursive: false,
            hasThis: false,
            hasSuper: false,
            hasMeta: false,
            hasArguments: false
        });
    };
    RuleWalker.prototype.exitScope = function () {
        return this.stack.pop();
    };
    RuleWalker.prototype.exitFunctionExpression = function (node) {
        var scopeInfo = this.exitScope();
        if (node.asteriskToken) {
            return;
        }
        if (node.name && node.name.text) {
            if (OPTIONS.allowNamedFunctions || scopeInfo.isRecursive) {
                return;
            }
        }
        var params = node.parameters.map(function (x) { return x.name.getText(); });
        var argumentsIsParam = params.indexOf('arguments') !== -1;
        if (!argumentsIsParam && scopeInfo.hasArguments) {
            return;
        }
        var callbackInfo = getCallbackInfo(node);
        if (callbackInfo.isCallback &&
            (!OPTIONS.allowUnboundThis || !scopeInfo.hasThis || callbackInfo.isLexicalThis) &&
            !scopeInfo.hasSuper &&
            !scopeInfo.hasMeta) {
            var failure = this.createFailure(node.getStart(), node.getWidth(), 'Unexpected function expression.');
            this.addFailure(failure);
        }
    };
    RuleWalker.prototype.visitSourceFile = function (node) {
        this.stack = [];
        _super.prototype.visitSourceFile.call(this, node);
    };
    RuleWalker.prototype.visitFunctionDeclaration = function (node) {
        this.enterScope();
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.exitScope();
    };
    RuleWalker.prototype.visitFunctionExpression = function (node) {
        this.enterScope(node.name ? node.name.text : undefined);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.exitFunctionExpression(node);
    };
    RuleWalker.prototype.visitNode = function (node) {
        var info = this.stack[this.stack.length - 1];
        if (info && node.parent && node.parent.kind !== ts.SyntaxKind.FunctionExpression) {
            if (node.kind === ts.SyntaxKind.ThisKeyword) {
                info.hasThis = true;
            }
            else if (node.kind === ts.SyntaxKind.SuperKeyword) {
                info.hasSuper = true;
            }
            else if (node.kind === ts.SyntaxKind.Identifier) {
                var text = node.text;
                if (text === 'arguments') {
                    info.hasArguments = true;
                }
                else if (text === info.functionName) {
                    info.isRecursive = true;
                }
            }
            else if ((node.kind === ts.SyntaxKind.PropertyAccessExpression ||
                node.kind === ts.SyntaxKind.MetaProperty) &&
                checkMetaProperty(node, 'new', 'target')) {
                info.hasMeta = true;
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlclByZWZlckFycm93Q2FsbGJhY2tSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLDJCQUEyQixDQUFDO0FBQzlDLElBQUksT0FBWSxDQUFDO0FBRWpCO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUFvRUEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFsRWEsYUFBUSxHQUF1QjtRQUMzQyxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sb1RBQUEsNk9BS3pCLElBQUE7UUFDSCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sODVCQUFBLDIzQkFZbEMsSUFBQTtRQUNILE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLG1CQUFtQixFQUFFOzRCQUNuQixJQUFJLEVBQUUsU0FBUzt5QkFDaEI7d0JBQ0QsZ0JBQWdCLEVBQUU7NEJBQ2hCLElBQUksRUFBRSxTQUFTO3lCQUNoQjtxQkFDRjtvQkFDRCxvQkFBb0IsRUFBRSxLQUFLO2lCQUM1QixDQUFDO1lBQ0YsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELGNBQWMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxpSEFBQSxjQUNaLEVBQVMsc0JBQ1gsS0FERSxTQUFTO1lBRWQsSUFBSSxDQUFDLEtBQUssQ0FB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SUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsaUJBQU0sdUJBQXVCLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFUyw4QkFBUyxHQUFuQixVQUFvQixJQUFhO1FBQy9CLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFO1lBQ2hGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDckI7aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN0QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pELElBQU0sSUFBSSxHQUFJLElBQXNCLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUMxQjtxQkFBTSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztpQkFDekI7YUFDRjtpQkFBTSxJQUNMLENBQ0UsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QjtnQkFDcEQsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FDekM7Z0JBQ0QsaUJBQWlCLENBQUMsSUFBbUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQ3ZFO2dCQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1NBQ0Y7UUFDRCxpQkFBTSxTQUFTLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0F4SEEsQUF3SEMsQ0F4SHdCLElBQUksQ0FBQyxVQUFVLEdBd0h2QyIsImZpbGUiOiJydWxlcy90ZXJQcmVmZXJBcnJvd0NhbGxiYWNrUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
