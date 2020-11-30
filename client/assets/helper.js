function showLoginPage() {
    $('#register-form').hide()
    $("#login-form").show()
    $("#todo-list").hide()
    $("#logout-button").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").hide()
    $("#content-weather").hide()
}

function showRegisterPage() {
    $('#register-form').show()
    $("#login-form").hide()
    $("#todo-list").hide()
    $("#logout-button").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").hide()
    $("#content-weather").hide()
}

function showMainPage() {
    $('#register-form').hide()
    $("#login-form").hide()
    $("#todo-list").show()
    $("#logout-button").show()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#addModalButton").show()
    $("#content-weather").show()
    fetchTodo()
}

function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        url: 'https://todo-taufiq-ismail-server.herokuapp.com/login',
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
    $.ajax({
        url: 'https://todo-taufiq-ismail-server.herokuapp.com/register',
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


function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'https://todo-taufiq-ismail-server.herokuapp.com/googlelogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail(err => console.log(err))
}

function fetchTodo() {
    $.ajax({
        method: "GET",
        url: "https://todo-taufiq-ismail-server.herokuapp.com/todos",
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
                <button class="btn btn-secondary text-white" onclick=" $('#edit-todo-form').show(), getEditTodo(${todo.id})">Edit</button>
                <button class="btn btn-danger text-white" onclick="deleteTodo(${todo.id})">Delete</button>
                <button class="btn btn-primary text-white" onclick="completeTodo(${todo.id})">Complete</button>
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
        url: 'https://todo-taufiq-ismail-server.herokuapp.com/todos',
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

let editId
function getEditTodo(id) {
    $.ajax({
        method: "GET",
        url: "https://todo-taufiq-ismail-server.herokuapp.com/todos/" + id,
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
        url: 'https://todo-taufiq-ismail-server.herokuapp.com/todos/' + editId,
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
        url: "https://todo-taufiq-ismail-server.herokuapp.com/todos/" + id,
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


function completeTodo(id) {
    $.ajax({
        method: "PATCH",
        url: "https://todo-taufiq-ismail-server.herokuapp.com/todos/" + id,
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
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function weather() {
    $.ajax({
        method: "GET",
        url: "https://todo-taufiq-ismail-server.herokuapp.com/todos/weather",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            $("#icon-weather").empty()
            $("#temperature").empty()
            $("#desc-weather").empty()
            $("#location-weather").empty()
            $("#local-time").empty()
            $('#icon-weather').append(`<img src="${response.current.weather_icons[0]}" alt="weather">`)
            $('#temperature').append(`<h1>${response.current.temperature}°</h1>`)
            $('#desc-weather').append(`<p>${response.current.weather_descriptions[0]}</p>`)
            $('#location-weather').append(`<p>${response.location.name}</p>`)
            $('#local-time').append(`<p>${response.location.localtime}</p>`)

           
        })
        .fail(xhr => {
            console.log(xhr);
        })
}
