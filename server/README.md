# fancy-todo

Collection for routes Todos
===============================================================

**Read Todo**
----
  Read Todo

* **URL**

  /

* **Method:**
  
  `GET`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`
  
* **Success Response:**
  
  * **Code:** 200 
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

  * **Code:** 500 INTERNAL SERVER ERROR
  **Content:**
  {
    "errors": "Internal Server Error"
  }

------------------------------------------------------------

  **Create Todo**
----
  Create Todo

* **URL**

  /

* **Method:**
  
  `POST`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`

* **DATA PARAMS**
  REQUIRED
  
  `title = [string]`
  `description = [string]`
  `status = [string]`
  `due_date = [dateonly]`
  `UserId = [integer]`
  
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
  500 INTERNAL SERVER ERROR

  OR

  400 BAD REQUEST

  ------------------------------------------------------------

  **Read Todo By Id**
----
  Read Todo By Id

* **URL**

  /:id

* **Method:**
  
  `GET`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`

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
  500 INTERNAL SERVER ERROR
  **Content:**
  {
    "errors": {
        "error": "You don't have permission"
    }
}

  OR

  404 ERROR NOT FOUND

   ------------------------------------------------------------

  **Replace Todo By Id**
----
  Replace Todo By Id

* **URL**

  /:id

* **Method:**
  
  `PUT`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`

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

  **Modify Todo By Id**
----
  Modify Todo By Id

* **URL**

  /:id

* **Method:**
  
  `PATCH`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`

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

  **Delete Todo By Id**
----
  Delete Todo By Id

* **URL**

  /:id

* **Method:**
  
  `DELETE`

* **Request Headers**
  REQUIRED
  `headers = 'access_token'`

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





  Collection for routes users
==================================================================

 **Create Account**
----
  Create Account

* **URL**

  /register

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `firstName = [string]`
  `lastName = [string]`
  `email = [string]`
  `password= [string]`
  
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {
    "name": "Name User",
    "email": "Email User"
    }
 
* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
    {
      "errors": [
          "Name cannot Empty",
          "Email cannot Empty",
          "Password cannot Empty"
      ]
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }

--------------------------------------------------------

 **Login Account**
----
  Login Account

* **URL**

  /login

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `email = [string]`
  `password = [string]`
  
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "accesToken": "accesToken"
    }
 
* **Error Response:**

  * **Code:** 

  401 BAD REQUEST
    **Content:**
    {
        "errors": "Invalid email/password"
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }

------------------------------------------------------------------------------------

 **Login With Google**
----
  Login Account With Google

* **URL**

  /googlelogin

* **Method:**
  
  `POST`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
      "access_token": "google_token",
      "name": "Name User",
      "email": "Email User"
    }
 
* **Error Response:**

  * **Code:** 

  500 INTERNAL SERVICE ERROR
    **Content:**
    {
      "errors": "Internal Server Error"
    }