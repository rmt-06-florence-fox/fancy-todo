$(document).ready(function () {
    if (localStorage.getItem("access_token")) {
        mainPage()
        showTodo()
    } else {
        registerPage()
    }
    $("#register-form").on("submit", function (event){
        event.preventDefault()
        register()
    })
    $("#login-form").on("submit", function (event){
        event.preventDefault()
        login()
    })
    $("#btn-logout").on("click", function (event) {
        logout()
    })
    $("#btn-create").on("click", function (event) {
        createPage()
    })
    $("#btn-holiday").on("click", function (event) {
        holidayPage()
    })
    $("#create-form").on("submit", function(event) {
        event.preventDefault()
        createTodo()
    })
    $("#edit-form").on("submit", function(event) {
        event.preventDefault()
        postEditTodo()
    })
    $("#editStatus-form").on("submit", function(event){
        event.preventDefault()
        postEditStatusTodo()
    })
    
})