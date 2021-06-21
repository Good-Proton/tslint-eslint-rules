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
        var walker = new NoDuplicateCaseWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'duplicate case label';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateCaseWalker = (function (_super) {
    tslib_1.__extends(NoDuplicateCaseWalker, _super);
    function NoDuplicateCaseWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoDuplicateCaseWalker.prototype.visitSwitchStatement = function (node) {
        this.validateNoDupeCase(node);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    NoDuplicateCaseWalker.prototype.validateNoDupeCase = function (node) {
        var _this = this;
        var cases = Object.create(null);
        node.caseBlock.clauses.forEach(function (clause) {
            if (clause.kind === ts.SyntaxKind.CaseClause) {
                var key = clause.getText();
                if (cases[key]) {
                    _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
                else {
                    cases[key] = clause;
                }
            }
        });
    };
    return NoDuplicateCaseWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQU9BLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFMYSxtQkFBYyxHQUFHLHNCQUFzQixDQUFDO0lBTXhELFdBQUM7Q0FQRCxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLG9CQUFJO0FBU2pCO0lBQW9DLGlEQUFlO0lBQW5EOztJQXFCQSxDQUFDO0lBcEJXLG9EQUFvQixHQUE5QixVQUErQixJQUF3QjtRQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsaUJBQU0sb0JBQW9CLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLGtEQUFrQixHQUExQixVQUEyQixJQUF3QjtRQUFuRCxpQkFjQztRQWJDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7aUJBQzVGO3FCQUNJO29CQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUF1QixDQUFDO2lCQUN0QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCbUMsSUFBSSxDQUFDLFVBQVUsR0FxQmxEIiwiZmlsZSI6InJ1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
