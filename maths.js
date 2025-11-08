// maths.js

export function evaluateExpression(expr) {
    try {
        // Replace fractions like 1/2 with (1/2)
        expr = expr.replace(/(\d+)\s*\/\s*(\d+)/g, "($1/$2)");

        const result = Function(`"use strict"; return (${expr})`)();
        return result;
    } catch {
        return "Invalid expression.";
    }
}
