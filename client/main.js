// let baseURL = 'http://localhost:3000'
let baseURL = 'https://hisyam-todo.herokuapp.com'

$(document).ready(function() {
    checkauth()
})

function checkauth() {
    if (localStorage.access_token) {
        $('#loginbox').hide()
        $('#regisbox').hide()
        $('#add-todo').show()
        $('#get-todo').show()
        $('#logout').show()
        $('#edit-todo').hide()
        todoList()
        $('#nav-log').hide()
        $('#nav-reg').hide()
        getQotd()
    } else {
        $('#loginbox').show()
        $('#regisbox').hide()
        $('#add-todo').hide()
        $('#get-todo').hide()
        $('#logout').hide()
        $('#nav-log').show()
        $('#nav-reg').show()
        $('#edit-todo').hide()
        $('#quote-card').hide()
    }
}

function logout(event) {
    event.preventDefault()
    localStorage.removeItem('access_token')
    checkauth()
    $('#quote-card').hide()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    Swal.fire(
        'Done!',
        'Logout successfully!',
        'success'
    )
}

function showRegister(event) {
    event.preventDefault()
    $('#loginbox').hide()
    $('#regisbox').show()
}

function showLogin(event) {
    event.preventDefault()
    $('#loginbox').show()
    $('#regisbox').hide()
}

function showAdd(event) {
    event.preventDefault()
    $('#edit-todo').hide();
    $('#add-todo').show();
    $('#quote-card').show()
}

function login(event) {
    event.preventDefault()
    let email = $('#emaillogin').val()
    let password = $('#passwordlogin').val()

    $.ajax({
        method: 'POST',
        url: baseURL + '/login',
        data: {email, password}
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token)
        checkauth()
        getQotd()
        $('#emaillogin').val('')
        $('#passwordlogin').val('')
        Swal.fire(
            'Welcome!',
            'Welcome to the todo app',
            'success'
        )
    })
    .fail(err => {
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function register(event) {
    event.preventDefault()
    let email = $('#emailregis').val()
    let password = $('#passwordregis').val()

    $.ajax({
        method: 'POST',
        url: baseURL + '/register',
        data: {email, password}
    })
    .done(res => {
        checkauth()
        Swal.fire(
            'Good job!',
            'Please log in!',
            'success'
        )
    })
    .fail(err => {
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function addTodo(event) {
    event.preventDefault()
    let access_token = localStorage.getItem('access_token')
    let title = $('#title').val()
    let description = $('#description').val()
    let status = $('#status').val()
    let due_date = $('#due_date').val()

    $.ajax({
        method: 'POST',
        url: baseURL + '/todos',
        data: {title, description, status, due_date},
        headers: {access_token}
    })
    .done(res => {
        $('#title').val('')
        $('#description').val('')
        $('#status').val('')
        $('#due_date').val('')
        Swal.fire(
            'Added!!!',
            'Your new todo has been added!',
            'success'
        )
        checkauth()
        getQotd()
        $('#quote-card').show()
    })
    .fail(err => {
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function todoList(event) {
    let access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'GET',
        url: baseURL + '/todos',
        headers: {access_token}
    })
    .done(res => {
        $('#list-todo').empty()
        res.forEach(el => {
            let dudet = ''
            for (let i = 0; i < el.due_date.length; i++) {
                if (dudet.length !== 10) {
                    dudet += el.due_date[i]
                }
            }
            $('#list-todo').append(
                `<tr>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${dudet}</td>
                    <td>
                    <button type="submit" class="btn btn-primary mb-2" onclick="editForm(${el.id})">Edit</button>
                    <button type="submit" class="btn btn-danger mb-2" role="button" onclick="confirmDelete(${el.id})">Delete</button>
                    </td>
                </tr>`
            )
        });
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function editForm(id) {
    let access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'GET',
        url: baseURL + `/todos/${id}`,
        headers: {access_token}
    })
    .done(res => {
        console.log(res)
        $('#quote-card').show()
        $('#edit-todo').show()
        $('#add-todo').hide()
        $('#edit-id').val(res.id)
        $('#edit-title').val(res.title)
        $('#edit-description').val(res.description)
        $('#edit-status').val(res.status)
        $('#edit-due_date').val(res.due_date)
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function editTodo(event) {
    event.preventDefault()
    let access_token = localStorage.getItem('access_token')
    let id = $('#edit-id').val()
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let status = $('#edit-status').val()
    let due_date = $('#edit-due_date').val()

    $.ajax({
        method: 'PUT',
        url: baseURL + `/todos/${id}`,
        headers: {access_token},
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done(res => {
        event.preventDefault()
        $('#edit-todo').show();
        $('#add-todo').hide();
        todoList()
        $('#edit-id').val('');
        $('#edit-title').val('');
        $('#edit-description').val('');
        $('#edit-status').val('');
        $('#edit-due_date').val('');
        $('#quote-card').show()
        Swal.fire(
            'Updated!!!',
            'Your new todo has been updated',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function confirmDelete(id) {
    $('#deleteModal').modal('show')
    $('#delete-id').val(id)
}

function deleteTodo(event) {
    let access_token = localStorage.getItem('access_token')
    let id = $('#delete-id').val()

    $.ajax({
        method: 'DELETE',
        url: baseURL + `/todos/${id}`,
        headers: {access_token}
    })
    .done(res => {
        $('#deleteModal').modal('hide')
        todoList()
        $('#quote-card').show()
        Swal.fire(
            'Deleted!',
            'Your task has been deleted!',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })

}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: baseURL + '/loginGoogle',
        data: {google_access_token}
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token)
        checkauth()
        getQotd()
        $('#emaillogin').val('')
        $('#passwordlogin').val('')
        Swal.fire(
            'Welcome!',
            'Welcome to the todo app',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}

function getQotd() {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'Get',
        url: baseURL + '/quotes',
        headers: {
            access_token
        }
    })
    .done(res => {
        $('#qotd').empty();
        $('#qotd').append(`
        <p>
        ${res.qotd}
        </p>
        <cite>
        ${res.author}
        </cite>
        `)
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            err.responseJSON.msg,
            'error'
        )
    })
}