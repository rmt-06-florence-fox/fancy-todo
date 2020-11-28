function putPage (response) {
  $("#Register-Page").hide()
  $("#Login-Page").hide()
  $("#Dashboard").hide()
  $("#Patch-Page").hide()
  $("#Put-Page").show()
  $("#Add-Page").hide()
  $("#Put-Form").on("submit", function (e) {
    e.preventDefault()
    const title = $("#Put-Title").val()
    const description = $("#Put-Description").val()
    const status = $("#Put-Status").val()
    const due_date = $("#Put-Date").val()
    $.ajax({
      method: "PUT",
      url: `http://localhost:3000/todos/${response}`,
      data: { 
        title,
        description,
        status,
        due_date
       },
       headers : {
         token : localStorage.getItem('token')
       }
      })
    .done((response) => {
     console.log("BERHASIL Edit Todo")
     dashboard()
    })
    .fail((error) => {
      console.log (error)
    })
    .always(() => {
      $("#Put-Title").val("")
      $("#Put-Description").val("")
      $("#Put-Status").val("")
      $("#Put-Date").val("")
    })
    })
}

function patchPage (response) {
  $("#Register-Page").hide()
  $("#Login-Page").hide()
  $("#Dashboard").hide()
  $("#Patch-Page").show()
  $("#Put-Page").hide()
  $("#Add-Page").hide()
  $("#Patch-Form").on("submit", function (e) {
    e.preventDefault()
    const status = $("#Patch-Status").val()
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3000/todos/${response}`,
      data: { 
        status
       },
       headers : {
         token : localStorage.getItem('token')
       }
      })
    .done((response) => {
     console.log("BERHASIL Edit Todo")
     dashboard()
    })
    .fail((error) => {
      console.log (error)
    })
    .always(() => {
      $("#Patch-Status").val("")
    })
    })
}

function loginPage () {
  $("#Register-Page").hide()
  $("#Login-Page").show()
  $("#Dashboard").hide()
  $("#Patch-Page").hide()
  $("#Put-Page").hide()
  $("#Add-Page").hide()
  $("#Login-Form").on("submit", function (e) {
    e.preventDefault()
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/login",
      data: { 
        email,
        password
       }
      })
    .done((response) => {
     localStorage.token = response.token
     localStorage.setItem("token", response.token)
     dashboard()
    })
    .fail((error) => {
      console.log (error)
    })
    .always(() => {
      $("#email-login").val("")
      $("#password-login").val("")
    })
  })
  $("#Button-Register").on("click", function (e) {
    registerPage ()
  })
}

function registerPage () {
  $("#Register-Page").show()
  $("#Login-Page").hide()
  $("#Patch-Page").hide()
  $("#Put-Page").hide()
  $("#Dashboard").hide()
  $("#Add-Page").hide()
  $("#Register-Form").on("submit", function (e) {
  e.preventDefault()
  const email = $("#email-register").val()
  const username = $("#username-register").val()
  const password = $("#password-register").val()
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/users/register",
    data: { 
      email : email,
      username : username,
      password : password
     }
    })
  .done((response) => {
   console.log("BERHASIL REGISTER")
   loginPage()
  })
  .fail((error) => {
    console.log (error)
  })
  .always(() => {
    $("#email-register").val("")
    $("#username-register").val("")
    $("#password-resgister").val("")
  })
  })
}

function dashboard () {
  $("#Register-Page").hide()
  $("#Login-Page").hide()
  $("#Dashboard").show()
  $("#Patch-Page").hide()
  $("#Put-Page").hide()
  $("#Add-Page").hide()

  findAllTodo ()

  $("#logout").on("click", function (e) {
    e.preventDefault()
    localStorage.clear()
    loginPage()
  })

  $("#Add-Todo").on("click", function (e) {
    e.preventDefault()
    addPage()
  })

  $("#Back").on("click", function (e) {
    e.preventDefault()
    dashboard()
  })
}

function addPage () {
  $("#Register-Page").hide()
  $("#Login-Page").hide()
  $("#Dashboard").hide()
  $("#Patch-Page").hide()
  $("#Put-Page").hide()
  $("#Add-Page").show()
  $("#Add-Form").on("submit", function (e) {
    e.preventDefault()
    const title = $("#Add-Title").val()
    const description = $("#Add-Description").val()
    const status = $("#Add-Status").val()
    const due_date = $("#Add-Date").val()
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/todos",
      data: { 
        title,
        description,
        status,
        due_date
       },
       headers : {
         token : localStorage.getItem('token')
       }
      })
    .done((response) => {
     console.log("BERHASIL Add Todo")
     dashboard()
    })
    .fail((error) => {
      console.log (error)
    })
    .always(() => {
      $("#Add-Title").val("")
      $("#Add-Description").val("")
      $("#Add-Status").val("")
      $("#Add-Date").val("")
    })
    })
}

function findAllTodo () {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos",
    headers : {
       token : localStorage.getItem('token')
     }
    })
  .done((response) => {
    console.log(response)
   $("#Card-List").empty()
   for (let i = 0; i < response.length; i++) {
    $("#Card-List").append(`
    <div class="card w-50" style="margin: 10px;">
    <div class="card-body">
      <h5 class="card-title">${response[i].title}</h5>
      <p class="card-text">${response[i].description}</p>
      <p class="card-text">${response[i].status}</p>
      <p class="card-text">${response[i].due_date}</p>
      <a href="#" class="btn btn-primary" onclick="putPage(${response[i].id})" >Edit</a>
      <a href="#" class="btn btn-primary" onclick="patchPage(${response[i].id})" >Edit Status</a>
      <a href="#" class="btn btn-primary" onclick="deleteTodo(${response[i].id})" >Delete</a>
    </div>
  </div>
    `)
   }
  })
  .fail((error) => {
    console.log (error)
  })
}

function deleteTodo (id) {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/todos/${id}`,
    headers : {
       token : localStorage.getItem('token')
     }
    })
  .done((response) => {
   console.log("BERHASIL DELETE")
   dashboard()
  })
  .fail((error) => {
    console.log (error)
  })
}

$(document).ready(function(){
  if (localStorage.token) {
    dashboard()
  } else {
    loginPage()
  }
});


