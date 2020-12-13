function showMainPage() {
    $('#login-form').hide()
    $('#register-form').hide()
    $('#main-page').show()
    $('#btn-logout').show()
    $('#navbar').show()
    $('#change-todo').hide()
    $('#body-main').css('background', 'none')
    
}

function showLogIn() {
    $('#change-todo').hide()
    $('#login-form').show()
    $('#register-form').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
    $('#navbar').hide()
}

function showRegister() {
    $('#login-form').hide()
    $('#change-todo').hide()
    $('#register-form').show()
    $('#main-page').hide()
    $('#btn-logout').hide()
    $('#navbar').hide()
}



function register(){
    const name = $('#name-register').val()
    const email = $('#email-register').val()
    const password = $('#password-register').val()
    console.log(name, email, password);
    $.ajax({
            url: "https://todo-fancys.herokuapp.com/register",
            method: "POST",
            data: {
                name,
                email,
                password
            }
        })
        .done(response => {
            localStorage.clear()
            showLogIn()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, '<<');
        })
        .always(() => {
            $('#name-login').val('')
            $('#email-login').val('')
            $('#password-login').val('')
        })
}

function login() {
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
            url: "https://todo-fancys.herokuapp.com/login",
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token);
            // console.log(response);
            showMainPage()
            $('#body-main').css('background', 'none')
            fetchTodos()
            fetchNews()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, '<<');
        })
        .always(() => {
            $('#email-login').val('')
            $('#password-login').val('')
        })

}

function logout(){
    localStorage.clear()
    showMainPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function fetchNews(){
    $.ajax({
        url: 'https://todo-fancys.herokuapp.com/todos/news',
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        } 
    })
        .done(response => {
            console.log(response);
            response.forEach(el => {
                $('#card-news').append(`
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${el.title}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"><a href="${el.url}" target="_blank">Read full article here</a></small>
                  </div>
                </div>
                `)
            })
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

function fetchTodos() {
    $('#table-todo').empty()
    $.ajax({
            url: 'https://todo-fancys.herokuapp.com/todos',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            // fetchNews()
            $('#table-todo').append(`
            <thead class="thead-dark">
                <tr>
                <th scope="col" class="text-center">Title</th>
                <th scope="col" class="text-center">Description</th>
                <th scope="col" class="text-center">Status</th>
                <th scope="col" class="text-center">Due Date</th>
                <th scope="col" class="text-center">Action</th>
                </tr>
            </thead>
            `)
            response.forEach((todo, i) => {
                $("#table-todo").append(`
                <tbody>
                    <tr>
                    <td>${todo.title}</td>
                    <td class="text-center">${todo.description}</td>
                    <td class="text-center">${todo.status}</td>
                    <td class="text-center">${todo.due_date.split('T')[0]}</td>
                    <td class="text-center"><button class="btn btn-success" onClick="changeTodo(${todo.id}, '${todo.title}', '${todo.description}','${todo.status}','${todo.due_date}' )">Update</button> | <button class="btn btn-danger" onClick="deleteTodo(${todo.id})"">Delete</button></td>
                    </tr>
                </tbody>
             `);
            })
            })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
}

function createTodo(){
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    console.log(title, '>>>');
    $.ajax({
        url: 'https://todo-fancys.herokuapp.com/todos',
        method: 'POST',
        headers: {
            access_token: localStorage.getItem('access_token')
        } ,
        data:{
            title, description, due_date
        }
    })
        .done(response => {
            fetchTodos()
        })
        .fail(xhr => {
            console.log(xhr);
        })
        .always(() => {
            $('todos-form').trigger('reset')
        })
}

function deleteTodo(id){
    console.log(id);
    $.ajax({
        url: 'https://todo-fancys.herokuapp.com/todos/' + id,
        method: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            fetchTodos()
        })
        .fail(err => {
            console.log(err);
        })
}

function changeTodo(id, title, description, status, due_date){ //untuk change status
    // console.log(id);
    // console.log(title);
    $('#login-form').hide()
   
    $('#register-form').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
    $('#navbar').hide()
    localStorage.setItem('todos_id',id)
    $('#change-title').val(title)
    $('#change-description').val(description)
    $('#change-status').val(due_date)
    $('#change-due_date').val(due_date.split('T')[0])
    $('#change-todo').show()
}

function updateTodo(){
    const title = $('#change-title').val()
    const description = $('#change-description').val()
    const status = $('#change-status').val()
    const due_date = $('#change-due_date').val()
    console.log(title, description, status, due_date , '>>>');
    $.ajax({
        url: 'https://todo-fancys.herokuapp.com/todos/' + localStorage.getItem('todos_id'),
        method: 'PUT',
        headers: {
            access_token: localStorage.getItem('access_token')
        } ,
        data:{
            title, description, status, due_date
        }
    })
        .done(response => {
            fetchTodos()
            localStorage.setItem('todos_id', null)
            showMainPage()
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'https://todo-fancys.herokuapp.com/login/google',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(response => {
            // console.log(response);
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
            fetchTodos()
            fetchNews()
        })
        .fail(err => {
            console.log(err);
        })
}

function changeStatus(){
    let status = $('.click-status').val()
    console.log(status);
}