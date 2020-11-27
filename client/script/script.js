// ? jquery document ready
$(document).ready(function(){

    getLocation()
    
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
        $("#add-title").val("")
        $("#add-description").val("")
        $("#add-due-date").val("")
        e.preventDefault()
        localStorage.clear()
        showLandingPage()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    })

    $("#add-form").on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })

    
});