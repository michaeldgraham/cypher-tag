"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cql = (statement, ...substitutions) => {
    const BLOCK_QUOTE = `"""`;
    // Get the array of string literals
    const literals = statement.raw;
    // Add each substitution inbetween all
    const formatLiteral = literal => literal.split("\n").map(literal => literal.trim()).join("\n");
    const composed = substitutions.reduce((composed, substitution, index) => {
        // Format and add the string literal
        composed.push(formatLiteral(literals[index]));
        if (substitution) {
            substitution = substitution.trim();
            if (substitution.startsWith(BLOCK_QUOTE) && substitution.endsWith(BLOCK_QUOTE)) {
                // Removes GraphQL block quotes from nested compilation
                substitution = substitution.substr(3).slice(0, -3);
            }
            composed.push(`\n${substitution}\n`);
        }
        return composed;
    }, []);
    // Format and add the last literal
    composed.push(formatLiteral(literals[literals.length - 1]));
    return `${BLOCK_QUOTE}${composed.join('').trim()}${BLOCK_QUOTE}`;
};
module.exports = cql;
