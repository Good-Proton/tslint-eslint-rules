"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-func-call-spacing';
var ALWAYS = 'always';
var MISSING_SPACE = 'Missing space between function name and paren.';
var UNEXPECTED_SPACE = 'Unexpected space between function name and paren.';
var UNEXPECTED_NEWLINE = 'Unexpected newline between function name and paren.';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = {
            expectSpace: false,
            spacePattern: /\s/
        };
        var userOptions = this.getOptions().ruleArguments;
        if (userOptions[0] === ALWAYS) {
            options.expectSpace = true;
            if (userOptions[1] !== undefined && userOptions[1].allowNewlines) {
                options.spacePattern = /[ \t\r\n\u2028\u2029]/;
            }
            else {
                options.spacePattern = /[ \t]/;
            }
        }
        var walker = new RuleWalker(sourceFile, RULE_NAME, options);
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: true,
        description: 'require or disallow spacing between function identifiers and their invocations',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      This rule will enforce consistency of spacing in function calls,\n      by disallowing or requiring one or more spaces before the open paren.\n      "], ["\n      This rule will enforce consistency of spacing in function calls,\n      by disallowing or requiring one or more spaces before the open paren.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule has a string option:\n\n      * `\"never\"` (default) disallows space between the function name and the opening parenthesis.\n      * `\"always\"` requires space between the function name and the opening parenthesis.\n\n      Further, in `\"always\"` mode, a second object option is available that contains a single boolean `allowNewlines` property.\n      "], ["\n      This rule has a string option:\n\n      * \\`\"never\"\\` (default) disallows space between the function name and the opening parenthesis.\n      * \\`\"always\"\\` requires space between the function name and the opening parenthesis.\n\n      Further, in \\`\"always\"\\` mode, a second object option is available that contains a single boolean \\`allowNewlines\\` property.\n      "]))),
        options: {
            type: 'array',
            items: [
                {
                    enum: ['always', 'never']
                },
                {
                    type: 'object',
                    properties: {
                        allowNewlines: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }
            ],
            minItems: 0,
            maxItems: 2
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\", { allowNewlines: true }]\n        "], ["\n        \"", "\": [true, \"always\", { allowNewlines: true }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker(sourceFile, ruleName, options) {
        var _this = _super.call(this, sourceFile, ruleName, options) || this;
        _this.sourceText = sourceFile.getFullText();
        return _this;
    }
    RuleWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (node.kind === ts.SyntaxKind.NewExpression) {
                _this.visitNewExpression(node);
            }
            else if (node.kind === ts.SyntaxKind.CallExpression) {
                _this.visitCallExpression(node);
            }
            else if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
                return;
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    RuleWalker.prototype.visitNewExpression = function (node) {
        this.checkWhitespaceAfterExpression(node.expression, node.typeArguments, node.arguments);
    };
    RuleWalker.prototype.visitCallExpression = function (node) {
        this.checkWhitespaceAfterExpression(node.expression, node.typeArguments, node.arguments);
    };
    RuleWalker.prototype.checkWhitespaceAfterExpression = function (expression, typeArguments, funcArguments) {
        if (funcArguments !== undefined) {
            var start = void 0;
            if (typeArguments !== undefined) {
                start = typeArguments.end + 1;
            }
            else {
                start = expression.getEnd();
            }
            this.checkWhitespaceBetween(start, funcArguments.pos - 1);
        }
    };
    RuleWalker.prototype.checkWhitespaceBetween = function (start, end) {
        var whitespace = this.sourceText.substring(start, end);
        if (this.options.spacePattern.test(whitespace)) {
            if (!this.options.expectSpace) {
                var fix = Lint.Replacement.deleteText(start, whitespace.length);
                var failureMessage = this.failureMessageForUnexpectedWhitespace(whitespace);
                this.addFailureAt(start, whitespace.length, failureMessage, fix);
            }
        }
        else if (this.options.expectSpace) {
            var fix = Lint.Replacement.appendText(start, ' ');
            this.addFailureAt(start, 1, MISSING_SPACE, fix);
        }
    };
    RuleWalker.prototype.failureMessageForUnexpectedWhitespace = function (whitespace) {
        if (/[\r\n]/.test(whitespace)) {
            return UNEXPECTED_NEWLINE;
        }
        else {
            return UNEXPECTED_SPACE;
        }
    };
    return RuleWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckZ1bmNDYWxsU3BhY2luZ1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxTQUFTLEdBQUcsdUJBQXVCLENBQUM7QUFDMUMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBRXhCLElBQU0sYUFBYSxHQUFHLGdEQUFnRCxDQUFDO0FBQ3ZFLElBQU0sZ0JBQWdCLEdBQUcsbURBQW1ELENBQUM7QUFDN0UsSUFBTSxrQkFBa0IsR0FBRyxxREFBcUQsQ0FBQztBQU9qRjtJQUEwQixnQ0FBdUI7SUFBakQ7O0lBdUVBLENBQUM7SUFwQlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sT0FBTyxHQUFHO1lBQ2QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQztRQUVGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFO2dCQUNoRSxPQUFPLENBQUMsWUFBWSxHQUFHLHVCQUF1QixDQUFDO2FBQ2hEO2lCQUNJO2dCQUNILE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1NBQ0Y7UUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBckVhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFD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QUFFLGFBQXlDLEVBQUUsYUFBMkM7UUFDbEssSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksS0FBSyxTQUFBLENBQUM7WUFDVixJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLEtBQUssR0FBRyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMvQjtpQkFDSTtnQkFDSCxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztJQUVPLDJDQUFzQixHQUE5QixVQUErQixLQUFhLEVBQUUsR0FBVztRQUN2RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUM3QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRSxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMscUNBQXFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xFO1NBQ0Y7YUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVPLDBEQUFxQyxHQUE3QyxVQUE4QyxVQUFrQjtRQUM5RCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjthQUNJO1lBQ0gsT0FBTyxnQkFBZ0IsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBdkVBLEFBdUVDLENBdkV3QixJQUFJLENBQUMsY0FBYyxHQXVFM0MiLCJmaWxlIjoicnVsZXMvdGVyRnVuY0NhbGxTcGFjaW5nUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
