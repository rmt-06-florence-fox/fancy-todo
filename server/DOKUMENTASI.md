*Sign in
Users sign in

URL
/users/sign-in

Method:
POST

URL Params
None

Headers
none

Req Body:
email: string
password: string

Data Params
None

Success Response:
Code: 201
Content: {
    "email": string,
    "id": integer
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Sign up
Users sign up

URL
/users/sign-up

Method:
POST

URL Params
None

Headers
none

Req Body:
email: string
password: string

Data Params
None

Success Response:
Code: 201
Content: {
    "acces_token": string,
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Google sign in
Users sign in through third party api (google)

URL
/users/googleSignIn

Method:
POST

URL Params
None

Headers
none

Req Body:
email: string
password: string

Data Params
None

Success Response:
Code: 201
Content: {
    "acces_token": string,
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }


*Create Todo
Create json data about a single activity.

URL
/todos

Method:
POST

URL Params
None

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 201
Content: {
    "id": 5,
    "title": "mandi",
    "description": "membersihkan badan",
    "status": "belum dikerjakan",
    "due_date": "2020-09-09T17:00:00.000Z",
    "updatedAt": "2020-10-27T11:25:23.840Z",
    "createdAt": "2020-10-27T11:25:23.840Z"
}
Error Response:

Code: 400 BAD REQUEST
Content: { error : "<field> Harus Terisi!" }
OR

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Delete Todo
Delete json data about a single activity.

URL
/todos/:id

Method:
DELETE

URL Params
id:[integer]

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 204
Content: {"Data success to delete"}

Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Show Todo
Returns json data about a single activity.

URL
/todos/:id

Method:
GET

URL Params
Required:
id=[integer]

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 200
Content: {
    "id": 3,
    "title": "mandi",
    "description": "membersihkan badan",
    "status": "belum dikerjakan",
    "due_date": "2020-09-09T17:00:00.000Z",
    "createdAt": "2020-10-27T11:02:01.905Z",
    "updatedAt": "2020-10-27T11:02:01.905Z"
}
Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "500 INTERNAL SERVER ERROR." }

*Update Todo
Changing the status of one activity.

URL
/todos/:id

Method:
PATCH

URL Params
required:
id=[integer]

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 200
Content:  {
            "id": 2,
            "title": "makan",
            "description": "ayo makan malam",
            "status": "sudah selesai",
            "due_date": "2020-10-08T17:00:00.000Z",
            "createdAt": "2020-10-27T08:57:42.332Z",
            "updatedAt": "2020-10-27T11:13:46.615Z"
        }
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Update Todo
Changing attributes of one activity.

URL
/todos/:id

Method:
PUT

URL Params
required:
id=[integer]

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 200
Content:  {
            "id": 2,
            "title": "makan",
            "description": "ayo makan malam",
            "status": "belum selesai",
            "due_date": "2020-10-08T17:00:00.000Z",
            "createdAt": "2020-10-27T08:57:42.332Z",
            "updatedAt": "2020-10-27T11:13:46.615Z"
        }
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Get Todo
Get all list of activity.

URL
/todos

Method:
GET

URL Params
none

Headers
required:
acces_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": 1,
            "title": "makan",
            "description": "ayo makan malam",
            "status": "belum selesai",
            "due_date": "2020-10-08T17:00:00.000Z",
            "createdAt": "2020-10-27T08:57:42.332Z",
            "updatedAt": "2020-10-27T11:13:46.615Z"
        }, 
        {
            "id": 2,
            "title": "makan",
            "description": "ayo makan malam",
            "status": "belum selesai",
            "due_date": "2020-10-08T17:00:00.000Z",
            "createdAt": "2020-10-27T08:57:42.332Z",
            "updatedAt": "2020-10-27T11:13:46.615Z"
        }
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

