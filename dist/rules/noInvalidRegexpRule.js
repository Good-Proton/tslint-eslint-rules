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
        var walker = new NoInvalidRegexpWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidRegexpWalker = (function (_super) {
    tslib_1.__extends(NoInvalidRegexpWalker, _super);
    function NoInvalidRegexpWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInvalidRegexpWalker.prototype.visitNewExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.visitCallExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.validateInvalidRegExp = function (node) {
        if (node.expression.getText() === 'RegExp') {
            var args = node.arguments;
            if (args && args.length > 0 && args[0].kind === ts.SyntaxKind.StringLiteral) {
                var expr = args[0].text;
                var flags = args.length > 1 && args[1].kind === ts.SyntaxKind.StringLiteral ? args[1].text : undefined;
                try {
                    new RegExp(expr, flags);
                }
                catch (e) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), e.message));
                }
            }
        }
    };
    return NoInvalidRegexpWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW52YWxpZFJlZ2V4cFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQUtBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FMQSxBQUtDLENBTHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUtoRDtBQUxZLG9CQUFJO0FBT2pCO0lBQW9DLGlEQUFlO0lBQW5EOztJQTRCQSxDQUFDO0lBM0JXLGtEQUFrQixHQUE1QixVQUE2QixJQUFzQjtRQUNqRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVTLG1EQUFtQixHQUE3QixVQUE4QixJQUF1QjtRQUNuRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVPLHFEQUFxQixHQUE3QixVQUE4QixJQUEwQztRQUN0RSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQzFDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtnQkFDM0UsSUFBTSxJQUFJLEdBQUksSUFBSSxDQUFDLENBQUMsQ0FBc0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBRS9ILElBQUk7b0JBRUYsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxPQUFPLENBQUMsRUFBRTtvQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDbEY7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1Qm1DLElBQUksQ0FBQyxVQUFVLEdBNEJsRCIsImZpbGUiOiJydWxlcy9ub0ludmFsaWRSZWdleHBSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
