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
        var walker = new ObjectCurlySpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        always: {
            start: "A space is required after '{'",
            end: "A space is required before '}'"
        },
        never: {
            start: "There should be no space after '{'",
            end: "There should be no space before '}'"
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObjectCurlySpacingWalker = (function (_super) {
    tslib_1.__extends(ObjectCurlySpacingWalker, _super);
    function ObjectCurlySpacingWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.always = _this.hasOption(OPTION_ALWAYS) || (_this.getOptions() && _this.getOptions().length === 0);
        var opt = _this.getOptions();
        _this.exceptions = opt[1] || {};
        if (_this.exceptions.arraysInObjects === undefined) {
            _this.exceptions.arraysInObjects = _this.always;
        }
        if (_this.exceptions.objectsInObjects === undefined) {
            _this.exceptions.objectsInObjects = _this.always;
        }
        return _this;
    }
    ObjectCurlySpacingWalker.prototype.visitNode = function (node) {
        var bracedKind = [
            ts.SyntaxKind.ObjectLiteralExpression,
            ts.SyntaxKind.ObjectBindingPattern,
            ts.SyntaxKind.NamedImports,
            ts.SyntaxKind.NamedExports
        ];
        if (bracedKind.indexOf(node.kind) > -1) {
            this.checkSpacingInsideBraces(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ObjectCurlySpacingWalker.prototype.checkSpacingInsideBraces = function (node) {
        var text = node.getText();
        if (text.indexOf('\n') !== -1 || /^\{\s*\}$/.test(text)) {
            return;
        }
        var endsWithObjectLiteral = false;
        var endsWithArrayLiteral = false;
        if (node.getChildren().length === 3) {
            var contents = node.getChildren()[1].getChildren();
            if (contents.length > 0) {
                var lastElement = contents[contents.length - 1];
                if (lastElement.kind === ts.SyntaxKind.PropertyAssignment || lastElement.kind === ts.SyntaxKind.BindingElement) {
                    var value = lastElement.getChildren();
                    if (value.length === 3) {
                        endsWithObjectLiteral = value[2].kind === ts.SyntaxKind.ObjectLiteralExpression || value[2].kind === ts.SyntaxKind.ObjectBindingPattern;
                        endsWithArrayLiteral = value[2].kind === ts.SyntaxKind.ArrayLiteralExpression;
                    }
                }
            }
        }
        var leadingSpace = text.match(/^\{(\s{0,2})/)[1].length;
        if (this.always) {
            if (leadingSpace === 0) {
                var fix = Lint.Replacement.appendText(node.getStart() + 1, ' ');
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start, fix));
            }
        }
        else {
            if (leadingSpace > 0) {
                var fix = Lint.Replacement.deleteText(node.getStart() + 1, leadingSpace);
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start, fix));
            }
        }
        var trailingSpace = text.match(/(\s{0,2})}$/)[1].length;
        var arrayExceptionApplies = this.always !== this.exceptions.arraysInObjects && endsWithArrayLiteral;
        var objectExceptionApplies = this.always !== this.exceptions.objectsInObjects && endsWithObjectLiteral;
        var spaceRequired = arrayExceptionApplies || objectExceptionApplies ? !this.always : this.always;
        if (spaceRequired) {
            if (trailingSpace === 0) {
                var fix = Lint.Replacement.appendText(node.getEnd() - 1, ' ');
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end, fix));
            }
        }
        else {
            if (trailingSpace > 0) {
                var fix = Lint.Replacement.deleteText(node.getEnd() - trailingSpace - 1, trailingSpace);
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end, fix));
            }
        }
    };
    return ObjectCurlySpacingWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL29iamVjdEN1cmx5U3BhY2luZ1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBRS9CO0lBQTBCLGdDQUF1QjtJQUFqRDs7SUFnQkEsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQWRhLG1CQUFjLEdBQUc7UUFDN0IsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxHQUFHLEVBQUUsZ0NBQWdDO1NBQ3RDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLG9DQUFvQztZQUMzQyxHQUFHLEVBQUUscUNBQXFDO1NBQzNDO0tBQ0YsQ0FBQztJQU1KLFdBQUM7Q0FoQkQsQUFnQkMsQ0FoQnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQWdCaEQ7QUFoQlksb0JBQUk7QUFrQmpCO0lBQXVDLG9EQUFlO0lBUXBELGtDQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFBN0QsWUFDRSxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBWTNCO1FBWEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckcsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJ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QUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEc7U0FDRjthQUFNO1lBQ0wsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsYUFBYSxHQUFHLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQy9GO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQTNGQSxBQTJGQyxDQTNGc0MsSUFBSSxDQUFDLFVBQVUsR0EyRnJEIiwiZmlsZSI6InJ1bGVzL29iamVjdEN1cmx5U3BhY2luZ1J1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
