const baseURL = 'http://localhost:3000/'

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
  $('#create-todo').hide()
  $('#edit-todo').hide()
  fetchDataTodoList()
  quote()
  zomato()
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
          <div class="mx-auto">
            <input type="submit" class="btn btn-edit" value="Edit">
          </div>
        </div>
      </form>
  `)
}
function showCreateTodo(){
  showMainPage()
  $('#create-todo').show()
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
function patchData(id){
  $.ajax({
    method: 'PATCH',
    url: baseURL + 'todos/' + id,
    headers:{
      access_token: localStorage.getItem('access_token')
    },
    data: { status: 'done' }
  })
    .done(response => showMainPage())
    .fail(xhr => console.log(xhr))
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
            <div class="card-body mx-auto">
              <a class="btn far fa-check-square fa-2x" href="#" id="btn-edit" onclick = "patchData(${e.id})"></a>
              <a class="btn far fa-edit fa-2x" href="#" id="btn-edit" onclick = "editData(${e.id})"></a>
              <a class="btn far fa-trash-alt fa-2x" href="#" id="btn-delete" onclick = "deleteData(${e.id})"></a>
            </div>
          </div>
        </div>
        `)
      })
    })
    .fail(xhr => console.log(xhr))
}
function quote(){
  $.ajax({
    method: 'GET',
    url: baseURL + 'quotes'
  })
    .done(response => {
      console.log(response, '<<<isi quote');
      $('#list-quote').empty()
      response.result.quotes.forEach((e)=>{
        $('#list-quote').append(`
          <div class="card-body">
            <h6> <i>"${e.quoteText}"</i>  </h6>
            <p class="text-right"><i>'${e.quoteAuthor}'</i></p>
          </div>
        `)
      })
    })
    .fail(xhr => console.log(xhr))
}
function zomato(){
  $.ajax({
    method: 'GET',
    url: baseURL + 'restaurants'
  })
    .done(response=>{
      console.log(response);
      console.log(response.data.length , '<<< banyaknya data');
      let gatcha = Math.floor(Math.random() * response.data.length)
      console.log(gatcha);
      let data = response.data[gatcha].restaurant
      console.log(data, '<<< data restaurants hasil gatcha');
      $('#fetchZomato').empty()
      $('#fetchZomato').append(`
        <div class="card-header header-zomato-list">
        <h6 class="card-title text-center">${data.name}</h6>
      </div>
      <div class="card-body table-zomato">
        <img src="${data.featured_image}" class="card-img-top mx-auto img-zomato" alt="">
        <table class="table table-borderless">
          <th>Location</th>
          <td>${data.location.address}</td>  
        </tr>
        <tr>
          <th>Cuisines</th>
          <td>${data.cuisines}</td> 
          
        </tr>
        <tr>
          <th>Open Hours</th>
          <td>${data.timings}</td>
        </tr>
        <tr>
          <th>Rating</th>
          <td>${data.user_rating.aggregate_rating}</td>
          
        </tr>
        </table>
        </div>
      `)
    })
    .fail(xhr => console.log(xhr))
}