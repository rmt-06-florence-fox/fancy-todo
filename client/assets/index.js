$(document).ready(function () {
    if(localStorage.getItem("access_token")){
        showMainPage()
    }
    else{
        showLoginPage()
    }
    $("#cancel-edit").on('click', function() {
        $("#formEdit").remove()
    })
    $("#cancel-add").on('click', function() {
        $('#form-add').css("display", "none")
    })
    $("#new-task").on('click', function(){
        $('#form-add').css("display", "block")
    })
    $("#add-form").on("submit", function(event){
        event.preventDefault()
        $('#add-form').css('display', 'none')
        addTodo()
        fetchTodo()
    })
    $("#login-form").on("submit", function(event){
        event.preventDefault()
        login()
    })
    $("#edit-form").on("submit", function(event){
        event.preventDefault()
        $("#edit-form").css('display', 'none')
        $("#todo-list").css('display', 'block')
        editTodo()
    })
    $("#delete-todo").on("submit", function(event){
        event.preventDefault()
        deleteTodo()
        fetchTodo()
    })
    $("#register-form").on("submit", function(event) {
        event.preventDefault()
        register()
    })
    $("#btn-logout").on("click", function() {
        logout()
    })
})