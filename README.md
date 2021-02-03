# YOUR FANCY TODO

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### POST /register

>register
_Request Body_
```
{
    "name": "user name",
    "email": "user email",
    "password": "user password"
}
```
_Response (201)_
```
{
    "id":  "user id",
    "email": "user email"
}
```

_Response(400- bad request)_
```
{

  "message": "Name can't be empty,Email can't be empty,Password can't be empty"

}
```

_Response(500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```


### POST /login

>login
_Request Body_
```
{
  "email": "user email",
  "password": "user password" 
}
```
_Response (200)_
```
{
  access_token : "access_token"
}
```
_Response(400- bad request)_
```
{

  "message": "Email can't be empty, Password can't be empty"

}

_Response(401)_
```
{
    message: "Invalid Account!"
}
```

_Response(500)_
```
{
    "message": "internal server error"
}
```


### GET /googleLogin

>login with google account
_Request Body_
```
{
  googleToken = "user google token"
}
```
_Response (200)_
```
{
  access_token : "access_token"
}
```
_Response(500)_
```
{
    "message": "internal server error"
}
```

### POST /todos

>create Todo
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
    title:"title",
    description: "description,"
    due_date: "due_date",
}
```
_Response(201)_
```
{
  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date",
  UserId: "user id"
}
```
_Response(401)_
```
{
  message: 'please login first'
}
```
_Response (500)_
```
{
  "message": "internal server error"
}
```
### GET /todos

>Show All Todo List
_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
[
     {
        "id": ,
        "tittle": ,
        "description": ,
        "status": ,
        "due_date": ,
        "UserId": ,
        "createdAt": ,
        "updatedAt": 
    },
]
```
_Response(401)_
```
{
  message: 'please login first'
}
```
_Response (500)_
```
{
  "message": "internal server error"
}
```

### GET /todos/:id

>Show Todo List by Id
_Request Header_
```
{
  access_token: token
}
```
_Request Params_
```
  id
```
_Response(200)_
```
{
  "id": ,
  "tittle": ,
  "description": ,
  "status": ,
  "due_date": ,
  "UserId": 2,
  "createdAt": ,
  "updatedAt": 
},
```
_Response(404)_
```
{
    message:'data not found'
}
```
_Response(500)_
```
{
  "message": "internal server error"
}
```

### PUT /todos/:id

>Edit Todo List by Id
_Request Header_
```
{
  access_token: token
}
```
_Request Params_
```
  id
```
_Request Body_
```
{
    tittle:"tittle",
    description: "description,"
    due_date: "due_date",
}
```

_Response(200)_
```
{
    tittle: ,
    description: ,
    status: ,
    due_date: ,
    UserId: ,
}
```
_Response(404)_
```
{
   message: 'data not found'
}
```
_Response(500)_
```
{
  "message": "internal server error"
}
```

### PATCH /todos/:id

>Update status by Id
_Request Header_
```
 access_token: token
```

_Request Body_
```
{
    status: status
}
```
_Request Params_
```
  id
```
_Response(200)_
```
{
    tittle: ,
    description: ,
    status: ,
    due_date: ,
    UserId: ,
}

```
_Response(500)_
```
{
  "message": "internal server error"
}
```

### DELETE /todos/:id

>Delete todo by Id
_Request Header_
```
 access_token: token
```
_Request Params_
```
  id
```

_Response(200)_
```
{
  message: 'todo success to delete'
}
```