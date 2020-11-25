$(document).ready( () => {

  launch()
  displayLogin()

  function launch() {
    $('#login-form').hide()
    $('#register-form').hide()
    $('#main-page').hide()
    $('#logout-button').hide()
  }

  function displayLogin() {
    $('#login-form').show()
  }

  function displayLogout() {
    $('#logout-button').show()
  }

  function displayMainPage() {
    $('#main-page').show()
    $('#login-form').hide()
    $('#register-form').hide()
  }
  
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
    .fail(xhr => {
      console.log(xhr)
    })
    .always(() => {
      $('#login-email').val('')
      $('#login-password').val('')
    })
  })

  function logOut() {
    localStorage.removeItem('access_token')
    launch()
    displayLogin()
  }

  $('#logout-button').on('click', () => {
    logOut()
  })

  function getTodos() {
    $.ajax({
      url: 'http://localhost:3000/todos',
      method: 'GET',
      headers: {
        'access_token' : localStorage.getItem('access_token')
      }
    })
    .done(data => {
      let todos = ``
      data.forEach(el => {

      })
    })
  }

  function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
      url: 'http://localhost:3000/googleLogin',
      method: 'POST',
      data: {
        googleToken
      }
    })
    .done(response => {

    })
    .fail(response => {

    })
  }
})