"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strip_indent_1 = __importDefault(require("strip-indent"));
const cql = (statement, ...substitutions) => {
    const BLOCK_QUOTE = `"""`;
    // Get the array of string literals
    const literals = statement.raw;
    // Add each substitution inbetween all
    const composed = substitutions.reduce((composed, substitution, index) => {
        // Format and add the string literal
        composed.push(strip_indent_1.default(literals[index]));
        if (substitution) {
            const trimmed = substitution.trim();
            if (trimmed.startsWith(BLOCK_QUOTE) && trimmed.endsWith(BLOCK_QUOTE)) {
                // Removes GraphQL block quotes from nested compilation
                substitution = substitution.substr(3).slice(0, -3);
            }
            composed.push(`\n${strip_indent_1.default(substitution)}`);
        }
        return composed;
    }, []);
    // Format and add the last literal
    composed.push(`\n${strip_indent_1.default(literals[literals.length - 1])}`);
    // return `${BLOCK_QUOTE}${composed.join('')}${BLOCK_QUOTE}`;
    return `${BLOCK_QUOTE}${composed.join('').trim()}${BLOCK_QUOTE}`;
};
module.exports = cql;
