"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-sparse-arrays';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        description: 'disallow sparse arrays (recommended)',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code\n      harder to debug in a similar nature to mixed tabs and spaces.\n      "], ["\n      Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code\n      harder to debug in a similar nature to mixed tabs and spaces.\n      "]))),
        optionsDescription: '',
        options: {},
        optionExamples: [
            Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'typescript'
    };
    Rule.FAILURE_STRING = 'unexpected comma in middle of array';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSparseArraysWalker = (function (_super) {
    tslib_1.__extends(NoSparseArraysWalker, _super);
    function NoSparseArraysWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoSparseArraysWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateNoSparseArray(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    NoSparseArraysWalker.prototype.validateNoSparseArray = function (node) {
        var hasEmptySlot = node.elements.some(function (el) { return el.kind === ts.SyntaxKind.OmittedExpression; });
        if (hasEmptySlot) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoSparseArraysWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vU3BhcnNlQXJyYXlzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztBQUV6QztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBd0JBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUF0QmEsYUFBUSxHQUF1QjtRQUMzQyxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sNlBBQUEsa0xBR3pCLElBQUE7UUFDSCxrQkFBa0IsRUFBRSxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsY0FBYyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGlIQUFBLGNBQ1osRUFBUyxzQkFDWCxLQURFLFNBQVM7U0FFZjtRQUNELGNBQWMsRUFBRSxLQUFLO1FBQ3JCLElBQUksRUFBRSxZQUFZO0tBQ25CLENBQUM7SUFDWSxtQkFBYyxHQUFHLHFDQUFxQyxDQUFDO0lBTXZFLFdBQUM7Q0F4QkQsQUF3QkMsQ0F4QnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQXdCaEQ7QUF4Qlksb0JBQUk7QUEwQmpCO0lBQW1DLGdEQUFlO0lBQWxEOztJQWFBLENBQUM7SUFaVywwREFBMkIsR0FBckMsVUFBc0MsSUFBK0I7UUFDbkUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGlCQUFNLDJCQUEyQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxvREFBcUIsR0FBN0IsVUFBOEIsSUFBK0I7UUFDM0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQTNDLENBQTJDLENBQUMsQ0FBQztRQUUzRixJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUM1RjtJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBYkEsQUFhQyxDQWJrQyxJQUFJLENBQUMsVUFBVSxHQWFqRCIsImZpbGUiOiJydWxlcy90ZXJOb1NwYXJzZUFycmF5c1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
