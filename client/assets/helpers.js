let todoId = null
let statusTodo = null

function showLoginPage(){
    $("#login-page").show()
    $("#register-page").hide()
    $("#list-todo").hide()
    $("#btn-logout").hide()
}
function showMainPage(){
    $("#login-page").hide()
    $("#register-page").hide()
    $("#list-todo").show()
    $("#btn-logout").show()
    fetchTodo()
}
function registerPage(){
    $("#login-page").hide()
    $("#register-page").show()
    $("#list-todo").hide()
    $("#btn-logout").hide()
}
function onSignIn(googleUser) {
     // This is null if the 'email' scope is not present.
     const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: "http://localhost:3001/googleLogin",
        data: { googleToken }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
        console.log(response)
    })
    .fail(xhr => {
        console.log(xhr, "<<< error")
    })
}
function login(){
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3001/login",
        data: {
            email,
            password
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(textStatus)
    })
}
function register(){
    const email = $("#email-regis").val()
    const password = $("#password-regis").val()
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/register",
            data: {
                email,
                password
            }
        })
        .done(response => {
            console.log(response)
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(textStatus)
        })
}
function logout(){
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    showLoginPage()
}
function fetchTodo(){
    $("#todo-list").empty()
    $.ajax({
        method: "GET",
        url: "http://localhost:3001/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        console.log(response)
        response.forEach(element => {
            $("#todo-list").append(`

            <div class="card bg-ligth mt-5 pd=10" >

            <div class="card-deck m">

                <div class="card-body text-center">
            
                    <p class="card-text">${element.title}</p>
                    <p class="card-text text-muted"> ${element.due_date.substr(0, 10)}</p>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">${element.status}</p>
                    <button class="btn btn-primary" onclick="editTodoForm(${element.id})" id="edit-todo"> Edit</button>
                    <button class="btn btn-danger" onclick="deleteTodo(${element.id})" id="delete-todo"> Delete</button> 

                </div>
            </div>
            `)
        });
    })
}
function addTodo(){
    const title = $("#title-add").val()
    const due_date = $("#due_date-add").val()
    const description = $("#add-description").val()
    const status = $("#status-add").val()
    statusTodo = status

    $.ajax({
        method: "POST",
        url: "http://localhost:3001/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            due_date,
            description,
            status
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
function cancelEdit(event){
    event.preventDefault()
    console.log(event)
    $("#todo-list").show()
    $("#edit-form").hide()
}
function editTodoForm(id){
    todoId = id
    console.log(id)
    $.ajax({
        method: "GET",
        url: `http://localhost:3001/todos/${todoId}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        $("#todo-list").hide()
        $("#edit-form").append(`
        <form id="formEdit mt-2">
            <div class="row">
            <div class="col">
            <input type="text" class="form-control title" placeholder="Title" id="titleEdit" value="${response.title}">
            </div>
            <div class="col">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${response.due_date.split('T')[0]}">
            </div>
         </div>
         <div class="form-group">
         <div class="form-group w-100 mt-2">
             <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${response.description}</textarea>
             </div>
                <label > Status</label>
                <select id="status-edit">
                    <option checked></option>
                    <option value="finised">finished</option>
                    <option value="unfinised">unfinished</option>

                </select>
            </div>
                <button type="submit" class="btn btn-primary" id="edit-todo">Edit</button>
                <button id="cancel-edit" onclick="cancelEdit(event)" class="btn btn-danger">Cancel</button>
            </form>
        `)  
        
    })
    .fail(xhr => {
        console.log(xhr)
    })
}

function editTodo(){
    const title = $("#titleEdit").val()
    const due_date = $("#dueDateEdit").val()
    const description = $("#descriptionEdit").val()
    const status = $("#status-edit").val()
    console.log(status, description, due_date, title, "<<<< edit todo")
    $.ajax({
        method: "PUT",
        url: "http://localhost:3001/todos/" + todoId,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: { 
            title,
            due_date,
            description,
            status
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
function deleteTodo(id){
    $.ajax({
        method: "delete",
        url: "http://localhost:3001" + "/todos/" + id,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(_ => {
            fetchTodo()
        })
        .fail(xhr => {
            console.log(xhr)
        })
}