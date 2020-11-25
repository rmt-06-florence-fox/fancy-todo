const host = 'http://localhost:3000'

function showLogin(){
    $('#login-form').show()
    $('#register-form').hide()
    $('#logoutBtn').hide()
    $('#content').hide()

}

function showRegister(){
    console.log('udah lewat register');
    $('#login-form').hide()
    $('#register-form').show()
    $('#logoutBtn').hide()
    $('#content').hide()
}
function getContents(id = 0) {
    let endpoint = host + '/todos/'
    id ? endpoint += id   : '' 

    $.ajax({
        url: endpoint,
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
    })
    .done( response => {
        console.log(response)
        let htmlText = ''
        response.forEach(todo => {
            htmlText += `
                        <div class="col-sm-3 card">
                            <div class="card-header">${todo.title}</div>
                            <div class="card-content">${todo.description}</div>
                            <div class="card-footer">due date : ${todo.due_date}</div>
                        </div>`
        })
        
        $('#content').html(htmlText)
        //console.log('fetching sukses')
        //let showedData = ''

    })
    .fail(err => {
        console.log(err.responseJSON, '>>> ini error')

    })
}

function showContent(){
    $('#login-form').hide()
    $('#register-form').hide()
    getContents()
    $('#content').show()
}

function loginHandler(event){
    event.preventDefault()
    //$('#content').html('<h1> udah login gan </h1>')
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    //console.log(email)
    //console.log(password)
    $.ajax({
        url: host+'/login',
        method : 'POST',
        data : {password, email}
    })
    .done(respone => {
        localStorage.setItem('token', respone.token)
        showContent()

    })
    .fail(err => {
        console.log(err.responseJSON, '>>> ini error')
        //get big array of errors
    })

    $('#login-email').val(null)
    $('#login-password').val(null)
}

function logoutHandler () {
    localStorage.clear()
    showLogin()
}

function registerHandler(event){
    event.preventDefault()
    
    const fullName = $('#fullName').val() 
    const userName = $('#userName').val()
    const email = $('#email').val()
    const password = $('#password').val()

    $('#fullName').val(null)
    $('#userName').val(null)
    $('#email').val(null)
    $('#password').val(null)

    $.ajax({
        url : host + '/register',
        method : 'POST',
        data : {fullName, userName, email, password}
    })
    .done(response => {
        console.log(response, '<<<<< ini response')
        showContent()
    })
    .fail(err => {
        console.log(err.responseJSON, '>>> ini error')
        //get big array of errors
    })
}

