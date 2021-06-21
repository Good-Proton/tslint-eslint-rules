"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var OPTION_ALWAYS = 'always';
var RULE_NAME = 'array-bracket-spacing';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'enforce consistent spacing inside array brackets',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      A number of style guides require or disallow spaces between array brackets and other tokens.\n      This rule applies to both array literals and destructuring assignments (ECMAScript 6).\n      "], ["\n      A number of style guides require or disallow spaces between array brackets and other tokens.\n      This rule applies to both array literals and destructuring assignments (ECMAScript 6).\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - `\"never\"` (default) disallows spaces inside array brackets\n      - `\"always\"`requires one or more spaces or newlines inside array brackets\n\n      The second option is an object for exceptions to the `\"never\"` option:\n\n      - `\"singleValue\": true` requires one or more spaces or newlines inside brackets of array\n                                literals that contain a single element\n      - `\"objectsInArrays\": true` requires one or more spaces or newlines between brackets of\n                                    array literals and braces of their object literal elements\n                                    `[ {` or `} ]`\n      - `\"arraysInArrays\": true` requires one or more spaces or newlines between brackets of\n                                   array literals and brackets of their array literal elements\n                                   `[ [` or `] ]`\n\n      When using the `\"always\"` option the second option takes on these exceptions:\n\n      - `\"singleValue\": false` disallows spaces inside brackets of array literals that contain a\n                                 single element\n      - `\"objectsInArrays\": false` disallows spaces between brackets of array literals and braces\n                                     of their object literal elements `[ {` or `} ]`\n      - `\"arraysInArrays\": false` disallows spaces between brackets of array literals and brackets\n                                    of their array literal elements `[ [` or `] ]`\n\n      This rule has build-in exceptions:\n\n      - `\"never\"` (and also the exceptions to the `\"always\"` option) allows newlines inside\n                    array brackets, because this is a common pattern\n      - `\"always\"` does not require spaces or newlines in empty array literals `[]`\n      "], ["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - \\`\"never\"\\` (default) disallows spaces inside array brackets\n      - \\`\"always\"\\`requires one or more spaces or newlines inside array brackets\n\n      The second option is an object for exceptions to the \\`\"never\"\\` option:\n\n      - \\`\"singleValue\": true\\` requires one or more spaces or newlines inside brackets of array\n                                literals that contain a single element\n      - \\`\"objectsInArrays\": true\\` requires one or more spaces or newlines between brackets of\n                                    array literals and braces of their object literal elements\n                                    \\`[ {\\` or \\`} ]\\`\n      - \\`\"arraysInArrays\": true\\` requires one or more spaces or newlines between brackets of\n                                   array literals and brackets of their array literal elements\n                                   \\`[ [\\` or \\`] ]\\`\n\n      When using the \\`\"always\"\\` option the second option takes on these exceptions:\n\n      - \\`\"singleValue\": false\\` disallows spaces inside brackets of array literals that contain a\n                                 single element\n      - \\`\"objectsInArrays\": false\\` disallows spaces between brackets of array literals and braces\n                                     of their object literal elements \\`[ {\\` or \\`} ]\\`\n      - \\`\"arraysInArrays\": false\\` disallows spaces between brackets of array literals and brackets\n                                    of their array literal elements \\`[ [\\` or \\`] ]\\`\n\n      This rule has build-in exceptions:\n\n      - \\`\"never\"\\` (and also the exceptions to the \\`\"always\"\\` option) allows newlines inside\n                    array brackets, because this is a common pattern\n      - \\`\"always\"\\` does not require spaces or newlines in empty array literals \\`[]\\`\n      "]))),
        options: {
            anyOf: [
                {
                    type: 'array',
                    items: [
                        {
                            enum: ['always', 'never']
                        }
                    ],
                    minItems: 0,
                    maxItems: 1
                },
                {
                    type: 'object',
                    properties: {
                        singleValue: {
                            type: 'boolean'
                        },
                        objectsInArrays: {
                            type: 'boolean'
                        },
                        arraysInArrays: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }
            ]
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\"]\n        "], ["\n        \"", "\": [true, \"never\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\", {\n          \"arraysInArrays\": true\n        }]\n        "], ["\n        \"", "\": [true, \"never\", {\n          \"arraysInArrays\": true\n        }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ArrayBracketSpacingWalker = (function (_super) {
    tslib_1.__extends(ArrayBracketSpacingWalker, _super);
    function ArrayBracketSpacingWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.singleValueException = false;
        _this.objectsInArraysException = false;
        _this.arraysInArraysException = false;
        var ruleOptions = _this.getOptions();
        _this.spaced = _this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);
        var opt = ruleOptions[1];
        var isDef = function (x) { return typeof x !== 'undefined'; };
        if (opt) {
            _this.singleValueException = isDef(opt.singleValue) && opt.singleValue !== _this.spaced;
            _this.objectsInArraysException = isDef(opt.objectsInArrays) && opt.objectsInArrays !== _this.spaced;
            _this.arraysInArraysException = isDef(opt.arraysInArrays) && opt.arraysInArrays !== _this.spaced;
        }
        return _this;
    }
    ArrayBracketSpacingWalker.prototype.report = function (start, msg, fix) {
        this.addFailure(this.createFailure(start, 1, msg, fix));
    };
    ArrayBracketSpacingWalker.prototype.reportNoBeginningSpace = function (token, space) {
        var start = token.getStart(this.getSourceFile());
        var fix = Lint.Replacement.deleteText(start + 1, space);
        this.report(start, 'There should be no space after "["', fix);
    };
    ArrayBracketSpacingWalker.prototype.reportRequiredBeginningSpace = function (token) {
        var start = token.getStart(this.getSourceFile());
        var fix = Lint.Replacement.appendText(start + 1, ' ');
        this.report(start, 'A space is required after "["', fix);
    };
    ArrayBracketSpacingWalker.prototype.reportRequiredEndingSpace = function (token) {
        var start = token.getStart(this.getSourceFile());
        var fix = Lint.Replacement.appendText(start, ' ');
        this.report(start, 'A space is required before "]"', fix);
    };
    ArrayBracketSpacingWalker.prototype.reportNoEndingSpace = function (token, space) {
        var start = token.getStart(this.getSourceFile());
        var fix = Lint.Replacement.deleteText(start - space, space);
        this.report(start, 'There should be no space before "]"', fix);
    };
    ArrayBracketSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.validateArraySpacing(node, node.elements);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateArraySpacing(node, node.elements);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.isObjectType = function (node) {
        return node && node.kind === ts.SyntaxKind.ObjectLiteralExpression;
    };
    ArrayBracketSpacingWalker.prototype.isArrayType = function (node) {
        if (node) {
            if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                return true;
            }
            var firstChild = node.getChildAt(0);
            if (firstChild && firstChild.kind === ts.SyntaxKind.ArrayBindingPattern) {
                return true;
            }
        }
        return false;
    };
    ArrayBracketSpacingWalker.prototype.validateArraySpacing = function (node, elements) {
        var _this = this;
        if (this.spaced && elements.length === 0) {
            return;
        }
        var first = node.getChildAt(0);
        var last = node.getChildAt(2);
        var firstElement = elements[0];
        var lastElement = elements[elements.length - 1];
        var second = firstElement || last;
        var penultimate = lastElement || first;
        if (second.pos === second.end) {
            second = node.getChildAt(1).getChildAt(1);
        }
        if (elements.hasTrailingComma) {
            penultimate = elements;
        }
        var mustBeSpaced = function (token) { return (_this.singleValueException && elements.length === 1 ||
            _this.objectsInArraysException && _this.isObjectType(token) ||
            _this.arraysInArraysException && _this.isArrayType(token)) ? !_this.spaced : _this.spaced; };
        var openingBracketMustBeSpaced = mustBeSpaced(firstElement);
        var closingBracketMustBeSpaced = mustBeSpaced(lastElement);
        var spaceAfterOpeningBracket = this.getSpaceBetween(first, second, false);
        var isBreakAfterOpeningBracket = this.isLineBreakBetween(first, second);
        var spaceBeforeClosingBracket = this.getSpaceBetween(penultimate, last, true);
        var isBreakBeforeClosingBracket = this.isLineBreakBetween(penultimate, last);
        if (!isBreakAfterOpeningBracket) {
            if (openingBracketMustBeSpaced && !spaceAfterOpeningBracket) {
                this.reportRequiredBeginningSpace(first);
            }
            else if (!openingBracketMustBeSpaced && spaceAfterOpeningBracket) {
                this.reportNoBeginningSpace(first, spaceAfterOpeningBracket);
            }
        }
        if (first !== penultimate && !isBreakBeforeClosingBracket) {
            if (closingBracketMustBeSpaced && !spaceBeforeClosingBracket) {
                this.reportRequiredEndingSpace(last);
            }
            else if (!closingBracketMustBeSpaced && spaceBeforeClosingBracket) {
                this.reportNoEndingSpace(last, spaceBeforeClosingBracket);
            }
        }
    };
    ArrayBracketSpacingWalker.prototype.getSpaceBetween = function (node, nextNode, trailing) {
        var end = nextNode.getStart(this.getSourceFile());
        var start = node.end;
        var text = this.getSourceFile().text.substring(start, end);
        var m = text.match(/\/\*.*\*\//);
        if (m && typeof m.index === 'number') {
            var len = m[0].length;
            return trailing ? end - (start + m.index + len) : m.index;
        }
        return end - start;
    };
    ArrayBracketSpacingWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    ArrayBracketSpacingWalker.prototype.getStartPosition = function (node) {
        var srcFile = this.getSourceFile();
        return srcFile.getLineAndCharacterOfPosition(node.getStart(srcFile));
    };
    ArrayBracketSpacingWalker.prototype.getEndPosition = function (node) {
        return this.getSourceFile().getLineAndCharacterOfPosition(node.end);
    };
    return ArrayBracketSpacingWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2FycmF5QnJhY2tldFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUMvQixJQUFNLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztBQUUxQztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBMkZBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUF6RmEsYUFBUSxHQUF1QjtRQUMzQyxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsa0RBQWtEO1FBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sdVJBQUEsNE1BR3pCLElBQUE7UUFDSCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sczdEQUFBLG04REErQmxDLElBQUE7UUFDSCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFO3dCQUNMOzRCQUNFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7eUJBQzFCO3FCQUNGO29CQUNELFFBQVEsRUFBRSxDQUFDO29CQUNYLFFBQVEsRUFBRSxDQUFDO2lCQUNaO2dCQUNEO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixXQUFXLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3dCQUNELGVBQWUsRUFBRTs0QkFDZixJQUFJLEVBQUUsU0FBUzt5QkFDaEI7d0JBQ0QsY0FBYyxFQUFFOzRCQUNkLElBQUksRUFB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QUFNLENBQUM7WUFDeEIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxzREFBa0IsR0FBMUIsVUFBMkIsSUFBa0IsRUFBRSxRQUFpQjtRQUM5RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQUVPLG9EQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLGtEQUFjLEdBQXRCLFVBQXVCLElBQWtCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQTlKQSxBQThKQyxDQTlKdUMsSUFBSSxDQUFDLFVBQVUsR0E4SnREIiwiZmlsZSI6InJ1bGVzL2FycmF5QnJhY2tldFNwYWNpbmdSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
