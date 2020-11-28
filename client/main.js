function hideAll() {
    $("#navigation").hide()
    $("#div-addToDos").hide()
    $("#div-editToDos").hide()
    $("#div-ToDos").hide()
    $("#div-login").hide()
    $("#div-register").hide()
    $("#btn-logout").hide()
}

function showLoginPage() {
    hideAll()
    $("#div-login").show()
}

function showHomePage() {
    hideAll()
    $("#btn-logout").show()
    $("#div-ToDos").show()
    $("#navigation").show()
    $("#toDo-title").text('To Do List Today, ' + new Date().toDateString())
    fetchToDos()
    getTableCovid()
}

function showRegisterationPage() {
    hideAll()
    $("#div-register").show()
}

function showAddPage() {
    hideAll()
    $("#div-addToDos").show()
    $("#navigation").show()
    $("#btn-logout").show()
}

function showEditPage() {
    hideAll()
    $("#div-editToDos").show()
    $("#navigation").show()
    $("#btn-logout").show()
}

function login() {
    $("#form-login").on("submit", function (event) {
        event.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()

        $.ajax({
                url: 'http://localhost:3000/users/login',
                method: 'POST',
                data: {
                    email,
                    password
                }
            })
            .done(response => {
                localStorage.setItem('access_token', response.access_token)
                showHomePage()
            })
            .fail((xhr, status) => {
                Swal.fire({
                    title: 'Error!',
                    text: xhr.responseJSON.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
            .always(_ => {
                $("#form-login").trigger("reset")
            })
    })
}

function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token
    $.ajax({
            url: 'http://localhost:3000/users/googleLogin',
            method: 'POST',
            data: {
                googleToken
            }
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showHomePage()
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        })
}


function logout() {
    localStorage.clear()

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Swal.fire({
            title: 'Success!',
            text: `You've been logged out successfully!`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        console.log('User signed out.');
    });

    showLoginPage()
}

function getTableCovid() {
    $("#data-covid").empty()
    $.ajax({
            url: 'http://localhost:3000/todos/api',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            $("#data-covid").append(`
            <td>Confirmed</td>
            <td style="color: blue;">${response.confirmed}</td>
            <td>Recovered</td>
            <td style="color: green;">${response.recovered}</td>
            <td>Deaths</td>
            <td style="color: red;">${response.deaths}</td>
        `)
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        })

}

function register() {
    showRegisterationPage()

    $("#form-register").on("submit", function (event) {
        event.preventDefault()
        const data = {
            username: $("#user-name").val(),
            email: $("#user-email").val(),
            password: $("#user-password").val(),
            first_name: $("#user-fname").val(),
            last_name: $("#user-lname").val(),
            birthdate: $("#user-birthdate").val()
        }

        if (data.password === $("#user-r-password").val()) {
            $.ajax({
                    url: 'http://localhost:3000/users/register',
                    data,
                    method: 'POST'
                })
                .done(response => {
                    console.log(response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'User created! Please login now.',
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    })
                    showLoginPage()
                })
                .fail((xhr, status) => {
                    Swal.fire({
                        title: 'Error!',
                        text: xhr.responseJSON.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    console.log(xhr, status);
                })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Password mismatch! Please type your password carefully!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log('Password mismatch!');
        }
    })

}

function fetchToDos() {
    $("#todos-today").empty()
    $("#todos-all").hide()
    $.ajax({
            url: 'http://localhost:3000/todos',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for (let i = 0; i < response.length; i++) {
                $("#todos-today").append(`
                <tr>
                    <td>${i+1}</td>
                    <td>${response[i].title}</td>
                    <td>${response[i].description}</td>
                    <td>${response[i].status}</td>
                    <td>${response[i].due_date}</td>
                    <td>
                        <input class="btn btn-block btn-info" type="button" value="Edit" onclick="editToDo(${response[i].id})">
                        <input class="btn btn-block btn-danger" type="button" value="Delete" onclick="deleteToDo(${response[i].id})">
                    </td>
                </tr>`)
                $("#todos-today").show()
                console.log(response[i]);
            }
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        })
}

function fetchAllToDos() {
    $("#todos-today").hide()
    $("#todos-all").empty()
    $.ajax({
            url: 'http://localhost:3000/todos/showAll',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for (let i = 0; i < response.length; i++) {
                $("#todos-all").append(`
            <tr>
                <td>${i+1}</td>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${response[i].status}</td>
                <td>${response[i].due_date}</td>
                <td>
                    <input class="btn btn-block btn-info" type="button" value="Edit" onclick="editToDo(${response[i].id})">
                    <input class="btn btn-block btn-danger" type="button" value="Delete" onclick="deleteToDo(${response[i].id})">
                </td>
            </tr>`)
                $("#toDo-title").text('All To Do List')
                $("#todos-all").show()
            }
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        })
}

function addToDo() {
    showAddPage()

    $("#form-todo").on("submit", function (event) {
        event.preventDefault()

        const data = {
            title: $("#title").val(),
            description: $("#description").val(),
            status: $("#status").val(),
            due_date: $("#due-date").val()
        }

        $.ajax({
                url: 'http://localhost:3000/todos/',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data
            })
            .done(response => {
                console.log(response);
                Swal.fire({
                    title: 'Success!',
                    text: 'ToDo Created!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                showHomePage()

            })
            .fail((xhr, status) => {
                console.log(xhr, status);
                Swal.fire({
                    title: 'Error!',
                    text: xhr.responseJSON.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
            .always(_ => {
                $("#form-todo").trigger("reset")
            })
    })
}

function editToDo(id) {
    $.ajax({
            url: `http://localhost:3000/todos/${id}`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            showEditPage()
            $("#edit-title").val(response.title)
            $("#edit-description").val(response.description)
            $("#edit-status").val(response.status)
            $("#edit-due-date").val(response.due_date)

            updateToDo(response.id)
        })
        .fail((xhr, status) => {
            Swal.fire({
                title: 'Error!',
                text: xhr.responseJSON.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
}

function updateToDo(id) {
    $("#form-edit-todo").on("submit", function(e) {
        e.preventDefault()
        const data = {
            title: $("#edit-title").val(),
            description: $("#edit-description").val(),
            status: $("#edit-status").val(),
            due_date: $("#edit-due-date").val()
        }
        $.ajax({
            url: `http://localhost:3000/todos/${id}`,
            method: 'PUT',
            data,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            Swal.fire({
                title: 'Updated!',
                text: 'Data updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            showHomePage()
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
            Swal.fire({
                title: 'Error!',
                text: xhr.responseJSON.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    })
}

function deleteToDo(id) {
    $.ajax({
            url: `http://localhost:3000/todos/${id}`,
            method: 'DELETE',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Data deleted!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            fetchToDos()
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
            Swal.fire({
                title: 'Error!',
                text: xhr.responseJSON.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
}

$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        showHomePage()
    } else {
        showLoginPage()
    }
})