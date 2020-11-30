# fancy-todo
Fancy Todo App is a database for todos

** RESTful Endpoints **
----
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

** POST Todo **
----
    Write a new Todo data to database

** URL **
----
`http://localhost:3000/todos/`

** Method: **
----
`POST`

** Header: **
----
`access token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlmbXJAZ21haWwuY29tIiwiaWF0IjoxNjA2Mjg2MTYxfQ.B3k9TGGwy-y12hE1C9pYnobktmS3KiBl0DPPNit6ZEc

**  Result:  ** 
---
{
    "id": 14,
    "title": "tesasd",
    "description": "testing validate",
    "status": "Not Done Yet",
    "due_date": "2020-11-29",
    "UserId": 1,
    "updatedAt": "2020-11-28T10:52:18.439Z",
    "createdAt": "2020-11-28T10:52:18.439Z",
    "status": "Not Done Yet"
}
** Get Todo **
----
    Write a new Todo data to database

** URL **
----
`http://localhost:3000/todos/`

** Method: **
----
`Get`

** Header: **
----
`access token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlmbXJAZ21haWwuY29tIiwiaWF0IjoxNjA2Mjg2MTYxfQ.B3k9TGGwy-y12hE1C9pYnobktmS3KiBl0DPPNit6ZEc

**  Result:  ** 
---
[
    {
        "id": 1,
        "title": "Makan",
        "description": "Makan Indomie",
        "status": "Not Done Yet",
        "due_date": "2020-11-24",
        "UserId": 1,
        "createdAt": "2020-11-23T11:01:44.574Z",
        "updatedAt": "2020-11-23T11:01:44.574Z"
    },
    {
        "id": 5,
        "title": "Mandi",
        "description": "mandi biar wangi",
        "status": "Not Done Yet",
        "due_date": "2020-11-27",
        "UserId": 1,
        "createdAt": "2020-11-25T20:37:33.731Z",
        "updatedAt": "2020-11-25T20:37:33.731Z"
    },
    {
        "id": 14,
        "title": "tesasd",
        "description": "testing validate",
        "status": "Not Done Yet",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T10:52:18.439Z",
        "updatedAt": "2020-11-28T10:52:18.439Z"
    }
]

** Get Todo By Id**
----
    Write a new Todo data to database

** URL **
----
`http://localhost:3000/todos/:id`

** Method: **
----
`Get`

** Header: **
----
`access token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlmbXJAZ21haWwuY29tIiwiaWF0IjoxNjA2Mjg2MTYxfQ.B3k9TGGwy-y12hE1C9pYnobktmS3KiBl0DPPNit6ZEc

**  Result:  ** 
---
{
    "id": 1,
    "title": "Makan",
    "description": "Makan Indomie",
    "status": "belum",
    "due_date": "2020-11-24",
    "UserId": 1,
    "createdAt": "2020-11-23T11:01:44.574Z",
    "updatedAt": "2020-11-23T11:01:44.574Z"
}

** Put Todo**
----
    Write a new Todo data to database

** URL **
----
`http://localhost:3000/todos/:id`

** Method: **
----
`Put`

** Header: **
----
`access token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlmbXJAZ21haWwuY29tIiwiaWF0IjoxNjA2Mjg2MTYxfQ.B3k9TGGwy-y12hE1C9pYnobktmS3KiBl0DPPNit6ZEc

**  Result:  ** 
---
[
    {
        "id": 1,
        "title": "abisput",
        "description": "abisput",
        "status": "Not Done Yet",
        "due_date": "2020-11-28",
        "UserId": 1,
        "createdAt": "2020-11-23T11:01:44.574Z",
        "updatedAt": "2020-11-28T10:55:59.787Z"
    }
]

** Delete Todo**
----
    Write a new Todo data to database

** URL **
----
`http://localhost:3000/todos/:id`

** Method: **
----
`Delete`

** Header: **
----
`access token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlmbXJAZ21haWwuY29tIiwiaWF0IjoxNjA2Mjg2MTYxfQ.B3k9TGGwy-y12hE1C9pYnobktmS3KiBl0DPPNit6ZEc

**  Result:  ** 
---
{
    "message": "todo success to delete"
}