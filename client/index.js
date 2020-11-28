const SERVER = 'https://gute-fancy.herokuapp.com'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

$(document).ready(()=> {
    const access_token= localStorage.access_token
    $("#register-page").hide()
    $("#homepage_navbar").hide()
    $("#add-todo-page").hide()
    $("error-message").empty()
    $("#edit-todo-page").empty()

    if(access_token) {
        fetchTodo()
        weather()
        $("#register-page").hide()
        $("#login-page").hide()
        $("#home-page").show()
        $("#homepage_navbar").show()
        $("#edit-todo-page").empty()
    }else {
        $("#todo-cart").hide()
        $("landing_navbar").hide()
        $("#landing-page").show();
        $("#home-page").hide();
        $("#homepage_navbar").hide()
    }
})

function onSignIn(googleUser) {

  var google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
      method: 'POST',
      url: SERVER + "loginGoogle",
      data: {
        google_access_token
      }
    })
    .done(response => {
      console.log(response);
      let access_token = response.access_token
      localStorage.setItem('access_token', access_token)
      $("#content-card").empty()
      $("#weather-card").empty()
      $("#login-page").hide()
      $("#home-page").show()
      $("#homepage_navbar").show()
      $("#todo-cart").show()
      $("#add-todo-page").hide()
      //ngosongin isi form after login
      $('#input-email').val('')
      $('#input-password').val('')

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })

      fetchTodo()
      weather() 
    })
    .fail(err => {
      Swal.fire(
        'Error!',
        err.responseJSON.message,
        'ERROR'
      )
    })
}

function login(event) {
    event.preventDefault()
    const email = $("#input-email").val()
    const password = $("#input-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + 'login',
        data: {
            email,
            password
        }
    })
    .done(response => {
        $("#content-card").empty()
        $("#weather-card").empty()
        const access_token= response.access_token
        console.log(access_token)
        localStorage.setItem('access_token', access_token)
        fetchTodo()
        weather()
        $("#login-page").hide()
        $("#home-page").show()
        $("#homepage_navbar").show()
        $("#todo-cart").show()
        $("#add-todo-page").hide()
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error !',
            err.responseJSON.message,
            'ERROR'
        )
    })
}

function register(event) {
  event.preventDefault();
  const email = $("#register-email").val();
  const password = $("#register-password").val();
  $.ajax({
    method: "POST",
    url: SERVER + "register",
    data: {
      email,
      password
    }
  })
  .done(response => {
    $("#login-page").show();
    $("#home-page").hide();
    $("#register-page").hide();
    Toast.fire({
        icon: 'success',
        title: 'registered in successfully'
      })
  }).fail(err => {
    Swal.fire(
        'Error !',
        err.responseJSON.message,
        'ERROR'
    )
  })
}
$("#register-link").on('click', ()=> {
    $("#register-page").show()
    $("#login-page").hide()
})

$("#cancel-register").on('click', ()=> {
    $("#login-page").show()
    $("#register-page").hide()
})

function fetchTodo(){
const access_token= localStorage.getItem('access_token')
console.log(access_token)
$.ajax({
    method: "GET",
    url: SERVER + "todos",
    headers: {
      access_token
    }
  }).done(response => {
    console.log(response, 'ini kan yang ngaco')
    $("#content-card").empty();
    $("#weather-card").empty()
    if (response.length !== 0) {
      response.forEach(element => {
        $("#content-card").append(`
          <div class="row justify-content-center mt-5">
            <div class="card text-black bg-light mb-3" style="width: 100rem;">
              <div class="card-header" style="height: 3rem;">${new Date(element.due_date).toISOString().split('T')[0]}</div>
              <div class="card-body" style="display:block;">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text" id="todo-description${element.id}"></p>
                <button type="button" id="info-button${element.id}" class="btn btn-light" onclick="todoById(${element.id})">Info</button><br><br>
                <p>At: ${new Date(element.due_date).toString().split(" ")[4].split(":").slice(0, 2).join(":")} o'clock</p>
                <a href="#" id="done${element.id}">
                  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </a>
                <a href="#" id="yetDone${element.id}">
                  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                </a>
                <p class="text-right"><button id="edit-button${element.id}" class="btn btn-warning">Edit</button></p>
                <p class="text-right"><button id="del-button" class="btn btn-warning" onclick="deleteTodo(${element.id})">Delete</button></p>
              </div>
            </div>
          </div>
        `)
        if(element.status === true) {
          $(`#yetDone${element.id}`).hide();
        }else {
          $(`#done${element.id}`).hide();
        }
        $(`#edit-button${element.id}`).on("click", () => {
          $(`#info-button${element.id}`).show();
          $(`#todo-description${element.id}`).empty();
          $("#edit-todo-page").empty()
          $("#home-page").hide(); 
          $("#homepage_navbar").show()
          $("#add-todo-button").hide()
          $("#edit-todo-page").show()
          $("#navbar-home").show()
          editTodoSource(element.id)
        })
        $(`#done${element.id}`).on("click", () => {
          yetDoneStatus(element.id);
          $(`#yetDone${element.id}`).show();
          $(`#done${element.id}`).hide();    
        })
        $(`#yetDone${element.id}`).on("click", () => {
          doneStatus(element.id);
          $(`#done${element.id}`).show();
          $(`#yetDone${element.id}`).hide();
        })
      });
    } else {
      $("#content-card").append(`
        <div class="row justify-content-center mt-5">
          <p>You do not have any Todo</p>
        </div>
      `)
    }
  }).fail(err => {
    errorMessage(err)
  })
}

$("#delete-button").on('click', () => {
    ready()
})
function editTodoSource(id) {
  const access_token = localStorage.getItem("access_token")
  $.ajax({
    method: "GET",
    url: SERVER + "todos/" + id,
    headers: {
      access_token
    }
  }).done(response => {
    console.log(response)
    $(`#home-page`).hide();
    $(`#edit-todo-page`).empty();
    $(`#edit-todo-page`).append(`
    <h1 class="font-weight-bold" style="text-align: center;">Edit Form</h1>
      <div class="row justify-content-center mt-5">
        <div class="col-5">
          <form onsubmit="editTodo(${response.id}, event)">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" id="edit-title-todo" class="form-control" value="${response.title}">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="edit-description-todo" rows="3" maxlength="255">${response.description}</textarea>
            </div>
            <div class="form-group">
              <label for="due_date">Due Date</label>
              <input type="date" id="edit-due-date-todo" class="form-control" value="${new Date(response.due_date).toISOString().split("T")[0]}">
            </div>
            <div class="form-group">
              <label for="clock">Clock</label>
              <input type="time" id="edit-clock-todo" class="form-control" value="${new Date(response.due_date).toString().split(" ")[4].split(":").slice(0, 2).join(":")}">
              <small id="emailHelp" class="form-text text-muted">e.g. 00:00 AM</small>
            </div>
            <button type="submit" class="btn btn-primary">Finish Edit</button>
            <a href="#" class="cancel-button">Cancel</a><br><br>
            <div class="error-message"></div>
            <div class="register-success"></div>
          </form>
        </div>
      </div>
    `);
    $(".cancel-button").on("click", () => {
      $("#home-page").show(); 
      $("#homepage_navbar").show()
      $("#add-todo-page").hide()
      $("#add-todo-button").show()
      fetchTodo()
      weather()
      $("#edit-todo-page").hide()
      $("#edit-todo-page").empty()
    })
  }).fail(err => {
    errorMessage(err)
  })
}

function editTodo(id, event) {
  event.preventDefault();
  const access_token = localStorage.getItem("access_token");
  const title = $("#edit-title-todo").val();
  const description = $("#edit-description-todo").val();
  const due_date = $("#edit-due-date-todo").val();
  const clock = $("#edit-clock-todo").val();
  const date = new Date(due_date + " " + clock)
  $.ajax({
    method: "PUT",
    url: SERVER + "todos/" + id,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      due_date: date
    }
  }).done(response => {
    $("#content-card").empty();
    fetchTodo()
    weather()
    $("#landing-page").hide();
    $("#home-page").show();
    $("#add-todo-page").hide();
    $("#edit-todo-page").empty()
    Swal.fire(
      'Good job, you just edited your todo!',
      'success'
    )
  }).fail(err => {
    errorMessage(err)
  })
}

function todoById(id) {
  const access_token = localStorage.getItem("access_token");
  $("todo-description").show()
  $.ajax({
    method: "GET",
    url: SERVER + "todos/" + id,
    headers: {
      access_token
    }
  }).done(response => {
    $(`#todo-description${id}`).append(response.description);
    $(`#info-button${id}`).hide();
  }).fail(err => {
    console.log(err)
  })
}

function weather() {
    $.ajax({
        method: 'GET',
        url: SERVER + 'weather'
    })
    .done(response => {
        $("#weather-card").empty()
        console.log(response, 'apaan nih')
        $("#weather-card").append(`<div class="container">
        <div class="row">
            <div class="col-md-12 col-md-offset-8">
                <div class="weather">
                    <div class="current">
                        <div class="info">
                            <div>&nbsp;</div>
                            <div class="city"><small><small>CITY: </small></small>${response.query}</div>
                            <div class="temp">${response.temperature}&deg; <small>C</small></div>
                            <div class="wind"><small><small>MAIN: </small></small>${response.description}</div>
                            <div>&nbsp;</div>
                        </div>
                        <div class="icon">
                            <span class="wi-day-sunny"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`)
    })
    .fail(err => {
        console.log(err)
    })
}

function doneStatus(id) {
    const access_token = localStorage.getItem("access_token");
    const status = true;
    $.ajax({
      method: "PATCH",
      url: SERVER + "todos/" + id,
      headers: {
        access_token
      },
      data: {
        status
      }
    }).done(response => {
        Toast.fire({
            icon: 'success',
            title: 'Status successfully updated'
          })
    }).fail(err => {
        Swal.fire(
            'Error !',
            err.responseJSON.message,
            'ERROR'
        )
    })
  }

  function yetDoneStatus(id) {
    const access_token = localStorage.getItem("access_token");
    const status = false;
    $.ajax({
      method: "PATCH",
      url: SERVER + "todos/" + id,
      headers: {
        access_token
      },
      data: {
        status
      }
    }).done(response => {
      console.log(response)
    }).fail(err => {
      console.log(err)
    })
  }

function deleteTodo(id) {
    const access_token= localStorage.getItem('access_token')
    $.ajax({
        method: 'DELETE',
        url: SERVER + 'todos/' + id,
        headers: {
            access_token
        }
    })
    .done(response => {
        $("#content-card").empty()
        $("#weather-card").empty()
        fetchTodo()
        weather()
        Swal.fire(
          'success !',
          'you just deleted your todo'
      )
    })
    .fail(err => {
        Swal.fire(
            'Error !',
            err.responseJSON.message,
            'ERROR'
        )
    })
}

$("#logout-button").on('click', ()=> {
    $("#todo-cart").hide()
    $("landing_navbar").hide()
    $("#login-page").show();
    $("#home-page").hide();
    $("#homepage_navbar").hide()
    localStorage.clear()
    console.log(localStorage, 'disini')
    Toast.fire({
      icon: 'success',
      title: 'logout successfully'
    })
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2)
    auth2.signOut().then(function () {
    console.log('User signed out.');
  }); 
})

$("#add-todo-button").on('click', () => {
    $("#home-page").hide(); 
    $("#homepage_navbar").hide()
    $("#add-todo-page").show()
    $("#add-todo-button").hide()
})

$("#cancel-button").on('click', ()=> {
    $("#home-page").show(); 
    $("#homepage_navbar").show()
    $("#add-todo-page").hide()
    $("#add-todo-button").show()
    fetchTodo()
    weather()
})

function addTodo(event) {
    event.preventDefault()
    const access_token = localStorage.getItem('access_token')
    const title = $("#add-title-todo").val()
    const description = $("#add-description-todo").val()
    const due_date = $("#add-due-date-todo").val()
    const clock = $("#add-clock-todo").val();
    const date = new Date(due_date + " " + clock)
    $.ajax({
        method: 'POST',
        url: SERVER + 'todos',
        headers: {
            access_token
        },
        data: {
            title,
            description,
            due_date:date
        }
    })
    .done(response => {
        fetchTodo()
        weather()
        $("#content-card").empty();
        $("#weather-card").empty()
        $("#register-page").hide()
        $("#login-page").hide()
        $("#home-page").show()
        $("#homepage_navbar").show()
        $("#add-todo-page").hide()
        $("#add-todo-button").show()
        Swal.fire(
          'Good job, you just added your todo!',
          'success'
        )
    })
    .fail(err => {
        Swal.fire(
            'Error !',
            err.responseJSON.message,
            'ERROR'
        )
    })
}