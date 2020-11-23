# Fancy Todo - API Documentation by normnd.akbr
Fancy Todo App is an application to manage your to do list. This app has :
* RESTful endpoint for login and register operation 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful Login & Register Endpoints
### POST /register

> Register a new user

_Request Body_
```
{
    email: "user@mail.com",
    password: "12345"
}
```

_Response (201)_
```
{
    message: "User successfully registered",
    {
        id: "1",
        email: "user@mail.com",
    }
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### POST /login

> login to application

_Request Body_
```
{
    email: "user@mail.com",
    password: "12345"
}
```

_Response (200)_
```
{
    message: "User Logged in!",
    {
        email: "user@mail.com",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
    }
}
```
_Response (404)_
```
{
    message: "Invalid Username/Password!"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```
&nbsp;

## RESTful CRUD Endpoints
### GET /todos

> Get all user's todo list

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Response (200)_
```
[
    {
        id: "1",
        title: "Core Gundam's Head Unit",
        description: "Build Core Gundam's Head Unit",
        status: "On-Going",
        due_date: "2020-11-28T18:25:43-05:00",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    },
    {
        id: "2",
        title: "Core Gundam's Body Unit",
        description: "Build Core Gundam's Body Unit",
        status: "On-Going",
        due_date: "2020-11-28T18:25:43-05:00",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    },
    {
        id: "1",
        title: "Core Gundam's Waist Unit",
        description: "Build Core Gundam's Waist Unit"
        status: "On-Going",
        due_date: "2020-11-28T18:25:43-05:00",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### POST /todos

> Create new Todo

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Body_
```
{
    title: "Core Gundam's Hand Unit L/R",
    description: "Build Core Gundam's Hand UnitL/R",
    status: "On-Going",
    due_date: "2020-11-28T18:25:43-05:00"
}
```

_Response (201)_
```
[
    {
        id: "4",
        title: "Core Gundam's Hand Unit L/R",
        description: "Build Core Gundam's Hand UnitL/R",
        status: "On-Going",
        due_date: "2020-11-28T18:25:43-05:00",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### PUT /todos/:id

> Edit selected Todo data

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "4"
}
```

_Request Body_
```
{
    title: "Core Gundam's Hand Unit L & R",
    description: "Build Core Gundam's Hand Unit L & R",
    status: "On-Going",
    due_date: "2020-11-28T18:25:43-05:00"
}
```

_Response (201)_
```
[
    {
        id: "4",
        title: "Core Gundam's Hand Unit Left & Right",
        description: "Build Core Gundam's Hand Unit Left and Right",
        status: "On-Going",
        due_date: "2020-11-28T18:25:43-05:00",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### PATCH /todos/:id

> Update/edit todo status in a todo-task by todo.id

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "1"
}
```

_Request Body_
```
{
    status: "Done"
}
```

_Response (201)_
```
{
    id: "4",
    title: "Core Gundam's Hand Unit Left & Right",
    description: "Build Core Gundam's Hand Unit Left and Right",
    status: "Done",
    due_date: "2020-11-28T18:25:43-05:00",
    createdAt: "2020-11-28T18:25:43-05:00",
    updatedAt: "2020-11-28T18:25:43-05:00"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### DELETE /todos/:id

> Remove selected todo

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Response (200)_
```
{
    message: "Todo deleted Successfully",
    true
}
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

