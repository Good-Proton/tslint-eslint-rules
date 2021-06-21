"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BlockSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        always: 'Requires a space',
        never: 'Unexpected space(s)'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BlockSpacingWalker = (function (_super) {
    tslib_1.__extends(BlockSpacingWalker, _super);
    function BlockSpacingWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.always = _this.hasOption(OPTION_ALWAYS) || (_this.getOptions() && _this.getOptions().length === 0);
        return _this;
    }
    BlockSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.Block || node.kind === ts.SyntaxKind.CaseBlock) {
            this.checkSpacingInsideBraces(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    BlockSpacingWalker.prototype.checkSpacingInsideBraces = function (node) {
        var blockChildren = node.getChildren();
        var syntaxList = blockChildren[1];
        var openBraceLocation = this.getStartPosition(blockChildren[0]);
        var closeBraceLocation = this.getStartPosition(blockChildren[blockChildren.length - 1]);
        if (syntaxList && syntaxList.getChildCount() > 0 && openBraceLocation.line === closeBraceLocation.line) {
            if (this.isSpaceBetween(blockChildren[0], blockChildren[1]) !== this.always
                || this.isSpaceBetween(blockChildren[blockChildren.length - 2], blockChildren[blockChildren.length - 1]) !== this.always) {
                var failureString = this.always ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never;
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
            }
        }
    };
    BlockSpacingWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    BlockSpacingWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    return BlockSpacingWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQ3RGO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sMkNBQWMsR0FBdEIsVUFBdUIsSUFBYSxFQUFFLFFBQWlCO1FBQ3JELE9BQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLDZDQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDSCx5QkFBQztBQUFELENBdkNBLEFBdUNDLENBdkNnQyxJQUFJLENBQUMsVUFBVSxHQXVDL0MiLCJmaWxlIjoicnVsZXMvYmxvY2tTcGFjaW5nUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
