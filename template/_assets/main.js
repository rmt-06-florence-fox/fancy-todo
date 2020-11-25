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
    
    $('#btn-register').on('submit', (e) => {
        e.preventDefault()
        register()
    })

    $('#login-form').on('submit', (e) => {
        e.preventDefault()
        login()
    })

    $('#btn-logout').on('click', () => {
        logout()
    })
})    
