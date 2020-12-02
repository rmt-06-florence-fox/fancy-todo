if (localStorage.getItem('access_token')) {
    showMainPage()
} else {
    showRegister()
}

function showRegister() {
    $('#navbar').show()
    $("#btn-logout").hide()
    $("#login-page").hide()
    $("#register-page").show()
    $('#main-card').hide()
    $('#add-todo').hide()
    $('#main-title').hide()
    $('#myForm').hide()
    $('#trivia-btn').hide()
}

function showLogin() {
    $('#navbar').show()
    $('#btn-logout').hide()
    $('#register-page').hide()
    $('#login-page').show()
    $('#main-card').hide()
    $('#add-todo').hide()
    $('#main-title').hide()
    $('#myForm').hide()
    $('#trivia-btn').hide()
}

function showLogout() {
    $('register-page').show()
    $("#login-page").hide()
    $('#myForm').hide()
    $('#trivia-btn').hide()
}

function showMainPage() {
    $('#navbar').show()
    $('#register-page').hide()
    $('#login-page').hide()
    $('#btn-logout').show()
    $('#btn-login').hide()
    $('#btn-register').hide()
    $('#add-todo').show()
    $('#main-title').show()
    $('#main-card').show()
    fetchTodo()
    $('#trivia-btn').show()
    $('#trivia-list').hide()
}

function showTrivia() {
    $('#navbar').show()
    $('#register-page').hide()
    $('#login-page').hide()
    $('#btn-logout').show()
    $("#trivia-list").show()
    $('#btn-login').hide()
    $('#btn-register').hide()
    $('#add-todo').hide()
    $('#main-title').hide()
    $('#main-card').hide()
    $('#myForm').hide()
}

function register() {
    // console.log('testing');
    const email = $("#email-input").val()
    const password = $('#password-input').val()
    
    $.ajax({
        url: "http://localhost:3000/register",
        method: "POST",
        data:{email, password}
    })
    .done(response => {
        console.log(response);
        showLogin()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
    .always(()=> {
        $('#email-input').val("")
        $('#password-input').val("")
    })
}
 
 function login() {

    const email = $('#email-inputLogin').val()
    const password = $('#password-inputLogin').val()
    console.log(email, password);
    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {email, password}
    })
    .done(response => {
        console.log(response);
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus,'<<<<');
    })
    .always(()=> {
        $('#email-input').trigger('reset')
        $('#password-input').trigger('reset')
    })
}

function logout() {
    localStorage.clear()
    showRegister()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
}

function onSignIn(googleUser) {
const googleToken = googleUser.getAuthResponse().id_token;
$.ajax({
    url: "http://localhost:3000/googleLogin",
    method: "POST",
    data: {
        googleToken
    }
 })
 .done(response => {
    //  console.log(response);
    localStorage.setItem('access_token', response.access_token)
    showMainPage()
 })
 .fail(err => {
     console.log(err);
 })
}
  

function openForm(id) {
    $('#myForm').show()
    return TodoId = id
}

function closeForm() {
    $('#myForm').hide()
}

function fetchTodo() {
    
    $.ajax({
        url: "http://localhost:3000/todos",
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        $('#main-card').empty()
        console.log(response);
        response.forEach((data, i) => {
            console.log(data.id);
            $('#main-card').append(`<div class="card-grid-space">
            <div class="num">${i+1}.</div>
           
              <div class="card">
                <h1>${data.title}</h1>
                <p>${data.description}</p>
                <div class="date">${data.due_date.slice(0,10)}</div>
                <div class="tags">
                    <button class="tag" onclick="openForm(${data.id})">Edit</button>
                    <button class="tag"  onclick="deleteTodo(${data.id})">Finish</button>
                </div>
            
          </div>`)
        })
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus,'fetch<<<<');
    })
}

function createTodo() {
    const title = $('#title-input').val()
    const description = $('#description-input').val()
    const status = $('#status-input').val()
    const due_date = $('#date-input').val()

    $.ajax({
        url: "http://localhost:3000/todos",
        method: "POST",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title, description, status, due_date
        }
    })
    .done(response => {
        fetchTodo()
        console.log(response);
    })
    .fail(xhr => {
        console.log(xhr);
    })
    .always(() => {
         $('#title-input').val("")
         $('#description-input').val("")
         $('#status-input').val("")
         $('#title-input').val("")
         $('#date-input').val("")
    })
}

function deleteTodo(id) {
    // console.log(id);
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(xhr => {
        console.log(xhr);
    })
}

function editTodo() {
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const status = $('#status-edit').val()
    const due_date = $('#date-edit').val()
    const id = TodoId
    console.log(id, title, description, status,due_date);
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title, description, status, due_date
        }
    })
    .done(response => {
        fetchTodo()
        $('#myForm').hide()
    })
    .fail(xhr => {
        console.log(xhr);
    })
    .always(() => {
        $('#title-edit').val("")
        $('#description-edit').val("")
        $('#status-edit').val("")
        $('#title-edit').val("")
        $('#date-edit').val("")
   })
}

function btnAnswer(options, answer) {
    if (options === answer) {
        Swal.fire(
            'Correct!',
            'Good Job Bro!',
            'success'
        )
    } else {
        Swal.fire(
            'Incorrect!',
            'Please try Again!',
            'error'
        )
    }
}

function fetchTrivia() {
    $("#trivia-list").empty()
    $.ajax({
        url: "http://localhost:3000/trivia",
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        // console.log(response.results);
           response = response.results
        showTrivia()
        const random = Math.floor(Math.random() * response.length) 
        while(response[random].type == 'boolean') {
            const random = Math.floor(Math.random() * response.length) 
        }
 
        const temp = [response[random].incorrect_answers[0], response[random].incorrect_answers[1], response[random].incorrect_answers[2], response[random].correct_answer]
        let option1 = Math.floor(Math.random() * temp.length)
        let option2 = Math.floor(Math.random() * temp.length)
        let option3 = Math.floor(Math.random() * temp.length)
        let option4 = Math.floor(Math.random() * temp.length)


        while (option2 === option1) {
            option2 = Math.floor(Math.random() * temp.length)
        }
        while (option3 === option2 || option3 === option1) {
            option3 = Math.floor(Math.random() * temp.length)
        }
        while (option3 === option4 || option4 === option2 || option4 === option1) {
            option4 = Math.floor(Math.random() * temp.length)
        }

            $('#trivia-list').append(`
              <blockquote class="blockquote mb-0">
              <h3>${response[random].question}</h3>
              <div class="text-center mt-5"><div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option1]}', '${temp[3]}')">${temp[option1]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option2]}', '${temp[3]}')">${temp[option2]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option3]}', '${temp[3]}')">${temp[option3]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option4]}', '${temp[3]}')">${temp[option4]}</button></div></div>
              </blockquote>
            `)
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
    
}