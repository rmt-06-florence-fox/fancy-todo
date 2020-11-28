const server = 'http://localhost:3000';

$(document).ready(function() {
    showLoginPage()
})

function showLoginPage() {
    $("#button-logout").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#content-page").hide()
}

function jumpToRegister() {
    $("#login-page").hide()
    $("#register-page").show()
}

function jumpToLogin() {
    $("#login-page").show()
    $("#register-page").hide()
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
    .done( response => {
        console.log("New user Registered Successfully.");
        $("#login-page").show()
        $("#register-page").hide()
        $("#content-page").hide()
    })
    .fail( err => {
        console.log(err);
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
    .done( response => {
        const token = response.access_token;
        localStorage.setItem("token", token);
        console.log("Logged In!");
        $("#login-page").hide()
        $("#content-page").show()
    })
    .fail( err => {
        console.log(err);
    })
}