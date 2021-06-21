"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-script-url';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = 'Script URL is a form of eval.';
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'disallow use of `javascript:` urls.',
        rationale: 'Using `javascript:` URLs is considered by some as a form of `eval`. ' +
            'Code passed in `javascript:` URLs has to be parsed and evaluated by the browser ' +
            'in the same way that eval is processed.',
        optionsDescription: '',
        options: {},
        optionExamples: [
            Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        \"", "\": true\n        "], ["\n        \"", "\": true\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'functionality'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            var value = node.text.toLowerCase();
            if (value.indexOf('javascript:') === 0) {
                return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }
        return ts.forEachChild(node, cb);
    }
}
var templateObject_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vU2NyaXB0VXJsUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztBQUV0QztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBeUJBLENBQUM7SUFIUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUF2QmEsbUJBQWMsR0FBRywrQkFBK0IsQ0FBQztJQUVqRCxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE1BQU0sRUFBRSxLQUFLO1FBQ2IsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQ1Asc0VBQXNFO1lBQ3RFLGtGQUFrRjtZQUNsRix5Q0FBeUM7UUFDM0Msa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSwrR0FBQSxjQUNaLEVBQVMsb0JBQ1gsS0FERSxTQUFTO1NBRWY7UUFDRCxjQUFjLEVBQUUsS0FBSztRQUNyQixJQUFJLEVBQUUsZUFBZTtLQUN0QixDQUFDO0lBS0osV0FBQztDQXpCRCxBQXlCQyxDQXpCeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBeUJoRDtBQXpCWSxvQkFBSTtBQTJCakIsU0FBUyxJQUFJLENBQUMsR0FBMkI7SUFDdkMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFM0MsU0FBUyxFQUFFLENBQUMsSUFBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDN0MsSUFBTSxLQUFLLEdBQUksSUFBeUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN4RDtTQUNGO1FBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0FBQ0gsQ0FBQyIsImZpbGUiOiJydWxlcy90ZXJOb1NjcmlwdFVybFJ1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
