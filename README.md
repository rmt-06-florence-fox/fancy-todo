# FANCY TO-DO
### This application to keep your todo list
#
## Route
#
### POST /todos

- Request Headers
```JS
{
    access_token = token
}
```
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

- Response *200*
```JS
{
  "id": 1,
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

- Request Body
```JS
{
    "title": "Belajar",
    "description": "belajar Restful API",
    "status": "belum dikerjakan",
    "due_date": "2020-11-23"
}
```
- Response *400*
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
##### ERROR *`'Internal Server Error'`*

- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```

#
### GET /todos

- Request Headers
```JS
{
    access_token = token
}
```

##### SUCCESS
- Response *200*
```JS
{
    "data": [
        {
            "id": 1,
            "title": "Belajar",
            "description": "Belajar Restful API",
            "status": "selesai",
            "due_date": "2020-11-28",
            "createdAt": "2020-11-23T09:30:14.808Z",
            "updatedAt": "2020-11-23T10:51:09.092Z"
        },
        .
        .
        .

    ]
}
```
#
##### ERROR *`'Internal Server Error'`*

- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### GET /todos/:id

- Request Headers
```JS
{
    access_token = token
}
```
- Request Params
```
    id = [integer]
```
##### SUCCESS
- Response *200*
``` JS
{
    "data": {
        "id": 1,
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
##### ERROR *`'Error Not Found'`*
- Response *404*
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### PUT /todos/:id
- Request Headers
```JS
{
    access_token = token
}
```
- Request Params
```
    id = [integer]
```
##### SUCCESS

- Request Body
``` JS
{
    "title": "Study",
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": "2020-12-01"
}
```
- Response *200*
```JS
{
    "result": [
        {
            "id": 1,
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
- Request Body
``` JS
{
    "title": "Study",
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": "2020-12-01"
}
```
- Response *404*
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Sequelize Validation Error'`*

- Request Body
``` JS
{
    "title": null,
    "description": "Studying Restful API",
    "status": "belum dikerjakan",
    "due_date": ""
}
```
- Response *400*
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
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### PATCH /todos/:id
- Request Headers
```JS
{
    access_token = token
}
```
- Request Params
```
    id = [integer]
```
- Request Body
``` JS
{
    "status": "hampir selesai",
}
```
##### SUCCESS

- Response *200*
```JS
{
    "result": [
        {
            "id": 1,
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

- Response *404*
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Sequelize Validation Error'`*
#
- Request Body
``` JS
{
    "status": "",
}
```
- Response *400*
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
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### DELETE /todos/:id
- Request Headers
```JS
{
    access_token = token
}
```
- Request Params
```
    id = [integer]
```
##### SUCCESS
- Response *200*
```JS
{
    "message": "todo success to delete"
}
```
#
##### ERROR *`'Error Not Found'`*
- Response
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### POST /register

##### SUCCESS
- Request Body
```JS
username	User
email	    user@gmail.com
password	1234567
```
- Response *200*
```JS
{
  "id": 2,
  "email": "user@gmail.com"
}
```
#
##### ERROR *`'Validation Error'`*
- Request Body
```JS
username	""
email	    ""
password	""
```
- Response *404*
```JS
{
    "messages": [
        {
            "message": "Username can't be empty"
        },
        {
            "message": "Email is required!"
        },
        {
            "message": "Email must be a format sample@mail.com"
        },
        {
            "message": "Password is required!"
        },
        {
            "message": "Password must be more than 6 character"
        }
    ]
}
```
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### POST /login 
- Request Body
```JS
email	    user@gmail.com
password	1234567
```
##### SUCCESS
- Response *200*
```JS
{
  "accessToken": "access token"
}
```
#
##### ERROR *`'Invalid Account!'`*
- Request Body
```JS
email	    user2@gmail.com
password	1234567
```
- Response *400*
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
- Response *400*
```JS
{
    "message": "Invalid email/password"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### GET /restaurants
##### SUCCESS 
- Response *200*
```JS
{
    "data": [
        {
            "restaurant": {
                "R": {
                    "res_id": 18460102,
                    "is_grocery_store": false,
                    "has_menu_status": {
                        "delivery": -1,
                        "takeaway": -1
                    }
                },
                ...
            }
        }
    ]
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### GET /quotes
- Response *200*
```JS
{
    "result": {
        "statusCode": 200,
        "message": "All quotes",
        "totalPages": 26032,
        "currentPage": "55",
        "quotes": [
            ...
        ]
    }
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#
### POST /googleLogin
> login with google account
- Request Body
```JS
{
    googleToken = "user google token"
}
```
##### SUCCESS 
- Response *200*
```JS
{
    "accessToken" : 'access token'
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *500*
```JS
{
    "message": 'Internal Server Error'
}
```
#