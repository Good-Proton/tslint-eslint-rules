"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-computed-property-spacing';
var ALWAYS_BEFORE_MESSAGE = "A space is required before ']'.";
var ALWAYS_AFTER_MESSAGE = "A space is required after '['.";
var NEVER_BEFORE_MESSAGE = "There should be no space before ']'.";
var NEVER_AFTER_MESSAGE = "There should be no space after '['.";
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.formatOptions = function (_a) {
        var alwaysOrNever = _a[0];
        return {
            always: alwaysOrNever === 'always'
        };
    };
    Rule.prototype.apply = function (sourceFile) {
        var opt = this.formatOptions(this.ruleArguments);
        var walker = new RuleWalker(sourceFile, this.ruleName, opt);
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: true,
        description: 'require or disallow padding inside computed properties',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      While formatting preferences are very personal, a number of style guides require or disallow spaces between computed properties in the following situations:\n    "], ["\n      While formatting preferences are very personal, a number of style guides require or disallow spaces between computed properties in the following situations:\n    "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      The rule takes in one option, which defines to require or forbid whitespace.\n\n      * `\"never\"` (default) disallows spaces inside computed property brackets\n      * `\"always\"` requires one or more spaces inside computed property brackets\n    "], ["\n      The rule takes in one option, which defines to require or forbid whitespace.\n\n      * \\`\"never\"\\` (default) disallows spaces inside computed property brackets\n      * \\`\"always\"\\` requires one or more spaces inside computed property brackets\n    "]))),
        options: {
            type: 'array',
            items: [{
                    enum: ['always', 'never']
                }],
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n      "], ["\n        \"", "\": [true, \"always\"]\n      "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\"]\n      "], ["\n        \"", "\": [true, \"never\"]\n      "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (node.kind === ts.SyntaxKind.ElementAccessExpression) {
                _this.checkNode(node, node.getChildAt(1), node.getChildAt(3));
            }
            else if (node.kind === ts.SyntaxKind.ComputedPropertyName) {
                _this.checkNode(node, node.getChildAt(0), node.getChildAt(2));
            }
            ts.forEachChild(node, cb);
        };
        ts.forEachChild(sourceFile, cb);
    };
    RuleWalker.prototype.checkNode = function (node, leftBracketNode, rightBracketNode) {
        var nodeText = node.getText();
        var regex = /\[([\s\S]*)\]/;
        var match = regex.exec(nodeText);
        if (!match) {
            return;
        }
        var contentWithinBrackets = match[1];
        if (this.options.always) {
            var beforeWhitespaceLength = this.getBeforeWhitespaceLength(contentWithinBrackets, true);
            var afterWhitespaceLength = this.getAfterWhitespaceLength(contentWithinBrackets, true);
            if (beforeWhitespaceLength === 0) {
                this.addFailureAtNode(leftBracketNode, ALWAYS_AFTER_MESSAGE, Lint.Replacement.appendText(leftBracketNode.getEnd(), ' '));
            }
            if (afterWhitespaceLength === 0) {
                this.addFailureAtNode(rightBracketNode, ALWAYS_BEFORE_MESSAGE, Lint.Replacement.appendText(rightBracketNode.getStart(), ' '));
            }
        }
        else {
            var contentWithinBracketsNoNewlines = contentWithinBrackets.replace('\n', '');
            var beforeWhitespaceLength = this.getBeforeWhitespaceLength(contentWithinBracketsNoNewlines, false);
            var afterWhitespaceLength = this.getAfterWhitespaceLength(contentWithinBracketsNoNewlines, false);
            if (beforeWhitespaceLength !== 0) {
                this.addFailureAtNode(leftBracketNode, NEVER_AFTER_MESSAGE, Lint.Replacement.deleteText(leftBracketNode.getEnd(), beforeWhitespaceLength));
            }
            if (afterWhitespaceLength !== 0) {
                this.addFailureAtNode(rightBracketNode, NEVER_BEFORE_MESSAGE, Lint.Replacement.deleteText(rightBracketNode.getStart() - afterWhitespaceLength, afterWhitespaceLength));
            }
        }
    };
    RuleWalker.prototype.getBeforeWhitespaceLength = function (content, newlinesCountAsWhitespace) {
        var regex = newlinesCountAsWhitespace ? /^\s+/ : /^[^\S\n]+/;
        var match = regex.exec(content);
        if (match) {
            return match[0].length;
        }
        else {
            return 0;
        }
    };
    RuleWalker.prototype.getAfterWhitespaceLength = function (content, newlinesCountAsWhitespace) {
        var regex = newlinesCountAsWhitespace ? /\s+$/ : /[^\S\n]+$/;
        var match = regex.exec(content);
        if (match) {
            return match[0].length;
        }
        else {
            return 0;
        }
    };
    return RuleWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckNvbXB1dGVkUHJvcGVydHlTcGFjaW5nUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRywrQkFBK0IsQ0FBQztBQUtsRCxJQUFNLHFCQUFxQixHQUFHLGlDQUFpQyxDQUFDO0FBQ2hFLElBQU0sb0JBQW9CLEdBQUcsZ0NBQWdDLENBQUM7QUFDOUQsSUFBTSxvQkFBb0IsR0FBRyxzQ0FBc0MsQ0FBQztBQUNwRSxJQUFNLG1CQUFtQixHQUFHLHFDQUFxQyxDQUFDO0FBRWxFO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUFnREEsQ0FBQztJQVpTLDRCQUFhLEdBQXJCLFVBQXNCLEVBQTJCO1lBQXpCLGFBQWEsUUFBQTtRQUVuQyxPQUFPO1lBQ0wsTUFBTSxFQUFFLGFBQWEsS0FBSyxRQUFRO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBRU0sb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBOUNhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFDbkIsTUFBTSxFQUFFLElBQUk7UUFDWixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sdVBBQUEsNEtBRTNCLElBQUE7UUFDRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sK1VBQUEsNFFBS3BDLElBQUE7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsT0FB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QixHQUFoQyxVQUFpQyxPQUFlLEVBQUUseUJBQWtDO1FBQ2xGLElBQU0sS0FBSyxHQUFHLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMvRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FwRkEsQUFvRkMsQ0FwRndCLElBQUksQ0FBQyxjQUFjLEdBb0YzQyIsImZpbGUiOiJydWxlcy90ZXJDb21wdXRlZFByb3BlcnR5U3BhY2luZ1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
