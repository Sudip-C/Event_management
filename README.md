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

> DELETE: /users/:id

URL Parameters:
id (string) - User ID

Response: Status 204 if the deletion is successful.


2. Book Endpoints
## Create a New Book

> POST: /books

Body Parameters:
title (string) - Title of the book
authorId (string) - Author ID
publishedDate (string) - Published date

Response: JSON object of the created book.


## Get All Books

> GET : /books

Response: JSON array of all books.


## Get a Book by ID
 
> GET:/books/:id

URL Parameters:
id (string) - Book ID

Response: JSON object of the book.


# Update a Book

> PUT: /books/:id

URL Parameters:
Body Parameters: Any combination of:
title (string)
authorId (string)
publishedDate (string)

Response: JSON object of the updated book.


# Delete a Book

> DELETE: /books/:id

URL Parameters:
id (string) - Book ID

Response: Status 204 if the deletion is successful.


3. Borrowing and Returning Books
# Borrow a Book
 
> POST :/books/borrow

Body Parameters:
userId (string) - User ID
bookId (string) - Book ID
dueDate (string) - Due date for returning the book
Response: JSON object of the borrowed book.


# Return a Book

> POST: /books/return

Body Parameters:
userId (string) - User ID
bookId (string) - Book ID
Response: JSON object of the returned book.


4. Audit Log Endpoints
# Get All Audit Logs

> GET: /audit-logs

Response: JSON array of all audit logs.


# Get Audit Logs by User ID

> GET: /audit-logs/user/:userId

URL Parameters:
userId (string) - User ID

Response: JSON array of audit logs for the specified user.

# Get Audit Logs by Action

> GET /audit-logs/action/:action

URL Parameters:
Action (string) - Borrow or Return

Response: JSON array of audit logs for the specified action.