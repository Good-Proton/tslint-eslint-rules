"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var token_1 = require("../support/token");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoExAssignWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'do not assign to the exception parameter';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExAssignWalker = (function (_super) {
    tslib_1.__extends(NoExAssignWalker, _super);
    function NoExAssignWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInCatchClause = false;
        return _this;
    }
    NoExAssignWalker.prototype.visitCatchClause = function (node) {
        this.variableNode = node.variableDeclaration;
        this.isInCatchClause = true;
        _super.prototype.visitCatchClause.call(this, node);
        this.isInCatchClause = false;
        delete this.variableNode;
    };
    NoExAssignWalker.prototype.visitBinaryExpression = function (node) {
        var _this = this;
        if (this.isInCatchClause) {
            if (!token_1.isAssignmentToken(node.operatorToken)) {
                return;
            }
            if (this.variableNode &&
                this.variableNode.name.getText() === node.left.getText() &&
                node.left.kind === ts.SyntaxKind.Identifier) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
            else if (node.left.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                var els = node.left.elements;
                if (els.some(function (el) { return !!_this.variableNode && el.getText() === _this.variableNode.getText(); })) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    return NoExAssignWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXhBc3NpZ25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBQy9CLDBDQUFxRDtBQUVyRDtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBT0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsMENBQTBDLENBQUM7SUFNNUUsV0FBQztDQVBELEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksb0JBQUk7QUFTakI7SUFBK0IsNENBQWU7SUFBOUM7UUFBQSxxRUFpQ0M7UUFoQ1MscUJBQWUsR0FBRyxLQUFLLENBQUM7O0lBZ0NsQyxDQUFDO0lBN0JXLDJDQUFnQixHQUExQixVQUEyQixJQUFvQjtRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVTLGdEQUFxQixHQUEvQixVQUFnQyxJQUF5QjtRQUF6RCxpQkFvQkM7UUFuQkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzFDLE9BQU87YUFDUjtZQUVELElBQ0UsSUFBSSxDQUFDLFlBQVk7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFDM0M7Z0JBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7YUFDNUY7aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFO2dCQUNsRSxJQUFNLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBa0MsQ0FBQyxRQUFRLENBQUM7Z0JBQzlELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFuRSxDQUFtRSxDQUFDLEVBQUU7b0JBQ3ZGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2lCQUM1RjthQUNGO1NBQ0Y7UUFDRCxpQkFBTSxxQkFBcUIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQWpDQSxBQWlDQyxDQWpDOEIsSUFBSSxDQUFDLFVBQVUsR0FpQzdDIiwiZmlsZSI6InJ1bGVzL25vRXhBc3NpZ25SdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
