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
        var walker = new NoInnerDeclarationsWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInnerDeclarationsWalker = (function (_super) {
    tslib_1.__extends(NoInnerDeclarationsWalker, _super);
    function NoInnerDeclarationsWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VALID_PARENT_TYPES = [
            ts.SyntaxKind.SourceFile,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.ArrowFunction,
            ts.SyntaxKind.MethodDeclaration,
            ts.SyntaxKind.ModuleDeclaration,
            ts.SyntaxKind.Constructor
        ];
        return _this;
    }
    NoInnerDeclarationsWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateInnerDeclaration(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.visitVariableStatement = function (node) {
        if (this.hasOption('both') && node.declarationList.getFirstToken().kind === ts.SyntaxKind.VarKeyword) {
            this.validateInnerDeclaration(node);
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.validateInnerDeclaration = function (node) {
        var body = this.nearestBody(node);
        var isValid = (body.isSourceFile && body.distance === 1) || body.distance === 2;
        if (!isValid) {
            var decl = node.kind === ts.SyntaxKind.FunctionDeclaration ? 'function' : 'variable';
            var root = body.isSourceFile ? 'program' : 'function body';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "move " + decl + " declaration to " + root + " root"));
        }
    };
    NoInnerDeclarationsWalker.prototype.nearestBody = function (node) {
        var ancestor = node.parent;
        var generation = 1;
        while (ancestor && this.VALID_PARENT_TYPES.indexOf(ancestor.kind) === -1) {
            generation++;
            ancestor = ancestor.parent;
        }
        return {
            isSourceFile: (ancestor && ancestor.kind === ts.SyntaxKind.SourceFile) || !ancestor,
            distance: generation
        };
    };
    return NoInnerDeclarationsWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW5uZXJEZWNsYXJhdGlvbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUFLQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBTEEsQUFLQyxDQUx5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FLaEQ7QUFMWSxvQkFBSTtBQU9qQjtJQUF3QyxxREFBZTtJQUF2RDtRQUFBLHFFQW1EQztRQWxEUyx3QkFBa0IsR0FBRztZQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVU7WUFDeEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0I7WUFDaEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhO1lBQzNCLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVztTQUMxQixDQUFDOztJQTBDSixDQUFDO0lBeENXLDREQUF3QixHQUFsQyxVQUFtQyxJQUE0QjtRQUM3RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsaUJBQU0sd0JBQXdCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLDBEQUFzQixHQUFoQyxVQUFpQyxJQUEwQjtRQUd6RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDckcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLDREQUF3QixHQUFoQyxVQUFpQyxJQUFhO1FBQzVDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDdkYsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFFN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBUSxJQUFJLHdCQUFtQixJQUFJLFVBQU8sQ0FBQyxDQUFDLENBQUM7U0FDbkg7SUFDSCxDQUFDO0lBRU8sK0NBQVcsR0FBbkIsVUFBb0IsSUFBYTtRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4RSxVQUFVLEVBQUUsQ0FBQztZQUNiLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzVCO1FBRUQsT0FBTztZQUNMLFlBQVksRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ25GLFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQW5EQSxBQW1EQyxDQW5EdUMsSUFBSSxDQUFDLFVBQVUsR0FtRHREIiwiZmlsZSI6InJ1bGVzL25vSW5uZXJEZWNsYXJhdGlvbnNSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
