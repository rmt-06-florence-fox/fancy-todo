function showLoginPage(){
  $("#main_page").hide()
  $("#login_form").show()
  $("#register_form").hide()
  $("#button_logout").hide()
  $("#form-edit-todo").hide()
  quoteShow()
}

function showMainPage(){
  $("#main_page").show()
  $("#login_form").hide()
  $("#register_form").hide()
  $("#button_logout").show()
  fetchTodo()
  
  console.log($("#user-name").text(`${name}`))
  $("#user-name").text(`${name}`)
}
function showRegister(){
  $("#main_page").hide()
  $("#login_form").hide()
  $("#register_form").show()
  $("#button_logout").hide()
  $("#form-edit-todo").hide()
  jokeShow()
}
function showEditForm(id){
  $("#main_page").hide()
  $("#login_form").hide()
  $("#register_form").hide()
  $("#button_logout").show()
}
function logout(){
  localStorage.clear( )
  showLoginPage()
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    $("#todo-list").empty()
    console.log('User signed out.');
  });
}
function login(){
  const email = $("#email_input_login").val()
  const password = $("#password_input_login").val()
  const name = email.split('@')[0].toUpperCase()
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
    showMainPage()
    $("#greeting").append(`<h2>HI!</h2><h3 id="">${name}</h3>`)
  })
  .fail((xhr, textStatus) => {
    swal(`${xhr.responseJSON.message}`);
  }) 
  .always( () => {
    $("#email_input_login").val("")
    $("#password_input_login").val("")
  })
}

function onSignIn(googleUser) {
  let googleToken = googleUser.getAuthResponse().id_token;
  console.log(googleToken)
  $.ajax({
    url: 'http://localhost:3000/googleLogin',
    method: 'POST',
    data: {
      googleToken
    } 
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    showMainPage( )
    console.log(res)
  })
  .fail(err => {
    swal(`error`)
  })
}
function register(){
  const email = $("#email_input_register").val()
  const password = $("#password_input_register").val()
  $.ajax({
    url: 'http://localhost:3000/register',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    swal(`REGISTER SUCCESS`)
    showLoginPage()
  })
  .fail((xhr, textStatus) => {
    swal(`${xhr.responseJSON.message}`)
  }) 
  .always(() => {
    const email = $("#email_input_register").val("")
    const password = $("#password_input_register").val("")
  })
}
function fetchTodo(){
  $("#todo-list").empty()
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    res.forEach(element => {
      $("#todo-list").append(`
          <tr>
            <td id=${"title-"+element.id} scope="row">${element.title}</th>
            <td id=${"desc-"+element.id}>${element.description}</td>
            <td id=${"status-"+element.id}>${element.status}</td>
            <td id=${"due_date-"+element.id}>${element.due_date}</td>
            <td>
              <button id="but_edit" onclick="moveToEditPage(${element.id})" class="btn btn-dark">edit</button> 
              <button id="but_delete" onclick="deleteTodo(${element.id})" class="btn btn-info">delete</button>
            </td>
            <td>
            <button id="but-completed" onclick="completedStatus(${element.id})" class="btn btn-primary">
              <i class="fas fa-check"></i>
            </button>
            <button id="but-unfinished" onclick="uncompletedStatus(${element.id})"  class="btn btn-danger">
            <i class="fas fa-times"></i>
            </button>
          </td>
          </tr>
        `)
    });
  })
}
function fetchCompletedTodo(){
  $("#todo-list").empty()
  $.ajax({
    url: 'http://localhost:3000/todos/completed',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    res.forEach(element => {
      $("#todo-list").append(`
          <tr>
            <td id=${"title-"+element.id} scope="row">${element.title}</th>
            <td id=${"desc-"+element.id}>${element.description}</td>
            <td id=${"status-"+element.id}>${element.status}</td>
            <td id=${"due_date-"+element.id}>${element.due_date}</td>
            <td>
              <button id="but_edit" onclick="moveToEditPage(${element.id})" class="btn btn-dark">edit</button> 
              <button id="but_delete" onclick="deleteTodo(${element.id})" class="btn btn-info">delete</button>
            </td>
            <td>
            <button id="but-completed" onclick="completedStatus(${element.id})" class="btn btn-primary">
              <i class="fas fa-check"></i>
            </button>
            <button id="but-unfinished" onclick="uncompletedStatus(${element.id})"  class="btn btn-danger">
            <i class="fas fa-times"></i>
            </button>
          </td>
          </tr>
        `)
    });
  })
}

function fetchUnfinishedTodo(){
  $("#todo-list").empty()
  $.ajax({
    url: 'http://localhost:3000/todos/unfinished',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    res.forEach(element => {
      $("#todo-list").append(`
          <tr>
            <td id=${"title-"+element.id} scope="row">${element.title}</th>
            <td id=${"desc-"+element.id}>${element.description}</td>
            <td id=${"status-"+element.id}>${element.status}</td>
            <td id=${"due_date-"+element.id}>${element.due_date}</td>
            <td>
              <button id="but_edit" onclick="moveToEditPage(${element.id})" class="btn btn-dark">edit</button> 
              <button id="but_delete" onclick="deleteTodo(${element.id})" class="btn btn-info">delete</button>
            </td>
            <td>
            <button id="but-completed" onclick="completedStatus(${element.id})" class="btn btn-primary">
              <i class="fas fa-check"></i>
            </button>
            <button id="but-unfinished" onclick="uncompletedStatus(${element.id})"  class="btn btn-danger">
            <i class="fas fa-times"></i>
            </button>
          </td>
          </tr>
        `)
    });
  })
}
function deleteTodo(id){
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${+id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
  })
  .done(res => {
    swal(`Good job! delete TODO id ${id} success`);
    showMainPage()
  })
  .fail(xhr => {
    console.log(err)
  })
  console.log(id) 
}
function createTodo(){
  const title = $("#title-addForm").val()
  const description = $("#desc-addForm").val()
  const due_date = $("#due-date-addForm").val()
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(res => {
    showMainPage()
    swal("Good job!", "New data created!", "success");
    console.log(res)
  })
  .fail(xhr => {
    console.log(xhr)
  })
  .always(() => {
    const title = $("#title-addForm").val("")
    const description = $("#desc-addForm").val("")
    const status = $("#status-addForm").val("")
    const due_date = $("#due-date-addForm").val("")
  })
}
function moveToEditPage(id){
  toggleModal(id)
}
function editTodo(){
  let id = $("#id-editForm").val()
  const title = $("#title-editForm").val()
  const description = $("#desc-editForm").val()
  const due_date = $("#due-date-editForm").val()
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(res => {
    swal("Succes!", "Edit Your Task ");
    showMainPage()
  })
  .fail(xhr => {
    swal(`Error!, ${xhr.responseJSON.message}`);
  })
  .always(() => {
    const title = $("#title-addForm").val("")
    const description = $("#desc-addForm").val("")
    const due_date = $("#due-date-addForm").val("")
  })
}

function toggleModal (id) {
  $('#title-editForm').val($("#title-"+id).text())
  $('#desc-editForm').val($("#desc-"+id).text())
  $('#status-editForm').val($("#status-"+id).text())
  $('#due-date-editForm').val($("#due_date-"+id).text())
  $('#id-editForm').val(id)
  $('#myModal').modal('toggle')
}

function completedStatus(id){
  $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      status: 'completed'
    }
  })
  .done(res => {
    showMainPage()
  })
  .fail(xhr => {
    console.log(xhr)
  })
}

function uncompletedStatus(id){
  $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      status: 'unfinished'
    }
  })
  .done(res => {
    showMainPage()
  })
  .fail(xhr => {
    console.log(xhr)
  })
}
function quoteShow(){
  $("#quote").empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/quote`,
  })
  .done(res => {
    $("#quote").append(
      `<h1>${res.quote}</h1>
      <h4>--${res.author}--</h4>
      `
    )
  })
  .fail(xhr => {
    console.log(xhr)
  })
}
function jokeShow(){
  $("#jokes").empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/jokes`,
  })
  .done(res => {

    $("#jokes").append(
      `<h1>${res.setup}</h1>
      <h3>${res.punchline}</h3>
      `
    )
  })
  .fail(xhr => {
    console.log(xhr)
  })
}