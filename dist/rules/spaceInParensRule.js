"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'space-in-parens';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new SpaceInParensWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'require or disallow spaces inside parentheses',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      This rule will enforce consistency of spacing directly inside of parentheses,\n      by disallowing or requiring one or more spaces to the right of (and to the\n      left of). In either case, () will still be allowed.\n      "], ["\n      This rule will enforce consistency of spacing directly inside of parentheses,\n      by disallowing or requiring one or more spaces to the right of (and to the\n      left of). In either case, () will still be allowed.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      There are two options for this rule:\n\n      - `\"never\"` (default) enforces zero spaces inside of parentheses\n      - `\"always\"` enforces a space inside of parentheses\n\n      Depending on your coding conventions, you can choose either option by specifying\n      it in your configuration.\n      "], ["\n      There are two options for this rule:\n\n      - \\`\"never\"\\` (default) enforces zero spaces inside of parentheses\n      - \\`\"always\"\\` enforces a space inside of parentheses\n\n      Depending on your coding conventions, you can choose either option by specifying\n      it in your configuration.\n      "]))),
        options: {
            type: 'array',
            items: [
                {
                    enum: ['always', 'never']
                },
                {
                    type: 'object',
                    properties: {
                        exceptions: {
                            type: 'array',
                            items: [
                                {
                                    enum: ['{}', '[]', '()', 'empty']
                                }
                            ],
                            uniqueItems: true
                        }
                    },
                    additionalProperties: false
                }
            ],
            minItems: 0,
            maxItems: 2
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\"]\n        "], ["\n        \"", "\": [true, \"never\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\", { \"exceptions\": [ \"{}\", \"[]\", \"()\", \"empty\" ] }]\n        "], ["\n        \"", "\": [true, \"always\", { \"exceptions\": [ \"{}\", \"[]\", \"()\", \"empty\" ] }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    Rule.MISSING_SPACE_MESSAGE = 'there must be a space inside this paren.';
    Rule.REJECTED_SPACE_MESSAGE = 'there should be no spaces inside this paren.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var SpaceInParensWalker = (function (_super) {
    tslib_1.__extends(SpaceInParensWalker, _super);
    function SpaceInParensWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.exceptionsArrayOptions = [];
        var ruleOptions = _this.getOptions();
        _this.spaced = _this.hasOption('always');
        if (ruleOptions[1]) {
            _this.exceptionsArrayOptions = (ruleOptions.length === 2) ? ruleOptions[1].exceptions : [];
            if (_this.exceptionsArrayOptions.length) {
                _this.braceException = _this.exceptionsArrayOptions.indexOf('{}') !== -1;
                _this.bracketException = _this.exceptionsArrayOptions.indexOf('[]') !== -1;
                _this.parenException = _this.exceptionsArrayOptions.indexOf('()') !== -1;
                _this.empty = _this.exceptionsArrayOptions.indexOf('empty') !== -1;
            }
        }
        return _this;
    }
    SpaceInParensWalker.prototype.getExceptions = function () {
        var openers = [];
        var closers = [];
        if (this.braceException) {
            openers.push(ts.SyntaxKind.OpenBraceToken);
            closers.push(ts.SyntaxKind.CloseBraceToken);
        }
        if (this.bracketException) {
            openers.push(ts.SyntaxKind.OpenBracketToken);
            closers.push(ts.SyntaxKind.CloseBracketToken);
        }
        if (this.parenException) {
            openers.push(ts.SyntaxKind.OpenParenToken);
            closers.push(ts.SyntaxKind.CloseParenToken);
        }
        if (this.empty) {
            openers.push(ts.SyntaxKind.CloseParenToken);
            closers.push(ts.SyntaxKind.OpenParenToken);
        }
        return {
            openers: openers,
            closers: closers
        };
    };
    SpaceInParensWalker.prototype.findParenNodes = function (node) {
        var children = node.getChildren();
        var first;
        var second;
        var penultimate;
        var last;
        for (var i = 0; i < children.length; i++) {
            if (children[i].kind === ts.SyntaxKind.OpenParenToken) {
                first = children[i];
                second = children[i + 1];
            }
            if (children[i].kind === ts.SyntaxKind.CloseParenToken) {
                penultimate = children[i - 1];
                last = children[i];
            }
        }
        return [first, second, penultimate, last];
    };
    SpaceInParensWalker.prototype.visitNode = function (node) {
        var parenNodes = this.findParenNodes(node);
        this.checkParanSpace(parenNodes[0], parenNodes[1], parenNodes[2], parenNodes[3]);
        _super.prototype.visitNode.call(this, node);
    };
    SpaceInParensWalker.prototype.checkParanSpace = function (first, second, penultimate, last) {
        if (first && second) {
            if (this.shouldOpenerHaveSpace(first, second)) {
                var fix = Lint.Replacement.appendText(first.getEnd(), ' ');
                this.addFailure(this.createFailure(first.getEnd(), 0, Rule.MISSING_SPACE_MESSAGE, fix));
            }
            if (this.shouldOpenerRejectSpace(first, second)) {
                var width = second.getStart() - first.getEnd();
                var fix = Lint.Replacement.deleteText(first.getEnd(), width);
                this.addFailure(this.createFailure(first.getEnd(), 0, Rule.REJECTED_SPACE_MESSAGE, fix));
            }
        }
        if (penultimate && last) {
            if (this.shouldCloserHaveSpace(penultimate, last)) {
                var fix = Lint.Replacement.appendText(penultimate.getEnd(), ' ');
                this.addFailure(this.createFailure(last.getStart(), 0, Rule.MISSING_SPACE_MESSAGE, fix));
            }
            if (this.shouldCloserRejectSpace(penultimate, last)) {
                var width = last.getStart() - penultimate.getEnd();
                var fix = Lint.Replacement.deleteText(penultimate.getEnd(), width);
                this.addFailure(this.createFailure(last.getStart(), 0, Rule.REJECTED_SPACE_MESSAGE, fix));
            }
        }
    };
    SpaceInParensWalker.prototype.shouldOpenerHaveSpace = function (left, right) {
        if (this.isSpaceBetween(left, right))
            return false;
        if (this.spaced) {
            if (right.getText().trim() === '')
                return false;
            return !this.isOpenerException(right.getFirstToken());
        }
        return this.isOpenerException(right.getFirstToken());
    };
    SpaceInParensWalker.prototype.shouldCloserHaveSpace = function (left, right) {
        if (left.getText().trim() === '')
            return false;
        if (this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return !this.isCloserException(left.getLastToken());
        return this.isCloserException(left.getLastToken());
    };
    SpaceInParensWalker.prototype.shouldOpenerRejectSpace = function (left, right) {
        if (right.getText().trim() === '')
            return false;
        if (this.isLineBreakBetween(left, right))
            return false;
        if (!this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return this.isOpenerException(right.getFirstToken());
        return !this.isOpenerException(right.getFirstToken());
    };
    SpaceInParensWalker.prototype.shouldCloserRejectSpace = function (left, right) {
        if (left.getText().trim() === '')
            return false;
        if (this.isLineBreakBetween(left, right))
            return false;
        if (!this.isSpaceBetween(left, right))
            return false;
        if (this.spaced)
            return this.isCloserException(left.getLastToken());
        return !this.isCloserException(left.getLastToken());
    };
    SpaceInParensWalker.prototype.isOpenerException = function (token) {
        if (!token)
            return false;
        return this.getExceptions().openers.indexOf(token.kind) >= 0;
    };
    SpaceInParensWalker.prototype.isCloserException = function (token) {
        if (!token)
            return false;
        return this.getExceptions().closers.indexOf(token.kind) >= 0;
    };
    SpaceInParensWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    SpaceInParensWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    SpaceInParensWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    SpaceInParensWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return SpaceInParensWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3NwYWNlSW5QYXJlbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBRXBDO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUFpRUEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQS9EYSxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSwrQ0FBK0M7UUFDNUQsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSx1VEFBQSw0T0FJekIsSUFBQTtRQUNILGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxxWUFBQSxrVUFRbEMsSUFBQTtRQUNILE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFO2dCQUNMO29CQUNFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7aUJBQzFCO2dCQUNEO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixVQUFVLEVBQUU7NEJBQ1YsSUFBSSxFQUFFLE9BQU87NEJBQ2IsS0FBSyxFQUFFO2dDQUNMO29DQUNFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztpQ0FDbEM7NkJBQ0Y7NEJBQ0QsV0FBVyxFQUFFLElBQUk7eUJBQ2xCO3FCQUNGO29CQUNELG9CQUFvQixFQUFFLEtBQUs7aUJBQzVCO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFB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TyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sZ0RBQWtCLEdBQTFCLFVBQTJCLElBQWEsRUFBRSxRQUFpQjtRQUN6RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQUVPLDhDQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyw0Q0FBYyxHQUF0QixVQUF1QixJQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFSCwwQkFBQztBQUFELENBbktBLEFBbUtDLENBbktpQyxJQUFJLENBQUMsVUFBVSxHQW1LaEQiLCJmaWxlIjoicnVsZXMvc3BhY2VJblBhcmVuc1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
