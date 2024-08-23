# Library Management System API Documentation

This API provides functionality for managing books, authors, users, and audit logs in a library management system. It also allows users to borrow and return books with constraints and logs all user actions.

Base URL
### Base URL: https://event-management-pscm.onrender.com/api



1. User Endpoints
### Create a New User

> POST : /users
Body Parameters:
name (string) - User's name
email (string) - User's email
password (string) - User's password

Response: JSON object of the created user.

### Get All Users

> GET:/users
Response: JSON array of all users.

### Get a User by ID

> GET: /users/:id
URL Parameters:
id (string) - User ID
Response: JSON object of the user.


## Update a User

> Method: PUT : /users/:id
URL Parameters:
id (string) - User ID
Body Parameters: Any combination of:
name (string)
email (string)
password (string)
Response: JSON object of the updated user.


## Delete a User
### URL: /users/:id
> Method: DELETE
URL Parameters:
id (string) - User ID
Response: Status 204 if the deletion is successful.


2. Book Endpoints
## Create a New Book
### URL: /books
> Method: POST
Body Parameters:
title (string) - Title of the book
authorId (string) - Author ID
publishedDate (string) - Published date
isbn (string) - ISBN number
Response: JSON object of the created book.


## Get All Books
### URL: /books
> Method: GET
Response: JSON array of all books.


## Get a Book by ID
### URL: /books/:id
> Method: GET
URL Parameters:
id (string) - Book ID
Response: JSON object of the book.


# Update a Book
# URL: /books/:id
# Method: PUT
URL Parameters:
Body Parameters: Any combination of:
title (string)
authorId (string)
publishedDate (string)
Response: JSON object of the updated book.


# Delete a Book
# URL: /books/:id
# Method: DELETE
URL Parameters:
id (string) - Book ID
Response: Status 204 if the deletion is successful.


3. Borrowing and Returning Books
# Borrow a Book
# URL: /books/borrow
# Method: POST
Body Parameters:
userId (string) - User ID
bookId (string) - Book ID
dueDate (string) - Due date for returning the book
Response: JSON object of the borrowed book.


# Return a Book
# URL: /books/return
# Method: POST
Body Parameters:
userId (string) - User ID
bookId (string) - Book ID
Response: JSON object of the returned book.


4. Audit Log Endpoints
# Get All Audit Logs
# URL: /audit-logs
# Method: GET
Response: JSON array of all audit logs.


# Get Audit Logs by User ID
# URL: /audit-logs/user/:userId
# Method: GET
URL Parameters:
userId (string) - User ID
Response: JSON array of audit logs for the specified user.

# Get Audit Logs by Action
# URL: /audit-logs/action/:action
# Method: GET

URL Parameters:
Action (string) - Borrow or Return
Response: JSON array of audit logs for the specified action.