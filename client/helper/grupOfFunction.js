function loginPage() {
  $('.loginPage').show()
  $('.registerPage').hide()
  $('.mainPage').hide()
  $('#forLogout').hide()
  $('#toDoEdit').hide()
  $('#message').empty()
}
function registerPage() {
  $('.loginPage').hide()
  $('.registerPage').show()
  $('.mainPage').hide()
  $('#forLogout').hide()
  $('#toDoEdit').hide()
}
function mainPage() {
  $('.mainPage').show()
  $('#toDoForm').show()
  $('#forLogout').show()
  $('.loginPage').hide()
  $('.registerPage').hide()
  seeList()
  getNews()
  greetings()
}


function inputRegister() {
  const first_name = $('#first_name').val()
  const last_name = $('#last_name').val()
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()
  $.ajax({
    url:'https://gentle-meadow-81433.herokuapp.com/register',
    method: 'POST',
    data: {
      first_name,
      last_name,
      email,
      password
    }
  })
  .done((Response)=>{
    loginPage()
    $('#message').empty()
    $('#message').append(`<p id='successRegister'>Thank you for Joining Us! Now, you can login!</p>`)
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    xhr.responseJSON.message.forEach(e => {
      $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${e}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
    });
  })
  .always(()=>{
    $('#first_name').val('')
    $('#last_name').val('')
    $('#emailRegister').val('')
    $('#passwordRegister').val('')
  })
}
function inputLogin() {
  const email = $('#emailLogin').val()
  const password = $('#passwordLogin').val()
  $.ajax({
    url:'https://gentle-meadow-81433.herokuapp.com/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done((Response)=>{
    localStorage.setItem('access_token', Response.access_token)
    localStorage.setItem('fullname', Response.fullname)
    mainPage()
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
  .always(()=>{
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
  })
}
function seeList() {
  $.ajax({
    url:'https://gentle-meadow-81433.herokuapp.com/todos',
    method: 'GET',
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done((Response)=>{
    $(`#listTask`).empty()

    for (let i = 0; i < Response.length; i++) {
      let message
      if (Response[i].status === true) {
        message = 'Done'
      } else {
        message = 'Ongoing'
      }
      $('#listTask').append(`

      <div class="card" >
          <div class="card-body" id="heading${i}">
            <div class="d-flex justify-content-between">
              <h5 class="mb-0 ">
              "${Response[i].title}" On ${Response[i].due_date.split('T')[0]}
              </h5>
              <h5 class="mb-0 ${message == 'Done'? "text-success" : "text-dark"}">
              ${message}
              </h5>
            </div>
            <div class="row" style="padding-top: 18px;">
              <p class="col-4">
                The description is "${Response[i].description}"
              </p>
              <p class="col-1 d-flex justify-content-end text-right">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-outline-primary my-3" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}" onclick = 'getEditPage(event, ${Response[i].id})'>Edit Task</button>
                  <button type="button" class="btn btn-outline-success my-3" onclick = 'statusChange(event, ${Response[i].id})'>Finished Task</button>
                  <button type="button" class="btn btn-outline-danger my-3" onclick = 'deleteList(event, ${Response[i].id})'>Delete Task</button>
                </div>
              </p>
            </div>
          </div>
      
          <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#listTask"> 
            <div id='toDoEdit${Response[i].id}' class="rounded shadow p-8" style="padding: 10px;">
              <form action="" method="post" id='editToDo${Response[i].id}'>
                <div class="form-group">
                  <label for="InputTitle">Title :</label>
                  <input type="text" class="form-control" id="titleEdit${Response[i].id}">
                </div>
                <div class="form-group">
                  <label for="InputDescription">Description:</label>
                  <input type="text" class="form-control" id="descriptionEdit${Response[i].id}">
                </div>
                <div class="form-group">
                  <label for="InputDueDate">Due Date</label>
                  <input type="date" class="form-control" id="due_dateEdit${Response[i].id}">
                </div>
                <button type="submit" class="btn btn-primary">Change!</button>
              </form>
            </div>  
          </div>

        </div>
      `)
      $(`#titleEdit${Response[i].id}`).val(Response[i].title)
      $(`#descriptionEdit${Response[i].id}`).val(Response[i].description)
      $(`#due_dateEdit${Response[i].id}`).val(Response[i].due_date.split('T')[0])
    }

  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}
function create() {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  $.ajax({
    url:'https://gentle-meadow-81433.herokuapp.com/todos',
    method: 'POST',
    headers: {access_token : localStorage.getItem('access_token')},
    data: {
      title,
      description,
      due_date
    }
  })
  .done((Response)=>{
    $('#toDoForm').append(`<p id='success'>Success adding your task called ${Response.title}</p>`)
    $('.collapse').collapse('hide')
    seeList()
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    xhr.responseJSON.message.forEach(e => {
      $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${e}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
    });
  })
  .always(()=>{
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
  })
}
function edit(id) {
  $.ajax({
    url:`https://gentle-meadow-81433.herokuapp.com/todos/${id}`,
    method: 'GET',
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done((Response)=>{
    if (Response.status === true) {
        $('.error').empty()
        $('.error').append(`
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="mr-auto">Error 400: Bad Request</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            Can't change the task already done
          </div>
        </div>
          `)
          $('.toast').toast({delay: 5000})
          $('.toast').toast('show')
          $(`#toDoEdit${id}`).empty()
    } else {
      $(`#editToDo${id}`).submit(function(e){
        e.preventDefault()
        getEdit(id)
      })
    }
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}
function getEdit(id) {
  const title = $(`#titleEdit${id}`).val()
  const description = $(`#descriptionEdit${id}`).val()
  const due_date = $(`#due_dateEdit${id}`).val()
  $.ajax({
    url:`https://gentle-meadow-81433.herokuapp.com/todos/${id}`,
    method: 'PUT',
    headers: {access_token : localStorage.getItem('access_token')},
    data: {
      title,
      description,
      due_date
    }
  })
  .done((Response)=>{
    mainPage()
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}
function changeStatus(id) {
  let isId = id
  $.ajax({
    url:`https://gentle-meadow-81433.herokuapp.com/todos/${isId}`,
    method: 'PATCH',
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done(()=>{
    console.log('changed');
    mainPage()
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}
function destroy(id) {
  let isId = id
  $.ajax({
    url:`https://gentle-meadow-81433.herokuapp.com/todos/${isId}`,
    method: 'DELETE',
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done((res)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Notification!</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${res.message}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
      mainPage()
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}
function getEditPage(event,id) {
  event.preventDefault()
  edit(id)
}
function statusChange(event,id) {
  event.preventDefault()
  changeStatus(id)
}
function deleteList(event,id) {
  event.preventDefault()
  destroy(id)
}
function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;
  gapi.auth2.getAuthInstance().disconnect()
  $.ajax({
    url:'https://gentle-meadow-81433.herokuapp.com/googleLogin',
    method: 'POST',
    data: {
      googleToken
    }
  })
  .done((Response)=>{
    $('#success').remove()
    $('#error').remove()
    $('#errorLogin').remove()
    localStorage.setItem('access_token', Response.access_token)
    localStorage.setItem('fullname', Response.fullname)
    mainPage()
  })

  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}

function getNews() {
  $.ajax({
      method: "GET",
      url: "https://gentle-meadow-81433.herokuapp.com/news",
      headers: {
          access_token: localStorage.getItem('access_token')
      }
  })
  .done(res => {
      $(".carousel-inner").empty()
      $(".carousel-indicators").empty()
      const list = res.articles
      for (let i = 0; i < list.length; i++) {
        if (!list[i].urlToImage) {
          continue
        } else {
          if (i === 0) {
            $(".carousel-indicators").append(`<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>`)
            $(".carousel-inner").prepend(` 
            <div class="carousel-item active rounded shadow p-8">
            <img src="${list[i].urlToImage}" class="rounded mx-auto d-block" style="height: 300px; opacity: 0.5;" alt="...">
            <div class="carousel-caption d-md-block text-center">
            <a href='${list[i].url}' style="text-decoration: none;color: white;"><h6 style="font-size: 12px;">${list[i].title}</h6></a>
            <a href='${list[i].url}' style="text-decoration: none;color: white;"><p style="font-size: 10px;">${list[i].description} Klik untuk melanjutkan.</p></a>
            </div>
          </div>`)
            } else {
            $(".carousel-indicators").prepend(`<li data-target="#carouselExampleCaptions" data-slide-to="${i}"></li>`)
            $(".carousel-inner").prepend(` 
            <div class="carousel-item rounded shadow p-8">
            <img src="${list[i].urlToImage}" style="height: 300px; opacity: 0.5;" class="rounded mx-auto d-block" alt="...">
            <div class="carousel-caption d-md-block text-center">
            <a href='${list[i].url}' style="text-decoration: none;color: white;"><h6 style="font-size: 12px;">${list[i].title}</h6></a>
            <a href='${list[i].url}' style="text-decoration: none;color: white;"><p style="font-size: 10px;">${list[i].description} Klik untuk melanjutkan.</p></a>
            </div>
          </div>`) 
            }
        }  
      } 
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
}

function greetings() {
  $('#intro').empty()
  $('#intro').append(`<div id="greeting" style="padding-top: 20px;"> <h3> Hola and Welcome, ${localStorage.getItem('fullname')}!</h3>
  <h5> if you wanna know about weather today, you can fill your city with capitalize the first letter below.</h5> </div>
  `)
  $(`#intro`).append(`<form action="" method="post" id='formCity' style="padding-top: 25px;">
  <div class="form-group">
    <label for="InputCity" style="font-size: 22px;">City :</label>
    <input type="text" class="form-control" id="city" placeholder="e.g. Bandung">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`)
}

function getWeather(input) {
  const city = $('#city').val()
  $.ajax({
      method: "POST",
      url: "https://gentle-meadow-81433.herokuapp.com/weather",
      headers: {
          access_token: localStorage.getItem('access_token')
      },
      data: {
        city
      }
  })
  .done(res => {
      $('#intro').empty()
      $('#intro').append(`<h5 id="alert"> Alright ${localStorage.getItem('fullname')}, the weather for your city today is,</h5>
  <div class="row" id="info">
    <div id="status" class="col-sm">
      <h5 id="result">${res.current.weather_descriptions[0]}</h5>
<img id="resultIcon" src="${res.current.weather_icons[0]}" alt="${res.current.weather_descriptions[0]}">
<h6 id="place">${res.location.name}, ${res.location.country}</h6>
<button class="btn btn-warning" type="button" id="back">Back</button>
    </div>
    <div id="desc" class="col-sm">
      <p>Temperature: ${res.current.temperature} C</p>
      <p>Feels Like: ${res.current.feelslike} C</p>
      <p>Cloud cover: ${res.current.cloudcover} %</p>
      <p>Visibility: ${res.current.visibility} km</p>
      <p>Humidity: ${res.current.humidity} %</p>
      <p>Pressure: ${res.current.pressure} MB</p>
      <p>UV Index: ${res.current.uv_index}</p>
    </div>
  </div>`)
  $('#back').on('click', (e)=>{
    e.preventDefault()
    mainPage()
  })
  })
  .fail((xhr, textStatus)=>{
    $('.error').empty()
    $('.error').append(`
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Error ${xhr.status}: ${xhr.statusText}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${xhr.responseJSON}
      </div>
    </div>
      `)
      $('.toast').toast({delay: 5000})
      $('.toast').toast('show')
  })
  .always(()=>{
    $('#city').val('')
  })
}
