function showLoginPage() {
    $('#login-page').show()
    $('#main-page').hide()
    $('#btn-logout').hide()
    $('#edit-page').hide()
}

function showMainPage() {
    $('#login-page').hide()
    $('#main-page').show()
    $('#edit-page').hide()
    $('#btn-logout').show()
    fetchToDo()
    fetchHoliday()
}


function login() {
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        url: 'http://localhost:3000/user/login',
        method: 'POST',
        data: {
            email,
            password
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
        $('#email-login').val('')
        $('#password-login').val('')
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

function fetchToDo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
        
    })
    .done(response => {
        $("#todo-list").empty()
        console.log(response)
        let todo= response
        for(let i = 0; i < todo.length; i++) {
            if(todo[i].status == 'belum') {
                $('#todo-list').append(`<h5 id="list-title">List of To Do's!</h5>
                <h3>${todo[i].title}</h3>
            <p>${todo[i].description}</p>
            <p>${todo[i].status}</p>
            <p>${todo[i].due_date}</p>
            <button onclick="checkToDo(${todo[i].id})">Done</button>
            <button onclick="deleteToDo(${todo[i].id})">Delete</button>`)
            }
            else {
                $('#todo-list').append(`<h3>${todo[i].title}</h3>
            <p>${todo[i].description}</p>
            <p>${todo[i].status}</p>`)
            }
        }
    })
}

function fetchHoliday() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos/holidays',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
            
    })
    .done(response => {
        $("#holiday-list").empty()
        console.log(response)
        let holiday = response.holidays
            $('#holiday-list').append(`<h5 id="holiday-title">List of Holidays!</h5>
            <table style="width:90%" border="1">
            <tr>
              <th>Holiday</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
            <tr>
                <td>${holiday[1].name}</td>
                <td>${holiday[1].description}</td>
                <td>${holiday[1].date.iso}</td>
            </tr>
          </table>`)
    })    

    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}

function createToDo() {
    const title = $('#title-todo').val()
    const description = $('#desc-todo').val()
    const due_date = $('#duedate-todo').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token'),
        },
        data: {
            title,
            description,
            due_date
        }
    })

    .done(response => {
        console.log(response)
        fetchToDo()
    })

    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })

    .always(() => {
        $("#form-todo").trigger('reset')
    })
}

function deleteToDo(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/todos/' + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchToDo()
        console.log(response)
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}

function checkToDo(id) {
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:3000/todos/' + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchToDo()
        console.log(response)
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}


function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        url: 'http://localhost:3000/user/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}

$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        showMainPage()
    }
    else {
        showLoginPage()
    }
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        login()
    })

    $('#btn-logout').on('click', function(e) {
        logout()
    })

    $('#form-todo').on('submit', function(e) {
        e.preventDefault()
        createToDo()
    })

});