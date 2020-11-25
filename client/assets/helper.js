function showLoginPage() {
    $("#login-page").show()
    $("#main-page").hide()
    $("#btn-logout").show()
}
function showMainPage() {
    $("#login-page").hide()
    $("#main-page").show()
    $("#btn-logout").show()
    $('#todo-edit').hide()
    fetchTodos()
}
function showEditTodo() {
    $("#login-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $('#todo-edit').show()
    fetchTodos()           
    $('#todo-edit').append(`
        <h2>Form Edit Todo</h2>
        <form id="todo-edit" onsubmit="updateData(${todo.id})>
            <div>
                <label for="addTitle">Title</label>
                <input type="text" id="title-edit" value="${todo.title}">
            </div>
            <div>
                <label for="addDescription">Description</label>
                <input type="text" id="description-edit" value="${todo.description}">
            </div>
            <div>
                <label for="addStatus">Status</label>
                <input type="text" id="status-edit" value="${todo.status}">
            </div>
            <div>
                <label for="addDueDate">Due Date</label>
                <input type="date" id="duedate-edit" value="${todo.due_date}">
            </div>
            <button type="submit">Submit</button>
        </form>
    `)                                   
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
        fetchTodos()
        console.log(response)
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
        showEditTodo(response.data)
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
    .done(response =>{
        showMainPage()
    })
    .fail(xhr => console.log(xhr))
    .always(_ => $('#edit-todo').trigger('reset'))
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