$(document).ready(function(){
            
    if(localStorage.getItem("access_token")) {
        showMainPage()
    } else {
        showLoginPage()
    }

    $("#addtodo-form").on("submit", function (e) {
        e.preventDefault()
        createTodo()
    })

    $("#login-form").on("submit", function (e) {
        e.preventDefault()
        login()
    })

    $("#register-form").on("submit", function (e) {
        e.preventDefault()
        register()
    })

    $("#register").on("click", function (e) {
        showRegisterPage()
    })

    $("#btn-logout").on("click", function () {
        logout()
    })
    
});