const port = 'http://localhost:3002/'
let dataUedit = {}

//page
function home(){
    $('#signin').hide()
    $('#signup').hide()
    $("#mainhome").hide()
    $("#createtodo").hide()
    $("#editTodo").hide()
    $("#navbar").hide()
}

function signin(){
    $("#home").hide()
    $("#signup").hide()
    $("#signin").show()
    $("#mainhome").hide()
    $("#createtodo").hide()
    $("#editTodo").hide()
}

function signup(){
    $("#signin").hide()
    $("#home").hide()
    $("#signup").show()
    $("#mainhome").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
}

function basehome(){
    $("#signin").hide()
    $("#signup").hide()
    $("#home").hide()
    $("#editTodo").hide()
    $("#mainhome").show()
    showlist()
    weather()
}

function mainhome(){
    $("#signin").hide()
    $("#signup").hide()
    $("#home").hide()
    $("#editTodo").hide()
    $("#mainhome").show()
    showlist()
}

//process
function signinProcess(){
    const email = $('#emailsignin').val()
    const password = $('#passwordsignin').val()
    $.ajax({
        url : port + "users/signin",
        method : "post",
        data : {
            email,
            password
        }
    })
    .done(result => {
        localStorage.setItem('accesstoken', result.accessToken)
        mainhome()
    })
    .fail((xhr, textStatus) => {
        signin()
    })  
    .always(_ => {
        $('#signin').trigger('reset')
    })
}  

function signupProcess(){
    const email = $('#emailsignup').val()
    const password = $('#passwordsignup').val()
    $.ajax({
        url : port + "users/signup",
        method : "post",
        data : {
            email,
            password
        }
    })
    .done(result => {
        home()
    })
    .fail(xhr => {
        signup()
        console.log(xhr)
    })          
}  

function signOut(){
    localStorage.clear()
    signin()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}

function showlist(){
    $.ajax({
        method : 'get',
        url : port + "todos/",
        headers : {
            accessToken : localStorage.getItem('accesstoken')
        }
    })
    .done(result => {
        $('#card-todo').empty()
        result.forEach(data => {
            $('#card-todo').append(`
            <div class="card bg-dark text-white" >
                <div class="card-header">
                    <p style="text-align: center;"> ${data.status} </p>
                </div>
                <div class="card-body">
                    <p style="text-align: center;"> ${data.title} </p>
                    <p style="text-align: center;"> ${data.description} </p>
                    <p style="text-align: center;"> ${data.due_date} </p>
                </div>
                <div class="card-footer" >
                <button class="btn btn-primary" onclick="finishTodo(${data.id})"> Finish </button> <button class="btn btn-primary" onclick="pendingTodo(${data.id})"> Pending </button> <button class="btn btn-primary" onclick="editTodoProcess(${data.id})"> Edit </button> <button class="btn btn-primary"s onclick="deleteTodo(${data.id})"> Delete </button>
                </div>
            </div>
          `)
        })
    })
    .fail(err => {
        console.log(err);
    })
}

function finishTodo(id){
    const status = "Done"
    $.ajax({
        url: port + "todos/" + id,
        method : "patch",
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
        data : {
            status
        }
    })
    .done(data => {
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}

function pendingTodo(id){
    const status = "Pending"
    $.ajax({
        url: port + "todos/" + id,
        method : "patch",
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
        data : {
            status
        }
    })
    .done(data => {
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}

function createTodo(){
    const title = $('#titleToDo').val()
    const description = $('#descriptionToDo').val()
    const due_date = $('#due_dateTodo').val()
    $.ajax({
        url : port + 'todos/',
        method : 'post',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(result => {
        console.log(result);
        mainhome()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    .always(_ => {
        $('#f-createTodo').trigger('reset')
    })
}
function deleteTodo(id){
    $.ajax({
        url : port + 'todos/' + id,
        method : 'delete',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
    })
    .done(result => {
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}

function editTodo(){
    $("#signin").hide()
    $("#signup").hide()
    $("#home").hide()
    $("#createtodo").hide()
    $("#mainhome").hide()
    $("#editTodo").show()
}
function editTodoProcess(id){
    console.log(id);
    inputEdit(id)
    $.ajax({
        url : port + 'todos/' + id,
        method : 'get',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        }
    })
    .done(result => {
        dataUedit = result
        console.log(result, '< edit to do process');
        $('#edittitleToDo').val(result.title),
        $('#editdescriptionToDo').val(result.description)
        $('#editdue_dateTodo').val(result.due_date.getYear, result.due_date.getMonth, result.due_date.getDate)
        editTodo()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    .always(_ => {
        $('#edittodo').trigger('reset')
    })
}   

function inputEdit(){
    const data = dataUedit
    console.log(data);
    const title = $('#edittitleToDo').val()
    const description = $('#editdescriptionToDo').val()
    const due_date = $('#editdue_dateToDo').val()
    $.ajax({
        url : port + 'todos/' + data.id,
        method : 'put',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}
function onSignIn(googleUser) {
    var tokenGoogle = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : port + 'users/signinbygoogle',
        method : 'post',
        data : {
            tokenGoogle
        }
    })
    .done(result => {
        localStorage.setItem('accesstoken', result.accessToken)
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}
    
//API
function weather(){
    $("#card-col").remove()
    $.ajax({
        url : port + "weather",
        method : "get"
    })
    .done(data => {
        data.forEach(element => {
            $("#card-weather").append(`
            <div class="card">
                <div class="card-header">
                    <p style="text-align: center;"> ${element.applicable_date} </p>
                </div>
                <div class="card-body">
                    <p style="text-align: center;"> ${element.weather_state_name} </p>
                    <p style="text-align: center;"> Min Temperature : ${element.min_temp} </p>
                    <p style="text-align: center;"> Max Temperature : ${element.max_temp} </p>
                </div>
            </div>
            `)  
        })
    })
    .fail(err => {
        console.log(err);
    })
}