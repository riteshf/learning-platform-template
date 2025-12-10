# Day 22: Model Evaluation Metrics

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Comprehensive model evaluation using various metrics

Today you'll learn to evaluate models thoroughly using multiple metrics and understand when to use each metric.

---

## Pre-class (30 mins)

### Materials to Review
- Review Week 7 concepts (classification models)
- [Classification Metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [Confusion Matrix](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html)

### Prerequisites
- Completed Week 7 assignments
- Understanding of classification models

---

## Live Session (2 hours)

### Topics Covered

1. **Classification Metrics**
   - Accuracy and its limitations
   - Precision and Recall
   - F1-score
   - Precision-Recall curve
   - ROC curve and AUC

2. **Confusion Matrix**
   - Understanding confusion matrix
   - True/False Positives/Negatives
   - Calculating metrics from matrix
   - Visualizing confusion matrix

3. **Multi-class Metrics**
   - Macro vs micro averaging
   - Per-class metrics
   - Handling imbalanced classes

4. **Regression Metrics Review**
   - MSE, RMSE, MAE
   - R² score
   - When to use each

### Hands-on Exercises
- Calculating all metrics
- Creating confusion matrices
- Plotting ROC and PR curves
- Comparing metrics across models

---

## Post-class (30 mins)

### Assignment: Evaluate Multiple Models

Create a Python program that:
1. Loads a dataset
2. Builds at least 3 different classification models
3. Evaluates each model using:
   - Accuracy
   - Precision, Recall, F1
   - Confusion Matrix
   - ROC curve and AUC
   - Precision-Recall curve
4. Creates visualizations for all metrics
5. Compares models side-by-side
6. Identifies best model for different scenarios

**Requirements:**
- Use scikit-learn metrics
- Create comprehensive visualizations
- Compare models fairly
- Document your findings

**Submission:**
- Save your code as `model_evaluation.py`
- Include all metrics and visualizations
- Be ready to explain your evaluation

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Calculate all classification metrics
- ✅ Create and interpret confusion matrices
- ✅ Plot ROC and PR curves
- ✅ Choose appropriate metrics
- ✅ Evaluate models comprehensively

---

## Additional Resources

- [Model Evaluation Guide](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [Metrics Explained](https://www.analyticsvidhya.com/blog/2020/06/auc-roc-curve-machine-learning/)

---

**Next:** Review `day-23/` for tomorrow's class on Hyperparameter Tuning.

