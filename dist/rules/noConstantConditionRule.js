"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var token_1 = require("../support/token");
var RULE_NAME = 'no-constant-condition';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected constant condition';
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'disallow use of constant expressions in conditions (recommended)',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      A constant expression (for example, a literal) as a test condition might be a typo or\n      development trigger for a specific behavior. For example, the following code looks as if it is\n      not ready for production.\n      "], ["\n      A constant expression (for example, a literal) as a test condition might be a typo or\n      development trigger for a specific behavior. For example, the following code looks as if it is\n      not ready for production.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      - `\"checkLoops\"` Setting this option to `false` allows constant expressions in loops (default: `true`).\n      "], ["\n      - \\`\"checkLoops\"\\` Setting this option to \\`false\\` allows constant expressions in loops (default: \\`true\\`).\n      "]))),
        options: {
            type: 'object',
            properties: {
                checkLoops: {
                    type: 'boolean'
                }
            },
            additionalProperties: false
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": true\n        "], ["\n        \"", "\": true\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"checkLoops\": false }]\n        "], ["\n        \"", "\": [true, { \"checkLoops\": false }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'functionality'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoConstantConditionWalker = (function (_super) {
    tslib_1.__extends(NoConstantConditionWalker, _super);
    function NoConstantConditionWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.checkLoops = true;
        var opts = _this.getOptions();
        if (opts.length && opts[0].checkLoops === false) {
            _this.checkLoops = false;
        }
        return _this;
    }
    NoConstantConditionWalker.prototype.visitIfStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitIfStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitWhileStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitDoStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitForStatement = function (node) {
        if (this.checkLoops && node.condition) {
            this.validateCondition(node.condition);
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitConditionalExpression = function (node) {
        this.validateCondition(node.condition);
        _super.prototype.visitConditionalExpression.call(this, node);
    };
    NoConstantConditionWalker.prototype.validateCondition = function (expression) {
        if (this.isConstant(expression)) {
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
        }
        this.walkChildren(expression);
    };
    NoConstantConditionWalker.prototype.isConstant = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return true;
            case ts.SyntaxKind.PostfixUnaryExpression:
                return this.isConstant(node.operand);
            case ts.SyntaxKind.BinaryExpression:
                if (token_1.isAssignmentToken(node.operatorToken)) {
                    return this.isConstant(node.right);
                }
                return this.isConstant(node.left) && this.isConstant(node.right);
            case ts.SyntaxKind.ConditionalExpression:
                return this.isConstant(node.condition);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return this.isConstant(node.operand);
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.isConstant(node.expression);
        }
        return false;
    };
    return NoConstantConditionWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBQy9CLDBDQUFxRDtBQUVyRCxJQUFNLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztBQUUxQztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBdUNBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFyQ2EsbUJBQWMsR0FBRywrQkFBK0IsQ0FBQztJQUVqRCxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSx5VEFBQSw4T0FJekIsSUFBQTtRQUNILGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxzTUFBQSx1SUFFbEMsSUFBQTtRQUNILE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRjtZQUNELG9CQUFvQixFQUFFLEtBQUs7U0FDNUI7UUFDRCxjQUFjLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sK0dBQUEsY0FDWixFQUFTLG9CQUNYLEtBREUsU0FBUztZQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSw0SUFBQSxjQUNaLEVBQVMsaURBQ1gsS0FERSxTQUFTO1NBRWY7UUFDRCxjQUFjLEVBQUUsS0FBSztRQUNyQixJQUFJLEVBQUUsZUFBZTtLQUN0QixDQUFDO0lBTUosV0FBQztD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LE9BQU8sSUFBSSxDQUFDO1lBRWQsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtnQkFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQWtDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdEUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtnQkFFakMsSUFBSSx5QkFBaUIsQ0FBRSxJQUE0QixDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUNsRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0Q7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JILEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZFLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFpQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFtQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQXhGQSxBQXdGQyxDQXhGdUMsSUFBSSxDQUFDLFVBQVUsR0F3RnREIiwiZmlsZSI6InJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
