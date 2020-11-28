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
function login(){
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
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
            url: "http://localhost:3000/register",
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
    showLoginPage()
}
function fetchTodo(){
    $("#todo-list").empty()
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        console.log(response)
        response.forEach(element => {
            $("#todo-list").append(`

            <div class="card bg-ligth mb=10 pd=10" >

            <div class="card-deck m">

                <div class="card-body text-center">
            
                    <p class="card-text">${element.title}</p>
                    <p class="card-text text-muted"> ${element.due_date.substr(0, 10)}</p>
                    <p class="card-text">${element.description}</p>
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
        url: "http://localhost:3000/todos",
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
        console.log(response)
    })
    .fail(xhr => {
        console.log(xhr)
    })
}
function cancelEdit(event){
    event.preventDefault()
    $("#todo-list").show()
    $("#formEdit").remove()

}
function editTodoForm(id){
    todoId = id
    console.log(todoId)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${todoId}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        $("#todo-list").hide()
        $("#edit-form").append(`
        <form id="formEdit">
            <div class="row">
            <div class="col">
            <input type="text" class="form-control title" placeholder="Title" id="titleEdit" value="${response.title}">
            </div>
            <div class="col">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${response.due_date.split('T')[0]}">
            </div>
         </div>
            <div class="form-group">
                <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${response.description}</textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="edit-todo">Edit</button>
                <button onclick="cancelEdit(event)" class="btn btn-danger">Cancel</button>
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
    const description = $("descriptionEdit").val()
    const status = statusTodo
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/todos/" + todoId,
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
        console.log(response)
    })
    .fail(xhr => {
        console.log(xhr)
    })
}
function deleteTodo(id){
    $.ajax({
        method: "delete",
        url: "http://localhost:3000" + "/todos/" + id,
        headers: {
            access_token: localStorage.access_token
        }
    });
}