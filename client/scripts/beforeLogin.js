const server = 'http://localhost:3000'

function showLogin(){
    $('#login-page').show()
    $('#register-page').hide()
    $('#edit-page').hide()
    $('#add-page').hide()
    $('#logoutBtn').hide()
    $('#main-page').hide()
}

function showRegister(){
    $('#main-page').hide();
    $('#login-page').hide()
    $('#register-page').show()
    $('#edit-page').hide()
    $('#add-page').hide()
    $('#logoutBtn').hide()

}

function loginHandler(){
    clearError()
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
        url : server + '/login',
        method : 'POST',
        data : {email, password}

    })
    .done(response => {
        //console.log(response)
        localStorage.setItem('token', response.token)
        showContent()
    })
    .fail(xhr => {
        //console.log(xhr)
        const errors = xhr.responseJSON.errors
        //console.log(errors)
        showError(errors) 
        showLogin()
    })
    .always( _ => {
        $('#login-email').val(null)
        $('#login-password').val(null)
    })
}

function registerHandler (){
    clearError()
    const fullName = $('#fullName').val()
    const userName = $('#userName').val()
    const email = $('#email').val()
    const password = $('#password').val()
    $.ajax({
        url: server + '/register',
        method: 'POST',
        data: { email, password, fullName, userName }

    })
        .done(response => {
            console.log(response)
            showLogin()
            $('#fullName').val(null)
            $('#userName').val(null)
            $('#email').val(null)
            $('#password').val(null)
        })
        .fail(xhr => {
            //console.log(xhr)
            const errors = xhr.responseJSON.errors
            console.log(errors)
            showError(errors) 
            showRegister()
        })
}

function showError(array){
   
    array.forEach(msg => {
      
        $('#error-message').append(`<h5>${msg}</h5>`); 

    })
    
}
function clearError(){
    $('#error-message').empty()
}