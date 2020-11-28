$(document).ready( () => {

  //launch()
  //displayLogin()
  
  $('#login-form').submit( e => {
    e.preventDefault()
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
      url: "http://localhost:3000/login",
      method: "POST",
      data: {
        email,
        password
      }
    })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      $('#login-form').hide()
      displayMainPage()
      displayLogout()
    })
    .fail(response => {
      $('#login-error').text(response.responseJSON.message)
    })
    .always(() => {
      $('#login-email').val('')
      $('#login-password').val('')
    })
  })

  $('#logout-button').on('click', () => {
    logOut()
  })

  $('#register-form').submit(e => {
    e.preventDefault()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    $.ajax({
      url: "http://localhost:3000/register",
      method: "POST",
      data: {
        email,
        password
      }
    })
    .done(()=> {
      $('#register-email').val("")
      $('#register-password').val("")
      launch()
      displayLogin()
    })
    .fail(response => {
      $('#register-error').text(response.responseJSON.message)
    })
  })

  $('#register-button').on('click', () => {
    launch()
    displayRegister()
  })
  
})

function launch() {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#main-page').hide()
  $('#logout-button').hide()
}

function displayLogin() {
  $('#login-form').show()
  $('#register-form').hide()
}

function displayLogout() {
  $('#logout-button').show()
}

function displayRegister() {
  $('#register-form').show()
  $('#login-form').hide()
}

function displayMainPage() {
  getTodos()
  $('#main-page').show()
  $('#login-form').hide()
  $('#register-form').hide()
}

function getTodos() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      'access_token' : localStorage.getItem('access_token')
    }
  })
  .done(data => {
    console.log(data)
    let todos = ``
    data.forEach(el => {
      todos += `
      <div>
        <div>
          <h5>${el.title}</h5>
          <p>${el.due_date}</p>
          <p>${el.description}</p>
          <div>
            <div class=""><button class="" type="button" onclick="editTodo(${el.id})">Update</button></div>
            <div class=""><button class="" type="button" onclick="deleteTodo(${el.id})">Remove</button></div>
          </div>
        </div>
      <div>`
    })
    $('#todo-list').append(todos)
  })
}

function editTodo(id) {
  console.log(id)
}

function deleteTodo(id) {
  console.log(id)
}

function logOut() {
  localStorage.removeItem('access_token')
  launch()
  displayLogin()
}


function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: 'http://localhost:3000/googleLogin',
    method: 'POST',
    data: {
      googleToken
    }
  })
  .done (response => {
    console.log(response)
    localStorage.setItem('access_token', response.access_token)
    homepage()
    homePageNews()
  })
  .fail((xhr, textStatus) => {
    const errorLog = xhr
      .responseJSON
      .errors
      .map(el => el.message)
                       
    errorLog.forEach( el => {
      $('#errorlog').append(
        `<small id="errmes" class="form-text text-danger">${el}</small>`
      )                    
    })                   
    // alert(errorLog)
    console.log(xhr
      .responseJSON
      .errors[0]
      .message)
  })
  .always(_=> {
    $('#namereg').val('')
    $('#emailreg').val('')
    $('#passwordreg').val('')
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}