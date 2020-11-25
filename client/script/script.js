// ? jquery document ready
$(document).ready(function(){
    
    if (!localStorage.access_token) {
        showLandingPage()
    } else {
        showMainPage()
    }

    $("#show-register").on("click", (e) => {
        e.preventDefault()
        showRegister()
    })   
    
    $("#show-login").on("click", (e) => {
        e.preventDefault()
        showLogin()
    }) 

    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    $("#main-logout").on("click", (e) => {
        e.preventDefault()
        localStorage.clear()
        showLandingPage()
    })

    $("#add-form").on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })
});