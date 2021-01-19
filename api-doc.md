# Fancy Todos

* **URL**
    /todos
    
* **Method:**
    `POST`

*  **URL Params**

   **Required:**
    None

*  **HEADERS**
    {
    "token_access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }


* **Data Params**

    None

* **Success Response:**
    *   **Code:** 201 <br />
        **Content:** {
            "id": 7,
            "title": "mandi ",
            "description": "mandi susu",
            "status": "done",
            "date": "2020-12-05T00:00:00.000Z",
            "updatedAt": "2020-11-23T12:21:44.420Z",
            "createdAt": "2020-11-23T12:21:44.420Z"
        }

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** {"message": "Validation error: due date must be greater than today dude !!"}

* **Sample Call:**
            




* **URL**
    /todos
    
* **Method:**
    `GET`

*  **URL Params**

   **Required:**
    None

*  **HEADERS**
    {
    "token_access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }

* **Data Params**

    None

* **Success Response:**
    *   **Code:** 200 <br />
        **Content:** [
            {
                "id": 4,
                "title": "coding fancy todo",
                "description": "membuat portofolio week 5",
                "status": "on process",
                "date": "2020-11-25T00:00:00.000Z",
                "createdAt": "2020-11-23T11:51:27.203Z",
                "updatedAt": "2020-11-23T11:51:27.203Z"
            },
            {
                "id": 6,
                "title": "minum ",
                "description": "minum makanan bergizi",
                "status": "on process",
                "date": "2020-12-01T00:00:00.000Z",
                "createdAt": "2020-11-23T12:00:17.327Z",
                "updatedAt": "2020-11-23T12:00:17.327Z"
            },
            {
                "id": 7,
                "title": "mandi ",
                "description": "mandi susu",
                "status": "done",
                "date": "2020-12-05T00:00:00.000Z",
                "createdAt": "2020-11-23T12:21:44.420Z",
                "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ]

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** {message:`Internal Server Error`}

* **Sample Call:**
            







* **URL**
    /todos/:ID
    
* **Method:**
    `GET`

*  **URL Params**

   **Required:**
    `id=[integer]`

*  **HEADERS**
    {
    "token_access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }

* **Data Params**

    None

* **Success Response:**
    *   **Code:** 200 <br />
        **Content:** [
            {
                "id": 4,
                "title": "coding fancy todo",
                "description": "membuat portofolio week 5",
                "status": "on process",
                "date": "2020-11-25T00:00:00.000Z",
                "createdAt": "2020-11-23T11:51:27.203Z",
                "updatedAt": "2020-11-23T11:51:27.203Z"
            }          
        ]

* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** 

* **Sample Call:**





* **URL**
    /todos/:ID
    
* **Method:**
    `PUT`

*  **URL Params**

   **Required:**
    `id=[integer]`

*  **HEADERS**
    {
    "token_access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }

* **Data Params**
    None


* **Success Response:**
    *   **Code:** 200 <br />
        **Content:** {
            "id": 4,
            "title": "terbang tinggi",
            "description": "belajar terbang",
            "status": "on process",
            "date": "2020-11-29T00:00:00.000Z",
            "createdAt": "2020-11-23T11:51:27.203Z",
            "updatedAt": "2020-11-23T13:06:01.712Z"
        }

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** { "message": "Error not found"}

    OR

* **Code:** 400 BAD REQUEST <br />
    **Content:** {"message": "Validation error: due date must be greater than today dude !!"}
* **Sample Call:**





* **URL**
    /todos/:ID
    
* **Method:**
    `PATCH`

*  **URL Params**

   **Required:**
   `id=[integer]`
    

* **Data Params**

    None

* **Success Response:**
    *   **Code:** 200 <br />
        **Content:** {"message": "todo success to delete"}

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** { "message": "Error not found"}

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** {message:`Internal Server Error`}
    
* **Sample Call:**