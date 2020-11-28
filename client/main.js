const server = 'http://localhost:3000';

$(document).ready(function () {
    showLoginPage()
})

function showLoginPage() {
    $("#button-logout").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#content-page").hide()
}

function showContentPage() {
    $("#button-logout").show()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#content-page").show()
}

function jumpToRegister() {
    $("#login-page").hide()
    $("#register-page").show()
}

function jumpToLogin() {
    $("#login-page").show()
    $("#register-page").hide()
}

function logout() {
    localStorage.removeItem("access_token");
    localStorage.clear();
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
    showLoginPage();
}

function register(e) {
    e.preventDefault();
    const email = $("#register-email").val();
    const password = $("#register-password").val();

    $.ajax({
        url: server + "/register",
        method: "POST",
        data: {
            email: email,
            password: password
        }
    })
        .done(response => {
            console.log("New user Registered Successfully.");
            $("#login-page").show()
            $("#register-page").hide()
            $("#content-page").hide()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $("#register-email").val("");
            $("#register-password").val("");
        })
}

function login(e) {
    e.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    $.ajax({
        url: server + "/login",
        method: "POST",
        data: {
            email, password
        }
    })
        .done(response => {
            const token = response.access_token;
            localStorage.setItem("access_token", token);
            console.log("Logged In!");
            getTodo();
            showContentPage();
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $("#login-email").val("");
            $("#login-password").val("");
        })
}

function onSignIn(googleUser) {
    var g_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: server + '/glogin',
        data: {
            g_access_token
        }
    })
        .done(response => {
            console.log("Masuk Situ");
            console.log(response.access_token)
            localStorage.setItem("access_token", response.g_access_token)
            localStorage.setItem("email", response.email)
            showContentPage();
        })
        .fail(error => {
            console.log("Masuk sini");
            console.log(error);
        })
}

function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function() {
        console.log('User signed out.');
        $("#login-page").show()
        $("#content-page").hide()
    });
}

function createTodo(e) {
    e.preventDefault();
    const access_token = localStorage.getItem('access_token');
    const title = $("#title").val();
    const description = $("#description").val();
    const status = "on-going";
    const due_date = $("#due_date").val();

    $.ajax({
        method: 'POST',
        url: server + "/todos",
        headers: {
            access_token
        },
        data: {
            title, description, status, due_date
        }
    })
        .done(response => {
            readtodo()
            $("#title").val("");
            $("#description").val("");
            $("#due_date").val();
            showContentPage();
        })
        .fail( error => {
            console.log(error);
        })
}

function getTodo(){
    const access_token = localStorage.getItem('access_token');
    $.ajax({
        method: "GET",
        url: server + "/todos",
        headers: {
            access_token
        }
    })
    .done(data => {
        console.log(data.data);
        $("#todo-list").empty()
        data.forEach(el => {
            $(`
            <div class="bg-white shadow-lg w-64">
				<div class="p-6">
					<h4 class="font-bold">${el.title}</h4>
                    <p class="text-sm mt-2">${el.description}</p>
                    <p class="text-sm mt-1">Status : ${el.status}</p>
                    <p class="text-sm mt-1">Due Date : ${el.due_date}</p>
                    
					<div class="text-right mt-4">
						<button class="bg-blue-400 text-sm text-white py-1 px-3 rounded">Edit</button>
						<button class="bg-blue-400 text-sm text-white py-1 px-3 rounded">Delete</button>
					</div>
				</div>
			</div>
            `).appendTo("#list-todo")
        })
    })
    .fail( err => {
        console.log(err)
    })
}

function deleteTodo(e ,id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "DELETE",
        url: SERVER + `/todos/${id}`,
        headers: { acces_token: token }
    }).done(response => {
        viewAllTodos(e)
    }).fail(err => {
        console.log(err)
    })
}