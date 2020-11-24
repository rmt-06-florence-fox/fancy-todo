# fancy-todo

Collection for routes Todos
===============================================================

**Title**
----
  Read Todo

* **URL**

  /todos

* **Method:**
  
  `GET`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "data": [
            {
                "id": "Id Todo",
                "title": "Name Todo",
                "description": "Description Todo",
                "status": "Status Todo",
                "due_date": "Date Todo",
                "createdAt": "2020-11-23T18:51:09.732Z",
                "updatedAt": "2020-11-23T18:51:09.732Z"
            }
        ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />

------------------------------------------------------------

  **Title**
----
  Create Todo

* **URL**

  /todos

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `title = [string]`
  `description = [string]`
  `status = [string]`
  `description = [string]`
  `due_date = [dateonly]`
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {
        "data": [
            {
                "id": "Id Todo",
                "title": "Name Todo",
                "description": "Description Todo",
                "status": "Status Todo",
                "due_date": "Date Todo",
                "createdAt": "2020-11-23T18:51:09.732Z",
                "updatedAt": "2020-11-23T18:51:09.732Z"
            }
        ]
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  400 BAD REQUEST

  ------------------------------------------------------------

  **Title**
----
  Read Todo By Id

* **URL**

  /todos/:id

* **Method:**
  
  `GET`

* **Url Params**
  REQUIRED
  `id = [integer]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "data": [
            {
                "id": "Id Todo",
                "title": "Name Todo",
                "description": "Description Todo",
                "status": "Status Todo",
                "due_date": "Date Todo",
                "createdAt": "2020-11-23T18:51:09.732Z",
                "updatedAt": "2020-11-23T18:51:09.732Z"
            }
        ]
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  404 ERROR NOT FOUND

   ------------------------------------------------------------

  **Title**
----
  Replace Todo By Id

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **Url Params**
  REQUIRED
  `id = [integer]`

* **DATA PARAMS**
  REQUIRED
  
  `title = [string]`
  `description = [string]`
  `status = [string]`
  `description = [string]`
  `due_date = [dateonly]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
      "data": [
          1,
          [
              {
                  "id": "Id Todo",
                  "title": "Name Todo",
                  "description": "Description Todo",
                  "status": "Status Todo",
                  "due_date": "Date Todo",
                  "createdAt": "2020-11-24T05:10:17.237Z",
                  "updatedAt": "2020-11-24T08:34:40.953Z"
              }
          ]
      ]
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  400 ERROR NOT FOUND

  ------------------------------------------------------------

  **Title**
----
  Modify Todo By Id

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`

* **Url Params**
  REQUIRED
  `id = [integer]`

* **DATA PARAMS**
  REQUIRED

  `status = [string]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
      "data": [
          1,
          [
              {
                  "id": "Id Todo",
                  "title": "Name Todo",
                  "description": "Description Todo",
                  "status": "Status Todo",
                  "due_date": "Date Todo",
                  "createdAt": "2020-11-24T05:10:17.237Z",
                  "updatedAt": "2020-11-24T08:34:40.953Z"
              }
          ]
      ]
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  404 ERROR NOT FOUND

  ------------------------------------------------------------

  **Title**
----
  Delete Todo By Id

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **Url Params**
  REQUIRED
  `id = [integer]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
      "The_number_of_destroyed_rows": 1
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  404 ERROR NOT FOUND