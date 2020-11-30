function beforeLogin() {
    $("#login-page").hide()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
}

function showLoginPage() {
    beforeLogin()
    $("#login-page").show()
    // $("#btn-logout").show()
}

function showRegisterPage() {
    beforeLogin()
    $("#register-page").show()
}

function showMainPage() {
    beforeLogin()
    $("#main-page").show()
    $("#btn-logout").show()
    fetchTodo()
}

function login() {
    const email = $("#email-input").val()
    const password = $("#password-input").val()
    $.ajax({
        url: 'http://localhost:3000/signIn',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus)
        })
        .always(() => {
            $("#email-input").val("")
            $("#password-input").val("")
        })
}

function register() {
    const name = $("#name-register").val()
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    $.ajax({
        url: 'http://localhost:3000/signUp',
        method: 'POST',
        data: {
            name,
            email,
            password
        }
    })
        .done(response => {
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus)
        })
        .always(() => {
            $("#name-register").val("")
            $("#email-register").val("")
            $("#password-register").val("")
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

function fetchTodo() {
    $("#list-todo").empty()
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            response.forEach(todo => {
                $("#list-todo").append(`
                    <div class="col-4">
                        <class class="card text-center" style="margin: 5%">
                        <div class="card-header">
                            <h5 class="card-title">${todo.title}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${todo.description}</p>
                            <p class="card-text">${todo.due_date}</p>
                            <span class="badge badge-warning">Not yet</span><br><br>
                            <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
                        </div>
                        </class>
                    </div>`)
                
                // console.log(todo)
            });

        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus)
        })
}

function createTodo() {
    const title = $("#title-input").val()
    const description = $("#descrip-input").val()
    const due_date = $("#duedate-input").val()
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(response => {
            fetchTodo()
            // console.log(response)
        })
        .fail(xhr => {
            console.log(xhr)
        })
        .always(() => {
            $("#todo-form").trigger("reset")
        })
}

function updateStatus(id) {
    $.ajax({
        url: 'http://localhost:3000/todos/`${id}`',
        method: 'PATCH',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            fetchTodo()
            console.log(response)
        })
        .fail(xhr => {
            console.log(xhr)
        })
}

function deleteTodo(id) {
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    // console.log(id)
}

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    // console.log(googleToken)
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage();
        })
        .fail(err => {
            console.log(err);
        })
}