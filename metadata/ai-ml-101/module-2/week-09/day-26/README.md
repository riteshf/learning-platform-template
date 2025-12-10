# Day 26: Hierarchical & DBSCAN

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Alternative clustering algorithms

Today you'll learn hierarchical clustering and DBSCAN, two important clustering algorithms that work differently from K-Means.

---

## Pre-class (30 mins)

### Materials to Review
- Review Day 25 concepts (K-Means)
- [Hierarchical Clustering](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.AgglomerativeClustering.html)
- [DBSCAN](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html)

### Prerequisites
- Completed Day 25 assignments
- Understanding of clustering

---

## Live Session (2 hours)

### Topics Covered

1. **Hierarchical Clustering**
   - How hierarchical clustering works
   - Agglomerative vs divisive
   - Linkage methods
   - Dendrograms
   - When to use hierarchical

2. **Building Hierarchical Models**
   - Using AgglomerativeClustering
   - Choosing linkage
   - Visualizing dendrograms
   - Cutting dendrograms

3. **DBSCAN**
   - Density-based clustering
   - How DBSCAN works
   - Core points, border points, noise
   - Epsilon and min_samples parameters

4. **Building DBSCAN Models**
   - Using DBSCAN
   - Tuning parameters
   - Handling noise points
   - When to use DBSCAN

### Hands-on Exercises
- Building hierarchical models
- Building DBSCAN models
- Visualizing results
- Comparing algorithms

---

## Post-class (30 mins)

### Assignment: Compare Clustering Algorithms

Create a Python program that:
1. Loads a dataset
2. Applies K-Means clustering
3. Applies hierarchical clustering
4. Applies DBSCAN clustering
5. Compares all three methods
6. Evaluates each using appropriate metrics
7. Visualizes results
8. Recommends best algorithm for the dataset

**Requirements:**
- Use all three clustering algorithms
- Tune parameters appropriately
- Evaluate using multiple metrics
- Create comparison visualizations
- Justify recommendations

**Submission:**
- Save your code as `clustering_comparison.py`
- Include comparisons and visualizations
- Be ready to explain your findings

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Build hierarchical clustering models
- ✅ Build DBSCAN models
- ✅ Choose appropriate clustering algorithms
- ✅ Compare clustering methods
- ✅ Handle different data shapes

---

## Additional Resources

- [Clustering Algorithms Comparison](https://scikit-learn.org/stable/modules/clustering.html#overview-of-clustering-methods)
- [DBSCAN Explained](https://www.analyticsvidhya.com/blog/2020/09/how-dbscan-clustering-works/)

---

**Next:** Review `day-27/` for tomorrow's class on Dimensionality Reduction.

