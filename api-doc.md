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

  * **Code:** 201
    **Content:**
    ```
    {
    "id": 1,
    "email": "user@mail.com"
}
    ```

* **Error Response**

  * **Code:** 400
    **Content:** 
    ```
    {
    "error": [
        "Email must be in valid email format !",
        "Password must contain at least 5 characters !"
    ]
}
    ```
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
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwiaWF0IjoxNjA4MjA2ODA5fQ.rbysKJvVIdr0_99MU_x9Afvhq_odhFN_ohu8lpKDXQo"
    }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** 
    ```
    {
      "message": "Invalid Email / Password !"
    }
    ```
----

## POST /todos

* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```md
{
    "id": 3,
    "title": "Revisi Porto Phase 2",
    "description": "revisi porto Phase 2 Hacktiv8",
    "status": "incomplete",
    "due_date": "2020-12-17T17:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2020-12-17T12:28:31.388Z",
    "createdAt": "2020-12-17T12:28:31.388Z"
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
  [
    {
        "id": 2,
        "title": "Revisi Porto Todo App",
        "description": "revisi porto fancy-todo",
        "status": "incomplete",
        "due_date": "2020-12-17T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-12-17T12:20:26.924Z",
        "updatedAt": "2020-12-17T12:20:26.924Z"
    },
    {
        "id": 3,
        "title": "Revisi Porto Phase 2",
        "description": "revisi porto Phase 2 Hacktiv8",
        "status": "incomplete",
        "due_date": "2020-12-17T17:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-12-17T12:28:31.388Z",
        "updatedAt": "2020-12-17T12:28:31.388Z"
    }
]
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
    "id": 3,
    "title": "Revisi Portofolio Todo Phase 2",
    "description": "Revisi Seluruh Porto Phase 2",
    "status": "incomplete",
    "due_date": "2020-12-18T17:00:00.000Z",
    "UserId": 1,
    "createdAt": "2020-12-17T12:28:31.388Z",
    "updatedAt": "2020-12-17T12:48:40.831Z"
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
    "id": 2,
    "title": "Revisi Porto Todo App",
    "description": "revisi porto fancy-todo",
    "status": "complete",
    "due_date": "2020-12-17T17:00:00.000Z",
    "UserId": 1,
    "createdAt": "2020-12-17T12:20:26.924Z",
    "updatedAt": "2020-12-17T12:58:16.498Z"
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
    "message": "Task successfully deleted !"
  }
    ```

* **Error Response**

  * **Code:** 404 <br />
    **Content:** `{ error : Not Found }`

  * **Code:** 500 <br />
    **Content:** `{ error : Internal Server Error }`

----