const URL = "http://localhost:3000"
const localToken = localStorage.getItem("access_token")

$(document).ready(_ => {
    $("#form-login").on("submit", (e) => {
        e.preventDefault()
        login()
    })
    $("#form-register").on("submit", (e) => {
        e.preventDefault()
        register()
    })
    $("#btn-logout").on("submit", (e) => {
        e.preventDefault()
        logout()
    })
    $("#fm-todo").on("submit", (e) => {
        e.preventDefault()
        todo()
    })
    $("#link-register").on("click", (e) => {
        e.preventDefault()
        registerPage()
    })
    $("#link-login").on("click", (e) => {
        e.preventDefault()
        loginPage()
    })
});

localStorage.getItem('access_token') ? mainPage() : loginPage();
function onSignIn(googleUser) {
    console.log("ini html");
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: URL + `/googleLogin`,
        method: "POST",
        data: {
            googleToken
        }
    })
    .done(response => {
        console.log("respons");
        localStorage.setItem('access_token', response.access_token)
        mainPage()
    })
    .fail(err => {
        console.log(err);
    })
}
function registerPage() {
    $("#login-page").hide()
    $("#main-page").hide()
    $("#register-page").show()
}
function loginPage() {
    $("#login-page").show()
    $("#main-page").hide()
    $("#register-page").hide()
}
function mainPage() {
    $("#login-page").hide()
    $("#main-page").show()
    $("#register-page").hide()
    $("#form-update").hide()
    $("#form-add").show()
    fetchTodo()
}
function login() {
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax({
        type: "POST",
        url: URL + `/login`,
        data: { email, password }
    })
        .done(data => {
            fetchTodo()
            localStorage.setItem('access_token', data.access_token)
            mainPage()
        })
        .fail((xhr, text) => {
            console.log(text)
        })
        .always(() => {
            $("#f-signIn").trigger("reset")
        })
}
function logout() {
    localStorage.clear()
    loginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function register() {
    let full_name = $("#register-full_name").val()
    let email = $("#register-email").val()
    let password = $("#register-password").val()

    $.ajax({
        type: "POST",
        url: URL + `/register`,
        data: { full_name, email, password }
    })
        .done(data => {
            loginPage()
        })
        .fail((xhr, text) => {
            console.log(text)
        })
        .always(() => {
            $("#fm-register").trigger("reset")
        })
}
function todo() {
    let title = $("#todo-title").val()
    let description = $("#todo-description").val()
    let due_date = $("#todo-date").val()

    $.ajax({
        type: "POST",
        url: URL + `/todos`,
        data: { title, description, due_date },
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(data => {
            fetchTodo()
        })
        .fail((xhr, text) => {
            console.log("masuk failed");
            console.log(text)
        })
        .always(() => {
            $("#fm-todo").trigger("reset")
        })
}
function updateStatus(id) {
    $.ajax({
        method: "PATCH",
        url: URL + `/todos/${id}`,
        headers: {
            access_token: localToken
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err);
    })
}
function deleteTodo(id) {
    $.ajax({
        method: "DELETE",
        url: URL + `/todos/${id}`,
        headers: {
            access_token: localToken
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err);
    })
}
function showUpdateTodo(id) {
    $("#form-add").hide()
    $("#form-update").show()
    $.ajax({
        method: "GET",
        url: URL + `/todos/${id}`,
        headers: {
            access_token: localToken
        }
    })
    .done(response => {
        $("#form-update").empty()
        if (response.status) {
            $("#form-update").append(`
                <p style="color: #63F1FF">update todo</p>
                <form id="fm-update" onsubmit="updateTodo(event, ${response.id})">
                    <div class="form-group">
                        <label for="email">Title</label>
                        <input type="text" class="form-control form-control-sm" id="update-title" name="title" value="${response.title}">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control form-control-sm" id="update-description" rows="3"
                            name="description" value="${response.description}">${response.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select class="form-control" id="update-status">
                            <option>---select---</option>
                            <option value="true" selected>true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="due_date">Due Date</label><br>
                        <input class="form-control form-control-sm" type="date" id="update-date" name="due_date" value="${response.due_date}">
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">submit update</button>
                </form>
            `)
        } else {
            $("#form-update").append(`
                <p style="color: #63F1FF">update todo</p>
                <form id="fm-update" onsubmit="updateTodo(event,${response.id})">
                    <div class="form-group">
                        <label for="email">Title</label>
                        <input type="text" class="form-control form-control-sm" id="update-title" name="title" value="${response.title}">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control form-control-sm" id="update-description" rows="3"
                            name="description" value="${response.description}">${response.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select class="form-control" id="update-status">
                            <option>---select---</option>
                            <option value="true">true</option>
                            <option value="false" selected>false</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="due_date">Due Date</label><br>
                        <input class="form-control form-control-sm" type="date" id="update-date" name="due_date" value="${response.due_date}">
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">submit update</button>
                </form>
            `)
        }
    })
    .fail(err => {
        console.log(err);
    })
    
}
function updateTodo(e, id) {
    e.preventDefault()
    const title = $("#update-title").val()
    const description = $("#update-description").val()
    const status = $("#update-status").val()
    const due_date = $("#update-date").val()

    $.ajax({
        method: "PUT",
        url: URL + `/todos/${id}`,
        headers: {
            access_token: localToken
        },
        data: { title, description, status, due_date }
    })
    .done( () => {
        mainPage()
    })
    .fail(xhr => {
        console.log(xhr);
    })

}
function fetchTodo() {
    $("#todo-list").empty()
    $.ajax({
        method: "GET",
        url: URL + `/todos`,
        headers: {
            access_token: localToken
        }
    })
        .done(response => {
            response.forEach(el => {
                if (el.status) {
                    $("#todo-list").append(`
                        <div class="card bg-light border-success">
                            <div class="card-body">
                                <div class="form-group row">
                                    <div class="col-sm" id="title">${el.title}</div>
                                    <div class="col-sm" align="center">
                                        <span class="badge badge-pill badge-success">completed</span>
                                    </div>
                                    <div> due date :<br><span class="badge badge-secondary">${el.due_date}</span> </div>
                                    <div class="col-sm" id="title" align="right">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-info btn-sm">Act</button>
                                            <button type="button"
                                                class="btn btn-info dropdown-toggle dropdown-toggle-split btn-sm"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu" id="add-act">
                                                <a class="dropdown-item" id="showUpdateTodo" onClick="showUpdateTodo(${el.id})" style="color: blue;">Update</a>
                                                <a class="dropdown-item" onClick="deleteTodo(${el.id})" style="color: red;">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="form-group row" align="left">
                                    <div class="col-sm">
                                        <small>${el.description}</small>
                                    </div>
                                </div>
                            </div>
                        </div><br>
                        `)
                } else {
                    $("#todo-list").append(`
                        <div class="card border-danger">
                            <div class="card-body">
                                <div class="form-group row">
                                    <div class="col-sm" id="title">${el.title}</div>
                                    <div class="col-sm" align="center">
                                        <span class="badge badge-pill badge-danger">uncompleted</span>
                                    </div>
                                    <div> due date :<br><span class="badge badge-secondary">${el.due_date}</span> </div>
                                    <div class="col-sm" id="title" align="right">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-info btn-sm">Act</button>
                                            <button type="button"
                                                class="btn btn-info dropdown-toggle dropdown-toggle-split btn-sm"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" id="showUpdateTodo" onClick="showUpdateTodo(${el.id})" style="color: blue;">Update</a>
                                                <a class="dropdown-item" onClick="deleteTodo(${el.id})" style="color: red;">Delete</a>
                                                <a class="dropdown-item" onClick="updateStatus(${el.id})" style="color: green;">Mark as Done</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row" align="left">
                                    <div class="col-sm">
                                        <small>${el.description}</small>
                                    </div>
                                </div>
                            </div>
                        </div><br>
                        `)
                }
            });
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

