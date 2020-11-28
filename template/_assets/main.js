$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showFrontPage()
    }
    
    $('#add-form').on('submit', (e) => {
        e.preventDefault()
        createTodos()
    })
    
    $('#register-form').on('submit', (e) => {
        e.preventDefault()
        register()
        showFrontPage()
    })

    $('#login-form').on('submit', (e) => {
        e.preventDefault()
        login()
    })

    $('#btn-to-register').on('click', () => {
        showRegisterPage()
    })

    $('#cancel').on('click', () => {
        showFrontPage()
    })

    $('#btn-logout').on('click', () => {
        logout()
    })
})    

