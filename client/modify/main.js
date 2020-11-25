$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        showMainPage()
        fetchTodos()
    } else {
        showLogIn()
    }
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        login()
    })
    $('#btn-logout').on('click', function (e){
        logout()
    })

    $('#todos-form').on('submit', function(e){
        e.preventDefault()
        createTodo()
    })
});
