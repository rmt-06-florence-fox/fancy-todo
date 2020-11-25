# fancy-todo
**Add User**
----
  Add a User Account.

* **URL**

  /user/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `name=[string]`

   `username=[string] -- format email`

   `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 8, "name": "David Beckham", "username": "beckham@mail.com", "password": "$2a$10$LQlfvccPowHGmAZ1WpcwNO3hrpG2.KQXO3WLsYAhZJ3klBmiBrvia", "updatedAt": "2020-11-24T23:13:53.351Z", "createdAt": "2020-11-24T23:13:53.351Z"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{"message": "User.name cannot be null"}, {"message": "User.username cannot be null"}, {"message": "User.password cannot be null"}]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{"message": "Format email is required"}]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Username is already exist!!"}`
---
<br>
**User Login**
----
  Login to app as a user.

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `username=[string] -- format email`

   `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "Login Success!!"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Invalid Account"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Username / Password is incorrect"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>
**Add Todo**
----
  Add a todo with a account user.

* **URL**

  /todos/add

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `description=[text]`

   `status=[string]`

   `due_date=[date]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 4, "title": "Project E-commerce", "description": "Mengerjakan bersama dengan kelompok secara online", "status": "coming soon", "due_date": "2020-12-01", "UserId": 1, "updatedAt": "2020-11-24T23:53:16.498Z", "createdAt": "2020-11-24T23:53:16.498Z"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{"message": "Please enter your title!!"}, {"message": "Please enter your status!!"}]`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Due Date must greater than today!!"}`
---
<br>
**List Todo**
----
  Get list todo from a user.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `description=[text]`

   `status=[string]`

   `due_date=[date]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 4, "title": "Project E-commerce", "description": "Mengerjakan bersama dengan kelompok secara online", "status": "coming soon", "due_date": "2020-12-01", "UserId": 1, "updatedAt": "2020-11-24T23:53:16.498Z", "createdAt": "2020-11-24T23:53:16.498Z"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{"message": "Please enter your title!!"}, {"message": "Please enter your status!!"}]`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`