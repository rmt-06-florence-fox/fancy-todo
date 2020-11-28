# fancy-todo
**documentation**
https://documenter.getpostman.com/view/13588744/TVev6R86

# fancy Todo Documentation 

- ## Google Login Oauth 
- ----
 - **URL**
  > http://localhost:3000/googleLogIn
 - **Mehtod**
 **(POST)**
 - **Data** 
 > Google token (require)

 - **Success Response**
  > **code:** 200 
   **content:** 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozMCwiZW1haWwiOiJoYWZpc3RhZnNhbmk5MTV1aEBnbWFpbC5jb20ifSwiaWF0IjoxNjA2NTMwMjA1fQ._9U6wMG1qO5Y4oO7Yirj73DMxGRQ1XS7iwzl7iw6vTM
```
 - **error Response**
 * code : 500 <br />
 * content : 
 ```
 internal server eror
 ```
 - ## Register New Account 
- ----
 - **URL**
 > http://localhost:3000/signUp
 - **Mehtod**
 > POST
 - **Data** 
 
 > **Required**
name = [string]
email = [email] [unique]
password = [string]

 - **Success Response**
 - * code : 201 
 -  * response
 ```
 {
    "id": 32,
    "name": "hafis tafsani",
    "email": "hafistafsani@mail.com",
    "password": "$2a$10$tuV2Tg35VnT849uvu5hEUeVVfG6CpFLYVxJnguP8hvEJMh6hRNMOC",
    "updatedAt": "2020-11-28T02:33:47.185Z",
    "createdAt": "2020-11-28T02:33:47.185Z"
}
 ```
 - **error Response**
 - * code : 400
 - * response : 
 ```
 {
    "message": "email must be unique"
}
 ```
 - * code : 400
 - * response : 
```
{
    "message": [
        "Validation error: please insert your name,",
        "Validation error: please insert your email,",
        "Validation error: please insert your password"
    ]
}
```
 - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
- ## Login with account 
- ----
 - **URL**
 >http://localhost:3000/signUp
 - **Mehtod**
 > POST
 - **Params**
 > **Require**
name : [string]
password : [string]
 
 - **Success Response**
 - * code : 200
 - * response : 
 ```
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJjb2JhMSIsImlkIjoxLCJlbWFpbCI6ImNvYmFAbWFpbC5jb20ifSwiaWF0IjoxNjA2MTc4NjA2fQ.s3xAcp4eEcg1juKvwW9VsLMNTXLkSLxOM4qWDUJVotw"
 ```
 
 - **error Response**
 - * code : 400
 - * response :
 ```
 {
    "error": "Invalid email/password"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 ## Get All User Todos 
- ----
 - **URL**
 >http://localhost:3000/todos
 - **Mehtod**
 > GET
 - **Success Response**
 - * code : 200
 - * response : 
 ```
[
    {
        "id": 12,
        "title": "Learn rest API edit lagi",
        "description": "edit desc",
        "due_date": "2020-12-29",
        "status": "suucess",
        "UserId": 1,
        "createdAt": "2020-11-24T05:05:35.697Z",
        "updatedAt": "2020-11-24T05:23:19.513Z"
    },
    {
        "id": 13,
        "title": "Learn Rest API ganti baru baru baru",
        "description": "Learn ho to create RESTful API with express and sequelize ganti",
        "due_date": "2020-12-29",
        "status": "ongoing ganti",
        "UserId": 1,
        "createdAt": "2020-11-24T05:27:49.703Z",
        "updatedAt": "2020-11-24T05:27:49.703Z"
    }
]
 ```
 
 - **error Response**
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 
## Add New Todo 
- ----
 - **URL**
 >http://localhost:3000/
 - **Mehtod**
 > POST
-- **Data**
>
title = [string]
description = [string]
due_date = [date]
 - **Success Response**
 - * code : 200
 - * response : 
 ```
 
{
    "id": 14,
    "title": "Learn Rest API ganti baru baru baru",
    "description": "Learn ho to create RESTful API with express and sequelize ganti",
    "due_date": "2020-12-29",
    "status": "ongoing ganti",
    "UserId": 1,
    "updatedAt": "2020-11-24T05:29:37.059Z",
    "createdAt": "2020-11-24T05:29:37.059Z"
}
 ```
 
 - **error Response**
 - * code : 400
 -  *reponse : 
 ```
 {
    "message": "Due_date must be at future date"
}
 ```
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 ## REPLACE Todo by id 
- ----
 - **URL**
 >http://localhost:3000/:id
 - **Mehtod**
 > PUT
- **params**
- id =[integer]
 - **Success Response**
 - * code : 200
 - * response : 
 ```
{
    "id": 12,
    "title": "Learn rest API edit lagi",
    "description": "edit desc",
    "due_date": "2020-12-29",
    "status": "suucess",
    "UserId": 1,
    "createdAt": "2020-11-24T05:05:35.697Z",
    "updatedAt": "2020-11-24T05:23:19.513Z"
}
 ```
 
 - **error Response**
 - * code : 404 
 - * response : 
 ```
 {
    "error": "Error Not Found"
}
 ```
 - * code : 400
 -  *reponse : 
 ```
 {
    "message": "Due_date must be at future date"
}
 ```
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
  ## Get Todo by id 
- ----
 - **URL**
 >http://localhost:3000/:id
 - **Mehtod**
 > GET
- **params**
- id =[integer]
 - **Success Response**
 - * code : 200
 - * response : 
 ```
{
    "id": 12,
    "title": "Learn rest API edit lagi",
    "description": "edit desc",
    "due_date": "2020-12-29",
    "status": "suucess",
    "UserId": 1,
    "createdAt": "2020-11-24T05:05:35.697Z",
    "updatedAt": "2020-11-24T05:23:19.513Z"
}
 ```
 
 - **error Response**
 - * code : 404 
 - * response : 
 ```
 {
    "error": "Error Not Found"
}
 ```
 - * code : 400
 -  *reponse : 
 ```
 {
    "message": "Due_date must be at future date"
}
 ```
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 
   ## Modify Todo by id 
- ----
 - **URL**
 >http://localhost:3000/:id
 - **Mehtod**
 > GET
- **params**
- id =[integer]
- **data**
 >
 status = [integer] 
 - **Success Response**
 - * code : 200
 - * response : 
 ```
{
    "id": 12,
    "title": "Learn rest API edit lagi",
    "description": "edit desc",
    "due_date": "2020-12-29",
    "status": "suucess",
    "UserId": 1,
    "createdAt": "2020-11-24T05:05:35.697Z",
    "updatedAt": "2020-11-24T05:23:19.513Z"
}
 ```
 
 - **error Response**
 - * code : 404 
 - * response : 
 ```
 {
    "error": "Error Not Found"
}
 ```
 - * code : 400
 -  *reponse : 
 ```
 {
    "message": "Due_date must be at future date"
}
 ```
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 
   ## delete Todo by id 
- ----
 - **URL**
 >http://localhost:3000/:id
 - **Mehtod**
 > DELETE

 - **Success Response**
 - * code : 200
 - * response : 
 ```
{
    "message": "Todo Success to delete"
}
 ```
 
 - **error Response**
 - * code : 404
 -  *reponse : 
 ```
{
    "error": "Error Not Found"
}
 ```
 - * code : 401
 - * response :
 ```
{
    "error": "please logIn"
}
 ```
  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 
    ## get weather
- ----
 - **URL**
 >http://localhost:3000/weather
 - **Mehtod**
 > GET
- **params**

 - **Success Response**
 - * code : 200
 - * response : 
 ```
{
   { weather: 'Clouds', location: 'Bontang', temperature: 30.26 }
}
 ```
 
 - **error Response**

  - * code : 500 
 - * response :
 ```
 {
     message : internal server eror
 }
 ```
 