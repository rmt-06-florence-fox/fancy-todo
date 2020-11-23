# fancy-todo

**Title**
----
  Read Todo

* **URL**

  /todos

* **Method:**
  
  `GET`
  
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

  * **Code:** 500 INTERNAL SERVER ERROR <br />