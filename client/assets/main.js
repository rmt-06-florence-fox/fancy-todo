$(document).ready(function() {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showRegistrationPage()
    }
    $("#todo-form").on("submit", function(e) {
        e.preventDefault()        
        createTodo()
    })
    $("#registration-form").on("submit", function(e) {
        e.preventDefault()        
        registration()
    })
    $("#login-form").on("submit", function(e) {
        e.preventDefault()        
        login()
    })
    $("#btn-logout").on("click", function (e) {
        logout()
    })
    $('#back-login').click(()=> {
        showLoginPage()
    })
      $('#back-register').click(() => {
        showRegistrationPage()
    })
});