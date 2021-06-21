"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-arrow-body-style';
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
        description: 'require braces in arrow function body',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Arrow functions have two syntactic forms for their function bodies. They may be defined with\n      a block body (denoted by curly braces) `() => { ... }` or with a single expression\n      `() => ...`, whose value is implicitly returned.\n      "], ["\n      Arrow functions have two syntactic forms for their function bodies. They may be defined with\n      a block body (denoted by curly braces) \\`() => { ... }\\` or with a single expression\n      \\`() => ...\\`, whose value is implicitly returned.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - `\"always\"` enforces braces around the function body\n      - `\"as-needed\"` enforces no braces where they can be omitted (default)\n      - `\"never\"` enforces no braces around the function body (constrains arrow functions to the\n                    role of returning an expression)\n\n      The second one is an object for more fine-grained configuration when the first option is\n      `\"as-needed\"`. Currently, the only available option is `requireReturnForObjectLiteral`, a\n      boolean property. It\u2019s false by default. If set to true, it requires braces and an explicit\n      return for object literals.\n      "], ["\n      The rule takes one or two options. The first is a string, which can be:\n\n      - \\`\"always\"\\` enforces braces around the function body\n      - \\`\"as-needed\"\\` enforces no braces where they can be omitted (default)\n      - \\`\"never\"\\` enforces no braces around the function body (constrains arrow functions to the\n                    role of returning an expression)\n\n      The second one is an object for more fine-grained configuration when the first option is\n      \\`\"as-needed\"\\`. Currently, the only available option is \\`requireReturnForObjectLiteral\\`, a\n      boolean property. It\u2019s false by default. If set to true, it requires braces and an explicit\n      return for object literals.\n      "]))),
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
                    type: 'array',
                    items: [
                        {
                            enum: ['as-needed']
                        },
                        {
                            type: 'object',
                            properties: {
                                requireReturnForObjectLiteral: { type: 'boolean' }
                            },
                            additionalProperties: false
                        }
                    ],
                    minItems: 0,
                    maxItems: 2
                }
            ]
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"always\"]\n        "], ["\n        \"", "\": [true, \"always\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"never\"]\n        "], ["\n        \"", "\": [true, \"never\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"as-needed\", {\n          \"requireReturnForObjectLiteral\": true\n        }]\n        "], ["\n        \"", "\": [true, \"as-needed\", {\n          \"requireReturnForObjectLiteral\": true\n        }]\n        "])), RULE_NAME)
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
        var opt = _this.getOptions();
        _this.always = opt[0] === 'always';
        _this.asNeeded = !opt[0] || opt[0] === 'as-needed';
        _this.never = opt[0] === 'never';
        _this.requireReturnForObjectLiteral = opt[1] && opt[1].requireReturnForObjectLiteral;
        return _this;
    }
    RuleWalker.prototype.visitArrowFunction = function (node) {
        var arrowBody = node.body;
        if (arrowBody.kind === ts.SyntaxKind.Block) {
            var blockBody = arrowBody.statements;
            if (blockBody.length !== 1 && !this.never) {
                return;
            }
            var returnExpression = blockBody[0].expression;
            if (this.asNeeded &&
                this.requireReturnForObjectLiteral &&
                blockBody[0].kind === ts.SyntaxKind.ReturnStatement &&
                (returnExpression && this.isObjectLiteral(returnExpression))) {
                return;
            }
            if (this.never || this.asNeeded && blockBody[0].kind === ts.SyntaxKind.ReturnStatement) {
                this.report(arrowBody, false);
            }
        }
        else {
            if (this.always || (this.asNeeded &&
                this.requireReturnForObjectLiteral &&
                this.isObjectLiteral(arrowBody))) {
                this.report(arrowBody, true);
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    RuleWalker.prototype.isObjectLiteral = function (node) {
        var obj = node;
        while (obj.kind === ts.SyntaxKind.ParenthesizedExpression) {
            obj = node.expression;
        }
        return obj.kind === ts.SyntaxKind.ObjectLiteralExpression;
    };
    RuleWalker.prototype.report = function (arrowBody, expected) {
        var val = expected ? 'Expected' : 'Unexpected';
        var failure = this.createFailure(arrowBody.getStart(), arrowBody.getWidth(), val + " block statement surrounding arrow body.");
        this.addFailure(failure);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3RlckFycm93Qm9keVN0eWxlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsK0JBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztBQUV6QztJQUEwQixnQ0FBdUI7SUFBakQ7O0lBMEVBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBeEVhLGFBQVEsR0FBdUI7UUFDM0MsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLDJVQUFBLHdRQUl6QixJQUFBO1FBQ0gsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLCt4QkFBQSx3dUJBWWxDLElBQUE7UUFDSCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFO3dCQUNMOzRCQUNFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7eUJBQzFCO3FCQUNGO29CQUNELFFBQVEsRUFBRSxDQUFDO29CQUNYLFFBQVEsRUFBRSxDQUFDO2lCQUNaO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRTt3QkFDTDs0QkFDRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7eUJBQ3BCO3dCQUNEOzRCQUNFLElBQUksRUFBRSxRQUFROzRCQUNkLFVBQVUsRUFBRTtnQ0FDViw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7NkJBQ25EOzRCQUNELG9CQUFvQixFQUFF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QUF2QixVQUF3QixJQUFhO1FBQ25DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFO1lBQ3pELEdBQUcsR0FBSSxJQUFtQyxDQUFDLFVBQVUsQ0FBQztTQUN2RDtRQUNELE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDO0lBQzVELENBQUM7SUFFTywyQkFBTSxHQUFkLFVBQWUsU0FBa0IsRUFBRSxRQUFpQjtRQUNsRCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ2pELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQ2hDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFDcEIsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUNqQixHQUFHLDZDQUEwQyxDQUNqRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQW5FQSxBQW1FQyxDQW5Fd0IsSUFBSSxDQUFDLFVBQVUsR0FtRXZDIiwiZmlsZSI6InJ1bGVzL3RlckFycm93Qm9keVN0eWxlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
