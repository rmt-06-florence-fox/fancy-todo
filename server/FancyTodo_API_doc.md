# FANCY TODO DOCUMENTATION

Fancy Todo is an application to manage your schedule. This app has :
- RESTful endpoint for CRUD operation
- JSON formatted response

## RESTful Endpoints 


`GET /todos`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
NONE
```
* Request Params
```
NONE
```
* Response (200)
```
[
    {
        "id": 53,
        "title": "Makan Sate Padang",
        "description": "self reward",
        "status": "Not Yet",
        "due_date": "2020-12-03T16:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T12:47:45.270Z",
        "updatedAt": "2020-11-30T12:47:45.270Z"
    },
    {
        "id": 54,
        "title": "Jogging",
        "description": "weekend",
        "status": "Not Yet",
        "due_date": "2020-12-02T16:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T12:49:05.900Z",
        "updatedAt": "2020-11-30T12:49:05.900Z"
    }
]
```
* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`POST /todos`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
- title (string)
- description (string)
- status (string)
- due_date (date)
```
* Request Params
```
NONE
```
* Response (201)
```
{
    "id": 53,
    "title": "Makan Sate Padang",
    "description": "self reward",
    "status": "Not Yet",
    "due_date": "2020-12-03T16:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-11-30T12:47:45.270Z",
    "createdAt": "2020-11-30T12:47:45.270Z"
}
```
* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`GET /todos/:id`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
NONE
```
* Request Params
```
- id 
```
* Response (201)
```
{
    "id": 53,
    "title": "Makan Sate Padang",
    "description": "self reward",
    "status": "Not Yet",
    "due_date": "2020-12-03T16:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-11-30T12:47:45.270Z",
    "createdAt": "2020-11-30T12:47:45.270Z"
}
```
* Response (404)
```
{
    "msg" : "To Do Not Found"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`PATCH /todos/:id`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
- Status (string)
```
* Request Params
```
- id 
```
* Response (200)
```
{
    "id": 53,
    "title": "Makan Sate Padang",
    "description": "self reward",
    "status": "Selesai",
    "due_date": "2020-12-03T16:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-11-30T12:47:45.270Z",
    "createdAt": "2020-11-30T12:47:45.270Z"
}
```
* Response (404)
```
{
    "msg" : "To Do Not Found on your list"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`PUT /todos/:id`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
- title (string)
- description (string)
- status (string)
- due_date (date)
```
* Request Params
```
- id 
```
* Response (200)
```
{
    "id": 53,
    "title": "Makan Sate Madura",
    "description": "Lupakan Beban",
    "status": "On going",
    "due_date": "2020-12-05T16:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-11-30T12:47:45.270Z",
    "createdAt": "2020-11-30T12:47:45.270Z"
}
```
* Response (404)
```
{
    "msg" : "To Do Not Found on your list"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`DELETE /todos/:id`
* Request Header
```
{
  "token": "<your access token>"
}
```
* Request Body
```
NONE
```
* Request Params
```
- id 
```
* Response (200)
```
{
    msg : `To do with id ${id} Success to delete`
}
```
* Response (404)
```
{
    "msg" : "To Do Not Found on your list"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`POST /register`
* Request Header
```
NONE
```

* Request Body
```
- email (string/format E-mail)
- username (string)
- password (string)
```

* Request Params
```
NONE
```

* Response (201)
```
{
    "email": "example@mail.com",
    "username": "example"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```


`POST /login`
* Request Header
```
NONE
```

* Request Body
```
- email (string/format E-mail)
- password (string)
```

* Request Params
```
NONE
```

* Response (200)
```
{
    "token": "<your access token>"
}
```

* Response (401)
```
{
    "msg" : "Invalid Account"
}
```

* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```

`POST /goolelogin`

## DEPLOY URL
