"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var OPTION_1TBS = '1tbs';
var OPTION_ALLMAN = 'allman';
var OPTION_STROUSTRUP = 'stroustrup';
var BraceStyle;
(function (BraceStyle) {
    BraceStyle[BraceStyle["OneTBS"] = 0] = "OneTBS";
    BraceStyle[BraceStyle["Allman"] = 1] = "Allman";
    BraceStyle[BraceStyle["Stroustrup"] = 2] = "Stroustrup";
})(BraceStyle || (BraceStyle = {}));
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BraceStyleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        open: 'Opening curly brace does not appear on the same line as controlling statement.',
        openAllman: 'Opening curly brace appears on the same line as controlling statement.',
        body: 'Statement inside of curly braces should be on next line.',
        close: 'Closing curly brace does not appear on the same line as the subsequent block.',
        closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
        closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BraceStyleWalker = (function (_super) {
    tslib_1.__extends(BraceStyleWalker, _super);
    function BraceStyleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowSingleLine = false;
        if (_this.hasOption(OPTION_1TBS)) {
            _this.braceStyle = BraceStyle.OneTBS;
        }
        else if (_this.hasOption(OPTION_ALLMAN)) {
            _this.braceStyle = BraceStyle.Allman;
        }
        else if (_this.hasOption(OPTION_STROUSTRUP)) {
            _this.braceStyle = BraceStyle.Stroustrup;
        }
        else {
        }
        _this.allowSingleLine = _this.getOptions()[1] && _this.getOptions()[1].allowSingleLine;
        return _this;
    }
    BraceStyleWalker.prototype.visitTryStatement = function (tryStatement) {
        var _this = this;
        _super.prototype.visitTryStatement.call(this, tryStatement);
        var checkTryStatementError = function (node) {
            var previousNode = _this.getPreviousNode(tryStatement.getChildren(), node);
            var openingBracketError = _this.areOnSameLine(previousNode, node) !== (_this.braceStyle === BraceStyle.OneTBS);
            if (_this.allowSingleLine && _this.getStartPosition(node).line === _this.getEndPosition(tryStatement).line) {
                return;
            }
            if (openingBracketError) {
                var failureString = _this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
                _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), failureString));
            }
        };
        var catchClause = tryStatement.catchClause;
        if (catchClause) {
            checkTryStatementError(catchClause);
        }
        var finallyBlock = tryStatement.finallyBlock;
        if (finallyBlock) {
            checkTryStatementError(finallyBlock);
        }
    };
    BraceStyleWalker.prototype.visitIfStatement = function (ifStatement) {
        _super.prototype.visitIfStatement.call(this, ifStatement);
        var elseKeyword = ifStatement.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.ElseKeyword; }).shift();
        if (!elseKeyword) {
            return;
        }
        var previousNode = ifStatement.getChildren()[ifStatement.getChildren().indexOf(elseKeyword) - 1];
        var openingBracketError = this.areOnSameLine(previousNode, elseKeyword) !== (this.braceStyle === BraceStyle.OneTBS);
        if (this.allowSingleLine && this.getStartPosition(elseKeyword).line === this.getEndPosition(ifStatement).line) {
            return;
        }
        if (!ifStatement.getChildren().some(function (ch) { return ch.kind === ts.SyntaxKind.Block; })) {
            return;
        }
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
            this.addFailure(this.createFailure(elseKeyword.getStart(), elseKeyword.getWidth(), failureString));
        }
    };
    BraceStyleWalker.prototype.visitBlock = function (block) {
        _super.prototype.visitBlock.call(this, block);
        if (this.allowSingleLine && this.getStartPosition(block).line === this.getEndPosition(block).line) {
            return;
        }
        var blockChildren = block.getChildren();
        var openingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBraceToken; }).shift();
        var closingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.CloseBraceToken; }).pop();
        var syntaxList = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.SyntaxList; }).shift();
        var parentChildren = block.parent ? block.parent.getChildren() : [];
        var blockPreviousNode = parentChildren[parentChildren.indexOf(block) - 1];
        if (!openingCurlyBrace || !closingCurlyBrace || !syntaxList || !blockPreviousNode) {
            return;
        }
        var openingBracketError = this.areOnSameLine(blockPreviousNode, block) === (this.braceStyle === BraceStyle.Allman);
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.Allman ? Rule.FAILURE_STRING.openAllman : Rule.FAILURE_STRING.open;
            this.addFailure(this.createFailure(openingCurlyBrace.getStart(), openingCurlyBrace.getWidth(), failureString));
        }
        if (syntaxList.getChildCount() > 0) {
            var bodyError = this.areOnSameLine(openingCurlyBrace, syntaxList);
            if (bodyError) {
                this.addFailure(this.createFailure(syntaxList.getStart(), syntaxList.getWidth(), Rule.FAILURE_STRING.body));
            }
            var nodeBeforeClosingBracket = syntaxList.getChildren()[syntaxList.getChildren().length - 1];
            var closingBracketError = this.areOnSameLine(nodeBeforeClosingBracket, closingCurlyBrace);
            if (closingBracketError) {
                this.addFailure(this.createFailure(closingCurlyBrace.getStart(), closingCurlyBrace.getWidth(), Rule.FAILURE_STRING.closeSingle));
            }
        }
    };
    BraceStyleWalker.prototype.areOnSameLine = function (node, nextNode) {
        return this.getEndPosition(node).line === this.getStartPosition(nextNode).line;
    };
    BraceStyleWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    BraceStyleWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    BraceStyleWalker.prototype.getPreviousNode = function (children, node) {
        var position = children.indexOf(node) - 1;
        while (position >= 0) {
            if (children[position].kind === ts.SyntaxKind.Block || children[position].kind === ts.SyntaxKind.CatchClause) {
                break;
            }
            position -= 1;
        }
        return children[position];
    };
    return BraceStyleWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQUVPLDJDQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyx5Q0FBYyxHQUF0QixVQUF1QixJQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFHTywwQ0FBZSxHQUF2QixVQUF3QixRQUFtQixFQUFFLElBQWE7UUFDeEQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO2dCQUM1RyxNQUFNO2FBQ1A7WUFDRCxRQUFRLElBQUksQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQWxKQSxBQWtKQyxDQWxKOEIsSUFBSSxDQUFDLFVBQVUsR0FrSjdDIiwiZmlsZSI6InJ1bGVzL2JyYWNlU3R5bGVSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
