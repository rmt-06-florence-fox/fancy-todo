# fancy-todo
# Register
Return json user data after create user

* **URL:**

<The request type>

    /register

* **Method:**

<The request type>

    POST    

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.email
    req.body.password

* **Success Response:**

<The request type>

    Code: 200
    Content: { id : 12, email : "test@gmail.com" }


* **Error Response:**

<The request type>

    Code: 400
    Content: { error: "Validation Error"  }

    OR

    Code: 500
    Content: { error : "Internal Server Error" }



# Login
Return access token

* **URL:**

<The request type>

    /login

* **Method:**

<The request type>

    POST    

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.email
    req.body.password

* **Success Response:**

<The request type>

    Code: 200
    Content: { access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjZm1iaWRvQGdtYWlsLmNvbSIsImlhdCI6MTYwNjU1ODA1Mn0.ky1LKIMsffeouPRBMtlisboei9wkuFFT2b6KUlGowRI" }


* **Error Response:**

<The request type>

    Code: 404
    Content: { error: "Invalid Account / Password"  }

    OR

    Code: 500
    Content: { error : "Internal Server Error" }

# Google Login
Return access token

* **URL:**

<The request type>

    /googlelogin

* **Method:**

<The request type>

    POST    

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.googletoken

* **Success Response:**

<The request type>

    Code: 200
    Content: { access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjZm1iaWRvQGdtYWlsLmNvbSIsImlhdCI6MTYwNjU1ODA1Mn0.ky1LKIMsffeouPRBMtlisboei9wkuFFT2b6KUlGowRI" }


* **Error Response:**

<The request type>

    Code: 500
    Content: { error : "Internal Server Error" }

# Todos
Get all todos by user id

* **URL:**

<The request type>

    /todos

* **Method:**

<The request type>

    GET    

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: {[
    {
        "id": 13,
        "title": "Menari",
        "description": "belajar menari",
        "status": "Ongoing",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T06:52:04.548Z",
        "updatedAt": "2020-11-28T06:52:04.548Z"
    },
    {
        "id": 23,
        "title": "Belajar",
        "description": "belajar javascript",
        "status": "Ongoing",
        "due_date": "2020-12-06",
        "UserId": 1,
        "createdAt": "2020-11-28T09:54:56.204Z",
        "updatedAt": "2020-11-28T09:54:56.204Z"
    }}


* **Error Response:**

<The request type>

    Code: 500
    Content: { error : "Internal Server Error" }


# Create Todo
Create new todo

* **URL:**

<The request type>

    /todos

* **Method:**

<The request type>

    POST    

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.title
    req.body.description
    req.body.status
    req.body.due_date
    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 201
    Content: {[
    {
        "id": 13,
        "title": "Menari",
        "description": "belajar menari",
        "status": "Ongoing",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T06:52:04.548Z",
        "updatedAt": "2020-11-28T06:52:04.548Z"
    }


* **Error Response:**

<The request type>

    Code: 400
    Content: { error : "Date must be greater than today" }

    OR

    Code: 500
    Content: { error : "Internal Server Error" }


# Get News
Get Today News

* **URL:**

<The request type>

    /todos/news

* **Method:**

<The request type>

    GET

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

    none

* **Required:**

<The request type>

    none

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: {[
    {
        title : "Japan won world cup",
        url: "example.com",
        image: "example.com"
    }


* **Error Response:**

<The request type>

    Code: 500
    Content: { error : "Internal Server Error" }

# Get Todo By Id
Get Todo By Id

* **URL:**

<The request type>

    /todos/:id

* **Method:**

<The request type>

    GET

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

* **Required:**

<The request type>

    id=[integer]

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: {
        "id": 13,
        "title": "Menari",
        "description": "belajar menari",
        "status": "Ongoing",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T06:52:04.548Z",
        "updatedAt": "2020-11-28T06:52:04.548Z"
    }


* **Error Response:**

<The request type>

    Code: 404
    Content: { error : "Data not found"}
    
    OR

    Code: 500
    Content: { error : "Internal Server Error" }



# Edit Todo By Id
Edit Todo By Id

* **URL:**

<The request type>

    /todos/:id

* **Method:**

<The request type>

    PUT

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

* **Required:**

<The request type>

    id=[integer]

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.title
    req.body.description
    req.body.status
    req.body.due_date
    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: {
        "id": 13,
        "title": "Menari",
        "description": "belajar menari",
        "status": "Ongoing",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T06:52:04.548Z",
        "updatedAt": "2020-11-28T06:52:04.548Z"
    }


* **Error Response:**

<The request type>

    Code: 401
    Content: { error : "You dont have access to this data"}
    
    OR

    Code: 404
    Content: { error : "Id not found"}
    
    OR

    Code: 500
    Content: { error : "Internal Server Error" }

# Edit Status Todo By Id
Edit Todo By Id

* **URL:**

<The request type>

    /todos/:id

* **Method:**

<The request type>

    PATCH

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

* **Required:**

<The request type>

    id=[integer]

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.status
    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: {
        "id": 13,
        "title": "Menari",
        "description": "belajar menari",
        "status": "Finished",
        "due_date": "2020-11-29",
        "UserId": 1,
        "createdAt": "2020-11-28T06:52:04.548Z",
        "updatedAt": "2020-11-28T06:52:04.548Z"
    }


* **Error Response:**

<The request type>

    Code: 404
    Content: { error : "Id not found"}
    
    OR

    Code: 401
    Content: { error : "You dont have access to this data"}
    
    OR

    Code: 500
    Content: { error : "Internal Server Error" }

# Delete Todo By Id
Edit Todo By Id

* **URL:**

<The request type>

    /todos/:id

* **Method:**

<The request type>

    DELETE

* **URL Params:**

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

* **Required:**

<The request type>

    id=[integer]

* **Data Params:**

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

    req.body.loggedInUser.id

* **Success Response:**

<The request type>

    Code: 200
    Content: { message: todo success to delete }


* **Error Response:**

<The request type>

    Code: 404
    Content: { error : "Id not found"}
    
    OR

    Code: 401
    Content: { error : "You dont have access to this data"}
    
    OR

    Code: 500
    Content: { error : "Internal Server Error" }
