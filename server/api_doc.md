https://documenter.getpostman.com/view/13593391/TVewXidS

Register Page.
- **ENDPONIT**
  `/register`

- **Method:**

  `POST`

- **URL Params**
  `https://fancy-todos-ym.herokuapp.com/register`

  **Required:**
  email,Password

- **Data Body**
  email,Password

- **Success Response:**
**Code Status:** 200 <br />
   

  `{`
    `"id": 4,`
    `"email": "heroka@gmail.com"`
  `}`



- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **LOGIN**
Login Page.

- **ENDPOINT**

  `/login`

- **Method:**

  `POST`

- **URL Params**
  `https://fancy-todos-ym.herokuapp.com/login`

  **Required:**
  email,password

  **Data Body**
   body: 
  email,password
  
- **Success Response Example**

  `access_token : ".........."`

- **Error Response:**

- **Code:** 400 UNAUTHORIZED <br />
    **Content:** `{"message": "Invalid Account"}`

- **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **Show Main Page**
  ADD PAGE
- **ENPOINT**

  `/todos`

- **Method:**

  `POST`

- **URL Params**
   `https://fancy-todos-ym.herokuapp.com/todos`

  **Required:**

 `headers: acces_token`

- **Data Body**

  title,description,due_date

- **Success Response:**
    **Code:** 200  <br />
    `{
    "id": 3,
    "title": "bahagia",
    "description": "harus",
    "status": "still on progress",
    "due_date": "2020-12-20",
    "UserId": 1,
    "updatedAt": "2020-11-30T17:27:27.661Z",
    "createdAt": "2020-11-30T17:27:27.661Z"
}`
- **Error Response:**
  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Login First"}`
  - **Code:** 400 Bad Request/ Sequelize Validation Error <br />
    **Content:** `{"message":  "Cannot be blank"}`
    
  - **Code:** 400 Bad Request/ Sequelize Date Validation Error <br />
    **Content:** `{"message":  "Deadline can not be less than today"}`
    
  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`
  



   LIST TODO PAGE
- **ENPOINT**

  `/todos`

- **Method:**

  `GET`

- **URL Params**
   `https://fancy-todos-ym.herokuapp.com/todos`

  **Required:**

 `headers: acces_token`

- **Data Body**

 

- **Success Response:**
    **Code:** 200  <br />
    `{
    "id": 3,
    "title": "bahagia",
    "description": "harus",
    "status": "still on progress",
    "due_date": "2020-12-20",
    "UserId": 1,
    "updatedAt": "2020-11-30T17:27:27.661Z",
    "createdAt": "2020-11-30T17:27:27.661Z"
}`
- **Error Response:**
 - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Login First"}`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


*DELETE*
- **ENPOINT**

  `/todos/:id`

- **Method:**

  `DELETE`

- **URL Params**
   `https://fancy-todos-ym.herokuapp.com/todos/:id`

  **Required:**

 `headers: acces_token`

- **Data Body**

  

- **Success Response:**
**Code:** 200  <br />
    `{"message": "Success Deleted"}`

- **Error Response:**
  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Login First"}`
  - **Code:** 404 Bad Request/ Sequelize Validation Error <br />
    **Content:** `{"message":  "{"message": "Data not found"}`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`
  


## **Show Edit Page**
*EDIT-PAGE*
- **ENDPOINT**
  `todos/:id`

- **Method:**

  `PUT`

- **URL Params**
 `https://fancy-todos-ym.herokuapp.com/todos/:id`

  **Required:**

  acces_token

- **Data Body**
  title,description,due_date
  

- **Success Response Example**
      `{
    "id": 3,
    "title": "bahagia",
    "description": "harus",
    "status": "still on progress",
    "due_date": "2020-12-20",
    "UserId": 1,
    "updatedAt": "2020-11-30T17:27:27.661Z",
    "createdAt": "2020-11-30T17:27:27.661Z"
}`
  
- **Error Response:**
  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Login First"}`
  - **Code:** 400 Bad Request/ Sequelize Validation Error <br />
    **Content:** `{"message":  "Cannot be blank"}`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


- **ENDPOINT**
  `todos/:id`

- **Method:**

  `PATCH`

- **URL Params**
 `https://fancy-todos-ym.herokuapp.com/todos/:id`

  **Required:**

  acces_token

- **Data Body**
  title,description,status,due_date
  

- **Success Response Example**
      `{
    "id": 3,
    "title": "bahagia",
    "description": "harus",
    "status": "still on progress",
    "due_date": "2020-12-20",
    "UserId": 1,
    "updatedAt": "2020-11-30T17:27:27.661Z",
    "createdAt": "2020-11-30T17:27:27.661Z"
}`
  
- **Error Response:**
  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Login First"}`
  - **Code:** 400 Bad Request/ Sequelize Validation Error <br />
    **Content:** `{"message":  "Cannot be blank"}`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`




