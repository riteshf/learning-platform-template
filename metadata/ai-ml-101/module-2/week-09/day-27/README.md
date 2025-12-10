# Day 27: Dimensionality Reduction

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Principal Component Analysis (PCA) for dimensionality reduction

Today you'll learn PCA, a technique to reduce the number of features while preserving important information, useful for visualization and improving model performance.

---

## Pre-class (30 mins)

### Materials to Review
- Review Day 26 concepts (clustering)
- [PCA](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html)
- [Dimensionality Reduction](https://scikit-learn.org/stable/modules/decomposition.html)

### Prerequisites
- Completed Day 26 assignments
- Understanding of clustering

---

## Live Session (2 hours)

### Topics Covered

1. **Dimensionality Reduction Introduction**
   - Why reduce dimensions?
   - Curse of dimensionality
   - Use cases
   - Trade-offs

2. **Principal Component Analysis (PCA)**
   - How PCA works
   - Principal components
   - Explained variance
   - Eigenvalues and eigenvectors

3. **Applying PCA**
   - Using PCA in scikit-learn
   - Choosing number of components
   - Interpreting components
   - Visualizing results

4. **PCA Applications**
   - Data visualization
   - Feature reduction
   - Noise reduction
   - Preprocessing for ML

### Hands-on Exercises
- Applying PCA
- Choosing optimal components
- Visualizing in reduced space
- Using PCA for preprocessing

---

## Post-class (30 mins)

### Assignment: Reduce Dimensions of a Dataset

Create a Python program that:
1. Loads a high-dimensional dataset
2. Applies PCA
3. Determines optimal number of components
4. Visualizes explained variance
5. Projects data to 2D/3D for visualization
6. Compares original vs reduced data
7. Uses reduced data for clustering or classification

**Requirements:**
- Use PCA from scikit-learn
- Analyze explained variance
- Create visualizations
- Compare performance with/without PCA
- Document your findings

**Submission:**
- Save your code as `dimensionality_reduction.py`
- Include visualizations and analysis
- Be ready to explain your approach

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Understand dimensionality reduction
- ✅ Apply PCA
- ✅ Choose optimal number of components
- ✅ Visualize in reduced dimensions
- ✅ Use PCA for preprocessing

---

## Additional Resources

- [PCA Tutorial](https://scikit-learn.org/stable/auto_examples/decomposition/plot_pca_iris.html)
- [PCA Explained](https://www.analyticsvidhya.com/blog/2018/08/dimensionality-reduction-techniques-python/)

---

**Next:** Review `week-10/` for next week's class on Advanced Topics & Project.

