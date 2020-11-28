# Fancy Todo
API Documentation 

--- Documentation ----

 Collection for routes user
==================================================================


 **Title**
----

  Create Account

* **URL**

  /register

* **Method:**
  
  `POST`

* **Data Params**
  REQUIRED
  ```
  name = [string]
  email = [string] *Unique
  password= [string]
  ```
  
* **Success Response:**
  
  **Code:** 201 <br />
  **Content:**
    ```
    {
    "email": "User email",
    "id": "User id"
    }
    ```
 
* **Error Response:**

  Error for missing requirement <br />
  **Code:** 400 BAD REQUEST  <br />
  **Content:**
  ```
  [{err.message},{err.message},...]
  ```   

  Error for Duplicate email <br />
  **Code:**  500 INTERNAL SERVER ERROR<br />
  **Content:** 
  ```
  {err.body}
  ```

------------------------------------------------------------------------------------

 **Title**
----
  Login Account

* **URL**

  /login

* **Method:**
  
  POST

* **Data Params**
  REQUIRED
  ```
  email = [string]
  password = [string]
  ```
  
  
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "access_token": "acces_token"
  }
  ```
 
* **Error Response:**

  Error for wrong email <br />
  **Code:** 404 NOT FOUND <br />
  **Content:**
  ```
  {
    "message": "User Not Found"
  }
  ```

  Error for wrong password <br />
  **Code:** 400 BAD REQUEST <br />
  **Content:**
  ```
  {
    "message": "Invalid Account"
  }
  ```

---------------------------------------------------------------

 **Title**
----
  Login Account With Google

* **URL**

  /google-login

* **Method:**
  
  `POST`

<br>

Collection for routes todo
==================================================================
**Title**
----
  CREATE Todo List

* **URL**

  /todos

* **Method:**
  
  `POST`

* **Request Headers**
  REQUIRED
  ```
  headers = 'access_token'
  ```
  **Data Params**
  ```
  name: [string],        *Required
  description: [string],
  due: [date],           *Required
  status: [string],
  category: [string],
  ```
    
* **Success Response:**
  
  **Code:** 201 Created<br />
  **Content:**
   ```
    [
      {
        id: [integer],
        name: [string],
        description: [string],
        due: [date],
        status: [string],
        category: [string],
        UserId: [integer],
        createdAt: [date],
        updatedAt: [date]
      }
    ]
    ```

* **Error Response:**

  Error for missing requirement <br />
  **Code:** 400 BAD REQUEST  <br />
  **Content:**
  ```
  [{err.message},{err.message},...]
  ```   
---------------------------------------------------------------  
**Title**
----
  Get Todo List

* **URL**

  /todos

* **Method:**
  
  `GET`

* **Request Headers**
  REQUIRED

  ```
  headers = 'access_token'
  ```
    
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:**
   ```
    [
      {
        id: [integer],
        name: [string],
        description: [string],
        due: [date],
        status: [string],
        category: [string],
        UserId: [integer],
        createdAt: [date],
        updatedAt: [date]
      }
    ]
    ```
 
* **Error Response:**

  **Code:**  401 Unauthorized
  **Content:**
  ```
  {
    "message": "Please Login"
  }
  ```
---------------------------------------------------------------

**Title**
----
  Update Status

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`

* **Request Headers**
  
  REQUIRED
  ```
  headers = 'access_token
  ```

* **Data Params**
  REQUIRED
  ```
  status= [string]
  ```
    
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:**
    ```
    [
      {
        id: [integer],
        name: [string],
        description: [string],
        due: [date],
        status: [string],
        category: [string],
        UserId: [integer],
        createdAt: [date],
        updatedAt: [date]
      }
    ]
    ```
 
* **Error Response:**

  Error for missing requirement <br />
  **Code:** 400 BAD REQUEST  <br />
  **Content:**
  ```
  {
    "message": "Please fill status column"
  }
  ```
  Error for Unauthorized [Not Login]  <br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "Please Login"
  }
  ```
  Error for Unauthorized  [edit not own todo]<br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "You are not allowed to do this action"
  }
  ```

--------------------------------------------------------------------------------

**Title**
----
  Change Todo

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **Request Headers**
  REQUIRED
  ```
  headers = 'access_token'
  ```
* **Data Params**
  ```
  name: [string],        *Required
  description: [string],
  due: [date],           *Required
  status: [string],
  category: [string],
  ```
    
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:**
    ```
    [
      {
        id: [integer],
        name: [string],
        description: [string],
        due: [date],
        status: [string],
        category: [string],
        UserId: [integer],
        createdAt: [date],
        updatedAt: [date]
      }
    ]
    ```
 
* **Error Response:**

  Error for missing requirement <br />
  **Code:** 400 BAD REQUEST  <br />
  **Content:**
  ```
  [{err.message},{err.message},...]
  ```
  Error for Unauthorized [Not Login]  <br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "Please Login"
  }
  ```
  Error for Unauthorized  [edit not own todo]<br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "You are not allowed to do this action"
  }
  ```
  --------------------------------------------------------------------------------

**Title**
----
  Delete Todo

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **Request Headers**
  REQUIRED
  ```
  headers = 'access_token'
  ```
    
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:**
    ```
    [
      "message": "Todo success to delete",
      "todo"{
        id: [integer],
        name: [string],
        description: [string],
        due: [date],
        status: [string],
        category: [string],
        UserId: [integer],
        createdAt: [date],
        updatedAt: [date]
      }
    ]
    ```
 
* **Error Response:**

  Error for id not found <br />
  **Code:** 404 NOT FOUND  <br />
  **Content:**
  ```
  {
    "message": "Item not found"
  }
  ```
  Error for Unauthorized [Not Login]  <br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "Please Login"
  }
  ```
  Error for Unauthorized  [edit not own todo]<br />
  **Code:** 401 Unauthorized  <br />
  **Content:**
  ```
  {
    "message": "You are not allowed to do this action"
  }
  ```