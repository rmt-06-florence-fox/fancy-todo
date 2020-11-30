$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        mainDisplay()
    }else{
        loginDisplay()
    }
    
    $('#login-page').on('submit', (e) => {
        e.preventDefault()
        login()
    })
    $('#btn-register').click(() => {
        // mengarah ke register
        registerDisplay()
    })
    $('#register-page').on('submit',(e) => {
        // mengarah ke register
        e.preventDefault()
        register()
    })
    $('#btn-logout').click(()=> {
        //tombol untuk logout
        logout()
    })
    $('#btn-login').click(() => {
        loginDisplay()
    })
    $('#todos-form').on('submit', (e) => {
        e.preventDefault()
        createTodo()
    })
    $('#back-to-main-page').click(() => {
        mainDisplay()
    })
})