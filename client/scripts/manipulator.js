$(document).ready(function(){
    localStorage.getItem('token') ? showContent() : showLogin() 

    $('#register-anchor').on('click', _ => {
        showRegister()
    })
    $('#login-anchor').on('click', _ => {
        showLogin()
    })
    $('#login-form').on('submit', e => {
        e.preventDefault()
        loginHandler()
    })
    $('#register-form').on('submit', e => {
        e.preventDefault()
        registerHandler()
    })
    $('#logoutBtn').on('click', function () {
        logoutHandler()
    });

    $('#add-anchor').on('click', _ => {
        showAdd()
    })
    $('#add-form').on('submit', function (e) {
        e.preventDefault()
        addHandler()
    });
    $('#edit-form').on('submit', function (e) {
        e.preventDefault()
        editHandler()
    });
    $('#cancel-add').on('click', function () {
        showContent()
    });
    $('#cancel-edit').on('click', function () {
        showContent()
    });
})