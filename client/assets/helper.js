function showRegistrationPage() {
    $("#registration-page").show()
    $("#login-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
    $("#todo-edit").hide()
    $("#add-form-page").hide()   
    $("#list").hide()   
}
function showLoginPage() {
    $("#login-page").show()
    $("#registration-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $("#todo-edit").hide()
    $("#add-form-page").hide()
    $("#list").hide()   
}
function showMainPage() {
    $("#login-page").hide()
    $("#registration-page").hide()
    $("#main-page").show()
    $("#btn-logout").show()
    $("#todo-edit").hide()
    $("#add-form-page").hide()
    $("#list").hide()   
}
function showList() {
    $("#login-page").hide()
    $("#registration-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
    $("#todo-edit").hide()
    $("#add-form-page").hide()
    $("#list").show()   
}
function showEditTodo(todo) {
    $("#login-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $('#todo-edit').show()
    $("#add-form-page").hide() 
    $("#list").hide()              
    $("#todo-edit").append(`
        <h2>Form Edit Todo</h2>
        <form id="form-edit" onsubmit="updateTodo(${todo.id})">
            <div class="form-group">
                <label for="addTitle">Title</label>
                <input type="text" class="form-control" id="title-edit" value="${todo.title}">
            </div>
            <div class="form-group">
                <label for="addDescription">Description</label>
                <input type="text" class="form-control" id="description-edit" value="${todo.description}">
            </div>
            <div class="form-group">
                <label for="addStatus">Status</label>
                <input type="text" class="form-control" id="status-edit" value="${todo.status}">
            </div>
            <div class="form-group"> 
                <label for="addDueDate">Due Date</label>
                <input type="date" class="form-control" id="duedate-edit" value="${todo.due_date}">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button></br></br>
        </form>
    `)                                   
}
function showAddForm () {
    $("#login-page").hide()
    $("#registration-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $("#todo-edit").hide()
    $("#add-form-page").show()
    $("#list").hide()   
}
function register() {
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    console.log(email, '<<<email', password, '<<<password');
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
        console.log(xhr, textStatus)
    })
    .always(() => {
        $("#email-register").val("")
        $("#password-register").val("")
    })
}
function login() {
    const email = $("#email-input").val()
    const password = $("#password-input").val()
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
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
function logout() {
    localStorage.clear()
    showLoginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
function fetchTodos() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        $("#todo-list").empty()              
        response.forEach(todo => {
            //console.log(todo)
            $("#todo-list").append(todo.title,' | ', todo.description,' | ', todo.status,' | ', todo.due_date,' | ', `<button onclick="editTodo(${todo.id})">Edit</button>`,' | ' ,`<button onclick="deleteTodo(${todo.id})">Delete</button>`,`</br>`)
        })
    })
    .fail (xhr => {
        console.log(xhr)
    })
}
function createTodo () {
    const title = $("#title-input").val()
    const description = $("#description-input").val()
    const status = $("#status-input").val()
    const due_date = $("#duedate-input").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
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
        showMainPage()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    .always(() => {
        $("#title-input").val("")
        $("#description-input").val("")
        $("#status-input").val("")
        $("#duedate-input").val("")
    })
}
function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchTodos()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    //console.log(id)
}

function editTodo(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        showEditTodo(response)
    })
    .fail(xhr => console.log(xhr))
}
function updateTodo(id) {
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const status = $('#status-edit').val()
    const due_date = $('#duedate-edit').val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            access_token: localStorage.getItem('access_token')
        },
        data:{
            title,
            description,
            status,
            due_date
        }
    })
    .done(() => {
        showList()
    })
    .fail(xhr => console.log(xhr))
    .always(_ => $('#todo-edit').trigger('reset'))
}
function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail(err => {
        console.log(err)
    })
}