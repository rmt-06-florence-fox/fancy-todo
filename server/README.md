# fancy-todo App Server

Fancy todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new User

_Request Header_
```
not needed
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
  "name": "<name to get insert into>",
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"

}
```

_Response (201)_
```
{
    "id": 5,
    "email": "on2@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "input correct email",
        "Password is required"
    ]
}
```
---
### POST /login

> Create token for user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - Success)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid account"
}

OR

{
    "message": "Invalid email/password"
}
```

---
### POST /todos

> Create todo data

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required : 
- title = [string]
- due_date = [date which greater than today]

{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": 7,
    "title": "membaca berita",
    "description": "explore",
    "status": "uncomplete",
    "due_date": "2020-11-29T00:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-11-24T13:27:24.197Z",
    "createdAt": "2020-11-24T13:27:24.197Z"
}
```

_Response (400 - Bad request)_
```
{
    "message": [
        "Title is required",
        "Date must be greater than today"
    ]
}
```

---
### GET /todos

> Get all todos data of user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 2,
        "title": "belajar js",
        "description": "explore",
        "status": "uncomplete",
        "due_date": "2020-11-28T00:00:00.000Z",
        "createdAt": "2020-11-24T08:54:37.211Z",
        "updatedAt": "2020-11-24T08:54:37.211Z",
        "UserId": 1
    },
    {
        "id": 6,
        "title": "melukis",
        "description": "explore",
        "status": "uncomplete",
        "due_date": "2020-11-29T00:00:00.000Z",
        "createdAt": "2020-11-24T13:27:08.195Z",
        "updatedAt": "2020-11-24T13:27:08.195Z",
        "UserId": 1
    },
    {
        "id": 7,
        "title": "membaca berita",
        "description": "explore",
        "status": "uncomplete",
        "due_date": "2020-11-29T00:00:00.000Z",
        "createdAt": "2020-11-24T13:27:24.197Z",
        "updatedAt": "2020-11-24T13:27:24.197Z",
        "UserId": 1
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /todos/:id

> Get todos based on its id data of user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:
- id = [integer]
```

_Response (200 - Success)_
```
{
    "id": 2,
    "title": "belajar js",
    "description": "explore",
    "status": "uncomplete",
    "due_date": "2020-11-28T00:00:00.000Z",
    "createdAt": "2020-11-24T08:54:37.211Z",
    "updatedAt": "2020-11-24T08:54:37.211Z",
    "UserId": 1
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized"
}
```

---
### PUT /todos/:id

> Update one todos data

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
- title = [string]
- due_date = [date which greater than today]

{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "id": 2,
    "title": "review vue",
    "description": "coba-coba",
    "status": "progress",
    "due_date": "2020-11-29T00:00:00.000Z",
    "createdAt": "2020-11-24T08:54:37.211Z",
    "updatedAt": "2020-11-24T13:50:38.022Z",
    "UserId": 1
}
```

_Response (400 - Bad request)_
```
{
    "message": [
        "Title is required"
    ]
}
```
OR
_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### PATCH /todos/:id

> Update one or more property of todos data

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
- status = [string]

{
  "status": "<status to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "id": 2,
    "title": "review vue",
    "description": "coba-coba",
    "status": "complete",
    "due_date": "2020-11-29T00:00:00.000Z",
    "createdAt": "2020-11-24T08:54:37.211Z",
    "updatedAt": "2020-11-24T13:54:45.131Z",
    "UserId": 1
}
```

_Response (400 - Bad request)_
```
{
    "message": [
        "Only allow alphanumeric"
    ]
}
```
OR
_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /todos/:id

> Delete one todos data

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
```

_Response (200 - Success)_
```
{
    "message": "todo success to delete"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized"
}
```
OR

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /todos/news

> Get new from 3rd party api- the guardian

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

_Response (200 - Success)_
```
[
    {
        "title": "Australian Open delay 'likely' outcome of government talks with Tennis Australia",
        "url": "https://www.theguardian.com/sport/2020/nov/25/australian-open-likely-to-be-delayed"
    },
    {
        "title": "South Australia records no new Covid cases; Queensland opens border to Victoria – live news",
        "url": "https://www.theguardian.com/australia-news/live/2020/nov/25/nsw-coronavirus-restrictions-queensland-border-opening-south-australia-victoria-cluster-cases-live-news"
    },
    .
    .
    .
]
```

_Response (500 - Internal server error)_
{
    "message": "Internal server error"
}
```