# Day 12: SQL with Python

## Overview

**Duration:** 2 hours live + 30 mins pre-class + 30 mins post-class  
**Focus:** Integrating SQL databases with Python using SQLite and pandas

Today you'll learn how to connect Python to databases, execute SQL queries from Python, and work with query results using pandas.

---

## Pre-class (30 mins)

### Materials to Review
- Review Day 11 concepts (advanced SQL)
- [Python SQLite3](https://docs.python.org/3/library/sqlite3.html)
- [Pandas SQL](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)

### Setup Instructions
1. Ensure SQLite3 is available (comes with Python)
2. Install: `pip install sqlalchemy pandas`
3. Prepare a sample database

### Prerequisites
- Completed Day 11 assignments
- Understanding of SQL queries

---

## Live Session (2 hours)

### Topics Covered

1. **SQLite with Python**
   - Connecting to SQLite database
   - Creating tables
   - Inserting data
   - Executing queries

2. **Pandas + SQL**
   - Reading SQL queries into DataFrames
   - Writing DataFrames to databases
   - Using pandas.read_sql()
   - Using pandas.to_sql()

3. **SQLAlchemy**
   - Introduction to SQLAlchemy
   - Creating connections
   - Working with different databases

4. **Data Pipeline**
   - Building ETL pipelines
   - Combining SQL and Python
   - Error handling
   - Best practices

### Hands-on Exercises
- Connecting to databases from Python
- Executing queries and getting results
- Loading query results into pandas
- Creating data pipelines

---

## Post-class (30 mins)

### Assignment: Build a Data Pipeline Project

Create a Python program that:
1. Connects to a database
2. Executes SQL queries to extract data
3. Loads results into pandas DataFrames
4. Performs data analysis and transformations
5. Writes processed data back to database or files
6. Handles errors gracefully

**Requirements:**
- Use SQLite or PostgreSQL
- Combine SQL queries with pandas operations
- Create a complete ETL pipeline
- Include error handling and logging
- Document your code

**Submission:**
- Save your code as `data_pipeline.py`
- Include database schema
- Be ready to demonstrate your pipeline

---

## Learning Outcomes

After completing this day, you should be able to:
- ✅ Connect Python to databases
- ✅ Execute SQL queries from Python
- ✅ Work with query results in pandas
- ✅ Build data pipelines
- ✅ Integrate SQL and Python effectively

---

## Additional Resources

- [SQLite3 Python Tutorial](https://docs.python.org/3/library/sqlite3.html)
- [Pandas SQL Interface](https://pandas.pydata.org/docs/user_guide/io.html#sql-queries)

---

**Next:** Congratulations on completing Module 1! Review `module-2/` for Machine Learning Essentials.

