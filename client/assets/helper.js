function showLoginPage() {
    $('#register-form').hide()
    $("#login-form").show()
    $("#todo-list").hide()
    $("#logout-button").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").hide()
}

function showRegisterPage() {
    $('#register-form').show()
    $("#login-form").hide()
    $("#todo-list").hide()
    $("#logout-button").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").hide()
}

function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    console.log(email, password);
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr.responseJSON, textStatus);
        })
        .always(_ => {
            $("#email-login").val("")
            $("#password-login").val("")
        })
}

function register() {
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    console.log(email, password);
    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr.responseJSON, textStatus);
        })
        .always(_ => {
            $("#email-register").val("")
            $("#password-register").val("")
        })
}

function showMainPage() {
    $('#register-form').hide()
    $("#login-form").hide()
    $("#todo-list").show()
    $("#logout-button").show()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").show()
    fetchTodo()
}

function fetchTodo() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            weather()
            $("#todo-list").empty()
            response.forEach(todo => {
                $("#todo-list").append(`<div class="card mb-4 ml-4">
            <div class="card-body">
                <h5 class="card-title">${todo.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${todo.status}</h6>
                <p class="card-text">${todo.description}</p>
                <p class="card-text">Due Date: ${todo.due_date}</p>
                <button class="btn btn-secondary text-white col-5" onclick=" $('#edit-todo-form').show(), getEditTodo(${todo.id})">Edit</button>
                <button class="btn btn-danger text-white col-5" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        </div>`)
            })
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

function createTodo() {
    const title = $("#title-input").val()
    const description = $("#description-input").val()
    const status = $("#status-input").val()
    const due_date = $("#due_date-input").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(response => {
            fetchTodo()
            console.log(response);
        })
        .fail(xhr => {
            console.log(xhr);
        })
        .always(_ => {
            $("add-todo-form").trigger("reset")
        })
}

let editId
function getEditTodo(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            title = $("#title-edit").val(response.title),
                description = $("#description-edit").val(response.description),
                status = $("#status-edit").val(response.status),
                due_date = $("#due_date-edit").val(response.due_date)
            editId = response.id
        })

}

function editTodo() {
    const title = $("#title-edit").val()
    const description = $("#description-edit").val()
    const status = $("#status-edit").val()
    const due_date = $("#due_date-edit").val()

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/todos/' + editId,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(response => {
            fetchTodo()
        })
        .fail(xhr => {
            console.log(xhr);
        })
        .always(_ => {
            $("add-todo-form").trigger("reset")
        })
}

function deleteTodo(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(_ => {
            fetchTodo()
        })
        .fail(err => {
            console.log(err);
        })
}

function logout() {
    localStorage.clear()
    showLoginPage()
}

function weather() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/weather",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            console.log(response);
        })
        .fail(xhr => {
            console.log(xhr);
        })
}