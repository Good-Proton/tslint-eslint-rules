"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-irregular-whitespace';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoIrregularWhitespaceWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'disallow irregular whitespace (recommended)',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code\n      harder to debug in a similar nature to mixed tabs and spaces.\n      "], ["\n      Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code\n      harder to debug in a similar nature to mixed tabs and spaces.\n      "]))),
        optionsDescription: '',
        options: {},
        optionExamples: [
            Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'typescript'
    };
    Rule.RULE_NAME = 'ter-no-irregular-whitespace';
    Rule.FAILURE_STRING = 'irregular whitespace not allowed';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoIrregularWhitespaceWalker = (function (_super) {
    tslib_1.__extends(NoIrregularWhitespaceWalker, _super);
    function NoIrregularWhitespaceWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IRREGULAR_WHITESPACE = /[\u0085\u00A0\ufeff\f\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000]+/mg;
        _this.IRREGULAR_LINE_TERMINATORS = /[\u2028\u2029]/mg;
        return _this;
    }
    NoIrregularWhitespaceWalker.prototype.visitSourceFile = function (node) {
        this.validateIrregularWhitespace(node);
        _super.prototype.visitSourceFile.call(this, node);
    };
    NoIrregularWhitespaceWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            this.removeStringError(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoIrregularWhitespaceWalker.prototype.removeStringError = function (node) {
        var start = node.getStart();
        var end = node.getEnd();
        var failures = this.getFailures();
        for (var i = failures.length - 1; i >= 0; i--) {
            var failure = failures[i];
            if (failure.getRuleName() === Rule.RULE_NAME) {
                if (failure.getStartPosition().getPosition() >= start && failure.getEndPosition().getPosition() <= end) {
                    failures.splice(i, 1);
                }
            }
        }
    };
    NoIrregularWhitespaceWalker.prototype.validateIrregularWhitespace = function (node) {
        var _this = this;
        var lines = node.text.split(/\n/g);
        lines.forEach(function (line, i) {
            var match = _this.IRREGULAR_WHITESPACE.exec(line);
            while (match) {
                _this.addFailure(_this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
                match = _this.IRREGULAR_WHITESPACE.exec(line);
            }
            match = _this.IRREGULAR_LINE_TERMINATORS.exec(line);
            while (match) {
                _this.addFailure(_this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
                match = _this.IRREGULAR_LINE_TERMINATORS.exec(line);
            }
        });
    };
    return NoIrregularWhitespaceWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vSXJyZWd1bGFyV2hpdGVzcGFjZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUM7QUFFaEQ7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQXlCQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksMkJBQTJCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBdkJhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLDZQQUFBLGtMQUd6QixJQUFBO1FBQ0gsa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxpSEFBQSxjQUNaLEVBQVMsc0JBQ1gsS0FERSxTQUFTO1NBRWY7UUFDRCxjQUFjLEVBQUUsS0FBSztRQUNyQixJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDO0lBQ1ksY0FBUyxHQUFHLDZCQUE2QixDQUFDO0lBQzFDLG1CQUFjLEdBQUcsa0NBQWtDLENBQUM7SUFNcEUsV0FBQztDQXpCRCxBQXlCQyxDQXpCeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBeUJoRDtBQXpCWSxvQkFBSTtBQTJCakI7SUFBMEMsdURBQWU7SUFBekQ7UUFBQSxxRUFvREM7UUFuRFMsMEJBQW9CLEdBQUcseUlBQXlJLENBQUM7UUFDakssZ0NBQTBCLEdBQUcsa0JBQWtCLENBQUM7O0lBa0QxRCxDQUFDO0lBaERXLHFEQUFlLEdBQXpCLFVBQTBCLElBQW1CO1FBRTNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxpQkFBTSxlQUFlLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVTLCtDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBRTdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUF3QixDQUFDLENBQUM7U0FDbEQ7UUFDRCxpQkFBTSxTQUFTLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVPLHVEQUFpQixHQUF6QixVQUEwQixJQUFzQjtRQUM5QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVwQyxLQUFLLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFCLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLElBQUksT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxHQUFHLEVBQUU7b0JBQ3RHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRU8saUVBQTJCLEdBQW5DLFVBQW9DLElBQW1CO1FBQXZELGlCQWdCQztRQWZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE9BQU8sS0FBSyxFQUFFO2dCQUNaLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hILEtBQUssR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDO1lBRUQsS0FBSyxHQUFHLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsS0FBSyxHQUFHLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxrQ0FBQztBQUFELENBcERBLEFBb0RDLENBcER5QyxJQUFJLENBQUMsVUFBVSxHQW9EeEQiLCJmaWxlIjoicnVsZXMvdGVyTm9JcnJlZ3VsYXJXaGl0ZXNwYWNlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
