# fancy-todo

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
    "title": "todo 1",
    "description": "styling",
    "status": "progress",
    "due_date": "2020-12-24"
}
```
- Response *200*
```JS
{
  "id": 1,
  "title": "Belajar",
  "description": "belajar Restful API",
  "status": "belum dikerjakan",
  "due_date": "2020-12-24",
  "updatedAt": "2020-12-17T16:23:01.564Z",
  "createdAt": "2020-12-17T16:23:01.564Z"
}
```
#
##### ERROR *`'Validation Error' `*
- Request Body
```JS
{
    "title": "",
    "description": "coding",
    "status": "preparing",
    "due_date": "2020-12-23"
}
```
- Response *400*
``` JS
{
    "messages": [
        {
            "message": "Title empty"
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
            "title": "todo 2",
            "description": "server",
            "status": "progress",
            "due_date": "2020-12-28",
            "createdAt": "2020-12-17T16:30:14.808Z",
            "updatedAt": "2020-12-17T16:51:09.092Z"
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
    {
        "id": 1,
        "title": "todo 2",
        "description": "server",
        "status": "progress",
        "due_date": "2020-12-28",
        "createdAt": "2020-12-17T16:30:14.808Z",
        "updatedAt": "2020-12-17T16:51:09.092Z"
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
    "title": "todo 1",
    "description": "styling",
    "status": "progress",
    "due_date": "2020-12-28"
}
```
- Response *200*
```JS
{
    "result": [
        {
            "id": 1,
            "title": "todo 1",
            "description": "frontend",
            "status": "progress",
            "due_date": "2020-12-28",
            "createdAt": "2020-12-17T16:30:14.808Z",
            "updatedAt": "2020-12-17T16:51:26.721Z"
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
    "title": "todo 1",
    "description": "styling",
    "status": "progress",
    "due_date": "2020-12-28"
}
```
- Response *404*
```JS
{
    "message": "Error Not Found"
}
```
#
##### ERROR *`'Validation Error'`*
- Request Body
``` JS
{
    "title": null,
     "title": "todo 1",
    "description": "styling",
    "status": "progress",
    "due_date": ""
}
```
- Response *400*
```JS
{
    "messages": [
        {
            "message": "Due Date empty"
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
    "status": "done",
}
```
##### SUCCESS
- Response *200*
```JS
{
    "result": [
        {
            "id": 1,
            "title": "todo 1",
            "description": "frontend",
            "status": "done",
            "due_date": "2020-12-28",
            "createdAt": "2020-12-17T16:30:14.808Z",
            "updatedAt": "2020-12-17T16:51:26.721Z"
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
##### ERROR *`'Validation Error'`*
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
    "message": "Status empty"
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
username	'username'
email	    'user email'
password	'user password'
```
- Response *200*
```JS
{
    "id": "user id",
    "email": "user email"
}
```
#
##### ERROR *`'Validation Error'`*
- Request Body
```JS
email:    ""
password:	""
```
- Response *404*
```JS
{
    "messages": [
        {
            "message": "Email empty"
        },
        {
            "message": "Password empty"
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
email	    'user email'
password	'user password'
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
Response *400*
```JS
{
    "message": "Invalid account! "
}
```
#
##### ERROR *`'Invalid email / password'`*
Response *400*
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