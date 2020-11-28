$(document).ready(()=> {
    $('#register-form').on('submit', (e)=> {
        e.preventDefault()
        register()
    })

    $('#login-form').on('submit', (e)=> {
        e.preventDefault()
        login()
    })

    $('#text-login').on('click', (e)=> {
        e.preventDefault()
        showLogin()
    })

    $('#btn-logout').on('click', (e)=> {
        e.preventDefault()
        logout()
    })

    $('#btn-register').on('click', (e)=> {
        e.preventDefault()
        showRegister()
    })

    $('#btn-login').on('click', (e)=> {
        e.preventDefault()
        showLogin()
    })

    $('#todo-form').on('submit', (e)=> {
        e.preventDefault()
        createTodo()
    })

    $('#myForm').on('submit', (e) => {
        e.preventDefault()
        editTodo()
    })

    $("#trivia-btn").on("click", function () {
        fetchTrivia()
    });

    $("#btn-todo").on("click", function (e) {
        e.preventDefault()
        showMainPage()
    });
})