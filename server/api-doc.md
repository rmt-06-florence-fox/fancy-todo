# My-Gallery

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`




### POST /register

description: 
  register user

Request:

- data:

```json
{
  "firstName":"string",
  "lastName":"string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "firstName":"string",
  "lastName":"string",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "email must be unique",
    "email musn't empty",
    "first Name musn't empty",
    "last Name musn't empty",
    "password musn't empty",
    "email musn't null",
    "first Name musn't null",
    "last Name musn't null",
    "password musn't null"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /login

description: 
  log in user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "fullname" : "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /googleLogin

description: 
  sign in as google user

Request:

- data:

```json
{
  "idToken": "google token"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "fullname" : "string"
}
```

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "firstName":"string",
  "lastName":"string",
  "email": "string"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /tasks

description: 
  get all list tasks that user and other users created before

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 1,
        "title": "Swimming",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-12-04T16:05:38.692Z",
        "updatedAt": "2020-12-04T16:05:38.692Z",
        "User": {
            "id": 1,
            "firstName": "ahmad",
            "lastName": "jamal",
            "email": "ahmad@mail.com",
            "password": "$2a$10$mJ4YXRSCp91.tabmEPycmudpxxpkcGMDiGb5sazcDYRTqol4fqXaa",
            "createdAt": "2020-12-04T16:05:01.993Z",
            "updatedAt": "2020-12-04T16:05:01.993Z"
        }
    }
]

```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /tasks

description: 
  Create list tasks that user made in form

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "integer",
    "category": "string"
}
```

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Swimming",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-12-04T16:05:38.692Z",
        "updatedAt": "2020-12-04T16:05:38.692Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "title musn't empty",
    "category musn't empty",
    "title musn't null",
    "category musn't null"
  ]
}
```

- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /tasks/:id

description: 
  get task that user requested

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Swimming",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-12-04T16:05:38.692Z",
        "updatedAt": "2020-12-04T16:05:38.692Z"
}
```

- status: 401
- body:

```json
{
  "message": "you're not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /tasks/:id

description: 
  Update list tasks that user requested

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "integer",
    "category": "string"
}
```

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Swimming",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-12-04T16:05:38.692Z",
        "updatedAt": "2020-12-04T16:05:38.692Z"
}
```

- status: 401
- body:

```json
{
  "message": "you're not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### DELETE /tasks/:id

description: 
  Delete task 

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "tasks success to delete"
}
```

- status: 401
- body:

```json
{
  "message": "you're not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```