import { evaluateExpression } from "./maths.js";
import { findFormula } from "./formulas.js";
import { processEnglish } from "./english.js";

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const title = document.getElementById("title");
const queryInput = document.getElementById("queryInput");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

let currentSubject = null;

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("menu-open");
  sideMenu.classList.toggle("-translate-x-full");
});

document.querySelectorAll(".subjectBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSubject = btn.dataset.subject;

    if (currentSubject === "math") title.textContent = "Maths Homework Companion";
    if (currentSubject === "formulas") title.textContent = "Formulas Homework Companion";
    if (currentSubject === "english") title.textContent = "English Homework Companion";

    menuBtn.classList.remove("menu-open");
    sideMenu.classList.add("-translate-x-full");
  });
});

submitBtn.addEventListener("click", () => {
  const q = queryInput.value.trim();
  if (!currentSubject) { output.textContent = "Please choose a subject first."; return; }
  if (!q) { output.textContent = "Please type something."; return; }

  let result = "";

  if (currentSubject === "math") result = evaluateExpression(q);
  else if (currentSubject === "formulas") {
    const matches = findFormula(q);
    result = matches.length ? matches.map(f => f.name + ": " + f.latex + " — " + f.description).join("\n") : "No matching formulas found.";
  }
  else if (currentSubject === "english") result = processEnglish(q);

  output.textContent = result;
});

queryInput.addEventListener("keydown", e => {
  if (e.key === "Enter") submitBtn.click();
});
