function showLogin(){
    $('#login-form').show()
    $('#register-form').hide()
}

function showRegister(){
    console.log('udah lewat register');
    $('#login-form').hide()
    $('#register-form').show()
}

function loginHandler(event){
    event.preventDefault()
    
}


