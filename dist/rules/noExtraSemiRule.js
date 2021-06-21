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
        var walker = new NoExtraSemiWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unnecessary semicolon';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExtraSemiWalker = (function (_super) {
    tslib_1.__extends(NoExtraSemiWalker, _super);
    function NoExtraSemiWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ALLOWED_PARENT_TYPES = [
            ts.SyntaxKind.ForStatement,
            ts.SyntaxKind.ForInStatement,
            ts.SyntaxKind.ForOfStatement,
            ts.SyntaxKind.WhileStatement,
            ts.SyntaxKind.DoStatement
        ];
        return _this;
    }
    NoExtraSemiWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.EmptyStatement) {
            this.visitEmptyStatement(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitClassDeclaration = function (node) {
        this.checkClass(node);
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitEmptyStatement = function (node) {
        if (node.parent && this.ALLOWED_PARENT_TYPES.indexOf(node.parent.kind) === -1) {
            this.validateNoExtraSemi(node);
        }
    };
    NoExtraSemiWalker.prototype.checkClass = function (node) {
        var indexOf = node.getChildren().map(function (child) { return child.kind; }).indexOf(ts.SyntaxKind.FirstPunctuation);
        var children = node.getChildren().slice(indexOf);
        this.checkClassChildren(children);
    };
    NoExtraSemiWalker.prototype.checkClassChildren = function (children) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if ((child.kind === ts.SyntaxKind.SyntaxList || child.kind === ts.SyntaxKind.SemicolonClassElement) && child.getText() === ';') {
                this.validateNoExtraSemi(child);
            }
            else if (child.kind === ts.SyntaxKind.SyntaxList && child.getText().indexOf(';') !== -1) {
                this.checkClassChildren(child.getChildren());
            }
        }
    };
    NoExtraSemiWalker.prototype.validateNoExtraSemi = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    };
    return NoExtraSemiWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdkYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sK0NBQW1CLEdBQTNCLFVBQTRCLElBQWE7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FoREEsQUFnREMsQ0FoRCtCLElBQUksQ0FBQyxVQUFVLEdBZ0Q5QyIsImZpbGUiOiJydWxlcy9ub0V4dHJhU2VtaVJ1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
