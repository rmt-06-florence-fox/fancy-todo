const host = 'http://localhost:3000'

function beforeLogin(){
    $('#login-form').show()
    $('#register-form').hide()
    $('#edit-form').hide()
    $('#add-form').hide()
    $('#logoutBtn').hide()
}