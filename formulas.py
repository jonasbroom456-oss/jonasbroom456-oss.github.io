import difflib
import random

FORMULAS = [
    {
        "name": "Velocity",
        "latex": "v = d / t",
        "description": "Velocity equals distance divided by time.",
        "variables": {"d": "distance", "t": "time"},
        "category": "Kinematics"
    },
    {
        "name": "Acceleration",
        "latex": "a = (v2 - v1) / (t2 - t1)",
        "description": "Acceleration equals change in velocity over time.",
        "variables": {"v1": "initial velocity", "v2": "final velocity", "t1": "initial time", "t2": "final time"},
        "category": "Kinematics"
    },
    {
        "name": "Newton's Second Law",
        "latex": "F = m a",
        "description": "Force equals mass times acceleration.",
        "variables": {"m": "mass", "a": "acceleration"},
        "category": "Physics"
    },
    {
        "name": "Pythagorean Theorem",
        "latex": "c = sqrt(a^2 + b^2)",
        "description": "In a right triangle, the hypotenuse is the square root of the sum of the squares of the other sides.",
        "variables": {"a": "side a", "b": "side b"},
        "category": "Geometry"
    }
]

def fuzzy_find(term):
    term = term.lower()
    names = [f["name"].lower() for f in FORMULAS]
    close = difflib.get_close_matches(term, names, n=1, cutoff=0.45)
    if close:
        match = close[0]
        for f in FORMULAS:
            if f["name"].lower() == match:
                return f
    for f in FORMULAS:
        if term in f["name"].lower():
            return f
    for f in FORMULAS:
        if term in f["description"].lower():
            return f
    return None

def show(f):
    print("\n" + f["name"])
    print("Category:", f["category"])
    print("Formula:", f["latex"])
    print("Meaning:", f["description"])
    print("Variables:")
    for v, d in f["variables"].items():
        print(" ", v + ":", d)

def repl():
    print("Homework Companion Formulas Ready. Type a keyword or type exit.")
    while True:
        cmd = input("\n> ").strip().lower()
        if cmd in ("exit", "quit"):
            print("Goodbye!")
            break
        result = fuzzy_find(cmd)
        if result:
            show(result)
        else:
            print("No formula found. Try another word.")

if __name__ == "__main__":
    repl()
