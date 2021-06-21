"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = require("tslint");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoEmptyCharacterClassWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = "don't use empty classes in regular expressions";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoEmptyCharacterClassWalker = (function (_super) {
    tslib_1.__extends(NoEmptyCharacterClassWalker, _super);
    function NoEmptyCharacterClassWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoEmptyCharacterClassWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateEmptyCharacterClass(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoEmptyCharacterClassWalker.prototype.validateEmptyCharacterClass = function (node) {
        if (!(/^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gim]*$/.test(node.text))) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoEmptyCharacterClassWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRW1wdHlDaGFyYWN0ZXJDbGFzc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDZCQUErQjtBQUUvQjtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBT0EsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM5RSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsZ0RBQWdELENBQUM7SUFNbEYsV0FBQztDQVBELEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksb0JBQUk7QUFTakI7SUFBMEMsdURBQWU7SUFBekQ7O0lBV0EsQ0FBQztJQVZXLG1FQUE2QixHQUF2QyxVQUF3QyxJQUEwQjtRQUNoRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsaUJBQU0sNkJBQTZCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLGlFQUEyQixHQUFuQyxVQUFvQyxJQUEwQjtRQUM1RCxJQUFJLENBQUMsQ0FBQyw4Q0FBOEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDSCxDQUFDO0lBQ0gsa0NBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYeUMsSUFBSSxDQUFDLFVBQVUsR0FXeEQiLCJmaWxlIjoicnVsZXMvbm9FbXB0eUNoYXJhY3RlckNsYXNzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
