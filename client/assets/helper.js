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
    $('#btn-AddTodo').show()
    $('#holiday-div').show()
    $('#todo-form').hide()
    $('#btn-logout').show()
    $('#todo').show()
    fetchTodos()
    fetchHolidays()
}

function showAddTodo() {
    $('#main-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#btn-AddTodo').hide()
    $('#holiday-div').show()
    $('#todo-form').show()
    $('#btn-logout').show()
    $('#todo').hide()
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
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    showLoginPage()
}

function fetchHolidays() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/date",
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done(res => {
            $("#holiday-list").empty()
            res.forEach(holiday => {
                $("#holiday-list").append(`<h3 class="card-title" style="text-align: center">${holiday.date.iso.slice(0, 10)}</h3>
                <div class="card col-12" style="height: auto !important; object-fit: cover">
                <h5 style="text-align: center;"><strong>${holiday.name}</strong></h5>
                <h5 style="text-align: justify;">${holiday.description}</h5>
                </div>`)
            })
        })
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
                $("#todo-list").append(`<div class="card" style="margin-left: 1em;  margin-bottom: 1em; height: 200px; width: 300px">
                    <h3 style="text-align: center"><strong>${todo.title}</strong></h3>
                    <h5 style="text-align: justify;">Description: ${todo.description}</h5>
                    <h5 style="text-align: justify;">Date: ${todo.due_date}</h5>
                    <form class="form-group" id="patch-form">
                    <label for="status">Status: </label>
                    <input type="checkbox" id="status" name="status" value="Done"
                    </form>
                    <div class="row">
                        <button class="btn btn-primary text-white col-3" style="margin-left: 1em;" onclick="editTodo(${todo.id})">Edit</button>
                        <button class="btn btn-warning text-white col-3" onclick="deleteTodo(${todo.id})">Delete</button>
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
            due_date
        }
    })
        .done(res => {
            showMainPage()
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
        .done(res => {
            
        })
}

function patchTodo(id) {
    const status = $("#status").val()
    console.log(status);
    $.ajax({
        method: "PATCH",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            accesstoken: localStorage.getItem("accesstoken")
        },
        data: {
            status
        }
    })
        .done(res => {
            fetchTodos()
        })
        .fail(xhr => {
            console.log(xhr);
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

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    gapi.auth2.getAuthInstance().disconnect()

    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(res => {
            localStorage.setItem('accesstoken', res.accesstoken)
            showMainPage()
        })
        .fail(err => {
            console.log(err);
        })
}