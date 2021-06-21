"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-tabs';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = 'Unexpected tab character.';
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'disallow all tabs',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      This rule looks for tabs anywhere inside a file: code, comments or anything else, and disallows their usage.\n      "], ["\n      This rule looks for tabs anywhere inside a file: code, comments or anything else, and disallows their usage.\n      "]))),
        optionsDescription: '',
        options: {},
        optionExamples: [
            Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        \"", "\": true\n        "], ["\n        \"", "\": true\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var TAB_REGEX = /\t/;
    var lines = ctx.sourceFile.text.split(/\n/g);
    lines.forEach(function (line, i) {
        var match = TAB_REGEX.exec(line);
        if (match) {
            ctx.addFailureAt(ctx.sourceFile.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING);
        }
    });
}
var templateObject_1, templateObject_2;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vVGFic1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFFaEM7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQXVCQSxDQUFDO0lBSFEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBckJhLG1CQUFjLEdBQUcsMkJBQTJCLENBQUM7SUFDN0MsYUFBUSxHQUF1QjtRQUMzQyxRQUFRLEVBQUUsU0FBUztRQUNuQixNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxtQkFBbUI7UUFDaEMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSx5TUFBQSw4SEFFekIsSUFBQTtRQUNILGtCQUFrQixFQUFFLEVBQUU7UUFDdEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxjQUFjLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sK0dBQUEsY0FDWixFQUFTLG9CQUNYLEtBREUsU0FBUztTQUVmO1FBQ0QsY0FBYyxFQUFFLEtBQUs7UUFDckIsSUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDO0lBS0osV0FBQztDQXZCRCxBQXVCQyxDQXZCeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBdUJoRDtBQXZCWSxvQkFBSTtBQXlCakIsU0FBUyxJQUFJLENBQUMsR0FBMkI7SUFDdkMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUvQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEtBQUssRUFBRTtZQUNULEdBQUcsQ0FBQyxZQUFZLENBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUM1RCxDQUFDLEVBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwiZmlsZSI6InJ1bGVzL3Rlck5vVGFic1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
