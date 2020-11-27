$(document).ready(function(){
  
  if(localStorage.getItem("access_token")){
    showMainPage()
  }
  else {
    showHomePage()
  }

  $("#submit-login-form").on("submit", function(event){
    event.preventDefault()
    let email = $("#email-login").val()
    let password = $("#password-login").val()
    loginUser(email,password)
    console.log({
      email,
      password
    })
  })

  $("#submit-register-form").on("submit", function(event){
    event.preventDefault()
    let first_name = $("#first_name-register").val()
    let last_name = $("#last_name-register").val()
    let username = $("#username-register").val()
    let email = $("#email-register").val()
    let password = $("#password-register").val()
    registerUser(first_name, last_name, username, email,password)
    console.log({
      email,
      password
    })
  })

  

  $("#btn-add-todo").on("click", function(){
    $("#add-form-notif").empty()
    $("#add-todo-form").toggle()
  })

  $("#add-todo-form").on("submit", function(event){
    event.preventDefault()
    let title = $("#title-add").val()
    let description = $("#description-add").val()
    let status = $("#status-add").val()
    let due_date = $("#due_date-add").val()
    console.log({
      title,
      description,
      due_date,
      status
    })
    addTodos(title, description, due_date, status)
  })

  $("#edit-todo-form").on("submit", function(event){
    event.preventDefault()
    let title = $("#title-edit").val()
    let description = $("#description-edit").val()
    let status = $("#status-edit").val()
    let due_date = $("#due_date-edit").val()
    console.log({
      title,
      description,
      due_date,
      status
    })
    editTodo(title, description, due_date, status, TodoId)
  })

  $("#btn-logout").on("click", () => {
    logoutUser()
  })

})