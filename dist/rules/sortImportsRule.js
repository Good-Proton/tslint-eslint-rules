"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = require("tslint");
var ts = require("typescript");
var RULE_NAME = 'sort-imports';
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
        description: 'enforce sorting import declarations within module',
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      When declaring multiple imports, a sorted list of import declarations make it easier for developers to\n      read the code and find necessary imports later. This rule is purely a matter of style.\n\n      This rule checks all import declarations and verifies that all imports are first sorted by the used member\n      syntax and then alphabetically by the first member or alias name.\n      "], ["\n      When declaring multiple imports, a sorted list of import declarations make it easier for developers to\n      read the code and find necessary imports later. This rule is purely a matter of style.\n\n      This rule checks all import declarations and verifies that all imports are first sorted by the used member\n      syntax and then alphabetically by the first member or alias name.\n      "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      - `\"ignore-case\"` does case-insensitive comparisons (default: `false`)\n      - `\"ignore-member-sort\"` allows members in multiple type imports to occur in any order (default: `false`)\n      - `\"member-syntax-sort-order\"` (default: `[\"none\", \"all\", \"multiple\", \"single\", \"alias\"]`); all 5 items must be\n      present in the array, but you can change the order:\n        - `none` = import module without exported bindings.\n        - `all` = import all members provided by exported bindings.\n        - `multiple` = import multiple members.\n        - `single` = import a single member.\n        - `alias` = creates an alias for a member. This is unique to TER and not in ESLint's `sort-imports`.\n      "], ["\n      - \\`\"ignore-case\"\\` does case-insensitive comparisons (default: \\`false\\`)\n      - \\`\"ignore-member-sort\"\\` allows members in multiple type imports to occur in any order (default: \\`false\\`)\n      - \\`\"member-syntax-sort-order\"\\` (default: \\`[\"none\", \"all\", \"multiple\", \"single\", \"alias\"]\\`); all 5 items must be\n      present in the array, but you can change the order:\n        - \\`none\\` = import module without exported bindings.\n        - \\`all\\` = import all members provided by exported bindings.\n        - \\`multiple\\` = import multiple members.\n        - \\`single\\` = import a single member.\n        - \\`alias\\` = creates an alias for a member. This is unique to TER and not in ESLint's \\`sort-imports\\`.\n      "]))),
        options: {
            type: 'object',
            properties: {
                'member-syntax-sort-order': {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['none', 'all', 'multiple', 'single', 'alias']
                    },
                    minLength: 5,
                    maxLength: 5
                },
                'ignore-case': {
                    type: 'boolean'
                },
                'ignore-member-sort': {
                    type: 'boolean'
                }
            }
        },
        optionExamples: [
            Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true]\n        "], ["\n        \"", "\": [true]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"ignore-case\" }]\n        "], ["\n        \"", "\": [true, { \"ignore-case\" }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"ignore-member-sort\" }]\n        "], ["\n        \"", "\": [true, { \"ignore-member-sort\" }]\n        "])), RULE_NAME),
            Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n        \"", "\": [true, { \"member-syntax-sort-order\": [\"all\", \"single\", \"multiple\", \"none\", \"alias\"] }]\n        "], ["\n        \"", "\": [true, { \"member-syntax-sort-order\": [\"all\", \"single\", \"multiple\", \"none\", \"alias\"] }]\n        "])), RULE_NAME)
        ],
        typescriptOnly: false,
        type: 'style'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MemberSyntaxType;
(function (MemberSyntaxType) {
    MemberSyntaxType[MemberSyntaxType["None"] = 0] = "None";
    MemberSyntaxType[MemberSyntaxType["All"] = 1] = "All";
    MemberSyntaxType[MemberSyntaxType["Multiple"] = 2] = "Multiple";
    MemberSyntaxType[MemberSyntaxType["Single"] = 3] = "Single";
    MemberSyntaxType[MemberSyntaxType["Alias"] = 4] = "Alias";
})(MemberSyntaxType || (MemberSyntaxType = {}));
var RuleWalker = (function (_super) {
    tslib_1.__extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.currentImportIndex = 0;
        var optionSet = _this.getOptions()[0] || {};
        _this.ignoreCase = _this.hasOption('ignore-case');
        _this.ignoreMemberSort = _this.hasOption('ignore-member-sort');
        _this.expectedOrder = RuleWalker._processMemberSyntaxSortOrder(optionSet['member-syntax-sort-order']);
        _this.currentSortValue = { sortValue: '', originalValue: '' };
        if (_this.ignoreCase) {
            _this.caseConverter = function (s) { return s.toUpperCase(); };
        }
        else {
            _this.caseConverter = function (s) { return s; };
        }
        return _this;
    }
    RuleWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ImportDeclaration ||
            node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            this._validateOrder(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    RuleWalker.prototype.visitNamedImports = function (node) {
        if (!this.ignoreMemberSort) {
            this._validateMemberSort(node);
        }
        _super.prototype.visitNamedImports.call(this, node);
    };
    RuleWalker.prototype._validateMemberSort = function (node) {
        var _this = this;
        var imports = node.elements.map(function (e) { return _this.caseConverter(e.getText()); });
        var importReduction = imports.reduce(function (prev, current) { return prev + current; });
        var sortedImports = imports.sort();
        var sortedReduction = sortedImports.reduce(function (prev, current) { return prev + current; });
        if (importReduction !== sortedReduction) {
            this.addFailureAtNode(node, 'Member imports must be sorted alphabetically.');
        }
    };
    RuleWalker.prototype._validateOrder = function (node) {
        var importData = this._determineImportType(node);
        if (importData) {
            var importName = importData.sortValue.trim();
            var index = this.expectedOrder.indexOf(importData.memberSyntaxType, this.currentImportIndex);
            if (index !== -1) {
                if (this.expectedOrder[this.currentImportIndex] !== importData.memberSyntaxType) {
                    this.currentImportIndex = index;
                    this.currentSortValue = {
                        sortValue: this.caseConverter(importName),
                        originalValue: importName
                    };
                }
                else if (this.currentSortValue.sortValue > this.caseConverter(importName)) {
                    this.addFailureAtNode(node, "All imports of the same type must be sorted alphabetically. \"" + importName + "\" must come before \"" + this.currentSortValue.originalValue + "\"");
                }
                else {
                    this.currentSortValue = {
                        sortValue: this.caseConverter(importName),
                        originalValue: importName
                    };
                }
            }
            else {
                var currentSyntaxType = MemberSyntaxType[importData.memberSyntaxType];
                var previousSyntaxType = MemberSyntaxType[this.expectedOrder[this.currentImportIndex]];
                this.addFailureAtNode(node, "All imports of type \"" + currentSyntaxType + "\" must occur before all imports of type \"" + previousSyntaxType + "\"");
            }
        }
        else {
            this.addFailureAtNode(node, 'Could not determine import type');
        }
    };
    RuleWalker.prototype._determineImportType = function (node) {
        var nodeText = node.getFullText();
        if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            var aliasMatch = /\bimport\s+(\w+)\s*=.+/g.exec(nodeText);
            return {
                memberSyntaxType: MemberSyntaxType.Alias,
                sortValue: aliasMatch[1]
            };
        }
        else {
            var singleMatch = /\bimport\s+(?:{?([^,{}\*]+?)}?)\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
            var multipleMatch = /\bimport\s*{?\s*([^{}\'",]+?)\s*,(?:\s*.+\s*,\s*)*\s*.+\s*}?\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
            var noneMatch = /\bimport\s+[\'"]([^"\']+)["\']/g.exec(nodeText);
            var allMatch = /\bimport\s+\*\s+as\s+(.+)\s+from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
            var result = void 0;
            if (singleMatch !== null) {
                result = {
                    memberSyntaxType: MemberSyntaxType.Single,
                    sortValue: singleMatch[1]
                };
            }
            else if (multipleMatch !== null) {
                result = {
                    memberSyntaxType: MemberSyntaxType.Multiple,
                    sortValue: multipleMatch[1]
                };
            }
            else if (noneMatch !== null) {
                result = {
                    memberSyntaxType: MemberSyntaxType.None,
                    sortValue: noneMatch[1]
                };
            }
            else if (allMatch !== null) {
                result = {
                    memberSyntaxType: MemberSyntaxType.All,
                    sortValue: allMatch[1]
                };
            }
            else {
                result = {
                    memberSyntaxType: MemberSyntaxType.None,
                    sortValue: ''
                };
            }
            return result;
        }
    };
    RuleWalker._processMemberSyntaxSortOrder = function (sortOption) {
        var defaultOrder = [MemberSyntaxType.None, MemberSyntaxType.All, MemberSyntaxType.Multiple, MemberSyntaxType.Single, MemberSyntaxType.Alias];
        if (Array.isArray(sortOption) && typeof sortOption[0] === 'string' && sortOption.length === 5) {
            var memberSyntaxTypeMap_1 = {
                none: MemberSyntaxType.None,
                all: MemberSyntaxType.All,
                multiple: MemberSyntaxType.Multiple,
                single: MemberSyntaxType.Single,
                alias: MemberSyntaxType.Alias
            };
            var order_1 = [];
            var usedOptions_1 = {};
            sortOption.forEach(function (t) {
                if (usedOptions_1[t] !== undefined) {
                }
                else {
                    usedOptions_1[t] = t;
                    if (memberSyntaxTypeMap_1[t]) {
                        order_1.push(memberSyntaxTypeMap_1[t]);
                    }
                }
            });
            return order_1;
        }
        else {
            return defaultOrder;
        }
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3NvcnRJbXBvcnRzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkJBQStCO0FBQy9CLCtCQUFpQztBQUVqQyxJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFFakM7SUFBMEIsZ0NBQXVCO0lBQWpEOztJQWdFQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQTlEYSxhQUFRLEdBQXVCO1FBQzNDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSw4ZEFBQSxtWkFNekIsSUFBQTtRQUNILGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxxeUJBQUEsMHdCQVVsQyxJQUFBO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsMEJBQTBCLEVBQUU7b0JBQzFCLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO3FCQUNyRDtvQkFDRCxTQUFTLEVBQUUsQ0FBQztvQkFDWixTQUFTLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELG9CQUFvQixFQUFFO29CQUNwQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRjtTQUNGO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGlIQUFBLGNBQ1osRUFBUyxzQkFDWCxLQURFLFNBQVM7WUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sc0lBQUEsY0FDWixFQUFTLDJDQUNYLEtBREUsU0FBUztZQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSw2SUFBQSxjQUNaLEVBQVMsa0RBQ1gsS0FERSxTQUFTO1lBRWQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLDZNQUFBLGNBQ1osRUFBUyxrSEFDWCxLQURFLFNBQVM7U0FFZjtRQUNELGNBQWMsRUFBRSxLQUFLO1FBQ3JCLElBQUksRUFBRSxPQUFPO0tBQ2QsQ0FBQztJQU1KLFdBQUM7Q0FoRUQsQUFnRUMsQ0FoRXlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQWdFaEQ7QUFoRVksb0JBQUk7QUFrRWpCLElBQUssZ0JBTUo7QUFORCxXQUFLLGdCQUFnQjtJQUNuQix1REFBSSxDQUFBO0lBQ0oscURBQUcsQ0FBQTtJQUNILCtEQUFRLENBQUE7SUFDUiwyREFBTSxDQUFBO0lBQ04seURBQUssQ0FBQTtBQUNQLENBQUMsRUFOSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBTXBCO0FBT0Q7SUFBeUIsc0NBQWU7SUFTdEMsb0JBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNFLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FjM0I7UUFuQk8sd0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBTzdCLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUNyRyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUU3RCxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUM7U0FDM0M7YUFBTTtZQUNMLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO1NBQzdCOztJQUNILENBQUM7SUFFTSw4QkFBUyxHQUFoQixVQUFpQixJQUFhO1FBQzVCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUU7WUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBb0QsSUFBSSxDQUFDLENBQUM7U0FDOUU7UUFDRCxpQkFBTSxTQUFTLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLHNDQUFpQixHQUF4QixVQUF5QixJQUFxQjtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELGlCQUFNLGlCQUFpQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyx3Q0FBbUIsR0FBM0IsVUFBNEIsSUFBcUI7UUFBakQsaUJBWUM7UUFWQyxJQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUNsRixJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksR0FBRyxPQUFPLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsT0FBTyxJQUFLLE9BQUEsSUFBSSxHQUFHLE9BQU8sRUFBZCxDQUFjLENBQUMsQ0FBQztRQUVoRixJQUFJLGVBQWUsS0FBSyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUNuQixJQUFJLEVBQ0osK0NBQStDLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7SUFFTyxtQ0FBYyxHQUF0QixVQUF1QixJQUF1RDtRQUM1RSxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRS9DLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUMvRixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDL0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO3dCQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7d0JBQ3pDLGFBQWEsRUFBRSxVQUFVO3FCQUMxQixDQUFDO2lCQUNIO3FCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksRUFDSixtRUFBZ0UsVUFBVSw4QkFBdUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsT0FBRyxDQUFDLENBQUM7aUJBQzVJO3FCQUFNO29CQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRzt3QkFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO3dCQUN6QyxhQUFhLEVBQUUsVUFBVTtxQkFDMUIsQ0FBQztpQkFDSDthQUNGO2lCQUFNO2dCQUNMLElBQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hFLElBQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksRUFDSiwyQkFBd0IsaUJBQWlCLG1EQUE0QyxrQkFBa0IsT0FBRyxDQUFDLENBQUM7YUFDL0c7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUVPLHlDQUFvQixHQUE1QixVQUE2QixJQUF1RDtRQUNsRixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUU7WUFDdkQsSUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1lBQzdELE9BQU87Z0JBQ0wsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztnQkFDeEMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDekIsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFNLFdBQVcsR0FBRyxpRUFBaUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckcsSUFBTSxhQUFhLEdBQUcsOEZBQThGLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BJLElBQU0sU0FBUyxHQUFHLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRSxJQUFNLFFBQVEsR0FBRywyREFBMkQsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFNUYsSUFBSSxNQUFNLFNBQUEsQ0FBQztZQUNYLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDeEIsTUFBTSxHQUFHO29CQUNQLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLE1BQU07b0JBQ3pDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUMxQixDQUFDO2FBQ0g7aUJBQU0sSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO2dCQUNqQyxNQUFNLEdBQUc7b0JBQ1AsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtvQkFDM0MsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7aUJBQzVCLENBQUM7YUFDSDtpQkFBTSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLE1BQU0sR0FBRztvQkFDUCxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO29CQUN2QyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsQ0FBQzthQUNIO2lCQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDNUIsTUFBTSxHQUFHO29CQUNQLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLEdBQUc7b0JBQ3RDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUN2QixDQUFDO2FBQ0g7aUJBQU07Z0JBRUwsTUFBTSxHQUFHO29CQUNQLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLElBQUk7b0JBQ3ZDLFNBQVMsRUFBRSxFQUFFO2lCQUNkLENBQUM7YUFDSDtZQUVELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRWMsd0NBQTZCLEdBQTVDLFVBQTZDLFVBQW9CO1FBQy9ELElBQU0sWUFBWSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9JLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0YsSUFBTSxxQkFBbUIsR0FBRztnQkFDMUIsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUk7Z0JBQzNCLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHO2dCQUN6QixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtnQkFDbkMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE1BQU07Z0JBQy9CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO2FBQzlCLENBQUM7WUFFRixJQUFNLE9BQUssR0FBdUIsRUFBRSxDQUFDO1lBQ3JDLElBQU0sYUFBVyxHQUFHLEVBQUUsQ0FBQztZQUN2QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDbkIsSUFBSSxhQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2lCQUVqQztxQkFBTTtvQkFDTCxhQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLHFCQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUMxQixPQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3BDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQUssQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLFlBQVksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBdEtBLEFBc0tDLENBdEt3QixJQUFJLENBQUMsVUFBVSxHQXNLdkMiLCJmaWxlIjoicnVsZXMvc29ydEltcG9ydHNSdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
