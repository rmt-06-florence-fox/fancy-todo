# fancy-todo

```
Aplikasi untuk menyimpan list todo!!
```

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### POST/REGISTER

>regiseter

_Request Body_
```
{
    "email": "user email",
    "password": "user password"
}
```
_Response (201)_
```


{
    id:  'user id',
    email: 'user email'
}
```

_Response(401)_
```
{
    "message": "email must be unique"
}
```



### POST/login

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
_Response(401)_
```
{
    message: "Invalid"
}
```

_Response(500)_
```
{
    "message": "internal server error"
}
```

### POST/googlelogin

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

### POST/todos/

>create

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
    tittle:"tittle",
    description: "description,"
    due_date: "due_date",
}
```
_Response(201)_
```
{
  tittle: "tittle",
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
### GET/todos/

>fetch todo list

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

### GET/todos/:id

>fetch to do by id

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

### PUT/todo/:id

>edit  todo

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

### PATCh/todos/:id

>Update status

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
_Response(404)_
```
{
   message: 'Id not found'
}
```
_Response(500)_
```
{
  "message": "internal server error"
}
```

### DELETE/todos/:id

>Delete a todo

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



_Response (404)_
```
{
  "message": "Id not found"
}
```