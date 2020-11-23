# FANCY TO-DO
#
#
## Route
#
- Request Header
```JS
{
    Content-Type: application/json;
}
```
### POST /todos
#
##### SUCCESS
- Request Body
```JS
{
        "title": "Belajar",
        "description": "belajar Restful API",
        "status": "belum dikerjakan",
        "due_date": "2020-11-24"
    }
```
- Response
```JS
{
  "id": 7,
  "title": "Belajar",
  "description": "belajar Restful API",
  "status": "belum dikerjakan",
  "due_date": "2020-11-24",
  "updatedAt": "2020-11-23T13:23:01.564Z",
  "createdAt": "2020-11-23T13:23:01.564Z"
}
```
#
##### ERROR *`'Date must be greater than today' `*
#
- Request Body
```JS
{
        "title": "Belajar",
        "description": "belajar Restful API",
        "status": "belum dikerjakan",
        "due_date": "2020-11-23"
    }
```
- Response
``` JS
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Date must be greater than today",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-11-23",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Belajar",
                "description": "belajar Restful API",
                "status": "belum dikerjakan",
                "due_date": "2020-11-23",
                "updatedAt": "2020-11-23T13:25:56.899Z",
                "createdAt": "2020-11-23T13:25:56.899Z"
            },
            "validatorKey": "isGreaterThan",
            "validatorName": null,
            "validatorArgs": [],
            "original": {}
        }
    ]
}
```
#
#
### GET /todos
#
##### SUCCESS
- Response
```JS
{
    "data": [
        {
            "id": 3,
            "title": "Belajar",
            "description": "Belajar Restful API",
            "status": "selesai",
            "due_date": "2020-11-28",
            "createdAt": "2020-11-23T09:30:14.808Z",
            "updatedAt": "2020-11-23T10:51:09.092Z"
        },
        {
            "id": 6,
            "title": "Belajar",
            "description": "belajar Restful API",
            "status": "belum dikerjakan",
            "due_date": "2020-11-23",
            "createdAt": "2020-11-23T13:21:58.978Z",
            "updatedAt": "2020-11-23T13:21:58.978Z"
        },
        {
            "id": 7,
            "title": "Belajar",
            "description": "belajar Restful API",
            "status": "belum dikerjakan",
            "due_date": "2020-11-24",
            "createdAt": "2020-11-23T13:23:01.564Z",
            "updatedAt": "2020-11-23T13:23:01.564Z"
        },
        {
            "id": 8,
            "title": "Belajar",
            "description": "belajar Restful API",
            "status": "belum dikerjakan",
            "due_date": "2020-11-24",
            "createdAt": "2020-11-23T13:25:19.409Z",
            "updatedAt": "2020-11-23T13:25:19.409Z"
        }
    ]
}
```
#
#
### GET /todos/:id
#
##### SUCCESS
- Request Params
```
|   id   |   3   |
```
- Response
``` JS
{
    "data": {
        "id": 3,
        "title": "Belajar",
        "description": "Belajar Restful API",
        "status": "selesai",
        "due_date": "2020-11-28",
        "createdAt": "2020-11-23T09:30:14.808Z",
        "updatedAt": "2020-11-23T10:51:09.092Z"
    }
}
```
#
#
##### ERROR *`'Error Not Found'`*
#
- Request Params
```
|   id   |   1   |
```
- Response
```JS
{
    "message": "Error Not Found"
}
```
#
#
### PUT /todos/:id
#
##### SUCCESS
#
- Request Params
```
|   id   |   3   |
```
- Request Body
``` JS
{
    "title": "Study",
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": "2020-12-01"
}
```
- Response
```JS
{
    "result": [
        {
            "id": 3,
            "title": "Study",
            "description": "Studying Restful API",
            "status": "belum dikerjakan",
            "due_date": "2020-12-01",
            "createdAt": "2020-11-23T09:30:14.808Z",
            "updatedAt": "2020-11-23T13:41:14.721Z"
        }
    ]
}
```
#
##### ERROR *`'Error Not Found'`*
#
- Request Params
```
|   id   |   1   |
```
- Request Body
``` JS
{
    "title": "Study",
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": "2020-12-01"
}
```
- Response
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Sequelize Validation Error'`*
#
- Request Params
```
|   id   |   3   |
```
- Request Body
``` JS
{
    "title": null,
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": ""
}
```
- Response
```JS
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Todo.title cannot be null",
            "type": "notNull Violation",
            "path": "title",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "title": null,
                "description": "Studying Restful API",
                "status": "belum dikerjakan",
                "due_date": "",
                "updatedAt": "2020-11-23T13:48:47.896Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Date must be greater than today",
            "type": "Validation error",
            "path": "due_date",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": null,
                "description": "Studying Restful API",
                "status": "belum dikerjakan",
                "due_date": "",
                "updatedAt": "2020-11-23T13:48:47.896Z"
            },
            "validatorKey": "isGreaterThan",
            "validatorName": null,
            "validatorArgs": [],
            "original": {}
        }
    ]
}
```
#
#
### PATCH /todos/:id
#
##### SUCCESS
#
- Request Params
```
|   id   |   3   |
```
- Request Body
``` JS
{
    "status": "hampir selesai",
}
```
- Response
```JS
{
    "result": [
        {
            "id": 3,
            "title": "Study",
            "description": "Studying Restful API",
            "status": "hampir selesai",
            "due_date": "2020-12-01",
            "createdAt": "2020-11-23T09:30:14.808Z",
            "updatedAt": "2020-11-23T13:55:47.719Z"
        }
    ]
}
```
#
##### ERROR *`'Error Not Found'`*
#
- Request Params
```
|   id   |   1   |
```
- Request Body
``` JS
{
    "status": "hampir selesai",
}
```
- Response
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Sequelize Validation Error'`*
#
- Request Params
```
|   id   |   3   |
```
- Request Body
``` JS
{
    "status": "",
}
```
- Response
```JS
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation notEmpty on status failed",
            "type": "Validation error",
            "path": "status",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "status": "",
                "updatedAt": "2020-11-23T13:57:01.184Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                true
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    true
                ]
            }
        }
    ]
}
```
#
#
### DELETE /todos/:id
#
##### SUCCESS
#
- Request Params
```
|   id   |   8   |
```
- Response
```JS
{
    "message": "todo success to delete"
}
```
#
##### ERROR *`'Error Not Found'`*
#
- Request Params
```
|   id   |   1   |
```
- Response
```JS
{
    "message": "Error Not Found"
}
```
#
#
### POST /register
#
##### SUCCESS
#
- Request Body
```JS
username	User
email	    user@gmail.com
password	1234567
```
- Response
```JS
{
  "id": 2,
  "email": "user@gmail.com"
}
```
#
#
### POST /login
#
##### SUCCESS
- Request Body
```JS
email	    user@gmail.com
password	1234567
```
- Response
```JS
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTYwNjE0MDEwMn0.QG58LPRUeSf5N8lRjUKJTPSnSm9OA_E_Xzc7u6uQ5GA"
}
```
#
##### ERROR *`'Invalid Account!'`*
- Request Body
```JS
email	    user2@gmail.com
password	1234567
```
- Response
```JS
{
    "message": "Invalid account! "
}
```
#
##### ERROR *`'Invalid email / password'`*
- Request Body
```JS
email	    user@gmail.com
password	12345678
```
- Response
```JS
{
    "message": "Invalid email/password"
}
```
--------------------------------------------------------------------