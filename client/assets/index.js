$(document).ready(function () {
    if(localStorage.getItem("access_token")){
        showMainPage()
    }
    else{
        showLoginPage()
    }
    $("#add-form").on("submit", function(event){
        event.preventDefault()
        addTodo()
    })
    $("#login-form").on("submit", function(event){
        event.preventDefault()
        login()
    })
    $("#edit-form").on("submit", function(event){
        event.preventDefault()
        editTodo()
    })
    $("#delete-todo").on("click", function(){
        deleteTodo()
    })
    $("#register-form").on("submit", function(event) {
        event.preventDefault()
        register()
    })
    $("#btn-logout").on("click", function() {
        logout()
    })  
    

})