const URL = "https://fancy-todo207.herokuapp.com/"

$(document).ready(() => {
  // membedakan user dengan access token
  methodShow()

  $('#signin').click((e) => {
    e.preventDefault()
    doSignIn()
  })
  $('#add-todo').on('submit', (e) => {
    e.preventDefault()
    createTodo()
  })
  $('#signup').click((e) => {
    e.preventDefault()
    showSignUpPage()
  })
  $('#signup-user').on('submit', ((e) => {
    e.preventDefault()
    doSignUp()
  }))
  $('#signout').click(() => {
    doSignOut()
  })
})

function methodShow() {
  if (localStorage.getItem('accessToken')) showMainPage()
  else showSignInPage()
}

function showSignInPage() {
  $('#signin-container').show()
  $('#main-page-container').hide()
  $('#signup').show()
  $('#signup-container').hide()
  $('#signout').hide()
  $('#edit-page-container').hide()
}

function showMainPage() {
  $('#signin-container').hide()
  $('#main-page-container').show()
  $('#signup').hide()
  $('#signout').show()
  $('#signup-container').hide()
  $('#edit-page-container').hide()
  fetchTodos()
}

function showEditPage(id) {
  $('#signin-container').hide()
  $('#main-page-container').hide()
  $('#signup').hide()
  $('#signup-container').hide()
  $('#signout').hide()
  $('#edit-page-container').show()
  editTodo(id)
}

function showSignUpPage() {
  $('#signin-container').hide()
  $('#main-page-container').hide()
  $('#signup').hide()
  $('#signup-container').show()
  $('#signout').hide()
  $('#edit-page-container').hide()
}

function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token
  // console.log(googleToken)
  $.ajax({
    url: `${URL}googleSignIn`,
    method: 'POST',
    data: { googleToken }
  })
    .done(response => {
      localStorage.setItem('accessToken', response.accessToken)
      showMainPage()
    })
    .fail(err => console.log(err))
}

function doSignIn() {
  const email = $('#input-email').val()
  const password = $('#input-password').val()
  $.ajax({
    url: `${URL}signIn`,
    method: "POST",
    data: { email, password }
  })
    .done(response => {
      //set token di client, tergantung nama variabel di controller
      localStorage.setItem('accessToken', response.accessToken)
      // console.log('berhasil login', response)
      showMainPage()
    })
    .fail(err => {
      console.log(err)
    })
    .always(_ => {
      $('#input-email').val('')
      $('#input-password').val('')
    })
}

function doSignOut() {
  localStorage.clear()
  showSignInPage()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
}

function doSignUp() {
  const username = $('#signup-username').val()
  const email = $('#signup-email').val()
  const password = $('#signup-password').val()
  $.ajax({
    url: `${URL}signUp`,
    method: 'POST',
    data: { username, email, password }
  })
    .done(() => methodShow())
    .fail(err => console.log(err))
    .always(_ => $('#signup-container').trigger('reset'))
}

function fetchTodos() {
  $('#todo-list').empty()
  $.ajax({
    url: `${URL}todos`,
    method: 'GET',
    headers: {
      accessToken: localStorage.getItem('accessToken')
    }
  })
    .done(result => {
      result.forEach(e => {
        $('#todo-list').append(`
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-header">${e.title}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${e.description}</li>
                <li class="list-group-item">${e.status}</li>
                <li class="list-group-item">${e.dueDate}</li>
              </ul>
              <div class="form-group form-text">
                <button type="submit" onclick="showEditPage(${e.id})" class="btn btn-margin col-md-4 btn-primary">Edit</button>
                <button type="submit" onclick="deleteTodo(${e.id})" class="btn btn-margin col-md-4 btn-primary">Delete</button>
              </div>
            </div>
          </div>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function createTodo() {
  const title = $('#input-title').val()
  const description = $('#input-description').val()
  let date = $('#input-date').val()
  $.ajax({
    url: `${URL}todos`,
    method: 'POST',
    headers: { accessToken: localStorage.getItem('accessToken') },
    data: { title, description, dueDate: formatDate(date) }
  })
    .done(() => fetchTodos())
    .fail(err => console.log(err))
    .always(_ => $('#add-todo').trigger('reset'))
}

function deleteTodo(id) {
  $.ajax({
    url: `${URL}todos/${id}`,
    method: 'DELETE',
    headers: { accessToken: localStorage.getItem('accessToken') }
  })
    .done(() => fetchTodos())
    .fail(err => console.log(err))
}

function updateTodo(id) {
  const title = $('#edit-title').val()
  const description = $('#edit-description').val()
  const status = $('#edit-status').val()
  let date = $('#edit-date').val()
  $.ajax({
    url: `${URL}todos/${id}`,
    method: 'PUT',
    headers: { accessToken: localStorage.getItem('accessToken') },
    data: { title, description, status, dueDate: formatDate(date) }
  })
    .done(() => showMainPage())
    .fail(err => console.log(err))
}

function editTodo(id) {
  $.ajax({
    url: `${URL}todos/${id}`,
    method: 'GET',
    headers: {
      accessToken: localStorage.getItem('accessToken')
    }
  })
    .done(result => {
      $('#edit-title').val(result.title)
      $('#edit-description').val(result.description)
      $('#edit-status').val(result.status)
      $('#edit-date').val(result.dueDate)
      $('#edit-todo').on('submit', (e) => {
        e.preventDefault()
        updateTodo(id)
      })
    })
    .fail(err => console.log(err))
}

function formatDate(valueDate) {
  var d = new Date(valueDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

