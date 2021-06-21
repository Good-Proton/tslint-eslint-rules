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
        var walker = new NoMultiSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMultiSpacesWalker = (function (_super) {
    tslib_1.__extends(NoMultiSpacesWalker, _super);
    function NoMultiSpacesWalker(sourceFile, options) {
        var _a;
        var _this = _super.call(this, sourceFile, options) || this;
        _this.EXCEPTION_MAP = (_a = {},
            _a[ts.SyntaxKind.VariableDeclaration] = 'VariableDeclaration',
            _a[ts.SyntaxKind.PropertyAssignment] = 'PropertyAssignment',
            _a[ts.SyntaxKind.BinaryExpression] = 'BinaryExpression',
            _a);
        _this.STRING_TYPES = [
            ts.SyntaxKind.NoSubstitutionTemplateLiteral,
            ts.SyntaxKind.LastTemplateToken,
            ts.SyntaxKind.StringLiteral
        ];
        _this.exceptions = {};
        _this.targets = [];
        _this.targetNode = {};
        _this.targetIndex = 0;
        var opt = _this.getOptions();
        _this.src = sourceFile.getFullText();
        if (opt.length) {
            _this.exceptions = opt[0].exceptions || {};
        }
        if (_this.exceptions['PropertyAssignment'] === undefined) {
            _this.exceptions['PropertyAssignment'] = true;
        }
        var pattern = /[^\n\r\u2028\u2029\t ].? {2,}/g;
        while (pattern.test(_this.src)) {
            _this.targets.push(pattern.lastIndex);
            _this.targetNode[pattern.lastIndex] = sourceFile;
        }
        _this.lastNode = sourceFile.getLastToken();
        return _this;
    }
    NoMultiSpacesWalker.prototype.inRange = function (x, range) {
        return x >= range[0] && x <= range[1];
    };
    NoMultiSpacesWalker.prototype.warn = function (value, pos, node) {
        var msg = "Multiple spaces found before '" + value + "'.";
        var exceptionName = this.EXCEPTION_MAP[node.parent.kind];
        var report = true;
        var start = node.getFullStart() - 1;
        var previousChar = this.src.substring(start, start + 1);
        if (exceptionName && this.exceptions[exceptionName]) {
            if (previousChar !== ',') {
                report = false;
            }
        }
        if (previousChar === ':') {
            var crt = node.parent;
            while (crt.kind !== ts.SyntaxKind.SourceFile) {
                crt = crt.parent;
                if (crt.kind === ts.SyntaxKind.PropertyAssignment) {
                    if (this.exceptions['PropertyAssignment']) {
                        report = false;
                    }
                    break;
                }
            }
        }
        if (report) {
            this.addFailure(this.createFailure(pos, value.length, msg));
        }
    };
    NoMultiSpacesWalker.prototype.walkChildren = function (node) {
        var _this = this;
        var range = [node.getStart(), node.getEnd()];
        for (var i = this.targetIndex, len = this.targets.length, target = void 0; i < len; i++) {
            target = this.targets[i];
            if (this.inRange(target, range)) {
                this.targetNode[target] = node;
            }
            if (range[0] > this.targets[this.targetIndex]) {
                this.targetIndex++;
            }
        }
        if (node === this.lastNode) {
            this.targets.forEach(function (target) {
                var valid = _this.targetNode[target];
                if (target === valid.getStart()) {
                    _this.warn(valid.getText(), target, valid);
                }
                else if (target === valid.getEnd() - 1 && _this.STRING_TYPES.indexOf(valid.kind) === -1) {
                    var endChar = _this.src.substring(target, valid.getEnd());
                    _this.warn(endChar, target, valid);
                }
                else {
                    if (_this.src.charAt(target) !== '\n' && valid.kind !== ts.SyntaxKind.SourceFile) {
                    }
                }
            });
        }
        var children = node.getChildren();
        for (var index in children) {
            this.visitNode(children[index]);
        }
    };
    return NoMultiSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ25DO3FCQUFNO29CQUNMLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7cUJBS2hGO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQU0sUUFBUSxHQUFjLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxLQUFLLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0F0SEEsQUFzSEMsQ0F0SGlDLElBQUksQ0FBQyxVQUFVLEdBc0hoRCIsImZpbGUiOiJydWxlcy9ub011bHRpU3BhY2VzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
