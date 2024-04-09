CREATE TABLE `Review`(
    `reviewer_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `belongs_to_ISBN` INT(13) NOT NULL,
    `date` DATE NOT NULL,
    `rating` INT NOT NULL
);
CREATE TABLE `Series`(
    `series_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `start_year` DATE NOT NULL,
    `end_year` DATE NULL
);
CREATE TABLE `Credentials`(
    `email` VARCHAR(255) NOT NULL PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
);
CREATE TABLE `Book`(
    `ISBN` INT(13) NOT NULL UNIQUE PRIMARY KEY,
    `series_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `copies` INT NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `checked_out_by` VARCHAR(255) NULL
);
CREATE TABLE `Users`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL, UNIQUE
    `is_admin` TINYINT(1) NOT NULL,
    `Fname` VARCHAR(255) NOT NULL,
    `Minit` VARCHAR(255) NOT NULL,
    `Lname` VARCHAR(255) NOT NULL
);
CREATE TABLE `Activity`(
    `activity_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `activity_type` VARCHAR(255) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL
);
ALTER TABLE
    `Activity` ADD CONSTRAINT `activity_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`);
ALTER TABLE
    `Users` ADD CONSTRAINT `users_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Review`(`reviewer_id`);
ALTER TABLE
    `Users` ADD CONSTRAINT `users_email_foreign` FOREIGN KEY(`email`) REFERENCES `Credentials`(`email`);
ALTER TABLE
    `Review` ADD CONSTRAINT `review_belongs_to_isbn_foreign` FOREIGN KEY(`belongs_to_ISBN`) REFERENCES `Book`(`ISBN`);
ALTER TABLE
    `Book` ADD CONSTRAINT `book_series_id_foreign` FOREIGN KEY(`series_id`) REFERENCES `Series`(`series_id`);
