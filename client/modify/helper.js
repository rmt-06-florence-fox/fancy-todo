function showMainPage() {
    $('#login-form').hide()
    $('#register-form').hide()
    $('#main-page').show()
    $('#btn-logout').show()

}

function showLogIn() {
    $('#login-form').show()
    $('#register-form').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
}

function login() {
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
            url: "http://localhost:3000/login",
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
            fetchTodos()

        })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
        .always(() => {
            $('#email-login').val('')
            $('#password-login').val('')
        })

}

function logout(){
    localStorage.clear()
    showMainPage()
}

function fetchTodos() {
    $('#table-todo').empty()
    $.ajax({
            url: 'http://localhost:3000/todos',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            $('#table-todo').append(`<tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
        </tr>`)
            response.forEach(todo => {
                $("#table-todo").append(`<tr>
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.status}</td>
            <td>${todo.due_date}</td>
            <td><button onClick="deleteTodo(${todo.id})"">Delete</button></td>
        </tr>`);
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
    $.ajax({
        url: 'http://localhost:3000/todos',
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
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
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
