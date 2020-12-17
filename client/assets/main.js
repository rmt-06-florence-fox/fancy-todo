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
        register()
    })
    
    $("#login-form").on("submit", function(e) {
        e.preventDefault()        
        login()
    })
    
    $("#btn-logout").click(()=> {
        logout()
    })
    
    $("#back-login").click(()=> {
        showLoginPage()
    })
    
    $("#back-register").click(() => {
        showRegistrationPage()
    })
    
    $("#show-todo").click(()=> {
        fetchTodos()
        showList()
    })
    
    $("#add-todo").click(() => {
        showAddForm()
    })

    $("#back-main").click(() => {
        showMainPage()
    })

    $("#listback-main").click(() => {
        showMainPage()
    })
});