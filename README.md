# fancy-todo

----

## Register

* **URL**

  /register

* **Method**

  `POST`

* **Data Params**

  **Required**

  `email=[string]`
  `password=[string]`

* **Success Response**

  * **Code:** 201 <br />
    **Content:**
    ```md
    {
        "id": 1,
        "email":
    }
    ```

* **Error Response**

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----

## Login into Apps

* **URL**

  /login

* **Method**

  `POST`

* **Data Params**

  **Required**

  `email=[string]`
  `password=[string]`

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJidWxiYUBnbWFpbC5jb20iLCJpYXQiOjE2MDM5Njc1NzV9.IZIgb-6Rxt58pPQuberOrRDC1-IBnT7ug51oTCk0l80"
    }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** `{ error : Invalid Email / Password }`

  * **Code:** 401 <br />
    **Content:** `{ error : Invalid Email / Password }`
    
  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----

## POST /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {

    }
    ```

* **Error Response**

  * **Code:** 400 <br />
    **Content:** `{ error : Validation Error }`

----

## GET /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {
        
    }
    ```

* **Error Response**

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----

## PUT /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {
        
    }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** `{ error : Not Found }`

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----

## PATCH /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {
        
    }
    ```

* **Error Response**

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----

## DELETE /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
    {
        
    }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** `{ error : Not Found }`

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----