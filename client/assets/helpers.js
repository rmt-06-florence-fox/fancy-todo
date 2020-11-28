let TodoId = null
let calendar



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
  quotes()
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
    let closestDeadline = {
      daysLeft: 0,
      activity: null
    }
    calendar.getEvents().forEach(element => {
      element.remove()
    });
    $("#todos-list-ongoing").empty()
    $("#todos-list-completed").empty()
    const milisecondsperDay = 24*60*60*1000
    let daysLeft = (new Date(response[0].due_date).getTime() - new Date(new Date().toISOString().split("T")[0]).getTime())/milisecondsperDay
    closestDeadline.daysLeft = daysLeft
    closestDeadline.activity = []
    for (let i = 0; i < response.length; i++){
      //show Todos on list and calendar
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      let date = response[i].due_date.slice(8,10)
      let month = months[Number(response[i].due_date.slice(5,7)) - 1]
      let year = response[i].due_date.slice(0,4)
      if (response[i].status === "On Going"){

        daysLeft = (new Date(response[i].due_date).getTime() - new Date(new Date().toISOString().split("T")[0]).getTime())/milisecondsperDay
        if (daysLeft < closestDeadline.daysLeft){
          closestDeadline.daysLeft = daysLeft
          closestDeadline.activity = []
          closestDeadline.activity.push(response[i].title)
        }
        else if (daysLeft === closestDeadline.daysLeft){
          closestDeadline.activity.push(response[i].title)
        }

        addEventCalendar({
          title: response[i].title,
          start: response[i].due_date,
          allDay: false
        })
        $("#todos-list-ongoing").prepend(`
        <div class="card bg-light mb-3 mx-auto" style="max-width: 25rem;">
        <div class="card-header">${response[i].title}<button class="close" id="btn-delete-todo" onclick="deleteTodo(${response[i].id})">&times;</button><br>
        <button id="btn-update-status-todo" class="btn btn-primary" onclick="updateStatus(${response[i].id})">Mark As Done</button> <button id="btn-edit-todo" class="btn btn-success" data-toggle="modal" data-target="#edit-form" onclick="toggleEditForm(${response[i].id})">Edit</button>
        </div>
        <div class="card-body">
          <p class="card-text">Desc: ${response[i].description}<br>
          Due Date: ${date} ${month} ${year}</p>
        </div>
        </div>
        `)
      }
      else if (response[i].status === "Completed"){
        $("#todos-list-completed").prepend(`
        <div class="card bg-light mb-3 mx-auto" style="max-width: 25rem;">
        <div class="card-header">${response[i].title}<button class="close" id="btn-delete-todo" onclick="deleteTodo(${response[i].id})">&times;</button></div>
        <div class="card-body">
          <p class="card-text">Desc: ${response[i].description}<br>
          Due Date: ${date} ${month} ${year}</p>
        </div>
        </div>
        `)
      }
    }
    if(!closestDeadline.activity.length){
      closestDeadline.daysLeft = "-"
    }
    getDeadline(closestDeadline)
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
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      Successfully add todo list!
      </div>
    `)
    showMainPage()
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
    //$("#status-edit").val(response.status)
    $("#due_date-edit").val(response.due_date)
    TodoId = response.id

    $("#edit-todo-form").toggle()
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
  let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  showHomePage()
}

renderCalendar()
function renderCalendar(){
  document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay'
      },
      events: []
    });
    calendar.render();
  });
  
}

function addEventCalendar(event){
  calendar.addEvent(event)
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: "http://localhost:3000/googleLogin",
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
  .done(response => {
    localStorage.setItem("access_token", response.access_token)
    showMainPage()
  })
  .fail(err => {
    console.log(err)
  })
  

}

function quotes(){
  $.ajax({
    url: "http://localhost:3000/quotes",
    method: "GET"
  })
  .done(response => {
    $("#quotes").empty()
    $("#quotes").prepend(`
    <figure class="card" style="background: #eee; width: 30rem;>
      <blockquote class="text-center">
      <p><strong>Quotes Of The Day</strong></p>
        ${response.quotes}
      </blockquote>
      <figcaption class="text-center">&mdash; ${response.author} </figcaption>
  </figure>
    `)
    console.log(response)
  })
  .fail(err => {
    console.log(err + "<<<< ini error")
  })
}

function getDeadline(data){
  $("#closestDeadline").empty()
  $("#closestDeadline").prepend(`
  <figure class="card" style="background: #eee; width: 40rem;>
    <blockquote class="text-center">
      <p><strong>Reminder<strong></p>
      Your closest deadline: ${data.activity.join(", ")}<br>
      Day(s) left: ${data.daysLeft} day(s)
    </blockquote>
  </figure>
  `)
}






