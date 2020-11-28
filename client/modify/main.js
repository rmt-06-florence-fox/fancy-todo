$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        console.log('ada access token');
        $('#body-main').css('background', 'none')
        showMainPage()
        fetchTodos()
    } else if (localStorage.getItem('register') == 1) {
        showRegister()
    } else {
        showLogIn()
    }
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        login()
    })
    $('#btn-logout').on('click', function (e) {
        logout()
    })

    $('#todos-form').on('submit', function (e) {
        e.preventDefault()
        createTodo()
    })

    $('#register-form').on('submit', function (e) {
        e.preventDefault()
        register()
    })

    $('#register-btn').on('click', function () {
        localStorage.setItem('register', 1)
        showRegister()
    })

    $('#login-btn-regist').on('click', function () {
        localStorage.clear()
        // regisToLogIn()
    })
});