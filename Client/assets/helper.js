function onSignIn(googleUser) {
  var googleToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: 'http://localhost:3000/googleLogin',
    method: 'POST',
    data:{ googleToken }
  })
    .done(response=>{
      localStorage.setItem('access_token', response.accessToken)
      showMainPage()
    })
    .fail(xhr => console.log(xhr))
}

function showLoginPage(){
  $('.navbar').show()
  $('#login-page').show()
  $('#regist-page').hide()
  $('#btn-logout').hide()
  $('#main-page').hide()
}
function showRegistPage(){
  $('.navbar').show()
  $('#regist-page').show()
  $('#login-page').hide()
  $('#btn-logout').hide()
  $('#main-page').hide()
}
function regist(){
  $('#form-regist').on('submit', function(e){
    e.preventDefault()
    console.log('---testing---');
    const username = $('#registUsername').val()
    const email = $('#registEmail').val()
    const password = $('#registPassword').val()
    $.ajax({
      url: 'http://localhost:3000/register',
      method: 'POST',
      data:{
        username,
        email,
        password
      }
    })
      .done(response => {
        showLoginPage()
      })
      .fail((xhr, textStatus) =>{
        console.log('--- gagal ---');
        console.log(xhr, textStatus)
      })
      .always(_ =>{
        $('#regist-page').trigger('reset')
      })
  })
}
function login(){
  $('#form-login').on('submit', function(e){
    e.preventDefault()
    const email = $('#loginEmail').val()
    const password = $('#loginPassword').val()
    $.ajax({
      url: 'http://localhost:3000/login',
      method: 'POST',
      data:{
        email,
        password
      }
    })
      .done(response => {
        console.log(response);
        localStorage.setItem('access_token', response.accessToken)
        console.log(localStorage, '<<< local storage');
        showMainPage()
      })
      .fail((xhr, textStatus) =>{
        console.log(xhr, textStatus)
      })
      .always(_ =>{
        $('#login-page').trigger('reset')
      })
  })
}
function logout(){
  $('.navbar').show()
  $('#btn-logout').hide()
  $('.container').hide()
  localStorage.removeItem("access_token");
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  showLoginPage()
}
function showMainPage(){
  $('.navbar').show()
  $('#btn-nav-login').hide()
  $('#btn-nav-regist').hide()
  $('#login-page').hide()
  $('#regist-page').hide()
  $('#btn-logout').show()
  $('#main-page').show()
  $('#edit-todo').hide()
  fetchDataTodoList()
}
function showEditPage(data){
  $('.navbar').show()
  $('#btn-nav-login').hide()
  $('#btn-nav-regist').hide()
  $('#login-page').hide()
  $('#regist-page').hide()
  $('#btn-logout').show()
  $('#create-todo').hide()
  $('#todo-list').hide()
  $('#edit-todo').show()
  $('#edit-todo').append(`
    <form id="form-edit-todo" onsubmit="updateData(${data.id})">
        <div class="form-group row">
          <label for="editTitle" class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="editTitle" value="${data.title}">
          </div>
        </div>
        <div class="form-group row">
          <label for="editDescription" class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="editDescription" value="${data.description}">
          </div>
        </div>
        <div class="form-group row">
          <label for="editStatus" class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="editStatus" value="${data.status}">
          </div>
        </div>
        <div class="form-group row">
          <label for="editDueDate" class="col-sm-2 col-form-label">Due Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="editDueDate" value="${data.due_date}">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <input type="submit" class="btn btn-primary" value="Edit">
          </div>
        </div>
      </form>
  `)
}
function createTodo(){
  const title = $('#inputTitle').val()
  const description = $('#inputDescription').val()
  const status = $('#inputStatus').val()
  const due_date = $('#inputDueDate').val()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/todos',
    headers:{
      access_token: localStorage.getItem('access_token')
    },
    data:{
      title,
      description,
      status,
      due_date
    }
  })
    .done(response => fetchDataTodoList())
    .fail(xhr => console.log(xhr))
    .always(_ => $('#create-todo').trigger('reset'))
}
function deleteData(id){
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${id}`,
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => fetchDataTodoList())
    .fail(xhr => console.log(xhr))
}
function editData(id){
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/todos/${id}`,
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response =>{
      showEditPage(response.data)
    })
    .fail(xhr => console.log(xhr))
}
function updateData(id){
  const title = $('#editTitle').val()
  const description = $('#editDescription').val()
  const status = $('#editStatus').val()
  const due_date = $('#editDueDate').val()
  // console.log(title, description, status, due_date, id, "<<< hasil update");
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${id}`,
    headers:{
      access_token: localStorage.getItem('access_token')
    },
    data:{
      title,
      description,
      status,
      due_date
    }
  })
    .done(response =>{
      showMainPage()
    })
    .fail(xhr => console.log(xhr))
    .always(_ => $('#edit-todo').trigger('reset'))
}
function fetchDataTodoList(){
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response =>{
      $('#todo-list').empty()
      // console.log(response);
      response.data.forEach((e)=>{
        $('#todo-list').append(`
        <div class = "col mb-4">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
            </div>
            <table class="table table-borderless">
              <tr>
                <th>Description</th>
                <td>${e.description}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>${e.status}</td>
              </tr>
              <tr>
                <th>Due Date</th>
                <td>${e.due_date}</td>
              </tr>
            </table>
            <div class="card-body">
              <a class="btn btn-primary" href="#" id="btn-edit" onclick = "editData(${e.id})">Edit</a>
              <a class="btn btn-danger" href="#" id="btn-delete" onclick = "deleteData(${e.id})">Delete</a>
            </div>
          </div>
        </div>
        `)
      })
    })
    .fail(xhr => console.log(xhr))
}
