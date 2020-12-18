# fancy-todo


## 1.Register
* URL
  /register

* Method
 `POST`

* URL Params
  None

* Data Params

```
  email: "email"
  password: "password"


```

* Success Response
  Code: `201 Created`
  Content: 
  ```
    id: "id"
    email: "email"
  
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: `Internal server error`
  }
  ```

## 2.Login
* URL
  /login

* Method
 `POST`

* URL Params
  None

* Data Params

```
  email: "email"
  password: "password"


```

* Success Response
  Code: `201 Created`
  Content: 
  ```
    access_token : "access_token"
  
  ```

* Error Response
  code: `400 Bad Request`
  content:
  ```
  
    msg: "Wrong email/password"
  
  ```

  code: `400 Bad Request`
  content:
  ```
  
    msg: "Wrong email/password"
  
  ```

  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: `Internal server error`
  }
  ```


## 3. Google Login
* URL
  /products/

* Method
 `POST`

* URL Params
  None

* Data Params
```
  Google account

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  access_token: "access_token"

  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 4. Get All Todos
* URL
  /todos/

* Method
 `GET`

* URL Params
  None

* Data Params
```
none

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

## 5. Create Todo
* URL
  /todos/

* Method
 `POST`

* URL Params
```

  none

```

* Data Params
```

  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"

headers:{access_token}

```

* Success Response
  Code: `201 created`
  Content: 
  ```
  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


## 6. Get Todo by Id
* URL
  /todos/:id

* Method
 `GET`

* URL Params
  
```
id: "id"

```

* Data Params

```

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 7. Edit Todo by Id
* URL
  /todos/:id

* Method
 `PUT`

* URL Params
```
id: "id"

```

* Data Params

```

  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"

  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  title: "title",
  description: "description",
  status: "status",
  due_date: "due_date"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

## 8. Edit Todo Status by Id
* URL
  /todos/:id

* Method
 `PATCH`

* URL Params
```
id: "id"

```

* Data Params

```

  status: "status",

  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  status: "status",
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
  
## 7. Delete Todo By Id
* URL
  /todos/:id

* Method
 `DELETE`

* URL Params


```
id: "id"
```
* Data Params

```


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  "Todos Successfully deleted"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

### link firebase https://fancy-todo-7a705.web.app/