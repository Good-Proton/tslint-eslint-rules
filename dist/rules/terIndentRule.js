"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var RULE_NAME = 'ter-indent';
var DEFAULT_VARIABLE_INDENT = 1;
var DEFAULT_PARAMETER_INDENT = null;
var DEFAULT_FUNCTION_BODY_INDENT = 1;
var indentType = 'space';
var indentSize = 4;
var OPTIONS;
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    target[nextKey] = source[nextKey];
                }
            }
        }
    });
    return target;
}
function isKind(node, kind) {
    return node.kind === ts.SyntaxKind[kind];
}
function isOneOf(node, kinds) {
    return kinds.some(function (kind) { return node.kind === ts.SyntaxKind[kind]; });
}
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new IndentWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: true,
        description: 'enforce consistent indentation',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation.\n      "], ["\n      Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n      cleaner diffs in version control, and easier programmatic manipulation.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      The string 'tab' or an integer indicating the number of spaces to use per tab.\n\n      An object may be provided to fine tune the indentation rules:\n\n        * `\"SwitchCase\"` (default: 0) enforces indentation level for `case` clauses in\n                           `switch` statements\n        * `\"VariableDeclarator\"` (default: 1) enforces indentation level for `var` declarators;\n                                   can also take an object to define separate rules for `var`,\n                                   `let` and `const` declarations.\n        * `\"outerIIFEBody\"` (default: 1) enforces indentation level for file-level IIFEs.\n        * `\"MemberExpression\"` (off by default) enforces indentation level for multi-line\n                                 property chains (except in variable declarations and assignments)\n        * `\"FunctionDeclaration\"` takes an object to define rules for function declarations.\n            * `\"parameters\"` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string `\"first\"` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * `\"body\"` (default: 1) enforces indentation level for the body of a function expression.\n        * `\"FunctionExpression\"` takes an object to define rules for function declarations.\n            * `\"parameters\"` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string `\"first\"` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * `\"body\"` (default: 1) enforces indentation level for the body of a function expression.\n        * `\"CallExpression\"` takes an object to define rules for function call expressions.\n            * `\"arguments\"` (off by default) enforces indentation level for arguments in a call\n                              expression. This can either be a number indicating indentation level,\n                              or the string `\"first\"` indicating that all arguments of the\n                              expression must be aligned with the first argument.\n      "], ["\n      The string 'tab' or an integer indicating the number of spaces to use per tab.\n\n      An object may be provided to fine tune the indentation rules:\n\n        * \\`\"SwitchCase\"\\` (default: 0) enforces indentation level for \\`case\\` clauses in\n                           \\`switch\\` statements\n        * \\`\"VariableDeclarator\"\\` (default: 1) enforces indentation level for \\`var\\` declarators;\n                                   can also take an object to define separate rules for \\`var\\`,\n                                   \\`let\\` and \\`const\\` declarations.\n        * \\`\"outerIIFEBody\"\\` (default: 1) enforces indentation level for file-level IIFEs.\n        * \\`\"MemberExpression\"\\` (off by default) enforces indentation level for multi-line\n                                 property chains (except in variable declarations and assignments)\n        * \\`\"FunctionDeclaration\"\\` takes an object to define rules for function declarations.\n            * \\`\"parameters\"\\` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string \\`\"first\"\\` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * \\`\"body\"\\` (default: 1) enforces indentation level for the body of a function expression.\n        * \\`\"FunctionExpression\"\\` takes an object to define rules for function declarations.\n            * \\`\"parameters\"\\` (off by default) enforces indentation level for parameters in a\n                               function declaration. This can either be a number indicating\n                               indentation level, or the string \\`\"first\"\\` indicating that all\n                               parameters of the declaration must be aligned with the first parameter.\n            * \\`\"body\"\\` (default: 1) enforces indentation level for the body of a function expression.\n        * \\`\"CallExpression\"\\` takes an object to define rules for function call expressions.\n            * \\`\"arguments\"\\` (off by default) enforces indentation level for arguments in a call\n                              expression. This can either be a number indicating indentation level,\n                              or the string \\`\"first\"\\` indicating that all arguments of the\n                              expression must be aligned with the first argument.\n      "]))),
        options: {
            type: 'array',
            items: [{
                    type: 'number',
                    minimum: '0'
                }, {
                    type: 'string',
                    enum: ['tab']
                }, {
                    type: 'object',
                    properties: {
                        SwitchCase: {
                            type: 'number',
                            minimum: 0
                        },
                        VariableDeclarator: {
                            type: 'object',
                            properties: {
                                var: {
                                    type: 'number',
                                    minimum: 0
                                },
                                let: {
                                    type: 'number',
                                    minimum: 0
                                },
                                const: {
                                    type: 'number',
                                    minimum: 0
                                }
                            }
                        },
                        outerIIFEBody: {
                            type: 'number'
                        },
                        FunctionDeclaration: {
                            type: 'object',
                            properties: {
                                parameters: {
                                    type: 'number',
                                    minimum: 0
                                },
                                body: {
                                    type: 'number',
                                    minimum: 0
                                }
                            }
                        },
                        FunctionExpression: {
                            type: 'object',
                            properties: {
                                parameters: {
                                    type: 'number',
                                    minimum: 0
                                },
                                body: {
                                    type: 'number',
                                    minimum: 0
                                }
                            }
                        },
                        MemberExpression: {
                            type: 'number'
                        },
                        CallExpression: {
                            type: 'object',
                            properties: {
                                arguments: {
                                    type: 'number',
                                    minimum: 0
                                }
                            }
                        }
                    },
                    additionalProperties: false
                }],
            minLength: 1,
            maxLength: 2
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, \"tab\"]\n        "], ["\n        \"", "\": [true, \"tab\"]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, 2]\n        "], ["\n        \"", "\": [true, 2]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [\n          true,\n          2,\n          {\n            \"FunctionExpression\": {\n              \"parameters\": 1,\n              \"body\": 1\n            }\n          }\n        ]\n        "], ["\n        \"", "\": [\n          true,\n          2,\n          {\n            \"FunctionExpression\": {\n              \"parameters\": 1,\n              \"body\": 1\n            }\n          }\n        ]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'maintainability'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var IndentWalker = (function (_super) {
    tslib_1.__extends(IndentWalker, _super);
    function IndentWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.caseIndentStore = {};
        _this.varIndentStore = {};
        OPTIONS = {
            SwitchCase: 0,
            VariableDeclarator: {
                var: DEFAULT_VARIABLE_INDENT,
                let: DEFAULT_VARIABLE_INDENT,
                const: DEFAULT_VARIABLE_INDENT
            },
            outerIIFEBody: null,
            FunctionDeclaration: {
                parameters: DEFAULT_PARAMETER_INDENT,
                body: DEFAULT_FUNCTION_BODY_INDENT
            },
            FunctionExpression: {
                parameters: DEFAULT_PARAMETER_INDENT,
                body: DEFAULT_FUNCTION_BODY_INDENT
            },
            CallExpression: {
                arguments: DEFAULT_PARAMETER_INDENT
            }
        };
        var firstParam = _this.getOptions()[0];
        if (firstParam === 'tab') {
            indentSize = 1;
            indentType = 'tab';
        }
        else {
            indentSize = firstParam || 4;
            indentType = 'space';
        }
        var userOptions = _this.getOptions()[1];
        if (userOptions) {
            OPTIONS.SwitchCase = userOptions.SwitchCase || 0;
            if (typeof userOptions.VariableDeclarator === 'number') {
                OPTIONS.VariableDeclarator = {
                    var: userOptions.VariableDeclarator,
                    let: userOptions.VariableDeclarator,
                    const: userOptions.VariableDeclarator
                };
            }
            else if (typeof userOptions.VariableDeclarator === 'object') {
                assign(OPTIONS.VariableDeclarator, userOptions.VariableDeclarator);
            }
            if (typeof userOptions.outerIIFEBody === 'number') {
                OPTIONS.outerIIFEBody = userOptions.outerIIFEBody;
            }
            if (typeof userOptions.MemberExpression === 'number') {
                OPTIONS.MemberExpression = userOptions.MemberExpression;
            }
            if (typeof userOptions.FunctionDeclaration === 'object') {
                assign(OPTIONS.FunctionDeclaration, userOptions.FunctionDeclaration);
            }
            if (typeof userOptions.FunctionExpression === 'object') {
                assign(OPTIONS.FunctionExpression, userOptions.FunctionExpression);
            }
            if (typeof userOptions.CallExpression === 'object') {
                assign(OPTIONS.CallExpression, userOptions.CallExpression);
            }
        }
        _this.srcFile = sourceFile;
        _this.srcText = sourceFile.getFullText();
        return _this;
    }
    IndentWalker.prototype.getSourceSubstr = function (start, end) {
        return this.srcText.substr(start, end - start);
    };
    IndentWalker.prototype.getLineAndCharacter = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        var index = byEndLocation ? node.getEnd() : node.getStart();
        return this.srcFile.getLineAndCharacterOfPosition(index);
    };
    IndentWalker.prototype.getLine = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        return this.getLineAndCharacter(node, byEndLocation).line;
    };
    IndentWalker.prototype.createErrorMessage = function (expectedAmount, actualSpaces, actualTabs) {
        var expectedStatement = expectedAmount + " " + indentType + (expectedAmount === 1 ? '' : 's');
        var foundSpacesWord = "space" + (actualSpaces === 1 ? '' : 's');
        var foundTabsWord = "tab" + (actualTabs === 1 ? '' : 's');
        var foundStatement;
        if (actualSpaces > 0 && actualTabs > 0) {
            foundStatement = actualSpaces + " " + foundSpacesWord + " and " + actualTabs + " " + foundTabsWord;
        }
        else if (actualSpaces > 0) {
            foundStatement = indentType === 'space' ? actualSpaces : actualSpaces + " " + foundSpacesWord;
        }
        else if (actualTabs > 0) {
            foundStatement = indentType === 'tab' ? actualTabs : actualTabs + " " + foundTabsWord;
        }
        else {
            foundStatement = '0';
        }
        return "Expected indentation of " + expectedStatement + " but found " + foundStatement + ".";
    };
    IndentWalker.prototype.report = function (node, needed, gottenSpaces, gottenTabs, loc) {
        if (gottenSpaces && gottenTabs) {
            return;
        }
        var msg = this.createErrorMessage(needed, gottenSpaces, gottenTabs);
        var width = gottenSpaces + gottenTabs;
        var start = (loc !== undefined ? loc : node.getStart()) - width;
        var desiredIndent = (indentType === 'space' ? ' ' : '\t').repeat(needed);
        var fix = this.createReplacement(start, width, desiredIndent);
        this.addFailure(this.createFailure(start, width, msg, fix));
    };
    IndentWalker.prototype.isNodeFirstInLine = function (node, byEndLocation) {
        if (byEndLocation === void 0) { byEndLocation = false; }
        var token = byEndLocation ? node.getLastToken() : node.getFirstToken();
        var pos = token.getStart() - 1;
        while ([' ', '\t'].indexOf(this.srcText.charAt(pos)) !== -1) {
            pos -= 1;
        }
        return this.srcText.charAt(pos) === '\n' || this._firstInLineCommentHelper(node);
    };
    IndentWalker.prototype._firstInLineCommentHelper = function (node) {
        var pos;
        var firstInLine = false;
        var comments = ts.getLeadingCommentRanges(node.getFullText(), 0);
        if (comments && comments.length) {
            var offset = node.getFullStart();
            var lastComment = comments[comments.length - 1];
            var comment = this.getSourceSubstr(lastComment.pos + offset, lastComment.end + offset);
            if (comment.indexOf('\n') !== -1) {
                firstInLine = true;
            }
            else {
                pos = lastComment.pos + offset;
                while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
                    pos -= 1;
                }
                var content = this.getSourceSubstr(pos + 1, lastComment.pos + offset);
                if (content.trim() === '') {
                    firstInLine = true;
                }
            }
        }
        return firstInLine;
    };
    IndentWalker.prototype.getNodeIndent = function (node) {
        if (node === this.getSourceFile()) {
            return { contentStart: 0, firstInLine: true, space: 0, tab: 0, goodChar: 0, badChar: 0 };
        }
        if (node.kind === ts.SyntaxKind.SyntaxList && node.parent) {
            return this.getNodeIndent(node.parent);
        }
        var endIndex = node.getStart(this.srcFile);
        var pos = endIndex - 1;
        while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
            pos -= 1;
        }
        var str = this.getSourceSubstr(pos + 1, endIndex);
        var whiteSpace = (str.match(/^\s+/) || [''])[0];
        var indentChars = whiteSpace.split('');
        var spaces = indentChars.filter(function (char) { return char === ' '; }).length;
        var tabs = indentChars.filter(function (char) { return char === '\t'; }).length;
        return {
            contentStart: pos + spaces + tabs + 1,
            firstInLine: spaces + tabs === str.length || this._firstInLineCommentHelper(node),
            space: spaces,
            tab: tabs,
            goodChar: indentType === 'space' ? spaces : tabs,
            badChar: indentType === 'space' ? tabs : spaces
        };
    };
    IndentWalker.prototype.checkNodeIndent = function (node, neededIndent) {
        var actualIndent = this.getNodeIndent(node);
        if (!isKind(node, 'ArrayLiteralExpression') &&
            !isKind(node, 'ObjectLiteralExpression') &&
            (actualIndent.goodChar !== neededIndent || actualIndent.badChar !== 0) &&
            actualIndent.firstInLine) {
            this.report(node, neededIndent, actualIndent.space, actualIndent.tab, actualIndent.contentStart);
        }
        if (isKind(node, 'IfStatement')) {
            var elseStatement = node.elseStatement;
            if (elseStatement) {
                var elseKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'ElseKeyword'); }).shift();
                this.checkNodeIndent(elseKeyword, neededIndent);
                if (!this.isNodeFirstInLine(elseStatement)) {
                    this.checkNodeIndent(elseStatement, neededIndent);
                }
            }
        }
        else if (isKind(node, 'TryStatement')) {
            var handler = node.catchClause;
            if (handler) {
                var catchKeyword = handler.getChildren().filter(function (ch) { return isKind(ch, 'CatchKeyword'); }).shift();
                this.checkNodeIndent(catchKeyword, neededIndent);
                if (!this.isNodeFirstInLine(handler)) {
                    this.checkNodeIndent(handler, neededIndent);
                }
            }
            var finalizer = node.finallyBlock;
            if (finalizer) {
                var finallyKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'FinallyKeyword'); }).shift();
                this.checkNodeIndent(finallyKeyword, neededIndent);
            }
        }
        else if (isKind(node, 'DoStatement')) {
            var whileKeyword = node.getChildren().filter(function (ch) { return isKind(ch, 'WhileKeyword'); }).shift();
            this.checkNodeIndent(whileKeyword, neededIndent);
        }
    };
    IndentWalker.prototype.isSingleLineNode = function (node) {
        var text = node.kind === ts.SyntaxKind.SyntaxList ? node.getFullText() : node.getText();
        return text.indexOf('\n') === -1;
    };
    IndentWalker.prototype.blockIndentationCheck = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var functionLike = [
            'FunctionExpression',
            'FunctionDeclaration',
            'MethodDeclaration',
            'Constructor',
            'ArrowFunction'
        ];
        if (node.parent && isOneOf(node.parent, functionLike)) {
            this.checkIndentInFunctionBlock(node);
            return;
        }
        var indent;
        var nodesToCheck = [];
        var statementsWithProperties = [
            'IfStatement',
            'WhileStatement',
            'ForStatement',
            'ForInStatement',
            'ForOfStatement',
            'DoStatement',
            'ClassDeclaration',
            'ClassExpression',
            'InterfaceDeclaration',
            'TypeLiteral',
            'TryStatement',
            'SourceFile'
        ];
        if (node.parent && isOneOf(node.parent, statementsWithProperties) && this.isNodeBodyBlock(node)) {
            indent = this.getNodeIndent(node.parent).goodChar;
        }
        else if (node.parent && isKind(node.parent, 'CatchClause')) {
            indent = this.getNodeIndent(node.parent.parent).goodChar;
        }
        else {
            indent = this.getNodeIndent(node).goodChar;
        }
        if (isKind(node, 'IfStatement') && !isKind(node.thenStatement, 'Block')) {
            nodesToCheck = [node.thenStatement];
        }
        else {
            if (isKind(node, 'Block')) {
                nodesToCheck = node.getChildren()[1].getChildren();
            }
            else if (node.parent &&
                isOneOf(node.parent, [
                    'ClassDeclaration',
                    'ClassExpression',
                    'InterfaceDeclaration',
                    'TypeLiteral'
                ])) {
                nodesToCheck = node.getChildren();
            }
            else {
                nodesToCheck = [node.statement];
            }
        }
        this.checkNodeIndent(node, indent);
        if (nodesToCheck.length > 0) {
            this.checkNodesIndent(nodesToCheck, indent + indentSize);
        }
        if (isKind(node, 'Block')) {
            this.checkLastNodeLineIndent(node, indent);
        }
        else if (node.parent && this.isNodeBodyBlock(node)) {
            this.checkLastNodeLineIndent(node.parent, indent);
        }
    };
    IndentWalker.prototype.isAssignment = function (node) {
        if (!isKind(node, 'BinaryExpression')) {
            return false;
        }
        return node.operatorToken.getText() === '=';
    };
    IndentWalker.prototype.isNodeBodyBlock = function (node) {
        var hasBlock = [
            'ClassDeclaration',
            'ClassExpression',
            'InterfaceDeclaration',
            'TypeLiteral'
        ];
        return isKind(node, 'Block') || (isKind(node, 'SyntaxList') &&
            isOneOf(node.parent, hasBlock));
    };
    IndentWalker.prototype.checkFirstNodeLineIndent = function (node, firstLineIndent) {
        var startIndent = this.getNodeIndent(node);
        var firstInLine = startIndent.firstInLine;
        if (firstInLine && (startIndent.goodChar !== firstLineIndent || startIndent.badChar !== 0)) {
            this.report(node, firstLineIndent, startIndent.space, startIndent.tab, startIndent.contentStart);
        }
    };
    IndentWalker.prototype.checkLastNodeLineIndent = function (node, lastLineIndent) {
        var lastToken = node.getLastToken();
        var endIndent = this.getNodeIndent(lastToken);
        var firstInLine = endIndent.firstInLine;
        if (firstInLine && (endIndent.goodChar !== lastLineIndent || endIndent.badChar !== 0)) {
            this.report(lastToken, lastLineIndent, endIndent.space, endIndent.tab);
        }
    };
    IndentWalker.prototype.isOuterIIFE = function (node) {
        if (!node.parent)
            return false;
        var parent = node.parent;
        var expressionIsNode = parent.expression !== node;
        if (isKind(parent, 'ParenthesizedExpression')) {
            parent = parent.parent;
        }
        if (!isKind(parent, 'CallExpression') || expressionIsNode) {
            return false;
        }
        var stmt = parent;
        var condition;
        do {
            stmt = stmt.parent;
            condition = (isKind(stmt, 'PrefixUnaryExpression') && (stmt.operator === ts.SyntaxKind.ExclamationToken ||
                stmt.operator === ts.SyntaxKind.TildeToken ||
                stmt.operator === ts.SyntaxKind.PlusToken ||
                stmt.operator === ts.SyntaxKind.MinusToken) ||
                isKind(stmt, 'BinaryExpression') ||
                isKind(stmt, 'SyntaxList') ||
                isKind(stmt, 'VariableDeclaration') ||
                isKind(stmt, 'VariableDeclarationList') ||
                isKind(stmt, 'ParenthesizedExpression'));
        } while (condition);
        return ((isKind(stmt, 'ExpressionStatement') ||
            isKind(stmt, 'VariableStatement')) &&
            !!stmt.parent && isKind(stmt.parent, 'SourceFile'));
    };
    IndentWalker.prototype.isArgBeforeCalleeNodeMultiline = function (node) {
        var parent = node.parent;
        if (parent && parent['arguments'].length >= 2 && parent['arguments'][1] === node) {
            var firstArg = parent['arguments'][0];
            return this.getLine(firstArg, true) > this.getLine(firstArg);
        }
        return false;
    };
    IndentWalker.prototype.checkIndentInFunctionBlock = function (node) {
        var calleeNode = node.parent;
        var indent = this.getNodeIndent(calleeNode).goodChar;
        if (calleeNode.parent && calleeNode.parent.kind === ts.SyntaxKind.CallExpression) {
            var calleeParent = calleeNode.parent;
            if (calleeNode.kind !== ts.SyntaxKind.FunctionExpression && calleeNode.kind !== ts.SyntaxKind.ArrowFunction) {
                if (calleeParent && this.getLine(calleeParent) < this.getLine(node)) {
                    indent = this.getNodeIndent(calleeParent).goodChar;
                }
            }
            else {
                var callee = calleeParent.expression;
                if (this.isArgBeforeCalleeNodeMultiline(calleeNode) &&
                    this.getLine(callee) === this.getLine(callee, true) &&
                    !this.isNodeFirstInLine(calleeNode)) {
                    indent = this.getNodeIndent(calleeParent).goodChar;
                }
            }
        }
        var functionOffset = indentSize;
        if (OPTIONS.outerIIFEBody !== null && this.isOuterIIFE(calleeNode)) {
            functionOffset = OPTIONS.outerIIFEBody * indentSize;
        }
        else if (calleeNode.kind === ts.SyntaxKind.FunctionExpression) {
            functionOffset = OPTIONS.FunctionExpression.body * indentSize;
        }
        else if (calleeNode.kind === ts.SyntaxKind.FunctionDeclaration) {
            functionOffset = OPTIONS.FunctionDeclaration.body * indentSize;
        }
        else if (isOneOf(calleeNode, ['MethodDeclaration', 'Constructor'])) {
            functionOffset = OPTIONS.FunctionExpression.body * indentSize;
        }
        indent += functionOffset;
        var parentVarNode = this.getVariableDeclaratorNode(node);
        if (parentVarNode && this.isNodeInVarOnTop(node, parentVarNode) && parentVarNode.parent) {
            var varKind = parentVarNode.parent.getFirstToken().getText();
            indent += indentSize * OPTIONS.VariableDeclarator[varKind];
        }
        this.checkFirstNodeLineIndent(node, indent - functionOffset);
        if (node.statements.length) {
            this.checkNodesIndent(node.statements, indent);
        }
        this.checkLastNodeLineIndent(node, indent - functionOffset);
    };
    IndentWalker.prototype.checkNodesIndent = function (nodes, indent) {
        var _this = this;
        nodes.forEach(function (node) { return _this.checkNodeIndent(node, indent); });
    };
    IndentWalker.prototype.expectedCaseIndent = function (node, switchIndent) {
        var switchNode = (node.kind === ts.SyntaxKind.SwitchStatement) ? node : node.parent;
        var line = this.getLine(switchNode);
        var caseIndent;
        if (this.caseIndentStore[line]) {
            return this.caseIndentStore[line];
        }
        else {
            if (typeof switchIndent === 'undefined') {
                switchIndent = this.getNodeIndent(switchNode).goodChar;
            }
            caseIndent = switchIndent + (indentSize * OPTIONS.SwitchCase);
            this.caseIndentStore[line] = caseIndent;
            return caseIndent;
        }
    };
    IndentWalker.prototype.expectedVarIndent = function (node, varIndent) {
        var varNode = node.parent;
        var line = this.getLine(varNode);
        var indent;
        if (this.varIndentStore[line]) {
            return this.varIndentStore[line];
        }
        else {
            if (typeof varIndent === 'undefined') {
                varIndent = this.getNodeIndent(varNode).goodChar;
            }
            var varKind = varNode.getFirstToken().getText();
            indent = varIndent + (indentSize * OPTIONS.VariableDeclarator[varKind]);
            this.varIndentStore[line] = indent;
            return indent;
        }
    };
    IndentWalker.prototype.getParentNodeByType = function (node, kind, stopAtList) {
        if (stopAtList === void 0) { stopAtList = [ts.SyntaxKind.SourceFile]; }
        var parent = node.parent;
        while (parent
            && parent.kind !== kind
            && stopAtList.indexOf(parent.kind) === -1
            && parent.kind !== ts.SyntaxKind.SourceFile) {
            parent = parent.parent;
        }
        return parent && parent.kind === kind ? parent : null;
    };
    IndentWalker.prototype.getVariableDeclaratorNode = function (node) {
        return this.getParentNodeByType(node, ts.SyntaxKind.VariableDeclaration);
    };
    IndentWalker.prototype.getBinaryExpressionNode = function (node) {
        return this.getParentNodeByType(node, ts.SyntaxKind.BinaryExpression);
    };
    IndentWalker.prototype.checkIndentInArrayOrObjectBlock = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var elements = isKind(node, 'ObjectLiteralExpression') ? node['properties'] : node['elements'];
        elements = elements.filter(function (elem) { return elem.getText() !== ''; });
        var nodeLine = this.getLine(node);
        var nodeEndLine = this.getLine(node, true);
        var nodeIndent;
        var elementsIndent;
        var varKind;
        var parentVarNode = this.getVariableDeclaratorNode(node);
        if (this.isNodeFirstInLine(node) && node.parent) {
            var parent = node.parent;
            nodeIndent = this.getNodeIndent(parent).goodChar;
            if (parentVarNode && this.getLine(parentVarNode) !== nodeLine) {
                if (!isKind(parent, 'VariableDeclaration') || parentVarNode === parentVarNode.parent.declarations[0]) {
                    var parentVarLine = this.getLine(parentVarNode);
                    var parentLine = this.getLine(parent);
                    if (isKind(parent, 'VariableDeclaration') && parentVarLine === parentLine && parentVarNode.parent) {
                        varKind = parentVarNode.parent.getFirstToken().getText();
                        nodeIndent = nodeIndent + (indentSize * OPTIONS.VariableDeclarator[varKind]);
                    }
                    else if (isOneOf(parent, [
                        'ObjectLiteralExpression',
                        'ArrayLiteralExpression',
                        'CallExpression',
                        'ArrowFunction',
                        'NewExpression',
                        'BinaryExpression'
                    ])) {
                        nodeIndent = nodeIndent + indentSize;
                    }
                }
            }
            else if (!parentVarNode &&
                !this.isFirstArrayElementOnSameLine(parent) &&
                parent.kind !== ts.SyntaxKind.PropertyAccessExpression &&
                parent.kind !== ts.SyntaxKind.ExpressionStatement &&
                parent.kind !== ts.SyntaxKind.PropertyAssignment &&
                !(this.isAssignment(parent))) {
                nodeIndent = nodeIndent + indentSize;
            }
            elementsIndent = nodeIndent + indentSize;
            this.checkFirstNodeLineIndent(node, nodeIndent);
        }
        else {
            nodeIndent = this.getNodeIndent(node).goodChar;
            elementsIndent = nodeIndent + indentSize;
        }
        if (parentVarNode && this.isNodeInVarOnTop(node, parentVarNode) && parentVarNode.parent) {
            varKind = parentVarNode.parent.getFirstToken().getText();
            elementsIndent += indentSize * OPTIONS.VariableDeclarator[varKind];
        }
        this.checkNodesIndent(elements, elementsIndent);
        if (elements.length > 0) {
            var lastLine = this.getLine(elements[elements.length - 1], true);
            if (lastLine === nodeEndLine) {
                return;
            }
        }
        this.checkLastNodeLineIndent(node, elementsIndent - indentSize);
    };
    IndentWalker.prototype.isFirstArrayElementOnSameLine = function (node) {
        if (isKind(node, 'ArrayLiteralExpression')) {
            var ele = node.elements[0];
            if (ele) {
                return isKind(ele, 'ObjectLiteralExpression') && this.getLine(ele) === this.getLine(node);
            }
        }
        return false;
    };
    IndentWalker.prototype.isNodeInVarOnTop = function (node, varNode) {
        var nodeLine = this.getLine(node);
        var parentLine = this.getLine(varNode.parent);
        return varNode &&
            parentLine === nodeLine &&
            varNode.parent.declarations.length > 1;
    };
    IndentWalker.prototype.blockLessNodes = function (node) {
        if (!isKind(node.statement, 'Block')) {
            this.blockIndentationCheck(node);
        }
    };
    IndentWalker.prototype.checkIndentInVariableDeclarations = function (node) {
        var indent = this.expectedVarIndent(node);
        this.checkNodeIndent(node, indent);
    };
    IndentWalker.prototype.visitCase = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var caseIndent = this.expectedCaseIndent(node);
        this.checkNodesIndent(node.statements, caseIndent + indentSize);
    };
    IndentWalker.prototype.checkLastReturnStatementLineIndent = function (node, firstLineIndent) {
        if (!node.expression) {
            return;
        }
        var lastToken = node.expression.getLastToken();
        var endIndex = lastToken.getStart();
        var pos = endIndex - 1;
        while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
            pos -= 1;
        }
        var textBeforeClosingParenthesis = this.getSourceSubstr(pos + 1, endIndex);
        if (textBeforeClosingParenthesis.trim()) {
            return;
        }
        var endIndent = this.getNodeIndent(lastToken);
        if (endIndent.goodChar !== firstLineIndent) {
            this.report(node, firstLineIndent, endIndent.space, endIndent.tab, lastToken.getStart());
        }
    };
    IndentWalker.prototype.visitClassDeclaration = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitClassExpression = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitClassExpression.call(this, node);
    };
    IndentWalker.prototype.visitInterfaceDeclaration = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitTypeLiteral = function (node) {
        var len = node.getChildCount();
        this.blockIndentationCheck(node.getChildAt(len - 2));
        _super.prototype.visitTypeLiteral.call(this, node);
    };
    IndentWalker.prototype.visitBlock = function (node) {
        this.blockIndentationCheck(node);
        _super.prototype.visitBlock.call(this, node);
    };
    IndentWalker.prototype.visitIfStatement = function (node) {
        var thenLine = this.getLine(node.thenStatement);
        var line = this.getLine(node);
        if (!isKind(node.thenStatement, 'Block') && thenLine > line) {
            this.blockIndentationCheck(node);
        }
        _super.prototype.visitIfStatement.call(this, node);
    };
    IndentWalker.prototype.visitObjectLiteralExpression = function (node) {
        this.checkIndentInArrayOrObjectBlock(node);
        _super.prototype.visitObjectLiteralExpression.call(this, node);
    };
    IndentWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.checkIndentInArrayOrObjectBlock(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    IndentWalker.prototype.visitSwitchStatement = function (node) {
        var switchIndent = this.getNodeIndent(node).goodChar;
        var caseIndent = this.expectedCaseIndent(node, switchIndent);
        this.checkNodesIndent(node.caseBlock.clauses, caseIndent);
        this.checkLastNodeLineIndent(node, switchIndent);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    IndentWalker.prototype.visitCaseClause = function (node) {
        this.visitCase(node);
        _super.prototype.visitCaseClause.call(this, node);
    };
    IndentWalker.prototype.visitDefaultClause = function (node) {
        this.visitCase(node);
        _super.prototype.visitDefaultClause.call(this, node);
    };
    IndentWalker.prototype.visitWhileStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitWhileStatement.call(this, node);
    };
    IndentWalker.prototype.visitForStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitForStatement.call(this, node);
    };
    IndentWalker.prototype.visitForInStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitForInStatement.call(this, node);
    };
    IndentWalker.prototype.visitDoStatement = function (node) {
        this.blockLessNodes(node);
        _super.prototype.visitDoStatement.call(this, node);
    };
    IndentWalker.prototype.visitVariableDeclaration = function (node) {
        this.checkIndentInVariableDeclarations(node);
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitVariableStatement = function (node) {
        _super.prototype.visitVariableStatement.call(this, node);
        var list = node.getChildAt(0).getChildAt(1);
        if (!list) {
            return;
        }
        var len = list.getChildCount();
        if (len === 0) {
            return;
        }
        var lastElement = list.getChildAt(len - 1);
        var lastToken = node.getLastToken();
        var lastTokenLine = this.getLine(lastToken, true);
        var lastElementLine = this.getLine(lastElement, true);
        if (lastTokenLine <= lastElementLine) {
            return;
        }
        var tokenBeforeLastElement = list.getChildAt(len - 2);
        if (tokenBeforeLastElement && isKind(tokenBeforeLastElement, 'CommaToken')) {
            this.checkLastNodeLineIndent(node, this.getNodeIndent(tokenBeforeLastElement).goodChar);
        }
        else {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            var varKind = node.getFirstToken().getText();
            var declaratorIndent = typeof OPTIONS.VariableDeclarator[varKind] === 'number' ? OPTIONS.VariableDeclarator[varKind] : DEFAULT_VARIABLE_INDENT;
            var elementsIndent = nodeIndent + indentSize * declaratorIndent;
            this.checkLastNodeLineIndent(node, elementsIndent - indentSize);
        }
    };
    IndentWalker.prototype.visitFunctionDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        if (OPTIONS.FunctionDeclaration.parameters === 'first' && node.parameters.length) {
            var indent = this.getLineAndCharacter(node.parameters[0]).character;
            this.checkNodesIndent(node.parameters.slice(1), indent);
        }
        else if (OPTIONS.FunctionDeclaration.parameters !== null) {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            this.checkNodesIndent(node.parameters, nodeIndent + indentSize * OPTIONS.FunctionDeclaration.parameters);
            var closingParen = node.getChildAt(node.getChildCount() - 2);
            this.checkNodeIndent(closingParen, nodeIndent);
        }
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    IndentWalker.prototype.checkFunctionMethodExpression = function (node) {
        if (OPTIONS.FunctionExpression.parameters === 'first' && node.parameters.length) {
            var indent = this.getLineAndCharacter(node.parameters[0]).character;
            this.checkNodesIndent(node.parameters.slice(1), indent);
        }
        else if (OPTIONS.FunctionExpression.parameters !== null) {
            var nodeIndent = this.getNodeIndent(node).goodChar;
            this.checkNodesIndent(node.parameters, nodeIndent + indentSize * OPTIONS.FunctionExpression.parameters);
            var closingParen = node.getChildAt(node.getChildCount() - 2);
            this.checkNodeIndent(closingParen, nodeIndent);
        }
    };
    IndentWalker.prototype.visitFunctionExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    IndentWalker.prototype.visitMethodDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitConstructorDeclaration = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        this.checkFunctionMethodExpression(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    IndentWalker.prototype.visitCallExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        if (OPTIONS.CallExpression.arguments === 'first' && node.arguments.length) {
            var indent = this.getLineAndCharacter(node.arguments[0]).character;
            this.checkNodesIndent(node.arguments.slice(1), indent);
        }
        else if (OPTIONS.CallExpression.arguments !== null) {
            var openParen = node.getChildAt(node.getChildCount(this.srcFile) - 3, this.srcFile);
            var openParenIndent = this.getNodeIndent(openParen);
            this.checkNodesIndent(node.arguments, openParenIndent.goodChar + indentSize * OPTIONS.CallExpression.arguments);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    IndentWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (this.isSingleLineNode(node)) {
            return;
        }
        var varDec = ts.SyntaxKind.VariableDeclaration;
        var funcKind = [ts.SyntaxKind.FunctionExpression, ts.SyntaxKind.ArrowFunction];
        if (this.getParentNodeByType(node, varDec, funcKind)) {
            return;
        }
        var binExp = ts.SyntaxKind.BinaryExpression;
        var funcExp = ts.SyntaxKind.FunctionExpression;
        var binaryNode = this.getParentNodeByType(node, binExp, [funcExp]);
        if (binaryNode && this.isAssignment(binaryNode)) {
            return;
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
        if (typeof OPTIONS.MemberExpression === 'undefined') {
            return;
        }
        var propertyIndent = this.getNodeIndent(node).goodChar + indentSize * OPTIONS.MemberExpression;
        var dotToken = node.getChildAt(1);
        var checkNodes = [node.name, dotToken];
        this.checkNodesIndent(checkNodes, propertyIndent);
    };
    IndentWalker.prototype.visitReturnStatement = function (node) {
        if (this.isSingleLineNode(node) || !node.expression) {
            return;
        }
        var firstLineIndent = this.getNodeIndent(node).goodChar;
        if (isKind(node.expression, 'ParenthesizedExpression')) {
            this.checkLastReturnStatementLineIndent(node, firstLineIndent);
        }
        else {
            this.checkNodeIndent(node, firstLineIndent);
        }
        _super.prototype.visitReturnStatement.call(this, node);
    };
    IndentWalker.prototype.visitSourceFile = function (node) {
        this.checkNodesIndent(node.statements, 0);
        _super.prototype.visitSourceFile.call(this, node);
    };
    return IndentWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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R0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO1FBQ2pELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBc0IsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFFRCxpQkFBTSw2QkFBNkIsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixLQUFLLFdBQVcsRUFBRTtZQUNuRCxPQUFPO1NBQ1I7UUFFRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBSWpHLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVTLDJDQUFvQixHQUE5QixVQUErQixJQUF3QjtRQUNyRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkQsT0FBTztTQUNSO1FBRUQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFHMUQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsaUJBQU0sb0JBQW9CLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVTLHNDQUFlLEdBQXpCLFVBQTBCLElBQW1CO1FBRTNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLGlCQUFNLGVBQWUsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQTNnQ0EsQUEyZ0NDLENBM2dDMEIsSUFBSSxDQUFDLFVBQVUsR0EyZ0N6QyIsImZpbGUiOiJydWxlcy90ZXJJbmRlbnRSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
