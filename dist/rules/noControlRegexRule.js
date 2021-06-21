"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoControlRegexWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected control character in regular expression';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoControlRegexWalker = (function (_super) {
    tslib_1.__extends(NoControlRegexWalker, _super);
    function NoControlRegexWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoControlRegexWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateControlRegex(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoControlRegexWalker.prototype.visitNewExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitRegularExpressionFunction = function (node) {
        if (node.arguments && node.arguments.length > 0 && node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
            this.validateControlRegex(node.arguments[0]);
        }
    };
    NoControlRegexWalker.prototype.validateControlRegex = function (node) {
        if (/[\x00-\x1f]/.test(node.text)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoControlRegexWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29udHJvbFJlZ2V4UnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBT0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsb0RBQW9ELENBQUM7SUFNdEYsV0FBQztDQVBELEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksb0JBQUk7QUFTakI7SUFBbUMsZ0RBQWU7SUFBbEQ7O0lBK0JBLENBQUM7SUE5QlcsNERBQTZCLEdBQXZDLFVBQXdDLElBQTBCO1FBQ2hFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxpQkFBTSw2QkFBNkIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRVMsaURBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQ2pELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVTLGtEQUFtQixHQUE3QixVQUE4QixJQUF1QjtRQUNuRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUNELGlCQUFNLG1CQUFtQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyw2REFBOEIsR0FBdEMsVUFBdUMsSUFBMEM7UUFDL0UsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUN6RyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFTyxtREFBb0IsR0FBNUIsVUFBNkIsSUFBMEI7UUFDckQsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUM1RjtJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBL0JBLEFBK0JDLENBL0JrQyxJQUFJLENBQUMsVUFBVSxHQStCakQiLCJmaWxlIjoicnVsZXMvbm9Db250cm9sUmVnZXhSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
