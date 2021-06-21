"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-self-compare';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSelfCompareWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
    };
    Rule.FAILURE_STRING = 'Comparing to itself is potentially pointless.';
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'disallow comparisons where both sides are exactly the same',
        rationale: 'Comparing a variable against itself is usually an error, ' +
            'either a typo or refactoring error. It is confusing to the reader ' +
            'and may potentially introduce a runtime error.',
        optionsDescription: '',
        options: {},
        optionExamples: [
            Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        \"", "\": true\n        "], ["\n        \"", "\": true\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'maintainability'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSelfCompareWalker = (function (_super) {
    tslib_1.__extends(NoSelfCompareWalker, _super);
    function NoSelfCompareWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoSelfCompareWalker.prototype.isComparisonOperator = function (node) {
        var operators = new Set([
            ts.SyntaxKind.EqualsEqualsEqualsToken,
            ts.SyntaxKind.EqualsEqualsToken,
            ts.SyntaxKind.ExclamationEqualsEqualsToken,
            ts.SyntaxKind.ExclamationEqualsToken,
            ts.SyntaxKind.GreaterThanToken,
            ts.SyntaxKind.LessThanToken,
            ts.SyntaxKind.GreaterThanEqualsToken,
            ts.SyntaxKind.LessThanEqualsToken
        ]);
        return operators.has(node.operatorToken.kind);
    };
    NoSelfCompareWalker.prototype.hasSameToken = function (left, right) {
        return left.kind === right.kind && left.getText() === right.getText();
    };
    NoSelfCompareWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (ts.isBinaryExpression(node)) {
                var nodeExpr = node;
                if (_this.isComparisonOperator(nodeExpr) &&
                    _this.hasSameToken(nodeExpr.left, nodeExpr.right)) {
                    _this.addFailureAt(nodeExpr.operatorToken.getStart(), nodeExpr.operatorToken.getWidth(), Rule.FAILURE_STRING);
                }
            }
            else {
                return ts.forEachChild(node, cb);
            }
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return NoSelfCompareWalker;
}(Lint.AbstractWalker));
var templateObject_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vU2VsZkNvbXBhcmVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLHFCQUFxQixDQUFDO0FBRXhDO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUErQkEsQ0FBQztJQVRRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQ3pCLElBQUksbUJBQW1CLENBQ3JCLFVBQVUsRUFDVixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUE3QmEsbUJBQWMsR0FBRywrQ0FBK0MsQ0FBQztJQUVqRSxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE1BQU0sRUFBRSxLQUFLO1FBQ2IsV0FBVyxFQUFFLDREQUE0RDtRQUN6RSxTQUFTLEVBQ1AsMkRBQTJEO1lBQzNELG9FQUFvRTtZQUNwRSxnREFBZ0Q7UUFDbEQsa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSwrR0FBQSxjQUNaLEVBQVMsb0JBQ1gsS0FERSxTQUFTO1NBRWY7UUFDRCxjQUFjLEVBQUUsS0FBSztRQUNyQixJQUFJLEVBQUUsaUJBQWlCO0tBQ3hCLENBQUM7SUFXSixXQUFDO0NBL0JELEFBK0JDLENBL0J5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0ErQmhEO0FBL0JZLG9CQUFJO0FBaUNqQjtJQUFrQywrQ0FBZ0M7SUFBbEU7O0lBMkNBLENBQUM7SUExQ1Msa0RBQW9CLEdBQTVCLFVBQTZCLElBQXlCO1FBQ3BELElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO1lBQ3JDLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsNEJBQTRCO1lBQzFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCO1lBQ3BDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO1lBQzlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYTtZQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtZQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtTQUNsQyxDQUFDLENBQUM7UUFDSCxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sMENBQVksR0FBcEIsVUFBcUIsSUFBYSxFQUFFLEtBQWM7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRU0sa0NBQUksR0FBWCxVQUFZLFVBQXlCO1FBQXJDLGlCQXVCQztRQXRCQyxJQUFNLEVBQUUsR0FBRyxVQUFDLElBQWE7WUFFdkIsSUFBSSxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLElBQU0sUUFBUSxHQUFHLElBQTJCLENBQUM7Z0JBQzdDLElBQ0UsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztvQkFDbkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDaEQ7b0JBQ0EsS0FBSSxDQUFDLFlBQVksQ0FDZixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUNqQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUNqQyxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO2lCQUNIO2FBQ0Y7aUJBQU07Z0JBRUwsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUMsQ0FBQztRQUdGLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsQ0EzQ2lDLElBQUksQ0FBQyxjQUFjLEdBMkNwRCIsImZpbGUiOiJydWxlcy90ZXJOb1NlbGZDb21wYXJlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
