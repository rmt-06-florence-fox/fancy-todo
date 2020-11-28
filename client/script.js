$(document).ready( () => {

  launch()
  displayLogin()
  
  $('#login-form').submit( e => {
    e.preventDefault()
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
      url: "http://localhost:3000/login",
      method: "POST",
      data: {
        email,
        password
      }
    })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      $('#login-form').hide()
      displayMainPage()
      displayLogout()
    })
    .fail(response => {
      $('#login-error').text(response.responseJSON.message)
    })
    .always(() => {
      $('#login-email').val('')
      $('#login-password').val('')
    })
  })

  $('#logout-button').on('click', () => {
    logOut()
  })

  $('#login-button').on('click', () => {
    displayLogIn()
  })

  $('#register-form').submit(e => {
    e.preventDefault()
    const name = $('#register-name').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    $.ajax({
      url: "http://localhost:3000/register",
      method: "POST",
      data: {
        name,
        email,
        password
      }
    })
    .done(()=> {
      $('#register-name').val("")
      $('#register-email').val("")
      $('#register-password').val("")
      launch()
      displayLogin()
    })
    .fail(response => {
      $('#register-error').text(response.responseJSON.message)
    })
  })

  $('#register-button').on('click', () => {
    launch()
    displayRegister()
  })

  $('#add-button').on('click', () => {
    $('#news-today').hide()
    $('#add-button').hide()
    $('#todo-list').hide()
    $('#add-todo').show()
  })

  $('#cancel-add').on('click', () => {
    $('#news-today').show()
    $('#add-button').show()
    $('#todo-list').show()
    $('#add-todo').hide()
  })
  
  $('#add-todo').submit(e => {
    e.preventDefault()
    const title = $('#todo-title').val()
    const description = $('#todo-description').val()
    const due_date = $('#todo-due_date').val()
    $.ajax({
      url: "http://localhost:3000/todos",
      method: "POST",
      data: {
        title,
        description,
        due_date
      },
      headers: {
        'access_token' : localStorage.getItem('access_token')
      }
    })
    .done(data => {
      const todo = `
      <div class="card mt-2">
        <div id="todo-${data.id}">
          <header class="card-header">
            <h5 class="card-header-title">${data.title}</h5>
          </header>
          <div class="card-content">
            <div class="content">
              <time>${data.due_date}</time>
              <br>
              <p>${data.description}</p>
            </div>
          </div>
          <div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" onclick="event.preventDefault();document.getElementById('edit-todo-${data.id}').style.display = 'block';document.getElementById('todo-${data.id}').style.display = 'none';">Update</a>
              <a href="#" class="card-footer-item" onclick="deleteTodo(${data.id})">Remove</a>
            </footer>
          </div>
        </div>

          <form id="edit-todo-${data.id}" style="display:none;" onsubmit="editTodo(${data.id});event.preventDefault();">
              <header class="card-header">
                <input type="text" id="todo-title-${data.id}" class="input" placeholder="Enter Todo Title" value="${data.title}">
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <input id="todo-due_date-${data.id}" value="${data.due_date}" type="date" class="input">
                  </div>
                  <br>
                  <div class="field">
                    <textarea id="todo-description-${data.id}" class="textarea" rows="3" placeholder="Enter description">${data.description}</textarea>
                  </div>
                </div>
              </div>
              <div>
                <footer class="card-footer">
                  <button class="card-footer-item has-text-white-bis has-background-link" type="submit">
                    Edit
                  </button>
                  <a href="#" class="card-footer-item has-text-white-bis has-background-danger" onclick="event.preventDefault();document.getElementById('edit-todo-${data.id}').style.display = 'none';document.getElementById('todo-${data.id}').style.display = 'block';">
                    Cancel
                  </a>
                </footer>
              </div>
          </form>
        </div>
        
      </div>`
      $('#todo-list').append(todo)
      $('#todo-title').val("")
      $('#todo-description').val("")
      $('#todo-due_date').val("")
      $('#news-today').show()
      $('#add-button').show()
      $('#todo-list').show()
      $('#add-todo').hide()
    })
    .fail(response => {
      $('#add-todo-error').text(response.responseJSON.message)
    })
  })
})

function launch() {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#main-page').hide()
  $('#logout-button').hide()
}

function displayLogin() {
  $('#login-form').show()
  $('#register-form').hide()
}

function displayLogout() {
  $('#logout-button').show()
}

function displayRegister() {
  $('#register-form').show()
  $('#login-form').hide()
}

function displayMainPage() {
  getTodos()
  getNews()
  $('#add-todo').hide()
  $('#main-page').show()
  $('#login-form').hide()
  $('#register-form').hide()
}

function getTodos() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      'access_token' : localStorage.getItem('access_token')
    }
  })
  .done(data => {
    console.log(data)
    let todos = ``
    data.forEach(el => {
      todos += `
      <div class="card mt-2">
        <div id="todo-${el.id}">
          <header class="card-header">
            <h5 class="card-header-title">${el.title}</h5>
          </header>
          <div class="card-content">
            <div class="content">
              <time>${el.due_date}</time>
              <br>
              <p>${el.description}</p>
            </div>
          </div>
          <div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" onclick="event.preventDefault();document.getElementById('edit-todo-${el.id}').style.display = 'block';document.getElementById('todo-${el.id}').style.display = 'none';">Update</a>
              <a href="#" class="card-footer-item" onclick="deleteTodo(${el.id})">Remove</a>
            </footer>
          </div>
        </div>

          <form id="edit-todo-${el.id}" style="display:none;" onsubmit="editTodo(${el.id});event.preventDefault();">
              <header class="card-header">
                <input type="text" id="todo-title-${el.id}" class="input" placeholder="Enter Todo Title" value="${el.title}">
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <input id="todo-due_date-${el.id}" value="${el.due_date}" type="date" class="input">
                  </div>
                  <br>
                  <div class="field">
                    <textarea id="todo-description-${el.id}" class="textarea" rows="3" placeholder="Enter description">${el.description}</textarea>
                  </div>
                </div>
              </div>
              <div>
                <footer class="card-footer">
                  <button class="card-footer-item has-text-white-bis has-background-link" type="submit">
                    Edit
                  </button>
                  <a href="#" class="card-footer-item has-text-white-bis has-background-danger" onclick="event.preventDefault();document.getElementById('edit-todo-${el.id}').style.display = 'none';document.getElementById('todo-${el.id}').style.display = 'block';">
                    Cancel
                  </a>
                </footer>
              </div>
          </form>
        </div>
        
      </div>`
    })
    $('#todo-list').html(todos)
  })
}

function editTodo(id) {
  const title = $(`#todo-title-${id}`).val()
  const description = $(`#todo-description-${id}`).val()
  const due_date = $(`#todo-due_date-${id}`).val()

  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: "PUT",
    data: {
      title,
      description,
      due_date
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(() => {
    getTodos()
  })
  .fail((err) => {
    console.log(err)
  })
}

function deleteTodo(id) {
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(() => {
    getTodos()
  })
  .fail(error => {
    console.log(error)
  })
}

function logOut() {
  localStorage.removeItem('access_token')
  $('#news').empty()
  $('#todo-list').empty()
  launch()
  displayLogin()
}

function getNews() {
  $.ajax({
		url: 'http://localhost:3000/todos/news',
		method: 'GET',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((data) => {
		console.log(data)
		const news = data;
      $('#news').append(`
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${news.imageUrl}" alt="News Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media-content">
            <h2 class="title is-4">${news.title}</h2>
          </div>
          <br>
          <div class="content">
            <p>${news.description}</p>
            <time>${news.publishedAt}</time><br>
            <a href=${news.url}>Click to see more of this news</a>
          </div>
        </div>
      </div>`
    );	
	})
	.fail((err) => {
		console.log(err)
	})
}


function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: 'http://localhost:3000/googleLogin',
    method: 'POST',
    data: {
      googleToken
    }
  })
  .done (response => {
    localStorage.setItem('access_token', response.access_token)
    $('#login-form').hide()
    displayMainPage()
    displayLogout()
  })
  .fail((xhr, textStatus) => {                
    alert(errorLog)
    console.log(xhr
      .responseJSON
      .errors[0]
      .message)
  })
  .always(_=> {
    $('#login-email').val('')
    $('#login-password').val('')
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}