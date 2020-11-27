# Fancy Todo Documentation

Fancy Todo is an application to manage your task. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response


## RESTful endpoints
### POST /login

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401)_
```
{
  "message": "InvalidEmail/Password"
}
```
---
### POST /register

> Create new user

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
_Response (400)_
```
{
  "message": "Password is required!, Password must be more than 6 character"
}
```
_Response (400)_
```
{
  "message": "Email is required!, Email must be a format sample@mail.com"
}
```
---
### GET /todos

> Get all todos

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": "<todos id>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
  }
]
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
_Response (400)_
```
{
  "message": "Invalid Email / Password"
}
```
---
### POST /todos

> Create new todos

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Due date must not exceed today, Title is required!, Description is required!, Status is required!, Due Date is Required!, Due date must be a format YYYY-MM-DD"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### PUT /todos/:id

> Update todos with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "id": "<todos id>",
  "title": "<todos previous title>",
  "description": "<todos previous description>"
  "status": "<todos previous status>",
  "due_date": "<todos previous due_date>"
}
```
_Response (200)_
```
{
  "id": <todos id>,
  "title": "<todos updated title>",
  "description": "<todos updated description>",
  "status": "<ptodos updated status>",
  "due_date": "<todos updated due_date>"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Due date must not exceed today, Title is required!, Description is required!, Status is required!, Due Date is Required!, Due date must be a format YYYY-MM-DD"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "errors": "Error not found!"
}
```
---
### GET /todos/:id

> Get todos with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your account access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": "<todos id by request>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
  }
]
```
_Response (404 - Not Found)_
```
{
  "errors": "Error not found!"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### PATCH /todos/:id

> Update todos status with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "status": "<todos previous status>",
}
```
_Response (200)_
```
{
  "id": <todos id>,
  "title": "<todos previous title>",
  "description": "<todos previous description>",
  "status": "<todos updated status>",
  "due_date": "<todos previous due_date>"
}
```
_Response (404 - Not Found)_
```
{
  "errors": "Error not found!"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### DELETE /todos/:id

> Delete todos with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Todo's ID
```
_Response (200)_
```
{
  "Task Deleted Successfully"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "errors": "Error not found!"
}
```
---