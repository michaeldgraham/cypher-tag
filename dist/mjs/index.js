import stripIndent from 'strip-indent';
const cql = (statement, ...substitutions) => {
    const BLOCK_QUOTE = `"""`;
    // Get the array of string literals
    const literals = statement.raw;
    // Add each substitution inbetween all
    const composed = substitutions.reduce((composed, substitution, index) => {
        // Format and add the string literal
        composed.push(stripIndent(literals[index]));
        if (substitution) {
            const trimmed = substitution.trim();
            if (trimmed.startsWith(BLOCK_QUOTE) && trimmed.endsWith(BLOCK_QUOTE)) {
                // Removes GraphQL block quotes from nested compilation
                substitution = substitution.substr(3).slice(0, -3);
            }
            composed.push(`\n${stripIndent(substitution)}`);
        }
        return composed;
    }, []);
    // Format and add the last literal
    composed.push(`\n${stripIndent(literals[literals.length - 1])}`);
    // return `${BLOCK_QUOTE}${composed.join('')}${BLOCK_QUOTE}`;
    return `${BLOCK_QUOTE}${composed.join('').trim()}${BLOCK_QUOTE}`;
};
export default cql;
