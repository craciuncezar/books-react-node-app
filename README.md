## Book Club - Your reading companion

An web application that keeps record of your books and help you discover others.

## Instalation

To run the app you need to have MySQL and NodeJS installed and the database configured.
Run the server using the command line: "npm run start"

## Implementation

The website design will be responsive using Bootstrap4 Framework.

Clientside will be build using ReactJS, while the backend will be build with NodeJS and Express Framework using an MySQL database.

It will have a navbar which separates the site in 3 areas:

- My Books which will hold the user created lists.

- Discover which will let you see awarded books and bestsellers.

- Search which will let you search a specific book by name.

The access to those areas will be granted after an authentication. The authetication system will be based on an json web token.

The data about about books and authors will be gathered using goodreads and google books web api. The user created lists will be stored in a relational database.

# Database Structure

Users have many booklists. And booklist and books relationship is m2m saved in a another relation table booklist_book.

## Book

| Field       | Type         | Null | Key | Default | Extra          |
| ----------- | ------------ | ---- | --- | ------- | -------------- |
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
| --------- | ------------ | ---- | --- | ------- | -------------- |
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| username  | varchar(255) | NO   |     | NULL    |                |
| password  | varchar(255) | NO   |     | NULL    |                |
| email     | varchar(255) | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |

## BookLists

| Field       | Type         | Null | Key | Default              | Extra          |
| ----------- | ------------ | ---- | --- | -------------------- | -------------- |
| id          | int(11)      | NO   | PRI | NULL                 | auto_increment |
| name        | varchar(255) | NO   |     | NULL                 |                |
| description | varchar(255) | YES  |     | No description given |                |
| createdAt   | datetime     | NO   |     | NULL                 |                |
| updatedAt   | datetime     | NO   |     | NULL                 |                |
| userId      | int(11)      | YES  | MUL | NULL                 |                |

# Booklist_book

| Field      | Type     | Null | Key | Default | Extra |
| ---------- | -------- | ---- | --- | ------- | ----- |
| createdAt  | datetime | NO   |     | NULL    |       |
| updatedAt  | datetime | NO   |     | NULL    |       |
| bookListId | int(11)  | NO   | PRI | NULL    |       |
| bookId     | int(11)  | NO   | PRI | NULL    |       |

# Restful Api calls

##### /users/register

Post method to add a new user

##### /users/login

Post method to authenticate a user. Return jwt if data is good.

#### Below request requieres an authorization header containing the jwt token

##### /bookLists

Get all the booksList from a specific user logged in

##### /bookLists

Post a bookList

##### /bookLists/:booklistid

Put method to change a booklist

##### /bookListss/:booklistid

Delete a booklist

##### /books/:booklistid

Post a book to a booklist

##### /books/:booklistid

Get books from a booklist

##### /books/:booklistid/:bookid

Delete a book from a booklist
