const SERVER = "http://localhost:3000"


$(document).ready(() => {
    const token = localStorage.getItem("token")
    console.log(token);
    if (token) {
        $("#content").show()
        $("#add-todo").show()
        listTodo()
        $("#landing").hide()
        $("#edit-todos").hide()
    } else {
        $("#content").hide()
        $("#landing").show()
        $("#add-todo").hide()
        $("#edit-todos").hide()
    }
})

function login(event) {
    event.preventDefault()

    const email = $("#login-email").val()
    const password = $("#login-password").val()
    console.log(email, password);

    $.ajax({
        method: "POST",
        url: SERVER + "/user/login",
        data: {
            email: email,
            password: password
        }
    })
        .done(response => {
            const token = response.access_token
            localStorage.setItem("token", token)
            console.log(response, "<< response", token, "<< token");
            $("#content").show()
            $("#landing").hide()
            $("#login-email").val("")
            $("#login-password").val("")
            $("#add-todo").hide()
            listTodo()
        })
        .fail(err => {
            console.log(err);
        })
}

function logout() {
    $("#landing").show()
    $("#content").hide()
    localStorage.removeItem("token")
}

function onSignIn(googleUser) {
    console.log('masuk');
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token, "<<< google_access_token");

    $.ajax({
        method: "POST",
        url: SERVER + "/user/googleLogin",
        data: {
            google_access_token
        }
    })
        .done(response => {
            localStorage.setItem("token", response.token)
            console.log(response.token);
            $("#landing").hide()
            $("#content").show()
        })
        .fail(err => {
            console.log(err);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function listTodo(){
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }
    }).done(response => {
        const todos = response.dataTodo
        console.log(todos)
        $("#title-todo").show()
        $("#list-todos").empty()
        todos.forEach(el => {

            $("#list-todos").append(`
            
                <div class="col-6 mt-5 md-3">
                    <p>${el.title}</p>
                    <p>${el.description}</p>
                    <p>${el.status}</p>
                    <p>${el.due_date}</p>
                    <button type="submit" class="btn btn-primary" style="background-color: green;" onClick="editTodo(${el.id},'${el.title}','${el.description}','${el.status}','${el.due_date}')">Edit</button>
                    <button type="submit" class="btn btn-primary" style="background-color: red;" onClick="deleteTodo(${el.id})">Delete</button>
                </div>
            `)
        })
        console.log(todos, '<< response append')
    }).fail(err => {
        console.log(err)
    })
}

function addTodo(event) {
    event.preventDefault()
    console.log('masuk add todo');

    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const status = $("#add-status").val()
    const due_date = $("#add-due_date").val()

    const token = localStorage.getItem("token")
    console.log(token);
    $.ajax({
        method: "POST",
        ulr: SERVER + "/todos",
        data: {
            title,
            description,
            status,
            due_date
        },
        Headers: {
            token
        }
    })
        .done(res => {
            console.log(res, "ini res");
            listTodo()
        })
        .fail(err => {
            console.log(err);
        })
}
function edit(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const status = $("#edit-status").val()
    const due_date = $("#edit-due_date").val()

    $.ajax({
        url: SERVER + "/todos/" + tempId,
        method: "PUT",
        headers: {token},
        data: {title, description, status, due_date}
    }).done(response => {
        showTodos()
    }).fail(err => {
        console.log(err)
    })
}

function editTodo(id,title,description,status,due_date) {
    console.log(id,title,description,status,due_date)
    $("#content").hide()
    $("#edit-form").show()
    $("#add-todo").hide()

    $("#edit-title").val(title)
    $("#edit-description").val(description)
    $("#edit-status").val(status)
    $("#edit-due_date").val(due_date)
    newId = id
}

function deleteTodo(id) {
    //console.log(id, 'ini id')
    const token = localStorage.getItem("token")
    $.ajax({
        url: SERVER + "/todos/" + id,
        method: "DELETE",
        headers: {token}
    }).done(response => {
        $("#content").show()
        showTodos()
    }).fail(err => {
        console.log(err)
    })
}