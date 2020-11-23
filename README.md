# fancy-todo

&nbsp;

## Endpoints
```
POST /register
POST /login
POST /todos
GET /todos
GET /todos/:id

```

## RESTful endpoints
### POST /register

- Request Header
    Not required.
​
- Request Body
​
```json
    {
        "email": "nafisa@gmail.com",
        "password": "bidadaricantik"
    }
 ```
​
- Response 201: Created
```json
{
    "id": 1,
    "email": "nafisa@gmail.com",
    "password": "",
    "updatedAt": "2020-08-08T03:19:54.940Z",
    "createdAt": "2020-08-08T03:19:54.940Z"
}
```
​
- Response 400: Bad Request
```json
    
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /login
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "nafisa@gmail.com",
        "password": "bidadaricantik"
    }
```
​
- Response 200: OK
```json
{
    "user": {
        "id": 1,
        "email": "nafisa@gmail.com",
        "password": "",
        "createdAt": "2020-08-08T03:19:54.940Z",
        "updatedAt": "2020-08-08T03:19:54.940Z"
    },
    "token": ""
}
```
​
- Response 400: Bad Request
```json
    {
        "message": "email or password is incorrect",
        "error_code": "NOT_FOUND_USER"
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /googleLogin
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "nafisa@gmail.com",
        "password": "bidadaricantik"
    }
```
​
- Response 200: OK
```json
    { 
        "token": "" 
    }
```
​
- Response 400: Bad Request
```json
    {
        "message": "Invalid email/password"
    }

```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /todos
​
- Request Header
```json
    {
        "access_token":"<access token>"
    }
```
- Request Body
```json
    {
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "due_date": "2020-01-29"
    }
```
​
- Response 200: OK
```json
    {
        "id": 23,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "due_date": "2020-01-29T00:00:00.000Z",
        "UserId": 1,
        "updatedAt": "2020-08-08T03:35:02.314Z",
        "createdAt": "2020-08-08T03:35:02.314Z",
        "status": false
    }
```

- Response 400: Internal server error
```json
    [
        {
            "message": "Validation error. Due date must be after today!",
            "error_code": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input title for your todo list!",
            "error_code": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input description for your todo list!",
            "error_code": "VALIDATIN_ERROR"
        }
        
    ]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /todos
​
- Request Header
```json
    {
        "access_token":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 23,
        "title": "introgasi",
        "description": "kasus tingkat S",
        "status": false,
        "due_date": "2020-01-29T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-08-08T03:35:02.314Z",
        "updatedAt": "2020-08-08T03:35:02.314Z"
    }
]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /todos/:id
​
- Request Header
```json
    {
        "access_token":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 23,
        "title": "introgasi",
        "description": "kasus tingkat S",
        "status": false,
        "due_date": "2020-01-29T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-08-08T03:35:02.314Z",
        "updatedAt": "2020-08-08T03:35:02.314Z"
    }
]
```
- Response 400: Bad Request
```json
    [
        {
            "message": "Not Authorized",
            "error_code": "INVALID_ACCOUNT"
        }
    ]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
