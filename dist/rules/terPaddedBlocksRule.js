"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var RULE_NAME = 'ter-padded-blocks';
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.formatOptions = function (ruleArguments) {
        var config = ruleArguments[0] || OPTION_ALWAYS;
        if (typeof (config) === 'string') {
            var always = config === OPTION_ALWAYS;
            return {
                blocks: always,
                classes: always,
                switches: always
            };
        }
        return {
            blocks: config['blocks'] && config['blocks'] === OPTION_ALWAYS,
            classes: config['classes'] && config['classes'] === OPTION_ALWAYS,
            switches: config['switches'] && config['switches'] === OPTION_ALWAYS
        };
    };
    Rule.prototype.apply = function (sourceFile) {
        var opt = this.formatOptions(this.ruleArguments);
        var walker = new RuleWalker(sourceFile, this.ruleName, opt);
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'enforces consistent empty line padding within blocks',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Some style guides require block statements to start and end with blank\n      lines. The goal is to improve readability by visually separating the\n      block content and the surrounding code.\n      "], ["\n      Some style guides require block statements to start and end with blank\n      lines. The goal is to improve readability by visually separating the\n      block content and the surrounding code.\n      "]))),
        optionsDescription: 'This rule has one option, which can be a string option or an object option',
        options: {
            type: 'array',
            items: [
                {
                    enum: ['always', 'never']
                },
                {
                    type: 'object',
                    properties: {
                        blocks: {
                            enum: ['always', 'never']
                        },
                        classes: {
                            enum: ['always', 'never']
                        },
                        switches: {
                            enum: ['always', 'never']
                        }
                    },
                    additionalProperties: false
                }
            ],
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\"]\n        "], ["\n        \"", "\": [true, \"never\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"blocks\": \"always\" }]\n        "], ["\n        \"", "\": [true, { \"blocks\": \"always\" }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"blocks\": \"never\" }]\n        "], ["\n        \"", "\": [true, { \"blocks\": \"never\" }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    Rule.FAILURE_STRING = {
        always: 'Block must be padded by blank lines.',
        never: 'Block must not be padded by blank lines.'
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
        sourceFile.forEachChild(function (node) { return _this.processNode(node); });
    };
    RuleWalker.prototype.processNode = function (node) {
        var _this = this;
        switch (node.kind) {
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.CaseBlock:
                this.checkPadding(node);
        }
        node.forEachChild(function (child) { return _this.processNode(child); });
    };
    RuleWalker.prototype.getParts = function (node) {
        var openBrace, body, closeBrace;
        node.getChildren().forEach(function (child) {
            if (child.kind === ts.SyntaxKind.OpenBraceToken) {
                openBrace = child;
            }
            else if (child.kind === ts.SyntaxKind.SyntaxList) {
                body = child;
            }
            else if (child.kind === ts.SyntaxKind.CloseBraceToken) {
                closeBrace = child;
            }
        });
        return {
            openBrace: openBrace,
            body: body,
            closeBrace: closeBrace
        };
    };
    RuleWalker.prototype.getPositions = function (node) {
        var _a = this.getParts(node), openBrace = _a.openBrace, body = _a.body, closeBrace = _a.closeBrace;
        var firstChild = body.getChildAt(0);
        var lastChild = body.getChildAt(body.getChildCount() - 1);
        var positions = {
            openPosition: openBrace.getStart(this.sourceFile),
            openLine: this.getLine(openBrace.getStart(this.sourceFile)),
            closePosition: closeBrace.getEnd(),
            closeLine: this.getLine(closeBrace.getEnd())
        };
        if (firstChild) {
            positions.firstChildPosition = firstChild.getStart(this.sourceFile);
            positions.firstChildLine = this.getLine(positions.firstChildPosition);
        }
        if (lastChild) {
            positions.lastChildPosition = lastChild.getEnd();
            positions.lastChildLine = this.getLine(positions.lastChildPosition);
        }
        return positions;
    };
    RuleWalker.prototype.checkPadding = function (node) {
        var _this = this;
        var paddingAllowed = this.options.blocks;
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            paddingAllowed = this.options.classes;
        }
        else if (node.parent && node.parent.kind === ts.SyntaxKind.SwitchStatement) {
            paddingAllowed = this.options.switches;
        }
        if (paddingAllowed === undefined) {
            return;
        }
        var positions = this.getPositions(node);
        var openBraceReplacement = {
            from: positions.openPosition + 1,
            to: positions.firstChildPosition || positions.closePosition
        };
        var closeBraceReplacement = {
            from: positions.lastChildPosition || positions.openPosition,
            to: positions.closePosition - 1
        };
        var comments = [];
        tsutils_1.forEachComment(node, function (_fullText, comment) {
            if (comment.pos > positions.openPosition && comment.pos < positions.closePosition) {
                var commentLineEnd = _this.getLine(comment.end);
                if (commentLineEnd > positions.openLine) {
                    comments.push(comment);
                }
                else if (commentLineEnd === positions.openLine) {
                    openBraceReplacement.from = comment.end;
                }
            }
        });
        if (comments.length > 0) {
            var firstCommentLine = this.getLine(comments[0].pos);
            var lastCommentLine = this.getLine(comments[comments.length - 1].end);
            if (!positions.firstChildLine || firstCommentLine < positions.firstChildLine) {
                positions.firstChildLine = firstCommentLine;
                positions.firstChildPosition = comments[0].pos;
                openBraceReplacement.to = positions.firstChildPosition;
            }
            if (!positions.lastChildLine || lastCommentLine >= positions.lastChildLine) {
                positions.lastChildLine = lastCommentLine;
                positions.lastChildPosition = comments[comments.length - 1].end;
                closeBraceReplacement.from = positions.lastChildPosition;
            }
        }
        if (this.getLine(openBraceReplacement.from) !== this.getLine(openBraceReplacement.to)) {
            openBraceReplacement.to = this.getPosition(this.getLine(openBraceReplacement.to));
        }
        if (this.getLine(closeBraceReplacement.from) !== this.getLine(closeBraceReplacement.to)) {
            closeBraceReplacement.to = this.getPosition(this.getLine(closeBraceReplacement.to));
        }
        if (positions.firstChildLine === undefined && positions.lastChildLine === undefined) {
            return;
        }
        var openPadded = false;
        if (positions.firstChildLine !== undefined) {
            openPadded = positions.firstChildLine - positions.openLine > 1;
        }
        else {
            openPadded = positions.closeLine - positions.openLine > 1;
        }
        var closePadded = false;
        if (positions.lastChildLine !== undefined) {
            closePadded = positions.closeLine - positions.lastChildLine > 1;
        }
        else {
            closePadded = positions.closeLine - positions.openLine > 1;
        }
        if (paddingAllowed ? !openPadded : openPadded) {
            var openFix = Lint.Replacement.replaceFromTo(openBraceReplacement.from, openBraceReplacement.to, paddingAllowed ? '\n\n' : '\n');
            this.addFailure(positions.openPosition, positions.openPosition + 1, paddingAllowed ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never, openFix);
        }
        if (paddingAllowed ? !closePadded : closePadded) {
            var closeFix = Lint.Replacement.replaceFromTo(closeBraceReplacement.from, closeBraceReplacement.to, paddingAllowed ? '\n\n' : '\n');
            this.addFailure(positions.closePosition - 1, positions.closePosition, paddingAllowed ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never, closeFix);
        }
    };
    RuleWalker.prototype.getLine = function (pos) {
        return this.sourceFile.getLineAndCharacterOfPosition(pos).line;
    };
    RuleWalker.prototype.getPosition = function (line) {
        return this.sourceFile.getPositionOfLineAndCharacter(line, 0);
    };
    return RuleWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlclBhZGRlZEJsb2Nrc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsbUNBQXlDO0FBRXpDLElBQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBQ3RDLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQztBQU8vQjtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBcUZBLENBQUM7SUF6QlMsNEJBQWEsR0FBckIsVUFBc0IsYUFBb0I7UUFDeEMsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQztRQUVqRCxJQUFJLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLGFBQWEsQ0FBQztZQUV4QyxPQUFPO2dCQUNMLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxhQUFhO1lBQzlELE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLGFBQWE7WUFDakUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssYUFBYTtTQUNyRSxDQUFDO0lBQ0osQ0FBQztJQUVNLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FB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QUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQy9DLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUM3QyxxQkFBcUIsQ0FBQyxJQUFJLEVBQzFCLHFCQUFxQixDQUFDLEVBQUUsRUFDeEIsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0IsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsU0FBUyxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQzNCLFNBQVMsQ0FBQyxhQUFhLEVBQ3ZCLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUN2RSxRQUFRLENBQ1QsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLDRCQUFPLEdBQWYsVUFBZ0IsR0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pFLENBQUM7SUFFTyxnQ0FBVyxHQUFuQixVQUFvQixJQUFZO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0E5S0EsQUE4S0MsQ0E5S3dCLElBQUksQ0FBQyxjQUFjLEdBOEszQyIsImZpbGUiOiJydWxlcy90ZXJQYWRkZWRCbG9ja3NSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
