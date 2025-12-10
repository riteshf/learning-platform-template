# Day 23: Hyperparameter Tuning

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Optimizing model hyperparameters for best performance

Today you'll learn techniques for finding the best hyperparameters for your models, including grid search, random search, and cross-validation.

---

## Pre-class (30 mins)

### Materials to Review
- Review Day 22 concepts (model evaluation)
- [Grid Search](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html)
- [Random Search](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html)

### Prerequisites
- Completed Day 22 assignments
- Understanding of model evaluation

---

## Live Session (2 hours)

### Topics Covered

1. **Hyperparameters vs Parameters**
   - What are hyperparameters?
   - Common hyperparameters
   - Why tuning matters

2. **Grid Search**
   - How grid search works
   - Defining parameter grid
   - Using GridSearchCV
   - Best practices

3. **Random Search**
   - How random search works
   - When to use random search
   - Using RandomizedSearchCV
   - Advantages over grid search

4. **Cross-Validation in Tuning**
   - K-fold cross-validation
   - Stratified cross-validation
   - Nested cross-validation
   - Avoiding overfitting

### Hands-on Exercises
- Performing grid search
- Performing random search
- Comparing results
- Tuning multiple models

---

## Post-class (30 mins)

### Assignment: Optimize Model Hyperparameters

Create a Python program that:
1. Loads a dataset
2. Selects a model (e.g., Random Forest, SVM)
3. Defines hyperparameter search space
4. Performs grid search with cross-validation
5. Performs random search with cross-validation
6. Compares both methods
7. Selects best hyperparameters
8. Evaluates final model

**Requirements:**
- Use GridSearchCV and RandomizedSearchCV
- Use appropriate cross-validation
- Compare search methods
- Document hyperparameter choices
- Justify final selection

**Submission:**
- Save your code as `hyperparameter_tuning.py`
- Include search results and comparisons
- Be ready to explain your tuning process

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Perform grid search
- ✅ Perform random search
- ✅ Use cross-validation in tuning
- ✅ Select best hyperparameters
- ✅ Optimize models effectively

---

## Additional Resources

- [Hyperparameter Tuning Guide](https://scikit-learn.org/stable/modules/grid_search.html)
- [Tuning Best Practices](https://www.analyticsvidhya.com/blog/2021/06/tune-hyperparameters-with-grid-search-cv-in-scikit-learn/)

---

**Next:** Review `day-24/` for tomorrow's class on Model Selection & Best Practices.

