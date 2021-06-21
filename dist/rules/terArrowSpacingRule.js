"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-spacing';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new RuleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'require space before/after arrow function\'s arrow',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      This rule normalizes the style of spacing before/after an arrow function\u2019s arrow(`=>`).\n      "], ["\n      This rule normalizes the style of spacing before/after an arrow function\u2019s arrow(\\`=>\\`).\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule takes an object argument with `before` and `after` properties, each with a\n      Boolean value.\n\n      The default configuration is `{ \"before\": true, \"after\": true }`.\n\n      `true` means there should be one or more spaces and `false` means no spaces.\n      "], ["\n      This rule takes an object argument with \\`before\\` and \\`after\\` properties, each with a\n      Boolean value.\n\n      The default configuration is \\`{ \"before\": true, \"after\": true }\\`.\n\n      \\`true\\` means there should be one or more spaces and \\`false\\` means no spaces.\n      "]))),
        options: {
            type: 'array',
            items: [{
                    type: 'object',
                    properties: {
                        before: {
                            type: 'boolean'
                        },
                        after: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }],
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, {\n          \"before\": false,\n          \"after\": false\n        }]\n        "], ["\n        \"", "\": [true, {\n          \"before\": false,\n          \"after\": false\n        }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.before = true;
        _this.after = true;
        var opt = _this.getOptions();
        if (opt[0]) {
            _this.before = opt[0].before !== false;
            _this.after = opt[0].after !== false;
        }
        _this.srcFile = sourceFile;
        _this.srcText = sourceFile.getFullText();
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        var arrow = node.equalsGreaterThanToken;
        var arrowStart = arrow.getStart(this.srcFile);
        var bodyStart = node.body.getStart(this.srcFile);
        var space = {
            before: /\s/.test(this.srcText[arrowStart - 1]),
            after: /\s/.test(this.srcText[arrow.end])
        };
        if (this.before) {
            if (!space.before) {
                var fix = Lint.Replacement.appendText(arrowStart, ' ');
                this.report(arrow, 'Missing', 'before', fix);
            }
        }
        else {
            if (space.before) {
                var spaces = arrowStart - arrow.getFullStart();
                var fix = Lint.Replacement.deleteText(arrowStart - spaces, spaces);
                this.report(arrow, 'Unexpected', 'before', fix);
            }
        }
        if (this.after) {
            if (!space.after) {
                var fix = Lint.Replacement.appendText(arrow.end, ' ');
                this.report(arrow, 'Missing', 'after', fix);
            }
        }
        else {
            if (space.after) {
                var fix = Lint.Replacement.deleteText(arrow.end, bodyStart - arrow.end);
                this.report(arrow, 'Unexpected', 'after', fix);
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    RuleWalker.prototype.report = function (arrowToken, status, place, fix) {
        var failure = this.createFailure(arrowToken.getStart(this.srcFile), arrowToken.getWidth(this.srcFile), status + " space " + place + " =>.", fix);
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93U3BhY2luZ1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztBQUV0QztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBa0RBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBaERhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLG9EQUFvRDtRQUNqRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLHlMQUFBLGtIQUV6QixJQUFBO1FBQ0gsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLDRXQUFBLHFUQU9sQyxJQUFBO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsQ0FBQztvQkFDTixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsTUFBTSxFQUFFOzRCQUNOLElBQUksRUFBRSxTQUFTO3lCQUNoQjt3QkFDRCxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3FCQUNGO29CQUNELG9CQUFvQixFQUFFLEtBQUs7aUJBQzVCLENBQUM7WUFDRixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGlIQUFBLGNBQ1osRUFBUyxzQkFDWCxLQURFLFNBQVM7WUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0seUxBQUEsY0FDWixFQUFTLDhGQUlYLEtBSkUsU0FBUztTQUtmO1FBQ0Qs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QUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNoRDtTQUNGO1FBQ0QsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLDJCQUFNLEdBQWQsVUFBZSxVQUFtQixFQUFFLE1BQWMsRUFBRSxLQUFhLEVBQUUsR0FBYTtRQUM5RSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNoQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzlCLE1BQU0sZUFBVSxLQUFLLFNBQU0sRUFDOUIsR0FBRyxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCxpQkFBQztBQUFELENBNURBLEFBNERDLENBNUR3QixJQUFJLENBQUMsVUFBVSxHQTREdkMiLCJmaWxlIjoicnVsZXMvdGVyQXJyb3dTcGFjaW5nUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
