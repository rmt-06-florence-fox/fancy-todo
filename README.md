# fancy-todo

## Restful endpoints

### URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### POST /signUp

> Creating new user into database

_Request Header_
```
not needed
```

_Required Request Body_
```
{

  "username": "<user's username>",
  "email": "<user's email>",
  "password": "<user's password>"

}
```

_Example Response (201)_
```
{

  "id": 1
  "email": "reyhan@mail.com"

}
```
_Example Response (400 - Bad Request)_
```
{

  "message": "Name can't be empty, Email can't be empty, Password can't be empty"

}
```

_Response (500 - Internal Server Error)_
```
{

  "message": "Internal server error"

}
```

### POST /signIn

> User signing in to the web app 

_Request Header_
```
not needed
```

_Required Request Body_
```
{

  "email": "<user's email>",
  "password": "<user's password>"

}
```
_Response (200)_
```
{

  "accessToken": accessToken

}
```
_Example Response (400 - Bad Request)_
```
{

  "message": "Invalid email/password"

}
```

_Response (404 - Error Not Found)_
```
{

  "message": "Invalid account"

}
```

_Response (500 - Internal Server Error)_
```
{

  "message": "Internal server error"

}
```
### POST /googleSignIn

> User signin in with their gmail account to the web app

_Request Header_
```
not needed
```

_Request Body_
```
{

  "googleToken": "googleToken";

}
```

_Response (200)_
```
{

  "accessToken": accessToken

}
```


_Response (500 - Internal Server Error)_
```
{

  "message": "Internal server error"

}
```

### GET /todos

> Get all user's to-do

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Request Body_
```
not needed
```

_Example Response (200)_
```
{

  "title": "Learn RESTful API",
  "description": "Learning to know how it works",
  "status": "On Going",
  "dueDate": "30-11-2020"

}
```

_Response (500 - Internal Server Error)_
```
{

  "message": "Internal server error"

}
```


### POST /todos

> Create new user's to-do

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Example Required Request Body_
```
{

  "title": "Listening to Tame Impala",
  "description": "Learning the instrumentals on the songs",
  "status": "Pending",
  "dueDate": "01-12-2020",
  "UserId": 1

}
```

_Example Response (200)_
```
{

  "title": "Listening to Tame Impala",
  "description": "Learning the instrumentals on the songs",
  "status": "Pending",
  "dueDate": "01-12-2020"
  "UserId": 1

}
```

_Response (500 - Internal Server Error)_
```
{
  
  "message": "Internal server error"

}
```


### GET /todos/songs

> Get all top Arctic Monkeys songs from MusixMatch 3rd party API 

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Request Body_
```
not needed
```

_Example Response (200)_
```
[

  {

    "Track": "Do I Wanna Know?"

  },
  {

    "Track": "I Wanna Be Yours"

  }

]
```

_Response (500 - Internal Server Error)_
```
{
  
  "message": "Internal server error"

}
```

### GET /todos/:id

> Get user's to-do by to-do's id

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Request Body_
```
not needed
```

_Example Request Params_
```
{

  "id": 1

}
```

_Example Response (200)_
```
{

  "title": "Learn RESTful API",
  "description": "Learning to know how it works",
  "status": "Done",
  "dueDate": "30-11-2020"

}
```

_Response (401 - Unauthorized)_
```
{

  "message": "You're not belongs to this to-do"

}
```

_Response (404 - Error Not Found)_
```
{

  "message": "Error not found"

}
```

_Response (500 - Internal server error)_
```
{

  "message": "Internal server error"

}
```


### PUT /todos/:id

> Edit one row user's to-do by to-do's id

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Example Required Request Body_
```
{

  "title": "Changed",
  "description": "I want to make a better world for humans race",
  "status": "Pending",
  "dueDate": "01-01-2040"

}
```

_Example Request Params_
```
{

  "id": 1

}
```

_Example Response (200)_
```
{

  "title": "Changed",
  "description": "I want to make a better world for humans race",
  "status": "Pending",
  "dueDate": "01-01-2040",
  "UserId": 1

}
```

_Response (401 - Unauthorized)_
```
{

  "message": "You're not belongs to this to-do"

}
```

_Response (404 - Error Not Found)_
```
{

  "message": "Error not found"

}
```

_Response (500 - Internal Server Error)_
```
{
  
  "message": "Internal server error"

}
```

### PATCH /todos/:id

> Edit one column user's to-do by to-do's id

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Example Required Request Body_
```
{

  "status": "On Going"

}
```

_Example Request Params_
```
{

  "id": 1

}
```

_Example Response (200)_
```
{

  "title": "Changed",
  "description": "I want to make a better world for humans race",
  "status": "On Going",
  "dueDate": "01-01-2040",
  "UserId": 1

}
```

_Response (401 - Unauthorized)_
```
{

  "message": "You're not belongs to this to-do"

}
```

_Response (404 - Error Not Found)_
```
{

  "message": "Error not found"

}
```

_Response (500 - Internal Server Error)_
```
{
  
  "message": "Internal server error"

}
```

### DELETE /todos/:id

> Delete one of user's to-do by to-do's id

_Request Header_
```
{

  "accessToken": accessToken

}
```

_Request Body_
```
not needed
```

_Example Request Params_
```
{

  "id": 1

}
```

_Response (200)_
```
{

  "message": "Todo success to delete"

}
```

_Response (401 - Unauthorized)_
```
{

  "message": "You're not belongs to this to-do"

}
```

_Response (404 - Error Not Found)_
```
{

  "message": "Error not found"

}
```

_Response (500 - Internal Server Error)_
```
{
  
  "message": "Internal server error"

}
```