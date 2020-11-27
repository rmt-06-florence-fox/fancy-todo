let TodoId = null
function showHomePage(){
  $("#homepage").show()
  $("#main-page").hide()
  $("#add-todo-form").hide()
  $("#edit-todo-form").hide()
}
function showMainPage(){
  $("#homepage").hide()
  $("#main-page").show()
  $("#add-todo-form").hide()
  $("#edit-todo-form").hide()
  showTodos()
}
function loginUser(email, password){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/login",
    data: {
      email,
      password
    }
  })
  .done(function(response) {
    localStorage.setItem("access_token", response.access_token)
    console.log("Berhasil login")
    showMainPage()
  })
  .fail(xhr => {
    $("#invalidlogin").prepend(`
    <div class="alert alert-danger alert-dismisible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
    ${xhr.responseJSON.message}
    </div>
    `)
    console.log(xhr)
  })
  .always(() => {
    $("#email-login").val("")
    $("#password-login").val("")
  });

}
function registerUser(first_name, last_name, username, email,password){
  $.ajax({
    url: "http://localhost:3000/register",
    method: "POST",
    data: {
      first_name,
      last_name,
      username,
      email,
      password
    }
    })
    .done(response => {
      $("#register").prepend(`
        <div class="alert alert-success alert-dismisible">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Successfully register, please log in to get access the app!
        </div>
      `)
      showHomePage()
      console.log(response)
    })
    .fail(xhr => {
      for(let i = 0; i < xhr.responseJSON.message.length; i++){
        $("#register").prepend(`
        <div class="alert alert-danger alert-dismisible">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        ${xhr.responseJSON.message[i]}
        </div>
      `)
      }
      console.log(xhr)
    })
    .always(() => {
      $("#first_name-register").val("")
      $("#last_name-register").val("")
      $("#username-register").val("")
      $("#email-register").val("")
      $("#password-register").val("")
    });
}

function showTodos(){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos/",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
        
  })
  .done(function( response ) {
    //console.log(response)
    $("#todos-list").empty()
    for (let i = 0; i < response.length; i++){
      $("#todos-list").prepend(`
      <div id="accordion" style="padding-left: 10px;">
        <div class="card">
        <div class="card-header">
        <a class="card-link" data-toggle="collapse" href="#collapseOne">
          <strong>${response[i].title}<strong> <br>
            <button id="btn-update-status-todo" class="btn btn-primary" onclick="updateStatus(${response[i].id})">Mark As Done</button> <button id="btn-delete-todo" class="btn btn-danger" onclick="deleteTodo(${response[i].id})">Delete</button> <button id="btn-edit-todo" class="btn btn-success" data-toggle="modal" data-target="#edit-form" onclick="toggleEditForm(${response[i].id})">Edit</button>
        </a>
        </div>
        <div id="collapseOne" class="collapse show" data-parent="#accordion">
          <div class="card-body">
            <p>${response[i].description}</p>
            <p>${response[i].due_date}</p>
            <p>${response[i].status}</p>
          </div>
        </div>
      </div>
      </div>
      `)
    }
  })
  .fail(xhr => {
    console.log(xhr)
  })

}
function addTodos(title, description, due_date, status){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(response => {
    $("#add-form-notif").empty()
    $("#add-form-notif").prepend(`
    <div class="alert alert-success alert-dismisible">
      <button typ"button" class="close" data-dismiss="alert">&times;</button>
      Successfully add todo list!
      </div>
    `)
    showMainPage()
    console.log(response)
  })
  .fail(xhr => {
    for(let i = 0; i < xhr.responseJSON.message.length; i++){
      $("#add-form-notif").prepend(`
      <div class="alert alert-danger alert-dismisible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      ${xhr.responseJSON.message[i]}
      </div>
    `)
    }
    console.log(xhr)
  })
  .always(() => {
    $("#title-add").val("")
    $("#description-add").val("")
    $("#status-add").val("")
    $("#due_date-add").val("")
  })
}


function toggleEditForm(id){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos/" + id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
        
  })
  .done(function(response) {
    $("#title-edit").val(response.title)
    $("#description-edit").val(response.description)
    $("#status-edit").val(response.status)
    $("#due_date-edit").val(response.due_date)
    TodoId = response.id

    $("#edit-todo-form").toggle()
    console.log(response)
  })
  .fail(function(xhr) {
    console.log(xhr)
  })
}
function editTodo(title, description, due_date, status, TodoId){
  $.ajax({
    method: "PUT",
    url: "http://localhost:3000/todos/" + TodoId,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(function( response ) {
    //localStorage.setItem("access_token", response.access_token)
    $("#edit-form-notif").empty()
    $("#edit-form-notif").prepend(`
    <div class="alert alert-success alert-dismisible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      Successfully edit todo list!
      </div>
    `)
    console.log("Berhasil edit data")
    showMainPage()
  })
  .fail(xhr => {
    for(let i = 0; i < xhr.responseJSON.message.length; i++){
      $("#edit-form-notif").prepend(`
      <div class="alert alert-danger alert-dismisible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      ${xhr.responseJSON.message[i]}
      </div>
    `)
    }
    console.log(xhr)
  })
  .always(() => {
    $("#title-edit").val("")
    $("#description-edit").val("")
    $("due_date-edit").val("")
    $("#status-edit").val("")
  });
}


function deleteTodo(id){
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3000/todos/" + id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    showMainPage()
  })
  .fail(err => {
    console.log(err)
  })
}

function updateStatus(id){
  $.ajax({
    url: "http://localhost:3000/todos/"+id,
    method: "PATCH",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      status: "Completed"
    }
  })
  .done(response => {
    showMainPage()
  })
  .fail(xhr => {
    console.log(xhr)
  })
}

function logoutUser(){
  localStorage.clear()
  showHomePage()
}