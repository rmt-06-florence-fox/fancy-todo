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

register = (event) => {
  event.preventDefault()
  const email = $("#email-register").val()
  const password = $("#password-register").val()

  $.ajax({
    type: "POST",
    url: url + 'register',
    data: {
      email,
      password
    }
  })
  .done(res => {
    $("#email-register").val("")
    $("#password-register").val("")
    $("#register-page").hide()
    $("#login-page").show()
  })
}
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
    .done(res => {
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
  $("#todo-list").empty()
  $.ajax({
    type: "GET",
    url:`${url}todos`,
    headers: {
      access_token
    },
  })
  .done(todos =>{
    console.log(todos);
    todos.forEach(todo => {
      $("#todo-list").append(`
        <div class="card text-center mx-auto">
          <div class="card-header">
            <b>${todo.title}</b>
          </div>
          <div class="card-body d-flex bd-highlight mb-3">          
            <h6 class="card-subtitle p-2 bd-highlight">Description: </h6> 
            <h6 class="card-subtitle p-2 bd-highlight">${todo.description}</h6> 
          </div>
          <div class="card-body d-flex bd-highlight mb-3">          
            <h6 class="card-subtitle p-2 bd-highlight">Status: </h6> 
            <h6 class="card-subtitle p-2 bd-highlight">${todo.status}</h6> 
          </div>
          <div class="card-body d-flex bd-highlight mb-3">          
            <h6 class="card-subtitle p-2 bd-highlight">Due date: </h6> 
            <h6 class="card-subtitle p-2 bd-highlight">${formatDate(todo.due_date)}</h6> 
          </div>
          <div class="card-footer d-flex justify-content-between">          
            <button class="btn btn-info" onClick="editForm(${todo.id})">Edit Todo</button> 
            <button class="btn btn-danger" onClick="deleteTodo(${todo.id})">Delete Todo</button> 
          </div>
        </div>
       
      `)
    })
  })
  .fail(err =>{
    console.log(err);
  })
}

function addForm(){
  console.log('wkwk');
  $("#add-page").show()
  $("#todo-page").empty()
  $("#todo-page").hide()
  $("#edit-page").hide()
}

function addPost(event){
  event.preventDefault()
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $("#add-status").val()
  const due_date = $("#add-due_date").val()
  const access_token = localStorage.getItem('access_token')

  // console.log(title);
  $.ajax({
    type: "POST",
    url: url + `todos/`,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    },
  })

  .done(Todo =>{
    console.log(Todo);
    $("#todo-page").empty()
    getAllTodo()
    $("#add-page").hide()
    $("#todo-page").show()
  })
  .fail(err =>{
    console.log(err);
  })
}
editForm = (id) => {
  $("#edit-page").show()
  $("#todo-page").empty()
  $("#todo-page").hide()

  const access_token = localStorage.getItem('access_token')

  $.ajax({
    type: "GET",
    url: url + `todos/${id}`,
    headers: {
      access_token
    },
  })
  .done(todo => {
    console.log(todo);
    $("#edit-page").append(`
    <form class="form-signin text-center text-center mx-auto pb-4" style="width: 300px;">
    <h1 class="h3 mb-3 font-weight-normal">Edit Todo</h1>

    <label for="edit-title" class="sr-only">Todo Title</label>
    <input type="text" id="edit-title" class="form-control" value="${todo.title}" required autofocus="">

    <label for="edit-description" class="sr-only">Todo Description</label>
    <input type="text" id="edit-description" class="form-control" value=${todo.description} required>

    <label for="edit-status" class="sr-only">Todo Status</label>
    <input type="text" id="edit-status" class="form-control" value=${todo.status} required>

    <label for="edit-due_date" class="sr-only">Todo Due Date</label>
    <input type="date" id="edit-due_date" class="form-control" value=${formatDate(todo.due_date)} required>

    <button class="btn btn-lg btn-primary btn-block" onClick="editTodo(event, ${todo.id})" >Edit Todo</button>
  </form>


    
  
    `)
  })
  .fail(err =>{
    console.log(err);
  })
}

function formatDate(date) {
  let newDate = moment(date).format('YYYY-MM-DD')
  
  console.log(newDate);
  return newDate
}

editTodo = (event, id) =>{
  event.preventDefault()


  const title = $("#edit-title").val()
  const description = $("#edit-description").val()
  const status = $("#edit-status").val()
  const access_token = localStorage.getItem("access_token")

  console.log(title, description, status, id);
  $.ajax({
    type: "PUT",
    url: url + `todos/${id}`,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status
    },
  })
  .done(edit =>{
    $("#todo-page").empty()
    getAllTodo()
    $("#edit-page").hide()
    $("#todo-page").show()
  })
  .fail(err =>{
    console.log(err);
  })
}

function deleteTodo(id){

  const access_token = localStorage.getItem("access_token")

  $.ajax({
    type: "DELETE",
    url: `${url}todos/${id}`,
    headers: {
      access_token
    },
  })
  .done(res =>{
    $("#todo-page").empty()
    getAllTodo()
    $("#todo-page").show()
  })
  .fail(err =>{
    console.log(err);
  })
}
function logout(){
  localStorage.clear();
  $("#login-page").show()
  $("#todo-page").hide()
  
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: "POST",
    url: url + `googleLogin`,
    data: {
      googleToken
    },
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    $("#login-page").hide()
    $("#todo-page").show()
    getAllTodo()
  })
  .fail(err => {
    console.log(err);
  })
}