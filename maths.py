from fractions import Fraction
import re
import sympy as sp

def convert_simple_fractions(expr):
    return re.sub(r"(\d+)\s*,\s*(\d+)", r"Fraction(\1,\2)", expr)

def insert_implicit_multiplication(expr):
    expr = re.sub(r"(?<=\d)(?=[A-Za-z(])", "*", expr)
    expr = re.sub(r"(?<=[A-Za-z)])(?=[A-Za-z0-9(])", "*", expr)
    return expr

def preprocess(raw):
    s = raw.strip()
    s = convert_simple_fractions(s)
    s = s.replace('^', '**')
    s = insert_implicit_multiplication(s)
    return s

print("HOMEWORK COMPANION")
print("Type 'exit' to quit.")
print("Use ';' to separate multiple equations.")

while True:
    raw = input("Enter expression or equations: ")
    if raw.lower() in ("exit", "quit"):
        break
    try:
        s = preprocess(raw)
        parts = [p.strip() for p in s.split(';') if p.strip()]
        symbolic = any(re.search(r"[A-Za-z]", p) for p in parts)
        if symbolic and any('=' in p for p in parts):
            eqs = []
            syms = set()
            for p in parts:
                if '=' in p:
                    left, right = p.split('=', 1)
                    L = sp.sympify(left, locals={'Fraction': Fraction})
                    R = sp.sympify(right, locals={'Fraction': Fraction})
                    eqs.append(sp.Eq(L, R))
                    syms.update(L.free_symbols)
                    syms.update(R.free_symbols)
                else:
                    E = sp.sympify(p, locals={'Fraction': Fraction})
                    eqs.append(sp.Eq(E, 0))
                    syms.update(E.free_symbols)
            if not syms:
                print("No variables found.")
                continue
            sol = sp.solve(eqs, list(syms), dict=True)
            if sol:
                for s in sol:
                    print(s)
            else:
                print("No solution or infinite solutions.")
        else:
            for p in parts:
                try:
                    expr = sp.sympify(p, locals={'Fraction': Fraction})
                    if expr.free_symbols:
                        print(sp.simplify(expr))
                    else:
                        val = expr
                        if isinstance(val, sp.Rational):
                            print(Fraction(int(val.p), int(val.q)))
                        else:
                            print(sp.N(val))
                except:
                    try:
                        val = eval(p, {"Fraction": Fraction})
                        print(val)
                    except:
                        print("Invalid expression:", p)
    except:
        print("Error.")
