"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssignmentToken = void 0;
var ts = require("typescript");
function isAssignmentToken(token) {
    return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
}
exports.isAssignmentToken = isAssignmentToken;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvdG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWlDO0FBRWpDLFNBQWdCLGlCQUFpQixDQUFDLEtBQWM7SUFDOUMsT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7QUFDbkcsQ0FBQztBQUZELDhDQUVDIiwiZmlsZSI6InN1cHBvcnQvdG9rZW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Z5YWNoZXNsYXZkb3J6aGlldi9EZXNrdG9wL3Byb2plY3RzL0BsaW5rZWQtaGVscGVyL3RzbGludC1lc2xpbnQtcnVsZXMvc3JjIn0=
