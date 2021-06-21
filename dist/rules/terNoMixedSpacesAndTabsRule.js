"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var RULE_NAME = 'ter-no-mixed-spaces-and-tabs';
var OPTION_USE_TABS = 'tabs';
var OPTION_USE_SPACES = 'spaces';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING = function (expected, mixed) {
        if (!mixed) {
            return expected + " indentation expected";
        }
        return "indentation has mixed tabs and spaces";
    };
    Rule.prototype.formatOptions = function (ruleArguments) {
        var tabs = undefined;
        var smartTabs = false;
        var options = ruleArguments[0];
        if (options !== undefined) {
            tabs = options.type === OPTION_USE_TABS ? true : options.type === OPTION_USE_SPACES ? false : undefined;
            smartTabs = options.smartTabs;
        }
        return {
            tabs: tabs,
            smartTabs: smartTabs
        };
    };
    Rule.prototype.apply = function (sourceFile) {
        var options = this.formatOptions(this.ruleArguments);
        return this.applyWithFunction(sourceFile, walk, options);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'Enforces indentation with unmixed tabs or spaces.',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation."], ["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule takes an object argument with an optional `type` property which can be set to:\n\n      * `", "` enforces consistent spaces for indentation.\n      * `", "` enforces consistent tabs for indentation.\n\n      If the above is not provided, the rule will enforce either all tabs or all spaces on each\n      line, although different lines may differ between tabs and spaces.\n\n      Optionally, a `smartTabs` boolean property can be specified.  If set to true, smart tabs\n      allow mixing tabs and spaces if tabs are used for indentation and spaces for alignment, eg.\n\n          function main() {\n          // --->const a = 1,\n          // --->......b = 2;\n\n              const a = 1,\n                    b = 2;\n          }\n      "], ["\n      This rule takes an object argument with an optional \\`type\\` property which can be set to:\n\n      * \\`", "\\` enforces consistent spaces for indentation.\n      * \\`", "\\` enforces consistent tabs for indentation.\n\n      If the above is not provided, the rule will enforce either all tabs or all spaces on each\n      line, although different lines may differ between tabs and spaces.\n\n      Optionally, a \\`smartTabs\\` boolean property can be specified.  If set to true, smart tabs\n      allow mixing tabs and spaces if tabs are used for indentation and spaces for alignment, eg.\n\n          function main() {\n          // --->const a = 1,\n          // --->......b = 2;\n\n              const a = 1,\n                    b = 2;\n          }\n      "])), OPTION_USE_SPACES, OPTION_USE_TABS),
        options: {
            type: 'array',
            items: [
                {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            enum: [OPTION_USE_TABS, OPTION_USE_SPACES]
                        },
                        smartTabs: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }
            ],
            minLength: 0,
            maxLength: 1
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      \"", "\": { \"type\": \"", "\" } ]\n      "], ["\n      \"", "\": { \"type\": \"", "\" } ]\n      "])), RULE_NAME, OPTION_USE_TABS),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      \"", "\": { \"type\": \"", "\" } ]\n      "], ["\n      \"", "\": { \"type\": \"", "\" } ]\n      "])), RULE_NAME, OPTION_USE_SPACES),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      \"", "\": { \"smartTabs\": true } ]\n      "], ["\n      \"", "\": { \"smartTabs\": true } ]\n      "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n      \"", "\": { \"type\": \"", "\", \"smartTabs\": true } ]\n      "], ["\n      \"", "\": { \"type\": \"", "\", \"smartTabs\": true } ]\n      "])), RULE_NAME, OPTION_USE_TABS)
        ],
        type: 'maintainability',
        typescriptOnly: false
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, _a = ctx.options, tabs = _a.tabs, smartTabs = _a.smartTabs;
    var regExp;
    if (tabs === true) {
        regExp = new RegExp(" " + (smartTabs ? '\\t' : ''));
    }
    else if (tabs === false) {
        regExp = new RegExp("\\t");
    }
    else {
        regExp = new RegExp((smartTabs ? '' : '\\t |') + " \\t");
    }
    var failure = Rule.FAILURE_STRING(tabs ? 'tab' : 'space', typeof tabs === 'undefined');
    for (var _i = 0, _b = tsutils_1.getLineRanges(sourceFile); _i < _b.length; _i++) {
        var _c = _b[_i], pos = _c.pos, contentLength = _c.contentLength;
        if (contentLength === 0) {
            continue;
        }
        var line = sourceFile.text.substr(pos, contentLength);
        var indentEnd = line.search(/\S/);
        if (indentEnd === 0) {
            continue;
        }
        if (indentEnd === -1) {
            indentEnd = contentLength;
        }
        var indentSpace = line.slice(0, indentEnd);
        if (!regExp.test(indentSpace)) {
            continue;
        }
        var token = tsutils_1.getTokenAtPosition(sourceFile, pos);
        if (token.kind !== ts.SyntaxKind.JsxText &&
            (pos >= token.getStart(sourceFile) || tsutils_1.isPositionInComment(sourceFile, pos, token))) {
            continue;
        }
        ctx.addFailureAt(pos, indentEnd, failure);
    }
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vTWl4ZWRTcGFjZXNBbmRUYWJzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUMvQixtQ0FBaUY7QUFFakYsSUFBTSxTQUFTLEdBQUcsOEJBQThCLENBQUM7QUFNakQsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO0FBQy9CLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDO0FBRW5DO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUE2RkEsQ0FBQztJQTVCZSxtQkFBYyxHQUE1QixVQUE2QixRQUFnQixFQUFFLEtBQWU7UUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQVUsUUFBUSwwQkFBdUIsQ0FBQztTQUMzQztRQUVELE9BQU8sdUNBQXVDLENBQUM7SUFDakQsQ0FBQztJQUVPLDRCQUFhLEdBQXJCLFVBQXNCLGFBQW9CO1FBQ3hDLElBQUksSUFBSSxHQUF3QixTQUFTLENBQUM7UUFDMUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3hHLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQy9CO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQztJQUNKLENBQUM7SUFFTSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENB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LFNBQUEsRUFBRSxhQUFhLG1CQUFBO1FBQzdCLElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtZQUFFLFNBQVM7U0FBRTtRQUN0QyxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7WUFBRSxTQUFTO1NBQUU7UUFDbEMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDcEIsU0FBUyxHQUFHLGFBQWEsQ0FBQztTQUMzQjtRQUNELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQUUsU0FBUztTQUFFO1FBQzVDLElBQU0sS0FBSyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUUsQ0FBQztRQUNuRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3RDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksNkJBQW1CLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3BGLFNBQVM7U0FDVjtRQUNELEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMzQztBQUNILENBQUMiLCJmaWxlIjoicnVsZXMvdGVyTm9NaXhlZFNwYWNlc0FuZFRhYnNSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
