const SERVER = 'https://fancy-todo-ykp.herokuapp.com'
// const SERVER = 'http://localhost:3000'

// function show login page
function beforeLogin() {
	$('#login-email').val("")
	$('#login-password').val("")
	$('#home-page').hide()
	$('#login-page').show()
	$('#register-page').hide()
	$('#edit-page').hide()
}

// function show home page
function afterLogin() {
	$('#home-page').show()
	$('#login-page').hide()
	$('#register-page').hide()
	$('#edit-page').hide()
	$('#weather').show()
}

// function show register
function showRegister() {
	$('#register-email').val("")
	$('#register-password').val("")
	$('#register-page').show()
	$('#login-page').hide()
	$('#home-page').hide()
}

function showEdit() {
	$('#register-page').hide()
	$('#login-page').hide()
	$('#home-page').hide()
	$('#edit-page').show()
}

// move show register page
$('#btn-register').on('click', (ev) => {
	ev.preventDefault()
	showRegister()
})

// move login page
$('#btn-login').on('click', (ev) => {
	ev.preventDefault()
	beforeLogin()
})

// button submit edit
$('#submit-edit').on('click', ev => {
	ev.preventDefault()
	afterLogin()
})

// function register
const register = (ev) => {
	ev.preventDefault()

	const email = $('#register-email').val()
	const password = $('#register-password').val()

	$.ajax({
		method: 'POST',
		url: `${SERVER}/register`,
		data: {
			email,
			password,
		},
	})
		.done((response) => {
			$('#login-page').show()
			$('#register-page').hide()
		})
		.fail((err) => {
			console.log(err)
		})
}

// function login
const login = (ev) => {
	ev.preventDefault()

	const email = $('#login-email').val()
	const password = $('#login-password').val()

	$.ajax({
		method: 'POST',
		url: `${SERVER}/login`,
		data: {
			email,
			password,
		},
	})
		.done((response) => {
			const token = response.access_token
			localStorage.setItem('access_token', token)
			afterLogin()
			fetchTodos()
		})
		.fail((err) => {
			console.log(err)
		})
}

// function logout
function logout() {
	localStorage.removeItem('access_token')
	showRegister()
	var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

// save access token in application
$(document).ready(function () {
	const token = localStorage.getItem('access_token')

	if (token) {
		afterLogin()
		fetchTodos()
		weather()
	} else {
		beforeLogin()
	}
})

// find All Todos
const fetchTodos = () => {
	const access_token = localStorage.getItem('access_token')

	$.ajax({
		method: 'GET',
		url: `${SERVER}/todos`,
		headers: {
			access_token: access_token,
		},
	})
		.done((response) => {
			$('#todo-list').empty()
			const todos = response
			todos.forEach((item) => {
				$('#todo-list').append(`
        <div class="card">
          <div class="card-left">
            <div class="card-info">
              <h5>${item.title}</h5>
            </div>
            <p>${item.description}</p>
          </div>
          <div class="card-right">
            <p><span>status: </span>${item.status}</p>
            <p>${formatDate(item.due_date)}</p>
            <button type="button" onclick="updateToDoForm(${item.id}, '${item.title}', '${item.description}', '${item.due_date}')">Edit</button>
            <button type="button" onclick="deleteTodo(${item.id})">Delete</button>
          </div>
          </div>
      `)
			})
		})
		.fail((err) => {
			console.log('fetchTodos -> err', err)
			console.log(err)
		})
}

// Add Todo
const addTodo = (ev) => {
	ev.preventDefault()
	const token = localStorage.getItem('access_token')
	const title = $('#title').val()
	const description = $('#desc').val()
	const due_date = $('#due_date').val()

	$.ajax({
		method: 'POST',
		url: `${SERVER}/todos`,
		data: {
			title,
			description,
			due_date,
		},
		headers: {
			access_token: token,
		},
	})
		.done((response) => {
			fetchTodos()
			$('#title').val('')
			$('#desc').val('')
			$('#due_date').val('')
			console.log(response)
		})
		.fail((err) => {
			console.log(err)
		})
}

// Delete Todo
const deleteTodo = (id) => {
	const token = localStorage.getItem('access_token')

	$.ajax({
		method: 'DELETE',
		url: `${SERVER}/todos/${id}`,
		headers: {
			access_token: token,
		},
	})
		.done((response) => {
			fetchTodos()
			console.log(response)
		})
		.fail((error) => {
			console.log(error)
		})
}

// Edit Todo
let idTemp
const editTodoForm = (e) => {
	e.preventDefault()
	console.log('enter in edit');
	const token = localStorage.getItem('access_token')
	const title = $('#edit-input-title').val()
	const description = $('#edit-input-desc').val()
	const due_date = $('#edit-input-due_date').val()

	$.ajax({
		method: 'PUT',
		url: `${SERVER}/todos/${idTemp}`,
		headers: {
			access_token: token,
		},
		data: {
			title,
			description,
			due_date,
		},
	})
		.done((response) => {
			afterLogin()
			fetchTodos()
			console.log(response)
		})
		.fail((error) => {
			console.log(error)
		})
}

const checkLog = (e) => {
	e.preventDefault()
	console.log('enter in log');
}

const updateToDoForm = (id, title, description, due_date) => {
	showEdit()
	$('#edit-input-title').val(title)
	$('#edit-input-desc').val(description)
	$('#edit_due_date').val(due_date)
	idTemp = id
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
	const googleToken = googleUser.getAuthResponse().id_token;
	console.log(googleToken);

	$.ajax({
    url: `${SERVER}/googleLogin`,
    method: 'POST',
    data: {
      googleToken
    } 
  })
  .done(res => {
    console.log(`glogin succes`)
    localStorage.setItem('access_token', res.access_token)
		afterLogin()
		fetchTodos()
    console.log(res)
  })
  .fail(err => {
    console.log(err)
  })
}

//Weather
const weather = () => {
	const access_token = localStorage.getItem('access_token')

	$('#weather').empty()
	console.log('enter in weathers');
	$.ajax({
		method: 'GET',
		url: `${SERVER}/weathers`,
		headers: {
			access_token: access_token,
		}
	})
	.done(response => {
		console.log("enter in weather bro");
		console.log(response)
		$('#weather').append(`
		<h5>Current Weather</h5>
		<p><strong>Place</strong>
		<br /><span id="weather-place">${response.name}</span></p>

		<p><strong>Description</strong>
		<br /><span id="weather-description">${response.weather[0].main}</span>
		<img src="${source(response.weather[0].main)}" width="30px" height="30px" id="weather-icon" alt="weather-icon"></p>

		<p><strong>Temperature</strong>
		<br />Temperature: <span id="weather-temp">${response.main.temp.toFixed(1)}°C</span>
		<br />Feels Like: <span id="feels">${response.main.feels_like.toFixed(1)}°C</span></p>

		<p><strong>Humidity</strong>
		<br /><span id="weather-humid">${response.main.humidity}%</span></p>
		`)
	})
	.fail(err => {
		console.log(err);
		$('#weather').hide()
	})
}