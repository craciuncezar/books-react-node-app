# Web Technologies Project:
![Alt text](https://bitbucket.org/craciuncezar/web-tech/raw/master/prtscreen.png)


##Book Club - Your reading companion
An web application that keeps record of your books and help you discover others.

### Features

* Keep your reading list organized. Books will be separated in a wishlist, a owned books list and a finished books list.

* Discover bestsellers and awarded books or search your favorite author to find his new books.

* See others reviews and decide what to read next.

## Implementation

The website design will be responsive using Bootstrap4 framework. 

It will have a navbar which separates the site in 3 areas:

* My Books which will hold the user created lists.

* Discover which will let you search books or see awarded books and bestsellers.

* Recomandations which will give recomandations based on your reading lists

The access to those areas will be granted after an authentification.

The data about about books, authors and reviews will be gathered using goodreads web api. The user created lists will be stored in a relational database.

# Database Structure

Users have many booklists. And booklist and books relationship is m2m saved in a another relation table booklist_book.

## Book
| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255) | NO   |     | NULL    |                |
| author      | varchar(255) | NO   |     | NULL    |                |
| publishDate | datetime     | NO   |     | NULL    |                |
| description | varchar(255) | NO   |     | NULL    |                |
| imgUrl      | varchar(255) | NO   |     | NULL    |                |
| createdAt   | datetime     | NO   |     | NULL    |                |
| updatedAt   | datetime     | NO   |     | NULL    |                |

## Users

| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| username  | varchar(255) | NO   |     | NULL    |                |
| password  | varchar(255) | NO   |     | NULL    |                |
| email     | varchar(255) | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |

## BookLists

| Field       | Type         | Null | Key | Default              | Extra          |
|-------------|--------------|------|-----|----------------------|----------------|
| id          | int(11)      | NO   | PRI | NULL                 | auto_increment |
| name        | varchar(255) | NO   |     | NULL                 |                |
| description | varchar(255) | YES  |     | No description given |                |
| createdAt   | datetime     | NO   |     | NULL                 |                |
| updatedAt   | datetime     | NO   |     | NULL                 |                |
| userId      | int(11)      | YES  | MUL | NULL                 |                |

# Booklist_book

| Field      | Type     | Null | Key | Default | Extra |
|------------|----------|------|-----|---------|-------|
| createdAt  | datetime | NO   |     | NULL    |       |
| updatedAt  | datetime | NO   |     | NULL    |       |
| bookListId | int(11)  | NO   | PRI | NULL    |       |
| bookId     | int(11)  | NO   | PRI | NULL    |       |

# Restful Api calls
##### /signup
Post method to add a new user
##### /authentication
Post method to authenticate a user. Return user id if data is good.
##### /changePassword
Put method to change the user password.
##### /bookList/:userid
Get all the booksList from a specific user 
##### /bookList/:userid
Post a bookList to a user
##### /bookList/:booklistid
Put method to change a booklist
##### /bookLists/:booklistid
Delete a booklist
##### /book/:booklistid
Post a book to a booklist
##### /books/:booklistid
Get books from a booklist
##### /book/:booklistid/:bookid
Delete a book from a booklist