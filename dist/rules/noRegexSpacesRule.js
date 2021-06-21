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
        var walker = new NoRegexSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoRegexSpacesWalker = (function (_super) {
    tslib_1.__extends(NoRegexSpacesWalker, _super);
    function NoRegexSpacesWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoRegexSpacesWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateMultipleSpaces(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoRegexSpacesWalker.prototype.validateMultipleSpaces = function (node) {
        var res = /( {2,})+?/.exec(node.text);
        if (res) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "spaces are hard to count - use {" + res[0].length + "}"));
        }
    };
    return NoRegexSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vUmVnZXhTcGFjZXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSw2QkFBK0I7QUFFL0I7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQUtBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FMQSxBQUtDLENBTHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUtoRDtBQUxZLG9CQUFJO0FBT2pCO0lBQWtDLCtDQUFlO0lBQWpEOztJQVlBLENBQUM7SUFYVywyREFBNkIsR0FBdkMsVUFBd0MsSUFBMEI7UUFDaEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGlCQUFNLDZCQUE2QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxvREFBc0IsR0FBOUIsVUFBK0IsSUFBMEI7UUFDdkQsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxxQ0FBbUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sTUFBRyxDQUFDLENBQUMsQ0FBQztTQUM1SDtJQUNILENBQUM7SUFDSCwwQkFBQztBQUFELENBWkEsQUFZQyxDQVppQyxJQUFJLENBQUMsVUFBVSxHQVloRCIsImZpbGUiOiJydWxlcy9ub1JlZ2V4U3BhY2VzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
