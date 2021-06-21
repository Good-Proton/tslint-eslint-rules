"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-parens';
var always = 'Expected parentheses around arrow function argument.';
var asNeeded = 'Unexpected parentheses around single function argument.';
var block = 'Unexpected parentheses around single function argument having a body with no curly braces.';
var blockNoParens = 'Expected parentheses around arrow function argument having a body with curly braces.';
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
        description: 'require parens in arrow function arguments',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Arrow functions can omit parentheses when they have exactly one parameter. In all other cases\n      the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of\n      parentheses in arrow functions.\n      "], ["\n      Arrow functions can omit parentheses when they have exactly one parameter. In all other cases\n      the parameter(s) must be wrapped in parentheses. This rule enforces the consistent use of\n      parentheses in arrow functions.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule has a string option and an object one.\n\n      String options are:\n\n      - `\"always\"` (default) requires parentheses around arguments in all cases.\n      - `\"as-needed\"` allows omitting parentheses when there is only one argument.\n\n      Object properties for variants of the `\"as-needed\"` option:\n\n      - `\"requireForBlockBody\": true` modifies the as-needed rule in order to require\n        parentheses if the function body is in an instructions block (surrounded by braces).\n      "], ["\n      This rule has a string option and an object one.\n\n      String options are:\n\n      - \\`\"always\"\\` (default) requires parentheses around arguments in all cases.\n      - \\`\"as-needed\"\\` allows omitting parentheses when there is only one argument.\n\n      Object properties for variants of the \\`\"as-needed\"\\` option:\n\n      - \\`\"requireForBlockBody\": true\\` modifies the as-needed rule in order to require\n        parentheses if the function body is in an instructions block (surrounded by braces).\n      "]))),
        options: {
            type: 'array',
            items: [
                {
                    enum: ['always', 'as-needed']
                },
                {
                    type: 'object',
                    properties: {
                        requireForBlockBody: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }
            ],
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"as-needed\"]\n        "], ["\n        \"", "\": [true, \"as-needed\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"as-needed\", { \"requireForBlockBody\": true }]\n        "], ["\n        \"", "\": [true, \"as-needed\", { \"requireForBlockBody\": true }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.srcFile = sourceFile;
        var opt = _this.getOptions();
        _this.asNeeded = opt[0] === 'as-needed';
        _this.requireForBlockBody = _this.asNeeded && opt[1] && opt[1].requireForBlockBody === true;
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        _super.prototype.visitArrowFunction.call(this, node);
        if (node.parameters.length === 1) {
            var skip = Lint.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword) ? 1 : 0;
            var parameter = node.parameters[0];
            var text = parameter.getText();
            var firstToken = node.getChildAt(skip);
            var lastToken = node.getChildAt(2 + skip);
            var position = parameter.getStart();
            var paramWidth = text.length;
            var parensWidth = lastToken.end - firstToken.getStart(this.srcFile);
            var isGenerics = firstToken.kind === ts.SyntaxKind.LessThanToken;
            var hasParens = firstToken.kind === ts.SyntaxKind.OpenParenToken;
            var bodyIsBlock = node.body.kind === ts.SyntaxKind.Block;
            var isIdentifier = parameter.name.kind === ts.SyntaxKind.Identifier;
            var hasAnnotations = parameter.initializer || parameter.dotDotDotToken || parameter.type;
            var isSingleIdentifier = isIdentifier && !hasAnnotations;
            if (this.requireForBlockBody) {
                if (isSingleIdentifier && !node.type && !bodyIsBlock) {
                    if (hasParens) {
                        this.report(position - 1, parensWidth, block);
                    }
                    return;
                }
                if (bodyIsBlock && !isGenerics) {
                    if (!hasParens) {
                        this.report(position, paramWidth, blockNoParens);
                    }
                    return;
                }
            }
            if (this.asNeeded && isSingleIdentifier && !node.type) {
                if (hasParens) {
                    this.report(position - 1, parensWidth, asNeeded);
                }
                return;
            }
            if (!hasParens && !isGenerics) {
                this.report(position, paramWidth, always);
            }
        }
    };
    RuleWalker.prototype.report = function (position, width, message) {
        var failure = this.createFailure(position, width, message);
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93UGFyZW5zUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztBQUNyQyxJQUFNLE1BQU0sR0FBRyxzREFBc0QsQ0FBQztBQUN0RSxJQUFNLFFBQVEsR0FBRyx5REFBeUQsQ0FBQztBQUMzRSxJQUFNLEtBQUssR0FBRyw0RkFBNEYsQ0FBQztBQUMzRyxJQUFNLGFBQWEsR0FBRyxzRkFBc0YsQ0FBQztBQUU3RztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBOERBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBNURhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGtVQUFBLHVQQUl6QixJQUFBO1FBQ0gsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLHNsQkFBQSwyaEJBWWxDLElBQUE7UUFDSCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRTtnQkFDTDtvQkFDRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO2lCQUM5QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsbUJBQW1CLEVBQUU7NEJBQ25CLElBQUksRUFBRSxTQUFTO3lCQUNoQjtxQkFDRjtvQkFDRCxvQkFBb0IsRUFBRSxLQUFLO2lCQUM1QjthQUNGO1lBQ0QsU0FBUyxFQUFF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LENBQUM7WUFDM0YsSUFBTSxrQkFBa0IsR0FBRyxZQUFZLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFM0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLElBQUksa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwRCxJQUFJLFNBQVMsRUFBRTt3QkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUMvQztvQkFDRCxPQUFPO2lCQUNSO2dCQUVELElBQUksV0FBVyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztxQkFDbEQ7b0JBQ0QsT0FBTztpQkFDUjthQUNGO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDckQsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDbEQ7Z0JBQ0QsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sMkJBQU0sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLE9BQWU7UUFDN0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FqRUEsQUFpRUMsQ0FqRXdCLElBQUksQ0FBQyxVQUFVLEdBaUV2QyIsImZpbGUiOiJydWxlcy90ZXJBcnJvd1BhcmVuc1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
