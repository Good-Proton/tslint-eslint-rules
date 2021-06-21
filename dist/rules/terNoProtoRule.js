"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-no-proto';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = 'The `__proto__` property is deprecated.';
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'disallow the use of `__proto__` property',
        rationale: '`__proto__` property has been deprecated as of ECMAScript 3.1 and shouldn’t be used in the code. Use getPrototypeOf method instead.',
        optionsDescription: '',
        options: {},
        optionExamples: [Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      \"", "\": true\n      "], ["\n      \"", "\": true\n      "])), RULE_NAME)],
        typescriptOnly: false,
        type: 'functionality'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if ((node.kind === ts.SyntaxKind.Identifier &&
            node.text === '__proto__' &&
            node.parent &&
            node.parent.kind === ts.SyntaxKind.PropertyAccessExpression) ||
            (node.kind === ts.SyntaxKind.StringLiteral &&
                node.text === '__proto__')) {
            return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    }
}
var templateObject_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rlck5vUHJvdG9SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSwrQkFBaUM7QUFDakMsNkJBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUVqQztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBcUJBLENBQUM7SUFIUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFuQmEsbUJBQWMsR0FBRyx5Q0FBeUMsQ0FBQztJQUUzRCxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE1BQU0sRUFBRSxLQUFLO1FBQ2IsV0FBVyxFQUFFLDBDQUEwQztRQUN2RCxTQUFTLEVBQ1AscUlBQXFJO1FBQ3ZJLGtCQUFrQixFQUFFLEVBQUU7UUFDdEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sMkdBQUEsWUFDN0IsRUFBUyxrQkFDWCxLQURFLFNBQVMsRUFDVjtRQUNKLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUM7SUFLSixXQUFDO0NBckJELEFBcUJDLENBckJ5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FxQmhEO0FBckJZLG9CQUFJO0FBdUJqQixTQUFTLElBQUksQ0FBQyxHQUEyQjtJQUN2QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUzQyxTQUFTLEVBQUUsQ0FBQyxJQUFhO1FBQ3ZCLElBQ0UsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUNwQyxJQUFzQixDQUFDLElBQUksS0FBSyxXQUFXO1lBQzVDLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQztZQUM5RCxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhO2dCQUN2QyxJQUF5QixDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsRUFDbEQ7WUFDQSxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0FBQ0gsQ0FBQyIsImZpbGUiOiJydWxlcy90ZXJOb1Byb3RvUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
