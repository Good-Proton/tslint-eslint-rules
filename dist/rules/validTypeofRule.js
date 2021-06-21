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
        var walker = new ValidTypeofWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'invalid typeof comparison value';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ValidTypeofWalker = (function (_super) {
    tslib_1.__extends(ValidTypeofWalker, _super);
    function ValidTypeofWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VALID_TYPES = ['symbol', 'undefined', 'object', 'boolean', 'number', 'string', 'function'];
        _this.OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
        return _this;
    }
    ValidTypeofWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TypeOfExpression) {
            this.validateTypeOf(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ValidTypeofWalker.prototype.validateTypeOf = function (node) {
        if (node.parent && node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            var parent = node.parent;
            if (this.OPERATORS.indexOf(parent.operatorToken.kind) !== -1) {
                var sibling = parent.left === node ? parent.right : parent.left;
                if (sibling.kind === ts.SyntaxKind.StringLiteral && this.VALID_TYPES.indexOf(sibling.text) === -1) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
    };
    return ValidTypeofWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3ZhbGlkVHlwZW9mUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQjtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBT0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsaUNBQWlDLENBQUM7SUFNbkUsV0FBQztDQVBELEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksb0JBQUk7QUFTakI7SUFBZ0MsNkNBQWU7SUFBL0M7UUFBQSxxRUF1QkM7UUF0QlMsaUJBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzNGLGVBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7SUFxQmpMLENBQUM7SUFuQlcscUNBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUMvQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQTJCLENBQUMsQ0FBQztTQUNsRDtRQUNELGlCQUFNLFNBQVMsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sMENBQWMsR0FBdEIsVUFBdUIsSUFBeUI7UUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEUsSUFBTSxNQUFNLEdBQUksSUFBSSxDQUFDLE1BQThCLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM1RCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFFbEUsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFFLE9BQTRCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3ZILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2lCQUM1RjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQXZCQSxBQXVCQyxDQXZCK0IsSUFBSSxDQUFDLFVBQVUsR0F1QjlDIiwiZmlsZSI6InJ1bGVzL3ZhbGlkVHlwZW9mUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
