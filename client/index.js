$document.ready(function () {
  if (localStorage.getItem('access_token')) {
    showHomePage()
    getTodo()
  } else {
    showLoginPage()
  }
})

function showRegisterPage () {
  $("#register-page").show()
  $("#login-page").hide()
  $("#home-page").hide()
  $("#add-form").hide()
  $("#edit-form").hide()
  $("#btn-logout").hide()
}

function showLoginPage () {
  $("#register-page").hide()
  $("#login-page").show()
  $("#home-page").hide()
  $("#add-form").hide()
  $("#edit-form").hide()
  $("#btn-logout").hide()
}

function showHomePage () {
  $("#register-page").hide()
  $("#login-page").hide()
  $("#home-page").show()
  $("#add-form").hide()
  $("#edit-form").hide()
  $("#btn-logout").hide()
  fetchTodo()
}

function showAddForm () {
  $("#register-page").hide()
  $("#login-page").hide()
  $("#home-page").hide()
  $("#add-form").show()
  $("#edit-form").hide()
  $("#btn-logout").show()
}

function showEditForm () {
  $("#register-page").hide()
  $("#login-page").hide()
  $("#home-page").hide()
  $("#add-form").hide()
  $("#edit-form").show()
  $("#btn-logout").show() 
}

function deleteTask (e, id) {
  e.preventDefault()
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}

function login () {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    showHomePage()
  })
  .fail((xhr, textStatus) => {
    console.log(xhr, textStatus)
  })
  .always(_ => {
    $("#login-email").val("")
    $("#login-password").val("")
  })
}

function logout () {
  localStorage.clear()
  showLoginPage()
}

function fetchTodo () {
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    console.log(res.data)
    res.data.forEach(element => {
      const title = element.title
      const description = element.description
      const status = element.status
      const due_date = element.due_date
    });
  })
  .fail((xhr, textStatus) => {
    console.log(xhr, textStatus)
  })
}

function updateTodo (e, id) {
  e.preventDefault()
  const status = 'complete'
  $.ajax({
    url: `http://localhost:3000/todos${id}`,
    method: 'PATCH',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      status
    }
  })
  .done(res => {
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}