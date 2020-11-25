// ? helper function
// ! show landing page
let showLandingPage = () => {
    $("#landing-page").show()
    $("#main-page").hide()
    $("#register-page").hide()
}
// ! show main todo page
let showMainPage = () => {
    $("#landing-page").hide()
    $("#main-page").show()
    fetchTodo()
}
// ! show register form
let showRegister = () => {
    $("#register-page").show()
    $("#login-page").hide()
}
// ! show login form
let showLogin = () => {
    $("#register-page").hide()
    $("#login-page").show()
}
// ! log in user
let login = () => {
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    const request = $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {email, password}
    });
    
    request.done((message) => {
        localStorage.setItem('access_token', message.access_token);
        showMainPage()
        $("#warning").empty()
    })

    request.fail((jqxhr, status) => {
        console.log(jqxhr.responseJSON);
        $("#warning").html(`<b>${jqxhr.responseJSON.errors}</b>`);
    })

    request.always(() => {
        $("#login-email").val("")
        $("#login-password").val("")
    })
}
// ! register user
let register = () => {
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    const request = $.ajax({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {email, password}
    })

    request.done((message) => {
        showLogin()
        $("#warning").html(`<b>Success create user ${message.email}</b>`)
    })

    request.fail((jqxhr, status) => {
        console.log(jqxhr.responseJSON);
        $("#warning").html(`<b>${jqxhr.responseJSON.errors}</b>`);
    })

    request.always(() => {
        $("#register-email").val("")
        $("#register-password").val("")
    })
}
// ! fetch todo
let fetchTodo = () => {
    const request = $.ajax({
        url: "http://localhost:3000/todos",
        method: "GET",
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done(function( msg ) {
        msg.forEach(todo => {
            $("#list-todo").append(`
                <div id="todo">
                    <div id="todo-title">
                        <h2>${todo.title}</h2>
                    </div>
                    <div id="todo-due-date">
                        <p>${new Date(todo.due_date).toLocaleDateString(['jav', 'id'])}</p>
                    </div>
                    <div id="todo-description">
                        <p>${todo.description}</p>
                    </div>
                    <p>${todo.status}</p>
                    <div>
                        <a href="">Edit</a>
                        <a href="">Delete</a>
                    </div>
                </div>
            `) 
        });
    });
       
    request.fail(function( jqXHR, textStatus ) {
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}