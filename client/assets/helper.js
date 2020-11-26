function showRegisterPage(){
    $('#register-page').show()
    $('#login-page').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
}

function showLoginPage() {
    $('#login-page').show()
    $('#register-page').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
}

function showMainPage() {
    $('#main-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#btn-logout').show()
    fetchTodos()
}

function register() {
    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()

    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(res => {
            console.log(res);
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus);
        })
        .always(_ => {
            $("#registerEmail").val("")
            $("registerPassword").val("")
        })
}

function login() {
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()

    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(res => {
            localStorage.setItem('accesstoken', res.accesstoken)
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus);
        })
        .always(() => {
            $("#loginEmail").val("")
            $("loginPassword").val("")
        })
}

function logout() {
    localStorage.clear()
    showLoginPage()
}

function fetchTodos() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done(res => {
            $("#todo-list").empty()
            res.forEach(todo => {
                $("#todo-list").append(`<div class="col-4" style="height: 300px !important; object-fit: cover">
                    <div class="card">
                        <h3 class="card-title">${todo.title}</h3>
                        <div class="card-body">
                            <h5 class="card-duedate">${todo.due_date}</h5>
                            <p class="card-description">${todo.description}</p>
                            <h5 class="card-status">${todo.status}</h5>
                            <button class="btn btn-primary text-white col-4" onclick="editTodo(${todo.id})">Edit</button>
                            <button class="btn btn-warning text-white col-4" onclick="deleteTodo(${todo.id})">Delete</button>
                        </div>
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
    const due_date = $("#duedate-input").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(res => {
            fetchTodos()
            console.log(res);
        })
        .fail(xhr => {
            console.log(xhr);
        })
        .always(() => {
            $("#todo-form").trigger("reset")
        })
}

function editTodo(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
}

function deleteTodo(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            accesstoken: localStorage.getItem("accesstoken")
        }
    })
        .done(res => {
            fetchTodos()
        })
        .fail(err => {
            console.log(err);
        })
}

$('#toLoginForm').on("click", function(e) {
    e.preventDefault()
    showLoginPage()
})

$('#toRegisterForm').on("click", function(e) {
    e.preventDefault()
    showRegisterPage()
})

$('#btn-logout').on("click", function(e) {
    logout()
})