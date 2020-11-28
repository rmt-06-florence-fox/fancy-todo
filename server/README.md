### GET /todos

> Get all todos

_Request Header_
{
  "access_token": "<your access token>"
}

_Request Body_
not needed

_Response (200)_
[   
  {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  }
]
_Response (400 - Bad Request)_
{
    "status": 400,
    "message": "Failed to decode param '%'"
}
---
### GET /todos/:id

> Get todos by id

_Request Header_

{
  "access_token": "<your access token>"
}
_Request Body_

not needed
_Response (200)_

[
  {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  }
]
_Response (400 - Bad Request)_

{
  "error": "Invalid request"
}
``````