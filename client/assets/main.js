$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showLoginPage()
    }

    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
    })

    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        showRegisterPage()
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    $("#todo-form").on("submit", (e) => {
        e.preventDefault()
        createTodo()
    })

    $("#btn-logout").on("click", (e) => {
        logout()
    })
});