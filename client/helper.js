const URL = "http://localhost:3000/"

$(document).ready(() => {
  // membedakan user dengan access token
  if (localStorage.getItem('accessToken')) showMainPage()
  else showSignInPage()
  $('#signin').click((e) => {
    e.preventDefault()
    doSignIn()
  })
  $('#add-todo').on('submit', (e) => {
    e.preventDefault()
    createTodos()
  })
  $('#signout').click(() => {
    doSignOut()
  })
})

function showSignInPage() {
  $('#signin-container').show()
  $('#main-page-container').hide()
  $('#signout').hide()
}

function showMainPage() {
  $('#signin-container').hide()
  $('#main-page-container').show()
  $('#signout').show()
  fetchTodos()
}

function doSignIn() {
  const email = $('#input-email').val()
  const password = $('#input-password').val()
  $.ajax({
    url: `${URL}signIn`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(result => {
      //set token di client, tergantung nama variabel di controller
      localStorage.setItem('accessToken', result.accessToken)
      console.log('berhasil login', result)
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

// function displayMainPage() {

// }

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
        <div>
          <div>
            <h5>${e.title}</h5>
            <h5>${e.description}</h5>
            <h5>${e.status}</h5>
            <h5>${e.dueDate}</h5>
            <button type="submit" onclick="deleteTodo(${e.id})">Delete</button>
          </div>
        </div>`)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function createTodos() {
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

function doSignOut() {
  localStorage.clear()
  showSignInPage()
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

