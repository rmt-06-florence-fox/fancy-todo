const url = 'http://localhost:3000/'

$(document).ready(function(){
  const access_token = localStorage.getItem('access_token')

  if(!access_token) {
    $("#login-page").show()
    $("#register-page").hide()
    $("#todo-page").hide()
    $("#add-page").hide()
    $("#edit-page").hide()
  } else {
    $("#login-page").hide()
    $("#register-page").hide()
    $("#todo-page").show()
    getAllTodo()
    $("#add-page").hide()
    $("#edit-page").hide()
  }

  $('#btn-register').click(function () {
    $("#login-page").hide()
    $("#register-page").show()
  })

  $('#btn-login').click(function () {
    $("#login-page").show()
    $("#register-page").hide()
  }) 
})

login = (event) => {
  event.preventDefault()
  const email = $("#email-login").val()
  const password = $("#password-login").val()

  $.ajax({
    type: "POST",
    url: url + 'login',
    data: {
      email,
      password
    },
  })
    .then(res => {
      localStorage.setItem('access_token', res.access_token)
      $("#login-page").hide()
      $("#todo-page").show()
      getAllTodo()
    })
    .fail(err => {
      console.log(err);
    })
}

getAllTodo = () =>{
  const access_token = localStorage.getItem('access_token')
  
  $.ajax({
    type: "GET",
    url: url + 'todos',
    headers: {
      access_token
    },
  })
  .then(res =>{
    console.log(res);
  })
  .fail(err =>{
    console.log(err);
  })
}