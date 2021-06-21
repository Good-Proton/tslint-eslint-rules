"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var doctrine = require("doctrine");
var RULE_NAME = 'valid-jsdoc';
var OPTIONS;
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var opts = this.getOptions().ruleArguments;
        OPTIONS = {
            prefer: {},
            requireReturn: true,
            requireParamType: true,
            requireReturnType: true,
            requireParamDescription: true,
            requireReturnDescription: true,
            matchDescription: ''
        };
        if (opts && opts.length > 0) {
            if (opts[0].prefer) {
                OPTIONS.prefer = opts[0].prefer;
            }
            OPTIONS.requireReturn = opts[0].requireReturn !== false;
            OPTIONS.requireParamType = opts[0].requireParamType !== false;
            OPTIONS.requireReturnType = opts[0].requireReturnType !== false;
            OPTIONS.requireParamDescription = opts[0].requireParamDescription !== false;
            OPTIONS.requireReturnDescription = opts[0].requireReturnDescription !== false;
            OPTIONS.matchDescription = opts[0].matchDescription;
        }
        var walker = new ValidJsdocWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        missingBrace: 'JSDoc type missing brace',
        syntaxError: 'JSDoc syntax error',
        missingParameterType: function (name) { return "missing JSDoc parameter type for '" + name + "'"; },
        missingParameterDescription: function (name) { return "missing JSDoc parameter description for '" + name + "'"; },
        duplicateParameter: function (name) { return "duplicate JSDoc parameter '" + name + "'"; },
        unexpectedTag: function (title) { return "unexpected @" + title + " tag; function has no return statement"; },
        missingReturnType: 'missing JSDoc return type',
        missingReturnDescription: 'missing JSDoc return description',
        prefer: function (name) { return "use @" + name + " instead"; },
        missingReturn: function (param) { return "missing JSDoc @" + (param || 'returns') + " for function"; },
        wrongParam: function (expected, actual) { return "expected JSDoc for '" + expected + "' but found '" + actual + "'"; },
        missingParam: function (name) { return "missing JSDoc for parameter '" + name + "'"; },
        wrongDescription: 'JSDoc description does not satisfy the regex pattern',
        invalidRegexDescription: function (error) { return "configured matchDescription is an invalid RegExp. Error: " + error; }
    };
    Rule.metadata = {
        ruleName: RULE_NAME,
        hasFix: false,
        description: 'enforce valid JSDoc comments',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      [JSDoc](http://usejsdoc.org/) generates application programming interface (API) documentation\n      from specially-formatted comments in JavaScript code. So does [typedoc](http://typedoc.org/).\n\n      If comments are invalid because of typing mistakes, then documentation will be incomplete.\n\n      If comments are inconsistent because they are not updated when function definitions are\n      modified, then readers might become confused.\n      "], ["\n      [JSDoc](http://usejsdoc.org/) generates application programming interface (API) documentation\n      from specially-formatted comments in JavaScript code. So does [typedoc](http://typedoc.org/).\n\n      If comments are invalid because of typing mistakes, then documentation will be incomplete.\n\n      If comments are inconsistent because they are not updated when function definitions are\n      modified, then readers might become confused.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      This rule has an object option:\n\n      * `\"prefer\"` enforces consistent documentation tags specified by an object whose properties\n                     mean instead of key use value (for example, `\"return\": \"returns\"` means\n                     instead of `@return` use `@returns`)\n      * `\"preferType\"` enforces consistent type strings specified by an object whose properties\n                         mean instead of key use value (for example, `\"object\": \"Object\"` means\n                         instead of `object` use `Object`)\n      * `\"requireReturn\"` requires a return tag:\n        * `true` (default) *even if* the function or method does not have a return statement\n                   (this option value does not apply to constructors)\n        * `false` *if and only if* the function or method has a return statement (this option\n                    value does apply to constructors)\n      * `\"requireParamType\"`: `false` allows missing type in param tags\n      * `\"requireReturnType\"`: `false` allows missing type in return tags\n      * `\"matchDescription\"` specifies (as a string) a regular expression to match the description\n                               in each JSDoc comment (for example, `\".+\"` requires a description;\n                               this option does not apply to descriptions in parameter or return\n                               tags)\n      * `\"requireParamDescription\"`: `false` allows missing description in parameter tags\n      * `\"requireReturnDescription\"`: `false` allows missing description in return tags\n      "], ["\n      This rule has an object option:\n\n      * \\`\"prefer\"\\` enforces consistent documentation tags specified by an object whose properties\n                     mean instead of key use value (for example, \\`\"return\": \"returns\"\\` means\n                     instead of \\`@return\\` use \\`@returns\\`)\n      * \\`\"preferType\"\\` enforces consistent type strings specified by an object whose properties\n                         mean instead of key use value (for example, \\`\"object\": \"Object\"\\` means\n                         instead of \\`object\\` use \\`Object\\`)\n      * \\`\"requireReturn\"\\` requires a return tag:\n        * \\`true\\` (default) *even if* the function or method does not have a return statement\n                   (this option value does not apply to constructors)\n        * \\`false\\` *if and only if* the function or method has a return statement (this option\n                    value does apply to constructors)\n      * \\`\"requireParamType\"\\`: \\`false\\` allows missing type in param tags\n      * \\`\"requireReturnType\"\\`: \\`false\\` allows missing type in return tags\n      * \\`\"matchDescription\"\\` specifies (as a string) a regular expression to match the description\n                               in each JSDoc comment (for example, \\`\".+\"\\` requires a description;\n                               this option does not apply to descriptions in parameter or return\n                               tags)\n      * \\`\"requireParamDescription\"\\`: \\`false\\` allows missing description in parameter tags\n      * \\`\"requireReturnDescription\"\\`: \\`false\\` allows missing description in return tags\n      "]))),
        options: {
            type: 'object',
            properties: {
                prefer: {
                    type: 'object',
                    additionalProperties: {
                        type: 'string'
                    }
                },
                preferType: {
                    type: 'object',
                    additionalProperties: {
                        type: 'string'
                    }
                },
                requireReturn: {
                    type: 'boolean'
                },
                requireParamDescription: {
                    type: 'boolean'
                },
                requireReturnDescription: {
                    type: 'boolean'
                },
                matchDescription: {
                    type: 'string'
                },
                requireParamType: {
                    type: 'boolean'
                },
                requireReturnType: {
                    type: 'boolean'
                }
            },
            additionalProperties: false
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, {\n          \"prefer\": {\n            \"return\": \"returns\"\n          },\n          \"requireReturn\": false,\n          \"requireParamDescription\": true,\n          \"requireReturnDescription\": true,\n          \"matchDescription\": \"^[A-Z][A-Za-z0-9\\\\s]*[.]$\"\n        }]\n        "], ["\n        \"", "\": [true, {\n          \"prefer\": {\n            \"return\": \"returns\"\n          },\n          \"requireReturn\": false,\n          \"requireParamDescription\": true,\n          \"requireReturnDescription\": true,\n          \"matchDescription\": \"^[A-Z][A-Za-z0-9\\\\\\\\s]*[.]$\"\n        }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'maintainability'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ValidJsdocWalker = (function (_super) {
    tslib_1.__extends(ValidJsdocWalker, _super);
    function ValidJsdocWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fns = [];
        return _this;
    }
    ValidJsdocWalker.prototype.visitSourceFile = function (node) {
        _super.prototype.visitSourceFile.call(this, node);
    };
    ValidJsdocWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ClassExpression) {
            this.visitClassExpression(node);
        }
        else {
            _super.prototype.visitNode.call(this, node);
        }
    };
    ValidJsdocWalker.prototype.visitArrowFunction = function (node) {
        this.startFunction(node);
        _super.prototype.visitArrowFunction.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitClassExpression.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitClassDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitMethodDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitConstructorDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitReturnStatement = function (node) {
        this.addReturn(node);
        _super.prototype.visitReturnStatement.call(this, node);
    };
    ValidJsdocWalker.prototype.startFunction = function (node) {
        var returnPresent = false;
        var isVoidOrNever = false;
        var returnType;
        if (node.kind === ts.SyntaxKind.ArrowFunction && node.body.kind !== ts.SyntaxKind.Block)
            returnPresent = true;
        if (this.isTypeClass(node))
            returnPresent = true;
        returnType = node.type;
        if (returnType !== undefined) {
            switch (returnType.kind) {
                case ts.SyntaxKind.VoidKeyword:
                case ts.SyntaxKind.NeverKeyword:
                    isVoidOrNever = true;
                    break;
            }
        }
        this.fns.push({ node: node, returnPresent: returnPresent, isVoidOrNever: isVoidOrNever });
    };
    ValidJsdocWalker.prototype.addReturn = function (node) {
        var parent = node;
        var nodes = this.fns.map(function (fn) { return fn.node; });
        while (parent && nodes.indexOf(parent) === -1)
            parent = parent.parent;
        if (parent && node.expression) {
            this.fns[nodes.indexOf(parent)].returnPresent = true;
        }
    };
    ValidJsdocWalker.prototype.isTypeClass = function (node) {
        return node.kind === ts.SyntaxKind.ClassExpression || node.kind === ts.SyntaxKind.ClassDeclaration;
    };
    ValidJsdocWalker.prototype.isValidReturnType = function (tag) {
        return tag.type && (tag.type.name === 'void' || tag.type.type === 'UndefinedLiteral');
    };
    ValidJsdocWalker.prototype.getJSDocComment = function (node) {
        var ALLOWED_PARENTS = [
            ts.SyntaxKind.BinaryExpression,
            ts.SyntaxKind.VariableDeclaration,
            ts.SyntaxKind.VariableDeclarationList,
            ts.SyntaxKind.VariableStatement
        ];
        if (!/^\/\*\*/.test(node.getFullText().trim())) {
            if (node.parent && ALLOWED_PARENTS.indexOf(node.parent.kind) !== -1) {
                return this.getJSDocComment(node.parent);
            }
            return {};
        }
        var comments = node.getFullText();
        var offset = comments.indexOf('/**');
        comments = comments.substring(offset);
        comments = comments.substring(0, comments.indexOf('*/') + 2);
        var start = node.pos + offset;
        var width = comments.length;
        if (!/^\/\*\*/.test(comments) || !/\*\/$/.test(comments)) {
            return {};
        }
        return { comments: comments, start: start, width: width };
    };
    ValidJsdocWalker.prototype.checkJSDoc = function (node) {
        var _this = this;
        var _a = this.getJSDocComment(node), comments = _a.comments, start = _a.start, width = _a.width;
        if (!comments || start === undefined || width === undefined)
            return;
        var jsdoc;
        try {
            jsdoc = doctrine.parse(comments, {
                strict: true,
                unwrap: true,
                sloppy: true
            });
        }
        catch (e) {
            if (/braces/i.test(e.message)) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingBrace));
            }
            else {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.syntaxError));
            }
            return;
        }
        var fn = this.fns.filter(function (f) { return node === f.node; })[0];
        var params = {};
        var hasReturns = false;
        var hasConstructor = false;
        var isOverride = false;
        var isAbstract = false;
        for (var _i = 0, _b = jsdoc.tags; _i < _b.length; _i++) {
            var tag = _b[_i];
            switch (tag.title) {
                case 'param':
                case 'arg':
                case 'argument':
                    if (!tag.type && OPTIONS.requireParamType) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterType(tag.name)));
                    }
                    if (!tag.description && OPTIONS.requireParamDescription) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterDescription(tag.name)));
                    }
                    if (params[tag.name]) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.duplicateParameter(tag.name)));
                    }
                    else if (tag.name.indexOf('.') === -1) {
                        params[tag.name] = true;
                    }
                    break;
                case 'return':
                case 'returns':
                    hasReturns = true;
                    isAbstract = Lint.hasModifier(fn.node.modifiers, ts.SyntaxKind.AbstractKeyword);
                    if (!isAbstract && !OPTIONS.requireReturn && !fn.returnPresent && tag.type && tag.type.name !== 'void' && tag.type.name !== 'undefined') {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.unexpectedTag(tag.title)));
                    }
                    else {
                        if (!tag.type && OPTIONS.requireReturnType) {
                            console.log('rule', Rule.FAILURE_STRING.missingReturnType, start, start + width);
                            console.log(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnType));
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnType));
                        }
                        if (!this.isValidReturnType(tag) && !tag.description && OPTIONS.requireReturnDescription) {
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnDescription));
                        }
                    }
                    break;
                case 'constructor':
                case 'class':
                    hasConstructor = true;
                    break;
                case 'override':
                case 'inheritdoc':
                case 'inheritDoc':
                    isOverride = true;
                    break;
            }
            var title = OPTIONS.prefer[tag.title];
            if (OPTIONS.prefer.hasOwnProperty(tag.title) && tag.title !== title) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.prefer(title)));
            }
        }
        if (!isOverride && !hasReturns && !hasConstructor && node.parent && node.parent.kind !== ts.SyntaxKind.GetKeyword && !this.isTypeClass(node)) {
            if (OPTIONS.requireReturn || (fn.returnPresent && !fn.isVoidOrNever)) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturn(OPTIONS.prefer['returns'])));
            }
        }
        var jsdocParams = Object.keys(params);
        var parameters = node.parameters;
        if (parameters) {
            parameters.forEach(function (param, i) {
                if (param.name.kind === ts.SyntaxKind.Identifier) {
                    var name = param.name.text;
                    if (jsdocParams[i] && name !== jsdocParams[i]) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.wrongParam(name, jsdocParams[i])));
                    }
                    else if (!params[name] && !isOverride) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.missingParam(name)));
                    }
                }
            });
        }
        if (OPTIONS.matchDescription) {
            try {
                var regex = new RegExp(OPTIONS.matchDescription);
                if (!regex.test(jsdoc.description)) {
                    this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.wrongDescription));
                }
            }
            catch (e) {
                this.addFailure(this.createFailure(start, width, e.message));
            }
        }
    };
    return ValidJsdocWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7aUJBQ3pGO2FBQ0Y7WUFDRCxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUM5RDtTQUNGO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0ExUUEsQUEwUUMsQ0ExUThCLElBQUksQ0FBQyxVQUFVLEdBMFE3QyIsImZpbGUiOiJydWxlcy92YWxpZEpzZG9jUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdnlhY2hlc2xhdmRvcnpoaWV2L0Rlc2t0b3AvcHJvamVjdHMvQGxpbmtlZC1oZWxwZXIvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
