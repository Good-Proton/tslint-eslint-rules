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
        var walker = new NoExtraBooleanCastWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        if: 'redundant double negation in an if statement condition',
        do: 'redundant double negation in a do while loop condition',
        while: 'redundant double negation in a while loop condition',
        ternaryif: 'redundant double negation in a ternary condition',
        for: 'redundant double negation in a for loop condition',
        unaryCast: 'redundant multiple negation',
        objectCast: 'redundant double negation in call to Boolean()',
        newCast: 'redundant double negation in Boolean constructor call'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExtraBooleanCastWalker = (function (_super) {
    tslib_1.__extends(NoExtraBooleanCastWalker, _super);
    function NoExtraBooleanCastWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoExtraBooleanCastWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.validateNoExtraBoolean(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    NoExtraBooleanCastWalker.prototype.validateNoExtraBoolean = function (node) {
        if (!node.parent || !node.parent.parent) {
            return;
        }
        var parent = node.parent;
        var grandparent = parent.parent;
        if (node.operator !== ts.SyntaxKind.ExclamationToken ||
            parent.kind !== ts.SyntaxKind.PrefixUnaryExpression ||
            parent.operator !== ts.SyntaxKind.ExclamationToken ||
            !grandparent) {
            return;
        }
        if (grandparent.kind === ts.SyntaxKind.BinaryExpression) {
            grandparent = grandparent.parent;
        }
        if (!grandparent) {
            return;
        }
        if (grandparent.kind === ts.SyntaxKind.IfStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.if));
        }
        else if (grandparent.kind === ts.SyntaxKind.DoStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.do));
        }
        else if (grandparent.kind === ts.SyntaxKind.WhileStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.while));
        }
        else if (grandparent.kind === ts.SyntaxKind.ConditionalExpression && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.ternaryif));
        }
        else if (grandparent.kind === ts.SyntaxKind.ForStatement && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.for));
        }
        else if (grandparent.kind === ts.SyntaxKind.PrefixUnaryExpression && grandparent.operator === ts.SyntaxKind.ExclamationToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.unaryCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.CallExpression && /^Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.objectCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.NewExpression && /^new Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.newCast));
        }
    };
    return NoExtraBooleanCastWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXh0cmFCb29sZWFuQ2FzdFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0I7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQWdCQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBZGEsbUJBQWMsR0FBRztRQUM3QixFQUFFLEVBQUUsd0RBQXdEO1FBQzVELEVBQUUsRUFBRSx3REFBd0Q7UUFDNUQsS0FBSyxFQUFFLHFEQUFxRDtRQUM1RCxTQUFTLEVBQUUsa0RBQWtEO1FBQzdELEdBQUcsRUFBRSxtREFBbUQ7UUFDeEQsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxVQUFVLEVBQUUsZ0RBQWdEO1FBQzVELE9BQU8sRUFBRSx1REFBdUQ7S0FDakUsQ0FBQztJQU1KLFdBQUM7Q0FoQkQsQUFnQkMsQ0FoQnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQWdCaEQ7QUFoQlksb0JBQUk7QUFrQmpCO0lBQXVDLG9EQUFlO0lBQXREOztJQW9EQSxDQUFDO0lBbERXLDZEQUEwQixHQUFwQyxVQUFxQyxJQUE4QjtRQUNqRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsaUJBQU0sMEJBQTBCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLHlEQUFzQixHQUE5QixVQUErQixJQUE4QjtRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLE9BQU87U0FDUjtRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FB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SUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ3RHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUN2RzthQUFNLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ3pHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNwRztJQUNILENBQUM7SUFDSCwrQkFBQztBQUFELENBcERBLEFBb0RDLENBcERzQyxJQUFJLENBQUMsVUFBVSxHQW9EckQiLCJmaWxlIjoicnVsZXMvbm9FeHRyYUJvb2xlYW5DYXN0UnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
