RESTfull API Doc

**Register User**
----
  Returns user to database.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

  None


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"email" : "efrizal@gmail.com", "password" :  "$2a$08$vueqmQNrAvPlSGV5t180aOEPPYr9i0CKg..gNlsDroc380bb9z.eC" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message" : "input must be a valid email address" },{ "message": "password is required" }, { "message" : "email is already used" }]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`

<!-- --------------------------------------------- -->

**Login User**
----
  -

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

  None


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJlZnJpemFsc3kwNDI0QGdtYWlsLmNvbSIsImlhdCI6MTYwNjMwNzYzMn0._6oN91LbjFUQomwt-9QxAcnUzXPY62UFUHKlB2eTeco"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message": "password is required" }, { "message" : "Data is missing/Access Denied" }]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`

    <!-- --------------------------------------------- -->

**Show All Todos**
----
  show all databases belong to user while logged in

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`



* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"todo": []}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


**Create Todos**
----
  Create belong to user while logged in

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `title=[string]`
   `description=[string]`
   `status=[string]`
   `due_date=[date]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"todo": { "id": 13, "title": "Take a rest", "description": "none", "status": "queue", "due_date": "2020-12-01T00:00:00.000Z", "UserId": 11, "updatedAt": "2020-11-25T21:46:51.613Z","createdAt": "2020-11-25T21:46:51.613Z" }}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "title is required"}, { "message": "description is required" }, { "message": "status is required" }, { "message": "Date is expired, please select valid date" }, { "message": "description is required" }]`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Get One Todos**
----
  Show one data belong to user while logged in

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"todo": { "id": 13, "title": "Take a rest", "description": "none", "status": "queue", "due_date": "2020-12-01T00:00:00.000Z", "UserId": 11, "updatedAt": "2020-11-25T21:46:51.613Z","createdAt": "2020-11-25T21:46:51.613Z" }}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Update Todos**
----
  Update todo data belong to user while logged in

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `title=[string]`
   `description=[string]`
   `status=[string]`
   `due_date=[date]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"todo": { "id": 13, "title": "Take a rest", "description": "none", "status": "queue", "due_date": "2020-12-01T00:00:00.000Z", "UserId": 11, "updatedAt": "2020-11-25T21:46:51.613Z","createdAt": "2020-11-25T21:46:51.613Z" }}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "title is required"}, { "message": "description is required" }, { "message": "status is required" }, { "message": "Date is expired, please select valid date" }, { "message": "description is required" }]`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


    **Update not all Field of Todos**
----
  Update todo data field belong to user while logged in

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `title=[string]`
   OR
   `description=[string]`
   OR
   `status=[string]`
   OR
   `due_date=[date]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"todo": { "id": 13, "title": "Take a rest", "description": "none", "status": "queue", "due_date": "2020-12-01T00:00:00.000Z", "UserId": 11, "updatedAt": "2020-11-25T21:46:51.613Z","createdAt": "2020-11-25T21:46:51.613Z" }}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "title is required"}, { "message": "description is required" }, { "message": "status is required" }, { "message": "Date is expired, please select valid date" }, { "message": "description is required" }]`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



    **Delete Todos**
----
  Create belong to user while logged in

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{message: 'todo succes to delete'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`
