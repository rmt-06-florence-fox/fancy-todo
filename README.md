# fancy-todo
**Add User**
----
  Add a User Account.

* **URL**

  /register

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

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>

**User Login**
----
  Login to app as a user.

* **URL**

  /login

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

**Google Login**
----
  Login to app using a Google Account.

* **URL**

  /googleLogin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `username=[string] -- format email (email akun google)`

   `password=[string] -- password akun google`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "access_token", "name"}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>

**Add Todo**
----
  Add a todo with a account user.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `description=[text] -- optional`

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

  `GET`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `description=[text]`

   `status=[string]`

   `due_date=[date]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 4, "title": "Project E-commerce", "description": "Mengerjakan bersama dengan kelompok secara online", "status": "coming soon", "due_date": "2020-12-01", "UserId": 1, "updatedAt": "2020-11-24T23:53:16.498Z", "createdAt": "2020-11-24T23:53:16.498Z"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{"message": "Please enter your title!!"}, {"message": "Please enter your status!!"}]`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

---
<br>

**Update Todo**
----
  Update status todo.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 8, "title": "Holiday", "description": "Hiking di pantai utara jawa sekali sekaliii", "status": "pending","due_date": "2020-12-01", "UserId": 4, "createdAt": "2020-11-28T07:15:27.816Z","updatedAt": "2020-11-28T10:25:50.422Z"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Update Data Todo**
----
  Update data todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `description=[string]`

   `due_date=[date]`

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 8, "title": "apapun", "description": "sama saja", "status": "pending","due_date": "2020-12-30", "UserId": 4, "createdAt": "2020-11-28T07:15:27.816Z","updatedAt": "2020-11-28T10:25:50.422Z"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": ["Due Date must greater than today!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Get Detail Data Todo**
----
  Get detail a data todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 8, "title": "pending", "description": "apapun", "status": "pending","due_date": "2020-11-30", "UserId": 4,"createdAt": "2020-11-28T07:15:27.816Z","updatedAt": "2020-11-28T10:33:40.082Z", "User": { "id": 4, "name": "hanifah nurlaila","username": "hanifah@gmail.com", "password": "$2a$10$J855Rd2.3vcpFalPmlcP.uo5.UgLGeN41XJSI.iQARwFBUTNOLdzC", "createdAt": "2020-11-27T08:46:49.681Z", "updatedAt": "2020-11-27T08:46:49.681Z"}}]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Delete Data Todo**
----
  Delete a data todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": ["todo success to delete"]}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Get Data API**
----
  Get data API.

* **URL**

  /holidays

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"name": "Diwali/Deepavali","description": "Diwali, also known as the Festival of Lights, is one of the most popular Hindu festivals.", "country": {"id": "id","name": "Indonesia"}, "date": {"iso": "2020-11-14", "datetime": {"year": 2020, "month": 11, "day": 14}}, "type": ["Observance"],"locations": "All", "states": "All"}]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`