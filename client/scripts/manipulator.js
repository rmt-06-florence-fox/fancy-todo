$(document).ready( _ => {
    localStorage.getItem('token') ? showContent() : showLogin() 
    
    $('#register-anchor').on('click', showRegister)  
    $('#login-form').on('submit', loginHandler)
    $('#register-form').on('submit', registerHandler)
    $('#logoutBtn').on('click', logoutHandler)
})