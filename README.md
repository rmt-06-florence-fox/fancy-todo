# fancy-todo


### POST /register

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
  "email": "string",
  "password": "string"
}
```
- status: 400
- body:
```json
{
    "message": "email must be unique"
}
```
OR
```json
{
    "message": "password min 6 characters"
}
```

### POST /login

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
  "token": "string"
}
```
- status: 401
- body:
```json
{
    "message": "invalid email/password"
}
```

### POST /googleLogin

Request:

- data:

```json
{
  "google_access_token": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "token": "string"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```
### GET /todos

Request:

- headers:

```json
{
  "token": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "response": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

### POST /todos

Request:

- headers:
```json
{
  "token": "string"
}
```
- data:

```json
{
  "title": "string",
  "description": "string",
  "due_date": "date",
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "due_date": "date",
}
```
- status: 401
- body:
```json
{
    "message": "title cannot be empty"
}
```
OR
```json
{
    "message": "date must be greater than today"
}
```

### GET /todos/weather

Request:

- headers:

```json
{
  "token": "string"
}
```
Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

### GET /todos/weather

Request:

- headers:

```json
{
  "token": "string"
}
```
Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```
### GET /todos/:id

Request:

- params:
```
    id: "integer"
```
- headers:

```json
{
  "token": "string"
}
```
Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

### PUT /todos/:id

Request:

- params:
```
    id: "integer"
```
- headers:

```json
{
  "token": "string"
}
```
- data:

```json
{
  "title": "string",
  "description": "string",
  "due_date": "date",
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

### PATCH /todos/:id

Request:

- params:
```
    id: "integer"
```
- headers:

```json
{
  "token": "string"
}
```



Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

### DELETE /todos/:id

Request:

- params:
```
    id: "integer"
```
- headers:

```json
{
  "token": "string"
}
```



Response:

- status: 200
- body:
  ​

```json
{
  "data": "Array"
}
```
- status: 500
- body:
```json
{
    "message": "internal server error"
}
```

OR

- status: 401
- body:

```json
{
    "msg": "error unauthorized"
}
```
