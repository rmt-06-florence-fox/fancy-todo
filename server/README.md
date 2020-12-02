# Fancy-Todo-App

Fancy todo app is an application to manage your daily activity. This app has : 
* REST endpoint 
* JSON formatted response

&nbsp;

## REST endpoints
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
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"
}
```

_Response (201)_
```
{
    "id": 1,
    "email": "a@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "email must be unique"
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
    "message": "Invalid email/password"
}
```

---
### POST /googleLogin

> Create token for user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- google account
```

_Response (200 - Success)_
```
{
  "access_token": "<your access token>"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /todos

> Get your list todos

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
        "id": 15,
        "title": "akhirnya",
        "description": "gw bisa",
        "status": "uyee",
        "due_date": "2020-12-02T00:00:00.000Z",
        "createdAt": "2020-11-24T13:49:01.905Z",
        "updatedAt": "2020-11-28T09:14:41.928Z",
        "UserId": 17
    },
    ...
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```
---
### POST /todos

> post your list todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  title: <your todo title>,
  description: <your todo description>,
  status: <your todo status>,
  due_date: <your todo due date>,
}
```

_Response (200 - Success)_
```
{
    "data": {
        "id": 37,
        "title": "sholat",
        "description": "sholat cuks",
        "status": "belum dikerjakan",
        "due_date": "2020-11-29T00:00:00.000Z",
        "UserId": 17,
        "updatedAt": "2020-11-28T10:15:29.530Z",
        "createdAt": "2020-11-28T10:15:29.530Z"
    }
}
```

_Response (500 - Internal server error)_
```
{
    "msg": "Internal server error"
}
```
---
### GET /todos:id

> get your todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`
```

_Response (200 - Success)_
```
{
    "data": {
        "id": 37,
        "title": "sholat",
        "description": "sholat cuks",
        "status": "belum dikerjakan",
        "due_date": "2020-11-29T00:00:00.000Z",
        "UserId": 17,
        "updatedAt": "2020-11-28T10:15:29.530Z",
        "createdAt": "2020-11-28T10:15:29.530Z"
    }
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```
---
### PUT /todos:id

> edit your todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`

{
  title: <your todo title>,
  description: <your todo description>,
  status: <your todo status>,
  due_date: <your todo due date>,
}

```

_Response (200 - Success)_
```
{
    "data": {
        "id": 37,
        "title": "sholat",
        "description": "sholat cuks",
        "status": "belum dikerjakan",
        "due_date": "2020-11-29T00:00:00.000Z",
        "UserId": 17,
        "updatedAt": "2020-11-28T10:15:29.530Z",
        "createdAt": "2020-11-28T10:15:29.530Z"
    }
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### PATCH /todos:id

> edit your todo status

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`

{
  status: <your todo status>

}

```

_Response (200 - Success)_
```
{
    "data": {
        "id": 37,
        "title": "sholat",
        "description": "sholat cuks",
        "status": "belum dikerjakan",
        "due_date": "2020-11-29T00:00:00.000Z",
        "UserId": 17,
        "updatedAt": "2020-11-28T10:15:29.530Z",
        "createdAt": "2020-11-28T10:15:29.530Z"
    }
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /todos:id

> finished your todo 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`

```

_Response (200 - Success)_
```
{
    "message": "Todo success to delete"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /trivia

> get a question for trivia quiz

_Request Header_
```
not needed
```

_Request Body_
```
not needed

```

_Response (200 - Success)_
```
{
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which of the following created and directed the Katamari Damacy series?",
            "correct_answer": "Keita Takahashi",
            "incorrect_answers": [
                "Hideki Kamiya",
                "Shu Takumi",
                "Shinji Mikami"
            ]
        },
    ]
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```
---
