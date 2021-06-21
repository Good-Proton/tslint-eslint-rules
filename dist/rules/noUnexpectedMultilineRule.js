"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        func: 'unexpected newline between function and ( of function call',
        prop: 'unexpected newline between object and [ of property access',
        template: 'unexpected newline between template tag and template literal'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoUnexpectedMultilineWalker = (function (_super) {
    tslib_1.__extends(NoUnexpectedMultilineWalker, _super);
    function NoUnexpectedMultilineWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoUnexpectedMultilineWalker.prototype.visitCallExpression = function (node) {
        var firstLeftParen = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenParenToken; })[0];
        if (this.isBreakBefore(firstLeftParen)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitElementAccessExpression = function (node) {
        var firstLeftSquareBracket = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBracketToken; })[0];
        if (this.isBreakBefore(firstLeftSquareBracket)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
            var children = node.getChildren();
            var tag = children.filter(function (ch) { return ch.kind === ts.SyntaxKind.Identifier; })[0];
            var tagIndex = children.indexOf(tag);
            if (tag && children[tagIndex + 1]) {
                var template = children[tagIndex + 1];
                if (this.isBreakBefore(template)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.isBreakBefore = function (node) {
        if (node.parent) {
            var children = node.parent.getChildren();
            var nodeIndex = children.indexOf(node);
            if (nodeIndex > 0) {
                var nodeLine = this.getStartPosition(node).line;
                var previousNodeLine = this.getEndPosition(children[nodeIndex - 1]).line;
                if (nodeLine !== previousNodeLine) {
                    return true;
                }
            }
        }
        return false;
    };
    NoUnexpectedMultilineWalker.prototype.getMessage = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression:
                return Rule.FAILURE_STRING.func;
            case ts.SyntaxKind.ElementAccessExpression:
                return Rule.FAILURE_STRING.prop;
            case ts.SyntaxKind.TaggedTemplateExpression:
                return Rule.FAILURE_STRING.template;
            default:
                throw 'Unexpected node type: ' + ts.SyntaxKind[node.kind];
        }
    };
    NoUnexpectedMultilineWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    NoUnexpectedMultilineWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return NoUnexpectedMultilineWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQVdBLENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDOUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFUYSxtQkFBYyxHQUFHO1FBQzdCLElBQUksRUFBRSw0REFBNEQ7UUFDbEUsSUFBSSxFQUFFLDREQUE0RDtRQUNsRSxRQUFRLEVBQUUsOERBQThEO0tBQ3pFLENBQUM7SUFNSixXQUFDO0NBWEQsQUFXQyxDQVh5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FXaEQ7QUFYWSxvQkFBSTtBQWFqQjtJQUEwQyx1REFBZTtJQUF6RDs7SUE2RUEsQ0FBQztJQTVFVyx5REFBbUIsR0FBN0IsVUFBOEIsSUFBdUI7UUFDbkQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQXhDLENBQXdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUY7UUFFRCxp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Q0FBQyxVQUFVLENBQUMsdUJBQXVCO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ2xDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0I7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7WUFDdEM7Z0JBQ0UsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFTyxzREFBZ0IsR0FBeEIsVUFBeUIsSUFBYTtRQUNwQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sb0RBQWMsR0FBdEIsVUFBdUIsSUFBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0gsa0NBQUM7QUFBRCxDQTdFQSxBQTZFQyxDQTdFeUMsSUFBSSxDQUFDLFVBQVUsR0E2RXhEIiwiZmlsZSI6InJ1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
