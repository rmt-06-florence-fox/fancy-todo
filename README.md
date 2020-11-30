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
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwiaWF0IjoxNjA2NzI1MTI1fQ.n6aR5NRsQmQ72RtVNT5D8CdKyxAJYa1hBMt3gNCFR_8"
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
    "output": {
        "id": 2,
        "title": "belajar koding",
        "description": "belajar koding di hacktiv8",
        "status": "incomplete",
        "due_date": "2020-01-11T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T09:05:20.906Z",
        "updatedAt": "2020-11-30T09:06:15.076Z"
    }
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
    "output": {
        "id": 2,
        "title": "belajar koding",
        "description": "belajar koding di hacktiv8",
        "status": "incomplete",
        "due_date": "2020-01-11T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T09:05:20.906Z",
        "updatedAt": "2020-11-30T09:06:15.076Z"
    }
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
    "output": {
        "id": 2,
        "title": "koding dan ngopi",
        "description": "tentunya di hacktiv8",
        "status": "complete",
        "due_date": "2020-01-11T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T09:05:20.906Z",
        "updatedAt": "2020-11-30T09:07:38.642Z"
    }
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
    "output": {
        "id": 2,
        "title": "belajar koding",
        "description": "belajar koding di hacktiv8",
        "status": "complete",
        "due_date": "2020-01-11T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-11-30T09:05:20.906Z",
        "updatedAt": "2020-11-30T09:07:01.953Z"
    }
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
    "message": "Task has been successfully deleted"
  }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** `{ error : Not Found }`

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----