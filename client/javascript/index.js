function onSignIn(googleUser) {
	const googleToken = googleUser.getAuthResponse().id_token;
	console.log(googleToken);
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/googleLogin',
		method: 'POST',
		data: {
			googleToken,
		},
	})
		.done((response) => {
			// console.log(response.access_token)
			localStorage.setItem('access_token', response.access_token);
			loggedIn();
			hideCoronaInfo();
			closeLoginForm();
			showMainPage();
		})
		.fail((err) => {
			console.log(err);
		});
}

function loggedIn() {
	$('#logout').show();
	$('#login').hide();
	$('#register').hide();
}

function loggedOut() {
	$('#logout').hide();
	$('#login').show();
	$('#register').show();
}

function showMainPage() {
	$('#mainpage').show();
	fetchTodo();
}

function hideMainPage() {
	$('#mainpage').hide();
}

function hideCoronaInfo() {
	$('#coronaInfo').hide();
}

function showCoronaInfo() {
	$('#coronaInfo').show();
}

function loginInput() {
	const email = $('#email_input').val();
	const password = $('#password_input').val();
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/login',
		method: 'POST',
		data: {
			email: email,
			password: password,
		},
	})
		.done((response) => {
			console.log(response);
			closeLoginForm();
			localStorage.setItem('access_token', response.access_token);
			loggedIn();
			hideCoronaInfo();
			showMainPage();
		})
		.fail((xhr, textStatus) => {
			console.log(xhr, textStatus);
		})
		.always((_) => {
			$('#email_input').val('');
			$('#password_input').val('');
		});
}

function registerInput() {
	const email = $('#email_register_input').val();
	const username = $('#username_register_input').val();
	const password = $('#password_register_input').val();
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/register',
		method: 'POST',
		data: {
			email,
			username,
			password,
		},
	})
		.done((response) => {
			closeRegisterForm();
			login();
			$('#registermessage').show();
		})
		.fail((xhr, textStatus) => {
			console.log(xhr, textStatus);
		})
		.always((_) => {
			$('#email_register_input').val('');
			$('#username_register_input').val('');
			$('#password_register_input').val('');
		});
}

function createTodo() {
	const title = $('#title_input').val();
	const description = $('#description_input').val();
	const status = $('#status_input').val();
	const due_date = $('#due_date_input').val();
	// console.log(title, description, status, due_date);
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/',
		method: 'POST',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
		data: {
			title,
			description,
			status,
			due_date,
		},
	})
		.done((response) => {
			closeTodoForm();
			fetchTodo();
			console.log(response);
		})
		.fail((err) => {
			console.log(err);
		})
		.always((_) => {
			$('#title_input').val('');
			$('#description_input').val('');
			$('#status_input').val('');
			$('#due_date_input').val('');
		});
}

function deleteTodo(id) {
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/' + id,
		method: 'DELETE',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
	})
		.done((response) => {
			fetchTodo();
		})
		.fail((err) => {
			console.log(err);
		});
}

function fetchTodo() {
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/',
		method: 'GET',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
	})
		.done((response) => {
			$('#tableTodo').empty();

			for (let i = 0; response.length; i++) {
				$('#tableTodo').append(`
        <tr>
						<td>${i + 1}</td>
						<td>${response[i].title}</td>
						<td>${response && response[i] ? response[i].description : ''}</td>
            <td>${response && response[i] ? response[i].status : ''}</td>
            <td>${
							response && response[i]
								? new Date(response[i].due_date).toLocaleDateString('en-US')
								: ''
						}</td>
            <td>
            <button class="button2" onclick="editTodo(${
							response && response[i] ? response[i].id : ''
						})">Edit</button>
            /
            <button class="button2" onclick="updateTodo(${
							response && response[i] ? response[i].id : ''
						})">Update</button>
            /
            <button class="button2" onclick="deleteTodo(${
							response && response[i] ? response[i].id : ''
						})">Delete</button></td>
				</tr>`);
			}
		})
		.fail((xhr) => {
			console.log(xhr);
		});
}

function login() {
	$('#loginForm').show();
}
function closeLoginForm() {
	$('#loginForm').hide();
}
function register() {
	$('#registerForm').show();
}
function closeRegisterForm() {
	$('#registerForm').hide();
}

function addTodo() {
	$('#todoForm').show();
}

function closeTodoForm() {
	$('#todoForm').hide();
}

function updateTodo(id) {
	$('#editTodoStatusForm').attr('data-id', id);
	openEditTodoStatusForm();
}

function editTodoStatusSuccess() {
	const status = $('#update_status_input').val();
	const id = $('#editTodoStatusForm').attr('data-id');
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/' + id,
		method: 'PATCH',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
		data: {
			status,
		},
	})
		.done((response) => {
			closeEditTodoStatusForm();
			fetchTodo();
		})
		.fail((err) => {
			console.log(err);
		})
		.always((_) => {
			$('#update_status_input').val('');
		});
}

function editTodo(id) {
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/' + id,
		method: 'GET',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
	})
		.done((response) => {
			console.log(response);
			$('#edit_title_input').val(response.title);
			$('#edit_description_input').val(response.description);
			$('#edit_status_input').val(response.status);
			$('#edit_due_date_input').val(formatDate(response.due_date));
		})
		.fail((err) => {
			console.log(err);
		});
	$('#editTodoForm').attr('data-id', id);
	$('#editTodoForm').show();
}

function editTodoSuccess() {
	const title = $('#edit_title_input').val();
	const description = $('#edit_description_input').val();
	const status = $('#edit_status_input').val();
	const due_date = $('#edit_due_date_input').val();
	const id = $('#editTodoForm').attr('data-id');
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/todos/' + id,
		method: 'PUT',
		headers: {
			access_token: localStorage.getItem('access_token'),
		},
		data: {
			title,
			description,
			status,
			due_date,
		},
	})
		.done((response) => {
			closeEditTodoForm();
			fetchTodo();
		})
		.fail((err) => {
			console.log(err);
		});
}

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

function closeEditTodoForm() {
	$('#editTodoForm').hide();
}

function openEditTodoStatusForm() {
	$('#editTodoStatusForm').show();
}

function closeEditTodoStatusForm() {
	$('#editTodoStatusForm').hide();
}

function logout() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
	localStorage.clear();
	loggedOut();
	showCoronaInfo();
	$('#mainpage').hide();
}

function getCoronaInfo() {
	$.ajax({
		url: 'https://fancy-todo-app-amp.herokuapp.com/covidinfo',
		method: 'GET',
	})
		.done((response) => {
			console.log(response);
			$('.containerCovidInfo').append(
				`<p>~New Confirmed: ${response.NewConfirmed}</p>`
			);
			$('.containerCovidInfo').append(
				`<p>~New Deaths: ${response.NewDeaths}</p>`
			);
			$('.containerCovidInfo').append(
				`<p>~New Recovered: ${response.NewRecovered}</p>`
			);
			$('.containerCovidInfo').append(
				`<p>~Total Confirmed: ${response.TotalConfirmed}</p>`
			);
			$('.containerCovidInfo').append(
				`<p>~Total Deaths: ${response.TotalDeaths}</p>`
			);
			$('.containerCovidInfo').append(
				`<p>~Total Recovered: ${response.TotalRecovered}</p>`
			);
		})
		.fail((err) => {
			console.log(err);
		});
}
$(document).ready(function () {
	loggedOut();
	getCoronaInfo();

	$('#login-form').on('submit', function (e) {
		e.preventDefault();
		loginInput();
		// loggedIn();
		hideCoronaInfo();
	});

	$('#register-form').on('submit', function (e) {
		e.preventDefault();
		registerInput();
	});

	$('#todo-form').on('submit', function (e) {
		e.preventDefault();
		createTodo();
	});

	$('#edit-todo-form').on('submit', function (e) {
		e.preventDefault();
		editTodoSuccess();
	});

	$('#update-todo-form').on('submit', function (e) {
		e.preventDefault();
		editTodoStatusSuccess();
	});
	if (localStorage.getItem('access_token')) {
		showMainPage();
		loggedIn();
		hideCoronaInfo();
	} else {
		hideMainPage();
		loggedOut();
		showCoronaInfo();
	}
});
