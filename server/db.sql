-- Creating a new database named 'Memehub_project'
CREATE DATABASE Memehub_project;

-- Using the newly created database
USE Memehub_project;

-- Creating a table named 'UserInformation'
CREATE TABLE UserInformation (
    PersonID SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    REGISTERED_ON TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Selecting all records from the 'UserInformation' table
-- (Initially empty, as we've just created it)
SELECT * FROM UserInformation;

-- Inserting a new user into the 'UserInformation' table
INSERT INTO UserInformation (Email, Password, Username)
VALUES ('mustafa@gmail.com', 'Mustafa1234', 'Mustafa');

-- Verify if the user has been added correctly
SELECT * FROM UserInformation;