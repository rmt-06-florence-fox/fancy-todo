# Fancy-Todo App

**Register User**
----
  Register user on server.

* **URL**

  /register

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
    "id": 1,
    "email": "anta@yahoo.com"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`


------------------------------------------------------------------------------------


**Login User**
----
  Login user on server.

* **URL**

  /login

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`

------------------------------------------------------------------------------------

**Add Todo**
----
  Add Todo.

* **URL**

  /todos

* **Method:**
  
  `POST`

* **Request Headers**

       ```
    {
      "access_token": "<your access token>"
    }
    ```
  
* **URL Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Title/Description/status/due_date required" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`


------------------------------------------------------------------------------------

* **GET Todos**

> see all the todos 

* **URL**

  /todos

* **Method:**
  
  `GET`

* **_Request Header_**

     ```
    {
      "access_token": "<your access token>"
    }
    ```

* **_Request Body_**
```
not needed
```

* **_Response (200)_**
```
{
    [
    {
        "id": 3,
        "title": "tidur",
        "description": "agar sehat",
        "status": "unfinish",
        "due_date": "2020.23.11",
        "UserId": null,
        "createdAt": "2020-11-23T12:39:45.993Z",
        "updatedAt": "2020-11-23T12:39:45.993Z"
    },
    {
        "id": 4,
        "title": "cuci motor",
        "description": "besok sore",
        "status": "unfinish",
        "due_date": "2020.24.11",
        "UserId": null,
        "createdAt": "2020-11-23T12:40:08.659Z",
        "updatedAt": "2020-11-23T12:40:08.659Z"
    }
]
}
```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "You do not have any Todo" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`

```
------------------------------------------------------------------------------------

* **GET Todo by id**

> Get a specific Todo by id

* **URL**

  /todos/:id

* **Method:**
  
  `GET`

* **_Request Header_**

      ```
    {
      "access_token": "<your access token>"
    }
    ```

* **_Request Params_**
```
{
  "id": "<your id>"
}
```

* **_Response (200)_**
```

{
        "id": 3,
        "title": "tidur",
        "description": "agar sehat",
        "status": "unfinish",
        "due_date": "2020.23.11",
        "UserId": null,
        "createdAt": "2020-11-23T12:39:45.993Z",
        "updatedAt": "2020-11-23T12:39:45.993Z"
}
```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Todo not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`

```

------------------------------------------------------------------------------------

**Edit Todo**
----
  edit your Todo.

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **_Request Header_**

    ```
    {
      "access_token": "<your access token>"
    }
    ```

* **_Request Params_**
   
  None

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    {
    "id": 4,
    "title": "mencuci mobil",
    "description": "besok sore",
    "status": "unfinish",
    "due_date": "2020.24.11",
    "UserId": null,
    "createdAt": "2020-11-23T12:40:08.659Z",
    "updatedAt": "2020-11-23T12:46:39.679Z"
}
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Todo not Found" }`

  OR

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ message : "Not Authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`

------------------------------------------------------------------------------------


**Edit status Todo**
----
> edit status your todo

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`

* **_Request Header_**

     ```
    {
      "access_token": "<your access token>"
    }
    ```

* **_Request Params_**
   
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
{
    "id": 4,
    "title": "mencuci mobil",
    "description": "besok sore",
    "status": "finished",
    "due_date": "2020.24.11",
    "UserId": null,
    "createdAt": "2020-11-23T12:40:08.659Z",
    "updatedAt": "2020-11-23T12:48:45.911Z"
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`



**DELETE Todo**
----
> Delete your todo

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **_Request Header_**

     ```
    {
      "access_token": "<your access token>"
    }
    ```

* **_Request Params_**
   
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
{
    "message": "deleted Todo success"
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`


------------------------------- 3RD API ---------------------------------------


**GET WEATHER**
----
> get Weather in Jakarta

* **URL**

  /weather

* **Method:**
  
  `GET`

* **_Request Header_**

  none

* **_Request Params_**
   
     ```
    {
      "appid": "<your appid>"
    }
    ``

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
{
    {
    "weather": {
        "main": "Rain",
        "description": "moderate rain",
        "temp": 300.65,
        "country": "ID",
        "name": "Jakarta"
    }
}
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`


**GET MUSIC**
----
> get recomendation Music

* **URL**

  /music

* **Method:**
  
  `GET`

* **_Request Header_**

  none

* **_Request Params_**
   
  none

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
{
[
    {
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night At The Opera (2011 Remaster)"
    },
    {
        "title": "Don't Stop Me Now",
        "artist": "Queen",
        "album": "Jazz (2011 Remaster)"
    },
]
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error!" }`