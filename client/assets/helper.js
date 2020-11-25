const URL = "http://localhost:3000/"

$(document).ready(() => {
  // membedakan user dengan access token
  if (localStorage.getItem('accessToken')) showMainPage()
  // else if (localStorage.getItem('accessToken') && editTodo()) showEditPage()
  else showSignInPage()

  $('#signin').click((e) => {
    e.preventDefault()
    doSignIn()
  })
  $('#add-todo').on('submit', (e) => {
    e.preventDefault()
    createTodo()
  })
  $('#signout').click(() => {
    doSignOut()
  })
})

function showSignInPage() {
  $('#signin-container').show()
  $('#main-page-container').hide()
  $('#signout').hide()
  $('#edit-page-container').hide()
}

function showMainPage() {
  $('#signin-container').hide()
  $('#main-page-container').show()
  $('#signout').show()
  $('#edit-page-container').hide()
  fetchTodos()
}

  function showEditPage(id) {
    $('#signin-container').hide()
    $('#main-page-container').hide()
    $('#signout').hide()
    $('#edit-page-container').show()
    editTodo(id)
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
            <button type="submit" onclick="showEditPage(${e.id})" class="btn btn-primary">Edit</button>
            <button type="submit" onclick="deleteTodo(${e.id})">Delete</button>
          </div>
        </div>`)
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
    .done(data => showMainPage())
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

