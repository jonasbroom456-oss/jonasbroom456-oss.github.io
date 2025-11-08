from flask import Flask, render_template_string, request
import subprocess, sys, os

app = Flask(__name__)

# Path to python scripts
BASE = os.path.dirname(os.path.abspath(__file__))

scripts = {
    "math": "maths.py",
    "formulas": "formulas.py",
    "english": "English words.py"
}

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head><title>Homework Bot</title></head>
<body>
  <h1>Homework Helper</h1>
  <form method="post">
    <select name="subject" required>
      <option value="math">Math</option>
      <option value="formulas">Formulas</option>
      <option value="english">English Words</option>
    </select>
    <input type="text" name="query" placeholder="Enter your question" required>
    <button type="submit">Submit</button>
  </form>
  {% if answer %}
  <p><strong>Answer:</strong></p>
  <pre>{{answer}}</pre>
  {% endif %}
</body>
</html>
"""

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
