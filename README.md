# fancy-todo

A simple todo-apps using node.js, express, sequelize

## REST endpoint

URL | Method | Details | Body
---- | ---- | ---- | ----
/todos | POST | Register new todo to todo list
/todos | GET | Retrieves all todos submitted by users
/todos/```id``` | GET | Retrieves todo by ```id```
/todos/```id``` | PUT | Edit todo content by ```id```
/todos/```id``` | PATCH | Edit status of todo by ```id```
/todos/```id``` | DELETE | Delete todo from todo list by ```id```

> ## POSTMAN DOCUMENTATION
https://documenter.getpostman.com/view/13590601/TVewa5JZ