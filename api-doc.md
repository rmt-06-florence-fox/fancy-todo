# fancy-todo

**REGISTER USER**
----
  <_Register User _>

* **URL**

  `/register`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `firstName=[string] lastname=[string] email=[string] password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
        {
          "data": {
              "id": 3,
              "firstname": "ted ",
              "lastname": "george",
              "email": "tedgeorge@gmail.com",
              "password": "$2a$10$CMcHoIRAkbovafwaYVqa4uisAyjCkz0B4Lpqvzp/3mE8LTnvxB5RC",
              "updatedAt": "2020-11-26T15:11:16.352Z",
              "createdAt": "2020-11-26T15:11:16.352Z"
              }
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "firstname cannot be empty",
                "lastname cannot be empty"
            ]
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```


**LOGIN USER**
----
  <_LOGIN User _>

* **URL**

  `/login`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `email=[string] password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
          "access_token":"slkfjalfjakljflajflakj"
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "firstname cannot be empty",
                "lastname cannot be empty"
            ]
        }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```json
        {
            "message": "Email/password salah."
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```

**SHOW ALL TODOS USER**
----
  <_SHOW TODOS User _>

* **URL**

  `/todos`

* **Method:**

  `GET`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "belum selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 3
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  OR

  * **Code:** 401 UNAUTHORIZE <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```


**SHOW TODOS USER BY ID**
----
  <_SHOW TODOS User _>

* **URL**

  `/todos/:id`

* **Method:**

  `GET`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "belum selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 3
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  OR

  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "id not found"
        }
    ```

**DELETE TODOS USER**
----
  <_DELETE TODOS User _>

* **URL**

  `/todos/:id`

* **Method:**

  `DELETE`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "message": "todo success to delete"
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "id not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

**UPDATE TODOS STATUS**
----
  <_UPDATE TODOS STATUS _>

* **URL**

  `/todos/:id`

* **Method:**

  `PATCH`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `status =[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 3
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "id not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

**UPDATE TODOS**
----
  <_UPDATE TODOS _>

* **URL**

  `/todos/:id`

* **Method:**

  `PUT`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `title=[string] description=[string] status =[string] due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 3
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "id not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": "date must be greater than now"
        }
    ```


**CREATE TODOS**
----
  <_CREATE TODOS _>

* **URL**

  `/todos/:id`

* **Method:**

  `POST`

*  **Headers**

  `access_token=[string]`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `title=[string] description=[string] status =[string] due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 3
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": [
              "date must be greater than now",
              "title cannot be empty",
              "date cannot be empty",
              "description cannot be empty",
              "staus cannot be empty"
              ]
        }
    ```