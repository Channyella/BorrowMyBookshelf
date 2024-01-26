CREATE SCHEMA BorrowMyBookshelf;
USE BorrowMyBookshelf;

CREATE TABLE users(
user_id INT auto_increment PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password_hash VARCHAR(60) NOT NULL,
notes VARCHAR(500),
image_file_name CHAR(100) CHARACTER SET UTF8MB4,
create_date DATETIME NOT NULL, 
updated_date DATETIME
);

DESCRIBE users;

CREATE TABLE friends(
friend_id INT auto_increment PRIMARY KEY,
requester_user_id INT NOT NULL,
reciever_user_id INT NOT NULL,
foreign key(requester_user_id) REFERENCES users(user_id),
foreign key(reciever_user_id) REFERENCES users(user_id)
);

CREATE TABLE authors(
author_id INT auto_increment PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL
);

CREATE TABLE books(
book_id INT auto_increment primary key,
title VARCHAR(50),
author_id INT NOT NULL,
page_count INT,
create_date DATETIME NOT NULL,
image BLOB,
foreign key(author_id) REFERENCES
authors(author_id)
); 

CREATE TABLE genres(
genre_id INT auto_increment primary key,
genre_type VARCHAR(50) NOT NULL
);

CREATE TABLE book_genres(
book_genre_id INT auto_increment primary key,
book_id INT NOT NULL,
genre_id INT NOT NULL,
foreign key(book_id) REFERENCES books(book_id),
foreign key(genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE fav_books(
fav_book_id INT auto_increment primary key,
user_id INT NOT NULL,
book_id INT NOT NULL,
foreign key(user_id) REFERENCES users(user_id),
foreign key(book_id) REFERENCES books(book_id)
);

CREATE TABLE fav_authors(
fav_author_id INT auto_increment primary key,
user_id INT NOT NULL,
author_id INT NOT NULL,
foreign key(user_id) REFERENCES users(user_id),
foreign key(author_id) REFERENCES authors(author_id)
);

CREATE TABLE fav_genres(
fav_genre_id INT auto_increment primary key,
user_id INT NOT NULL,
genre_id INT NOT NULL,
foreign key(user_id) REFERENCES users(user_id),
foreign key(genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE reviews(
review_id INT auto_increment primary key,
user_id INT NOT NULL,
book_id INT NOT NULL,
book_format ENUM('physical' , 'eBook' , 'audio_book'),
summary VARCHAR(5000),
rating INT NOT NULL,
start_date DATETIME,
finished_date DATETIME,
create_date DATETIME NOT NULL,
updated_date DATETIME,
foreign key(user_id) REFERENCES users(user_id),
foreign key(book_id) REFERENCES books(book_id)
); 

CREATE TABLE bookshelves(
bookshelf_id INT auto_increment primary key,
user_id INT NOT NULL,
bookshelf_name VARCHAR(50) NOT NULL,
foreign key(user_id) REFERENCES users(user_id)
);

CREATE TABLE user_books(
user_book_id INT auto_increment primary key,
book_id INT NOT NULL,
borrowable BOOL NOT NULL,
book_format ENUM('hardcover', 'paperback', 'eBook', 'audio_book') NOT NULL,
user_id INT NOT NULL,
foreign key(book_id) REFERENCES books(book_id),
foreign key(user_id) REFERENCES users(user_id)
);


CREATE TABLE bookshelf_books(
bookshelf_book_id INT auto_increment primary key,
bookshelf_id INT NOT NULL,
user_book_id INT NOT NULL,
foreign key(bookshelf_id) REFERENCES bookshelves(bookshelf_id),
foreign key(user_book_id) REFERENCES user_books(user_book_id)
);

CREATE TABLE tags(
tag_id INT auto_increment primary key,
user_id INT NOT NULL,
title VARCHAR(50) NOT NULL,
foreign key(user_id) REFERENCES users(user_id)
);

CREATE TABLE book_tags(
book_tag_id INT auto_increment primary key,
user_book_id INT NOT NULL,
tag_id INT NOT NULL,
foreign key(user_book_id) REFERENCES user_books(user_book_id),
foreign key(tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE book_requests(
book_request_id INT auto_increment primary key,
user_book_id INT NOT NULL,
request_date DATETIME NOT NULL,
state ENUM('pending', 'accepted', 'denied', 'borrowed', 'returned') NOT NULL,
due_date DATETIME,
return_date DATETIME,
borrower_user_id INT NOT NULL,
foreign key(user_book_id) REFERENCES user_books(user_book_id),
foreign key(borrower_user_id) REFERENCES users(user_id)
);







