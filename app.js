import { findFormula } from "./formulas.js";
import { evaluateExpression } from "./maths.js";
import { processEnglish } from "./english.js";

const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const title = document.getElementById('title');
const queryInput = document.getElementById('queryInput');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');

let currentSubject = null;

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('menu-open');
  sideMenu.classList.toggle('-translate-x-full');
});

document.querySelectorAll('.subjectBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentSubject = btn.dataset.subject;
    title.textContent =
      currentSubject === 'math'
        ? 'Maths Homework Companion'
        : currentSubject === 'formulas'
        ? 'Formulas Homework Companion'
        : 'English Homework Companion';
    menuBtn.classList.remove('menu-open');
    sideMenu.classList.add('-translate-x-full');
  });
});

submitBtn.addEventListener('click', () => {
  if (!currentSubject) {
    output.textContent = 'Please choose Maths, English, or Formulas first.';
    return;
  }

  const query = queryInput.value.trim();
  if (!query) {
    output.textContent = 'Please type a question first.';
    return;
  }

  const result = runQuery(currentSubject, query);
  output.textContent = result;
});

queryInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') submitBtn.click();
});

function runQuery(subject, query) {
  if (subject === "formulas") {
    const matches = findFormula(query);
    return Array.isArray(matches)
      ? (matches.length
          ? matches.map(f => `${f.name}: ${f.latex} — ${f.description}`).join("\n")
          : "No matching formulas found.")
      : matches;
  }

  if (subject === "math") {
    return evaluateExpression(query);
  }

  if (subject === "english") {
    return processEnglish(query);
  }

  return "Unknown subject.";
}
