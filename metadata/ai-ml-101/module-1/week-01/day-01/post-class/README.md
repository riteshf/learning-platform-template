# Post-class: Day 1 Assignment

**Time:** ~30 minutes

---

## Task: Simple Calculator

Create a Python program called `calculator.py` that:

1. Asks the user for **two numbers**
2. Asks for an **operation** (`+`, `-`, `*`, or `/`)
3. Performs the calculation
4. Displays the result

---

## Requirements

✅ Use `input()` to get user input  
✅ Convert input strings to numbers using `float()`  
✅ Use `if/elif/else` to check which operation  
✅ Handle division by zero (print error message)  
✅ Display the result with `print()`

---

## Example Output

```
Enter first number: 10
Enter second number: 5
Enter operation (+ - * /): +
Result: 15.0
```

```
Enter first number: 10
Enter second number: 0
Enter operation (+ - * /): /
Error: Cannot divide by zero
```

---

## Starter Template

```python
# Get inputs
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
operation = input("Enter operation (+ - * /): ")

# TODO: Add your if/elif/else logic here
# Check the operation and perform calculation
# Remember to handle division by zero!
```

---

## Testing Checklist

- [ ] Test addition: `10 + 5` → `15.0`
- [ ] Test subtraction: `10 - 5` → `5.0`
- [ ] Test multiplication: `10 * 5` → `50.0`
- [ ] Test division: `10 / 5` → `2.0`
- [ ] Test division by zero: `10 / 0` → Error message

---

## Submission

Save as `calculator.py` and be ready to share your solution in the next class.

---

**Next:** Preview Day 2 topics (Control Flow & Functions).
