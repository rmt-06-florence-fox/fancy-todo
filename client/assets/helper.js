function mainPage() {
    $("#register-page").hide()
    $("#login-page").hide()
    $("#create-page").hide()
    $("#main-page").show()
    $("#btn-logout").show()
    $('.g-signin2').hide()
    $("#btn-create").show()
    $("#btn-holiday").show()
    $("#holiday-table").hide()
    $("#edit-page").hide()
}
function registerPage() {
    $("#register-page").show()
    $("#login-page").hide()
    $("#create-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
    $('.g-signin2').show()
    $("#btn-create").hide()
    $("#btn-holiday").hide()
    $("#holiday-table").hide()
    $("#edit-page").hide()
}
function loginPage() {
    $("#register-page").hide()
    $("#login-page").show()
    $("#create-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
    $('.g-signin2').show()
    $("#btn-create").hide()
    $("#btn-holiday").hide()
    $("#holiday-table").hide()
    $("#edit-page").hide()
}
function holidayPage() {
    $("#register-page").hide()
    $("#login-page").hide()
    $("#create-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $('.g-signin2').hide()
    $("#btn-create").show()
    $("#btn-holiday").show()
    $("#holiday-table").show()
    $("#edit-page").hide()
    calendar()
}
function createPage() {
    $("#button-add").show()
    $("#button-holiday").show()
    $("#register-page").hide()
    $("#login-page").hide()
    $("#create-page").show()
    $("#main-page").hide()
    $("#btn-logout").show()
    $('.g-signin2').hide()
    $("#holiday-table").hide()
    $("#edit-page").hide()
}
function editPage() {
    $("#register-page").hide()
    $("#login-page").hide()
    $("#create-page").hide()
    $("#main-page").hide()
    $("#btn-logout").show()
    $('.g-signin2').hide()
    $("#btn-add").show()
    $("#btn-holiday").show()
    $("#holiday-table").hide()
    $("#edit-page").show()
}
function register() {
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    
    // server routes register
    $.ajax({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
            email,
            password,
        }
    })
    .done(response => {
        loginPage()
    })
    .fail((xhr, textStatus)=>{
        console.log(xhr, textStatus);
    })
    .always(()=>{
        $("#register-page").trigger('reset')
    })
}
function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    
    // server routes login
    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
            email,
            password,
        }
    })
    .done(response => {
        localStorage.setItem("access_token", response.access_token)
        mainPage()
    })
    .fail((xhr, textStatus)=>{
        console.log(xhr, textStatus);
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
function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token
    // console.log(googleToken);
    $.ajax({
        url: "http://localhost:3000/googleLogin",
        method: "POST",
        data: {
            googleToken
        }
    })
    .done((response)=>{
        console.log(response);
        localStorage.setItem('access_token', response.access_token)
        mainPage()
    })
    .fail((xhr)=>{
        console.log(xhr);
    })
}
function showTodo() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        $(`#todo-list`).empty()
        if (response.length === 0) {
            $(`#todo-empty`).append(
                `<h2 class="text-center">You haven't done anything yet &#128203;</h2>`
            )
        } else {
            // console.log('masuk ga sih?');
            $("#todo-list").empty()
            response.forEach(todo => {
                $("#todo-list").append(`<div class="col-sm-6 my-2">
                    <div class="card">
                        <h3 class="card-title">${todo.title}</h3>
                        <div class="card-body">
                        <p class="card-description">${todo.description}</p>
                            <h5 class="card-status">${todo.status}</h5>
                            <h5 class="card-duedate">${todo.due_date}</h5>
                            <button class="btn btn-primary text-white col-4" onclick="getEditTodo(${todo.id})">Edit</button>
                            <button class="btn btn-warning text-white col-4" onclick="deleteTodo(${todo.id})">Delete</button>
                        </div>
                    </div>
                </div>`)
            })
        }
    })
    .fail(xhr => {
        console.log(xhr);
    })
}
function createTodo() {
const title = $("#title-create").val()
const description = $("#description-create").val()
const status = $("#status-create").val()
const due_date = $("#due_date-create").val()
$.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    headers: {
        access_token: localStorage.getItem("access_token")
    },
    data: {
        title,
        description,
        status,
        due_date
    }
})
    .done(response => {
        console.log(response);
        showTodo()
    })
    .fail(xhr => {
        console.log(xhr);
    })
    .always(() => {
        $("#create-form").trigger("reset")
    })
}
function getEditTodo(params){
    console.log(params)
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/todos/"+params,
        headers:{
        access_token:localStorage.getItem("access_token")
        }
    })
    .done(response=>{
        localStorage.setItem('todo.id',params);
        response.due_date = response.due_date.split("T")[0]
        $("#title-edit").val(response.title)
        $("#description-edit").val(response.description)
        $("#status-edit").val(response.status)
        $("#due_date-edit").val(response.due_date)
        $('#edit-page').show();
    })
    .fail(err => {
        console.log(err)
    })
}
function postEditTodo(){
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const status = $('#status-edit').val()
    const due_date = $('#due_date-edit').val()
    $.ajax({
        method:"PUT",
        url:"http://localhost:3000/todos/" + localStorage.getItem('todo.id'),
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
    .done(response => {
        mainPage();
        showTodo();
    })
    .fail(err => {
        console.log(err)
    })
    .always(_ =>{
        $("#title-edit").val("")
        $("#description-edit").val("")
        $("#status-edit").val("")
        $("#due_date-edit").val("")
    })
}
function deleteTodo(params) {
    $.ajax({
        method: `DELETE`,
        url: `http://localhost:3000/todos/${params}`,
        headers: {
            access_token:localStorage.getItem("access_token")    
        }
    })

    .done((response) => {
        // console.log(response)   
        showTodo()
    })
    .fail((err) => {
        console.log(err)
    })
}
function calendar() {
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/calendar`,
        headers: {
            access_token: localStorage.getItem("access_token")   
        }
    })
    .done((response) => {
        console.log(response)
        response.forEach(element => {
            $(`#bodyHoliday`).append(`
            <tr>
                <th scope="row">${new Date(element.date.iso).toDateString()}</th>
                <td>${element.name}</td>
                <td class="text-wrap" style="width:600px">${element.description}</td>
                <td>${element.type[0]}</td>
            </tr>
            `)
        });
    })
    .fail((xhr) => {
        console.log(xhr)
    })
} 