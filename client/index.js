const URL = "http://localhost:3000/"

$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showLoginPage()
    }

    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
    })

    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        showRegisterPage()
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    $("#todo-form").on("submit", (e) => {
        e.preventDefault()
        createTodo()
    })

    $("#btn-logout").on("click", (e) => {
        logout()
    })
})

function beforeLogin() {
    $("#login-page").hide()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
}

function showLoginPage() {
    beforeLogin()
    $("#login-page").show()
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
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        url: `${URL}login`,
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

function onSignIn(googleUser) {
    let google_access_token = googleUser.getAuthResponse().id_token;
//     console.log(google_access_token)
    
//     var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $.ajax({
        url: `${URL}googleLogin`,
        method: "POST",
        data: {
            google_access_token
        }
    })
    .done(res=>{
        const token = res.access_token
        localStorage.setItem('token', token)
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
        allTodo()


        Toast.fire({
            icon: 'success',
            title: `${name} Signed in successfully`
        })
    })
    .fail(err=>[
        console.log(err)
    ])
  }

function register() {
    const name = $("#name-register").val()
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    $.ajax({
        url: `${URL}register`,
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
    showLoginPage();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function fetchTodo() {
    $("#list-todo").empty()
    $.ajax({
        url: `${URL}todos`,
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            response.forEach(e => {
                $("#list-todo").append(`
                    <div class="col-4">
                        <class class="card text-center" style="margin: 5%">
                        <div class="card-header">
                            <h5 class="card-title">${e.title}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${e.description}</p>
                            <p class="card-text">${e.due_date}</p>
                            <span class="badge badge-warning">Not yet</span><br><br>
                            <button class="btn btn-danger" onclick="deleteTodo(${e.id})">Delete</button>
                        </div>
                        </class>
                    </div>`)
            });
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus)
        })
}

function createTodo() {
    const title = $("#title-todo").val()
    const description = $("#description-todo").val()
    const due_date = $("#duedate-todo").val()
    $.ajax({
        url: `${URL}todos`,
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
        url: `${URL}todos/${id}`,
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
        url: `${URL}todos/${id}`,
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
}
