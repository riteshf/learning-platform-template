# Pre-class: Day 1 (Python Basics)

**Time Box:** Max 30 mins

## Objectives
- Install Python 3.8+ and VS Code
- Understand basic Python concepts: variables, data types, operators
- Verify your setup works

---

## Setup Instructions

### 1. Install Python
- Download from [python.org](https://www.python.org/downloads/)
- Install version 3.8 or higher
- Verify: Open terminal, run `python --version` (or `python3 --version` on Mac/Linux)

### 2. Install VS Code
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install the **Python extension** (search for "Python" by Microsoft in Extensions)

### 3. Test Your Setup
1. Open VS Code
2. Create a new file: `hello.py`
3. Type: `print("Hello, World!")`
4. Run it: Right-click → "Run Python File in Terminal"
5. You should see output: `Hello, World!`

---

## Basic Theory

### Variables
Variables store data. Python uses **dynamic typing** (no type declaration needed).

```python
name = "Alice"        # string
age = 25              # integer
height = 5.6          # float
is_student = True     # boolean
```

### Data Types

| Type | Description | Example |
|------|-------------|----------|
| `int` | Whole numbers | `42`, `-10` |
| `float` | Decimal numbers | `3.14`, `-0.5` |
| `str` | Text (in quotes) | `"Hello"`, `'World'` |
| `bool` | True/False | `True`, `False` |

### Operators

**Arithmetic:** `+`, `-`, `*`, `/`, `//` (integer division), `%` (remainder), `**` (power)

**Comparison:** `==`, `!=`, `<`, `>`, `<=`, `>=` (return `True` or `False`)

**Logical:** `and`, `or`, `not`

### Input and Output

```python
# Output
print("Hello, World!")

# Input (always returns string)
name = input("Enter your name: ")
age = int(input("Enter your age: "))  # Convert to integer
```

⚠️ `input()` always returns a **string**. Convert if needed:
```python
age = int(input("Enter age: "))
```

---

## Quick Practice

Try these in Python interactive shell (`python` in terminal):

```python
# Variables
x = 10
y = 3
print(x + y)

# Types
print(type(x))
print(type("hello"))

# Operators
print(10 / 3)   # 3.333...
print(10 // 3)  # 3
print(10 % 3)   # 1
print(2 ** 3)   # 8

# Comparison
print(5 > 3)    # True
print(5 == 5)   # True

# Input (try in a script file)
name = input("Name: ")
print(f"Hello, {name}!")
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `python: command not found` | Use `python3` on Mac/Linux |
| Import errors | Restart VS Code after installing Python |
| Script doesn't run | Check file has `.py` extension |

---

## Resources
- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [Python for Beginners](https://www.python.org/about/gettingstarted/)

---

**Next:** Join live session with VS Code and terminal ready.
