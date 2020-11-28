$(document).ready(function() {
    if(localStorage.getItem('accesstoken')) {
        showMainPage()
    } else {
        showRegisterPage()
    }

    $('#register-form').on("submit", function(e) {
        e.preventDefault()
        register()
    })

    $('#login-form').on("submit", function(e) {
        e.preventDefault()
        login()
    })
    
    $("#todo-form").on("submit", function(e) {
        e.preventDefault()
        createTodo()
    })

    $('#toLoginForm').on("click", function(e) {
        e.preventDefault()
        showLoginPage()
    })
    
    $('#toRegisterForm').on("click", function(e) {
        e.preventDefault()
        showRegisterPage()
    })
    
    $('#btn-logout').on("click", function(e) {
        logout()
    })

    $('#btn-AddTodo').on("click", function(e) {
        showAddTodo()
    })

    $('#put-form').on("submit", function(e) {
        e.preventDefault()
        putTodo()
        showMainPage()
    })
})