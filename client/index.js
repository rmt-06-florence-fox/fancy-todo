const server = 'http://localhost:3000'

$(document).ready(function () {
  const token = localStorage.getItem('access_token')
  if (!token) {
    $('#signIn').show()
    $('#signUp').hide()
    $('#listTodo').hide()
    $('#add-todo').hide()
    $('#edit-todo').hide()
    $('#signOut').hide()
  }
  else {
    $('#signIn').hide()
    $('#signUp').hide()
    $('#listTodo').show()
    fetch()
    $('#add-todo').hide()
    $('#edit-todo').hide()
    $('#signOut').show()
  }
})

function toSignUp() {
  $('#signIn').hide()
  $('#signUp').show()
}

function toSignIn() {
  $('#signIn').show()
  $('#signUp').hide()
}

function signUp(e) {
  e.preventDefault()
  $('#signUp').show()
  const name = $('#name-input').val()
  const email = $('#input-email').val()
  const password = $('#input-password').val()
  $.ajax({
    method: 'POST',
    url: server + '/users/signup',
    data: {
      name: name,
      email: email,
      password: password
    }
  })
    .done((res) => {
      localStorage.setItem('access_token', res.token)
      $('#signUp').hide()
      $('#signIn').show()
      $('#signup-user').trigger("reset")
    })
    .fail((err) => {
      console.log(err);
    })
}

function signIn(e) {
  e.preventDefault()
  $('#signIn').show()
  const email = $('#email-input').val()
  const password = $('#password-input').val()
  $.ajax({
    method: 'POST',
    url: server + '/users/signin',
    data: {
      email: email,
      password: password
    }
  })
    .done((res) => {
      localStorage.setItem('access_token', res.token)
      $('#signIn').hide()
      $('#listTodo').show()
      fetch()
      $('#signOut').show()
      $('#signedIn').trigger("reset")
    })
    .fail((err) => {
      console.log(err);
    })
}

function fetch() {
  const token = localStorage.getItem('access_token')
  $.ajax({
    method: 'get',
    url: server + '/todos',
    headers: {
      token
    }
  })
    .done((res) => {
      $('#todo').empty()
      res.forEach(el => {
        if (el.status === "On progress") {
          $('#todo').append(` 
          <div class="col-3">
          <div class="card bg-light mb-3" style="max-width: 18rem; height: 200px">
        <div class="card-header">${el.due_date}</div>
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <span class="badge badge-info">${el.status}</span>
          <p class="card-text">${el.description}</p>
          <button type="button" class="btn btn-outline-success" onclick="markAsDone(${el.id})">Mark as Done</button><br>
          <button type="button" class="btn btn-outline-primary">Edit Todo</button>
          <button type="button" onclick="deleteTodo(${el.id})" class="btn btn-outline-secondary">Delete</button>
        </div>
      </div>
      </div>
      `)
        } else {
          $('#todo').append(` 
          <div class="col-3">
          <div class="card bg-light mb-3" style="max-width: 18rem; height: 200px">
        <div class="card-header">${el.due_date}</div>
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <span class="badge badge-success">${el.status}</span>
          <p class="card-text">${el.description}</p>
          <button type="button" class="btn btn-outline-primary">Edit Todo</button>
          <button type="button" onclick="deleteTodo(${el.id})" class="btn btn-outline-secondary">Delete</button>
        </div>
      </div>
      </div>
      `)

        }
      })
    })
    .fail((err) => {
      console.log(err);
    })
}

function signOut() {
  localStorage.clear()
  $('#signIn').show()
  $('#listTodo').hide()
  $('#signOut').hide()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


function tocreate() {
  $('#listTodo').hide()
  $('#add-todo').show()
}

function toCancel() {
  $('#listTodo').show()
  $('#add-todo').hide()
}

function create(e) {
  e.preventDefault()
  const token = localStorage.getItem('access_token')

  const title = $('#title-input').val()
  const desc = $('#desc-input').val()
  const dueDate = $('#dueDate-input').val()
  $.ajax({
    method: 'POST',
    url: server + '/todos',
    headers: {
      token
    },
    data: {
      title: title,
      description: desc,
      due_date: dueDate
    }
  })
    .done((res) => {
      $('#listTodo').show()
      fetch()
      $('#add-todo').hide()
    })
    .fail((err) => {
      console.log(err);
    })
}

function markAsDone(id) {
  const token = localStorage.getItem('access_token')

  $.ajax({
    method: 'PATCH',
    url: server + `/todos/${id}`,
    headers: {
      token
    }
  })
    .done((res) => {
      fetch()
    })
    .fail((err) => {
      console.log();
    })
}

function deleteTodo(id) {
  const token = localStorage.getItem('access_token')
  $.ajax({
    method: 'DELETE',
    url: server + `/todos/${id}`,
    headers: {
      token
    }
  })
    .done(() => {
      fetch()
    })
    .fail(err => {
      console.log(err);
    })
}
function onSignIn(googleUser) {
  var googleToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: server + '/users/googleSignIn',
    data: {
      googleToken
    }
  })
    .done((res) => {
      console.log(res);
    })
    .fail((err) => {
      console.log((err));
    })
}
