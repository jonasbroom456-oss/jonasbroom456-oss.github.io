// app.js
import { findFormula } from "./formulas.js";
import { evaluateExpression } from "./maths.js";

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

    return "Unknown subject.";
}
def run_script(script_name, text):
    script_path = os.path.join(BASE, script_name)
    result = subprocess.run([sys.executable, script_path], input=text, text=True, capture_output=True)
    return result.stdout.strip()

@app.route("/", methods=["GET", "POST"])
def index():
    answer = ""
    if request.method == "POST":
        subject = request.form["subject"]
        query = request.form["query"]

        if subject in scripts:
            answer = run_script(scripts[subject], query)

    return render_template_string(HTML_PAGE, answer=answer)

if __name__ == "__main__":
    app.run(debug=True)
