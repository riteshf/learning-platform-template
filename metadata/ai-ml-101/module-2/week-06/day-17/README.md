# Day 17: Polynomial & Regularization

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Handling non-linear relationships and preventing overfitting

Today you'll learn to handle non-linear relationships using polynomial regression and prevent overfitting using regularization techniques.

---

## Pre-class (30 mins)

### Materials to Review
- Review Day 16 concepts (linear regression)
- [Polynomial Regression](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html)
- [Regularization](https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression)

### Prerequisites
- Completed Day 16 assignments
- Understanding of linear regression

---

## Live Session (2 hours)

### Topics Covered

1. **Polynomial Regression**
   - Non-linear relationships
   - Polynomial features
   - Degree selection
   - Overfitting concerns

2. **Ridge Regression (L2 Regularization)**
   - What is Ridge?
   - Alpha parameter
   - When to use Ridge
   - Implementation

3. **Lasso Regression (L1 Regularization)**
   - What is Lasso?
   - Feature selection with Lasso
   - When to use Lasso
   - Implementation

4. **Elastic Net**
   - Combining Ridge and Lasso
   - When to use Elastic Net

### Hands-on Exercises
- Building polynomial regression models
- Applying Ridge regularization
- Applying Lasso regularization
- Comparing regularization techniques

---

## Post-class (30 mins)

### Assignment: Regularization Practice

Create a Python program that:
1. Loads a dataset with many features
2. Builds a linear regression model (baseline)
3. Builds polynomial regression models with different degrees
4. Applies Ridge regularization
5. Applies Lasso regularization
6. Compares all models using cross-validation
7. Selects the best model

**Requirements:**
- Use PolynomialFeatures
- Use Ridge and Lasso from scikit-learn
- Tune regularization parameters
- Compare model performance
- Visualize results

**Submission:**
- Save your code as `regularization_practice.py`
- Include model comparison results
- Be ready to explain your choices

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Build polynomial regression models
- ✅ Apply Ridge regularization
- ✅ Apply Lasso regularization
- ✅ Prevent overfitting
- ✅ Select appropriate regularization

---

## Additional Resources

- [Regularization Explained](https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-ridge-lasso-regression-python/)
- [Polynomial Features](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html)

---

**Next:** Review `day-18/` for tomorrow's Regression Project.

