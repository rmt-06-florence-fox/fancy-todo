# TODO APP

##Restful endpoints

# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### POST/signUp
>Create New User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<User's name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201 - Created)_
```
{
    "id": 3,
    "email": "nanana@gmail.com"
}
```

_Response(400 - Bad Request)_
```
{
    "message": "Name Is Mandatory!, Please check again your email!, Password Is Mandatory!, 
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

### POST/signIn
>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200 - OK)_
```
{
  "access_token": "<your access token>"
}
```

_Response(400 - Bad Request)_
```
{
    "message": "Invalid Email/Password"
}
```

_Response(404- Not Found)_
```
{
    "message": "Invalid Account!"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

### POST/google-sign-in

>Google Signin User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```


_Response (500 - Internal server error)_
```
{
    "message": "Error undescribable"
}
```

### GET/todos
> Get user todos

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

_Response(200 - OK)_
```
[
    {
        "id": 1,
        "title": "Belajar Coding",
        "description": "rest api",
        "status": false,
        "due_date": "2020-11-25",
        "UserId": 3,
        "createdAt": "2020-11-24T09:57:15.163Z",
        "updatedAt": "2020-11-25T09:15:01.834Z"
    }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (500 - Internal server error)_
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```

### POST/todos
>Create todos

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "Belajar Musik",
    "description": "Olah Vocal",
    "due_date": "11/30/2020"
}
```

_Response(200 - OK)_
```
[
    {
        "id": 33,
        "title": "Belajar Musik",
        "description": "Olah Vocal",
        "due_date": "2020-11-30",
        "UserId": 3,
        "updatedAt": "2020-11-28T10:12:22.733Z",
        "createdAt": "2020-11-28T10:12:22.733Z",
        "status": false
    }
]
```

_Response(400 - Bad Request)_
```
{
    "message": "Title Cannot Be Empty!, Description Cannot Be Empty!, Due Date must be greater than today!"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (500 - Internal server error)_
```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```

### GET/todos/:id
> GET todos by id

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

_Response(200 - OK)_
```
[
    {
        "id": 32,
        "title": "Belajar Mancing",
        "description": "buat shooting mancing mania mantap",
        "status": false,
        "due_date": "2020-11-30",
        "UserId": 3,
        "createdAt": "2020-11-27T17:37:33.565Z",
        "updatedAt": "2020-11-27T17:37:33.565Z"
    }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized to access!, Please login first"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found!"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

### PUT/todos/:id
>Put data todos

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "Belajar Mancing Keributan",
    "description": "buat shooting mancing mania netflix mantap",
    "status": false,
    "due_date": "2020-11-30",
}
```

_Response(200 - OK)_
```
{
    "id": 32,
    "title": "Belajar Mancing Keributan",
    "description": "buat shooting mancing mania netflix mantap",
    "status": false,
    "due_date": "2020-11-30",
    "UserId": 3,
    "createdAt": "2020-11-27T17:37:33.565Z",
    "updatedAt": "2020-11-27T17:37:33.565Z"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Title Cannot Be Empty!, Description Cannot Be Empty!, Validation notEmpty on due_date failed"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized to access!, Please login first"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

### PATCH/todos/:id
>Patch status Todo

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "status": true
}
```

_Response(200 - OK)_
```
{
    "id": 32,
    "title": "Belajar Mancing Keributan",
    "description": "buat shooting mancing mania netflix mantap",
    "status": true,
    "due_date": "2020-11-30",
    "UserId": 3,
    "createdAt": "2020-11-27T17:37:33.565Z",
    "updatedAt": "2020-11-27T17:37:33.565Z"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found!"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

### DELETE/todos/:id
> Delete todo

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

_Response(200 - OK)_
```
{
    "message": "Todo Success to Delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found!"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized to access!"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```