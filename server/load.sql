-- Load data for Series
LOAD DATA INFILE './series.csv'
INTO TABLE Series
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(Name, description, start_year, end_year);

-- Load data for Users
LOAD DATA INFILE './users.csv'
INTO TABLE User
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(email, is_admin, Fname, Minit, Lname, password);

-- Load data for Books
LOAD DATA INFILE './books.csv'
INTO TABLE Book
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(ISBN, title, genre, copies, author, checked_out_by, series_id);

-- User generated data, no need for dummy data
-- Load data for Reviews
-- LOAD DATA INFILE './reviews.csv'
-- INTO TABLE Review
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"' 
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES
-- (reviewer_id, belongs_to_ISBN, date, rating);

-- Load data for Activities
-- LOAD DATA INFILE './activities.csv'
-- INTO TABLE Activity
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"' 
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES
-- (activity_id, user_id, activity_type, timestamp);
