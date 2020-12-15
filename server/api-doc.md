# My-Gallery

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `POST /weather`
- `GET /news`
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`




### POST /register

description: 
  register user

Request:

- data:

```json
{
  "first_name":"string",
  "last_name":"string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "first_name":"string",
  "last_name":"string",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "email must be unique",
    "email musn't empty",
    "first_name musn't empty",
    "last_name musn't empty",
    "password musn't empty",
    "email musn't null",
    "first_name musn't null",
    "last_name musn't null",
    "password musn't null"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /login

description: 
  log in user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "fullname" : "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /googleLogin

description: 
  sign in as google user

Request:

- data:

```json
{
  "idToken": "google token"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "fullname" : "string"
}
```

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "first_name":"string",
  "last_name":"string",
  "email": "string"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /news

description: 
  get news from Indonesia (filtered)

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "status": "ok",
    "totalResults": 38,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Pikiran-rakyat.com"
            },
            "author": "Mega Selpia",
            "title": "Konsumsi 5 Jenis Makanan Ini Agar Terhindar dari Penyakit Diabetes - Mantra Sukabumi - Pikiran Rakyat",
            "description": "Diabetes adalah penyakit kronis atau jangka panjang yang ditandai dengan peningkatan kadar gula darah (glukosa) di atas nilai normal.",
            "url": "https://mantrasukabumi.pikiran-rakyat.com/kesehatan/pr-201027214/konsumsi-5-jenis-makanan-ini-agar-terhindar-dari-penyakit-diabetes",
            "urlToImage": "https://assets.pikiran-rakyat.com/crop/0x0:0x0/750x500/photo/2020/11/27/3274523022.jpg?v=185",
            "publishedAt": "2020-11-28T08:30:00Z",
            "content": null
        },
        {
            "source": {
                "id": null,
                "name": "Pikiran-rakyat.com"
            },
            "author": "Iyud Walhadi",
            "title": "Fenomena Gerhana Bulan Penumbra Menurut Mitologi Jawa, Bayi Lahir Tak Sempurna hingga Bencana - Isu Bogor - Pikiran Rakyat",
            "description": "Fenomena Gerhana Bulan Penumbra Menurut Mitologi Jawa, Bayi Lahir Tak Sempurna hingga Bencana",
            "url": "https://isubogor.pikiran-rakyat.com/gaduh/pr-451027425/fenomena-gerhana-bulan-penumbra-menurut-mitologi-jawa-bayi-lahir-tak-sempurna-hingga-bencana",
            "urlToImage": "https://assets.pikiran-rakyat.com/crop/0x0:0x0/750x500/photo/2020/11/28/3311258433.jpg?v=185",
            "publishedAt": "2020-11-28T08:23:01Z",
            "content": "ISU BOGOR - Fenomena Gerhana Bulan Penumbra diprediksi terjadi pada 30November2020. Diprediksi akan dimulai sejak pukul 14:29:56 WIB hingga pukul 18:55:48 WIB selama empat jam 25 menit 52 detik.\r\nBah… [+966 chars]"
        }
    ]
  
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /weather

description: 
  get current weather from city we requested

Request:

- headers: access_token (string)
- data:

```json
{
  "city": "string"
}
```

Response:

- status: 200
- body:

```json
{
    "request": {
        "type": "City",
        "query": "Jakarta, Indonesia",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Jakarta",
        "country": "Indonesia",
        "region": "Jakarta Raya",
        "lat": "-6.215",
        "lon": "106.845",
        "timezone_id": "Asia/Jakarta",
        "localtime": "2020-11-28 16:51",
        "localtime_epoch": 1606582260,
        "utc_offset": "7.0"
    },
    "current": {
        "observation_time": "09:51 AM",
        "temperature": 32,
        "weather_code": 143,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png"
        ],
        "weather_descriptions": [
            "Haze"
        ],
        "wind_speed": 7,
        "wind_degree": 310,
        "wind_dir": "NW",
        "pressure": 1006,
        "precip": 0,
        "humidity": 56,
        "cloudcover": 50,
        "feelslike": 31,
        "uv_index": 9,
        "visibility": 5,
        "is_day": "yes"
    }
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 400
- body:

```json
{
  "message": "must Capitalize on first letter"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /todos

description: 
  get all list todo that user created before

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 9,
        "title": "Sleep",
        "description": "Wanna see elephant",
        "status": false,
        "due_date": "2021-02-27T00:00:00.000Z",
        "UserId": 6,
        "createdAt": "2020-11-28T04:23:05.692Z",
        "updatedAt": "2020-11-28T05:41:58.354Z"
    },
    {
        "id": 10,
        "title": "Zebra",
        "description": "in real life",
        "status": true,
        "due_date": "2020-12-10T00:00:00.000Z",
        "UserId": 6,
        "createdAt": "2020-11-28T05:34:36.928Z",
        "updatedAt": "2020-11-28T06:02:09.525Z"
    },
    {
        "id": 11,
        "title": "Eat",
        "description": "in real life",
        "status": false,
        "due_date": "2020-12-02T00:00:00.000Z",
        "UserId": 6,
        "createdAt": "2020-11-28T05:34:53.543Z",
        "updatedAt": "2020-11-28T05:34:53.543Z"
    },
    {
        "id": 12,
        "title": "Aske Her to Date",
        "description": "Eat Food",
        "status": false,
        "due_date": "2020-12-17T00:00:00.000Z",
        "UserId": 6,
        "createdAt": "2020-11-28T05:35:17.201Z",
        "updatedAt": "2020-11-28T05:35:17.201Z"
    }
  ]

```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /todos

description: 
  Create list todo that user made in form

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 16,
    "title": "Running",
    "description": "Wanna beat elephant",
    "status": false,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-11-28T04:23:05.692Z",
    "updatedAt": "2020-11-28T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "title musn't empty",
    "description musn't empty",
    "due date musn't empty",
    "title musn't null",
    "description musn't null",
    "due date musn't null"
  ]
}
```

- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /todos/:id

description: 
  get list todo that user requested

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 9,
    "title": "Sleep",
    "description": "Wanna see elephant",
    "status": false,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-11-28T04:23:05.692Z",
    "updatedAt": "2020-11-28T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /todos/:id

description: 
  Update list todo that user requested

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 9,
    "title": "Sleep",
    "description": "Wanna hug elephant",
    "status": false,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-11-28T04:23:05.692Z",
    "updatedAt": "2020-11-28T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PATCH /todos/:id

description: 
  Update status todo that signed as done/finished

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 9,
    "title": "Sleep",
    "description": "Wanna hug elephant",
    "status": true,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-11-28T04:23:05.692Z",
    "updatedAt": "2020-11-28T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### DELETE /todos/:id

description: 
  Delete status todo that signed as done/finished or not

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "todo success to delete"
}
```

- status: 401
- body:

```json
{
  "message": "you can't get in, you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```