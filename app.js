// app.js
import { findFormula } from "./formulas.js";
import { evaluateExpression } from "./maths.js";
import { processEnglish } from "./english.js";

export function runQuery(subject, query) {
  query = query.trim();

  if (subject === "formulas") {
    const matches = findFormula(query);
    return matches.length
      ? matches.map(f => `${f.name}: ${f.latex} — ${f.description}`).join("\n")
      : "No matching formulas found.";
  }

  if (subject === "math") {
    return evaluateExpression(query);
  }

  if (subject === "english") {
    return processEnglish(query);
  }

  return "Unknown subject.";
}
