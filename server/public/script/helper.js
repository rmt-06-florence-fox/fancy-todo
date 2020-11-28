// ? helper function
// ! show landing page
let showLandingPage = () => {
    getLocation()
    $("#landing-page").show()
    $("#main-page").hide()
    $("#register-page").hide()
}
// ! show main todo page
let showMainPage = () => {
    $("#landing-page").hide()
    $("#main-page").show()
    getLocation()
    fetchTodo()
    getWeather()
    setName()
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
        url: "/login",
        method: "POST",
        data: {email, password}
    });
    
    request.done((message) => {
        localStorage.setItem('access_token', message.access_token);
        localStorage.setItem('name', message.name)
        showMainPage()
        $("#warning").hide()
        $("#warning").empty()
        $("#success").hide()
        $("#success").empty()
    })

    request.fail((jqxhr, status) => {
        $("#warning").show()
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
        url: "/register",
        method: "POST",
        data: {email, password}
    })

    request.done((message) => {
        showLogin()
        $("#warning").hide()
        $("#warning").empty()
        $("#success").show()
        $("#success").html(`<b>Success create user ${message.email}</b>`)
    })

    request.fail((jqxhr, status) => {
        $("#warning").show()
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
        url: "/todos",
        method: "GET",
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done(function( msg ) {
        const today = new Date()
        $("#warning").hide()
        $("#warning").empty()
        $("#list-todo").empty()
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        msg.forEach(todo => {
            $("#list-todo").append(`
            <div class="col-sm-4" style="margin-bottom:30px">
                <div class="card shadow p-3 mb-5 rounded ${todo.status == false ? `` : `bg-secondary text-black`} ${new Date(todo.due_date) && todo.status == false <= today ? `bg-danger text-black` : ``}">
                <div id="todo-${todo.id}" ${todo.status == true ? `ondblclick="patchTodo(${todo.id},${false})"` : `ondblclick="patchTodo(${todo.id},${true})"`}>
                    <div class="card-header" data-toggle="tooltip" data-placement="top" title="Double Click To Change Status">
                        <h4>${todo.title}</h4>
                    </div>
                    <div class="card-body text-left" data-toggle="tooltip" data-placement="top" title="Double Click To Change Status">
                        <blockquote class="blockquote">
                            <p ${todo.status == true ? `style="text-decoration: line-through;"` : ``}>${todo.description}</p>
                            <footer class="blockquote-footer">${new Date(todo.due_date).toLocaleDateString(undefined, options)}</footer>
                        </blockquote>
                    </div> 
                    <div class="card-footer">
                        <button class="btn btn-warning" onclick="event.preventDefault();document.getElementById('update-form-${todo.id}').style.display = 'block';document.getElementById('todo-${todo.id}').style.display = 'none';document.getElementById('opt-${todo.id}').style.display = 'none';">
                            Edit Todo
                        </button>
                        <button class="btn btn-danger" onclick="deleteTodo(${todo.id});event.preventDefault()">
                            Delete Todo
                        </button>
                    </div>
                </div>

                
                <form id="update-form-${todo.id}" style="display:none;" onsubmit="updateTodo(${todo.id});event.preventDefault();">
                    <div class="card-header">
                        <div class="form-group">
                            <input type="text" class="form-control" name="" id="update-title-${todo.id}" value="${todo.title}" data-toggle="tooltip" data-placement="top" title="Edit Title">
                        </div>
                        </div>
                        <div class="card-body">
                        <div class="form-group">
                            <textarea name="edit-description" id="update-description-${todo.id}" class="form-control" cols="30" rows="5" style="resize: none;" data-toggle="tooltip" data-placement="top" title="Edit Description">${todo.description}</textarea>
                        </div>
                        <div class="form-group">
                            <input type="date" name="" class="form-control" id="update-due-date-${todo.id}" value="${new Date(todo.due_date).toISOString().split("T")[0]}" data-toggle="tooltip" data-placement="top" title="Edit Due Date">
                        </div>
                        <div class="form-group">
                            <select name="" id="update-status-${todo.id}" class="form-control" data-toggle="tooltip" data-placement="top" title="Edit Status">
                                <option value="true" ${todo.status == true ? 'selected' : ''}>Done</option>
                                <option value="false" ${todo.status == false ? 'selected' : ''}>Not Done</option>
                            </select>
                        </div>
                    </div> 
                    
                    
                    <div class="card-footer">
                        <button type="submit" class="btn btn-warning">
                            Change Todo
                        </button>
                        <button class="btn btn-danger" onclick="event.preventDefault();document.getElementById('update-form-${todo.id}').style.display = 'none';document.getElementById('todo-${todo.id}').style.display = 'block';document.getElementById('opt-${todo.id}').style.display = 'block';">
                            Cancel Edit
                        </button>
                    </div>
                </form>

                    <div class="alert alert-danger" role="alert" id="warning-${todo.id}" style="display:none;">

                    </div>
                    
                </div>
            </div>
            `)
        });
    });
       
    request.fail(function( jqXHR ) {
        $("#warning").show()
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! add todo
let addTodo = () => {
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $('#add-due-date').val() || new Date()
    const request = $.ajax({
        url: "/todos",
        method: "POST",
        data: {
            title,
            description,
            due_date
        },
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done(message => {
        $("#warning").hide()
        fetchTodo()
    })
    request.fail(function( jqXHR ) {
        $("#warning").show()
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
    request.always(() => {
        clearAddForm()
    })
}

let clearAddForm = () => {
    $("#add-description").css("width", "13.85em");
    $("#add-description").css("height", "2.4em");
    $("#add-title").val("")
    $("#add-description").val("")
    $("#add-due-date").val("")
}

// ! delete todo
let deleteTodo = (id) => {
    const request = $.ajax({
        method: "DELETE",
        url:`/todos/${id}`,
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done((message) => {

        $(`#warning-${id}`).hide()
        fetchTodo()
    })

    request.fail(function( jqXHR ) {
        $(`#warning-${id}`).show()
        $(`#warning-${id}`).html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! patch todo
let patchTodo = (id, status) => {
    const request = $.ajax({
        url: `/todos/${id}`,
        method: 'PATCH',
        headers: {access_token:localStorage.getItem('access_token')},
        data: {status}
    })
    
    request.done((message) => {
        fetchTodo()
    })
    request.fail(function( jqXHR ) {
        $(`#warning-${id}`).show()
        $(`#warning-${id}`).html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! put todo
let updateTodo = (id) => {
    const title = $(`#update-title-${id}`).val()
    const description = $(`#update-description-${id}`).val()
    const status = $(`#update-status-${id}`).val()
    const due_date = $(`#update-due-date-${id}`).val()
    
    const request = $.ajax({
        url: `/todos/${id}`,
        method: "PUT",
        data: {
            title,
            description,
            due_date,
            status
        },
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done((message) => {
        $(`#warning-${id}`).hide()
        fetchTodo()
    })

    request.fail(function( jqXHR ) {
        $(`#warning-${id}`).show()
        $(`#warning-${id}`).html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! google signin
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    const request = $.ajax({
        url: "/googleLogin",
        method: "POST",
        data: {google_token}
    });

    request.done((message) => {
        localStorage.setItem('access_token', message.access_token);
        localStorage.setItem('name', message.name)
        showMainPage()
        $("#warning").hide()
        $("#warning").empty()
    })

    request.fail((jqxhr, status) => {
        $("#warning").show()
        $("#warning").html(`<b>${jqxhr.responseJSON.errors}</b>`);
    })

    request.always(() => {
        $("#login-email").val("")
        $("#login-password").val("")
    })
}

// ! tooltip

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// ! get location

let getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    } else { 
        $("#warning").show()
        $("#warning").html(`<b>Geolocation is not supported by this browser.</b>`);
    }
}

function saveLocation(position) {
    localStorage.setItem("latitude", position.coords.latitude)
    localStorage.setItem("longitude", position.coords.longitude)
}

// ! get weather
let getWeather = () => {
    const request = $.ajax({
        url: "/weathers",
        method: "GET",
        headers: {
            access_token:localStorage.getItem('access_token'),
            latitude: localStorage.getItem("latitude"),
            longitude: localStorage.getItem("longitude")
        }
    })

    request.done(message => {
        $("#warning").hide()
        let kelvin = message.main.temp
        const temperature = parseFloat(kelvin) - parseFloat(273.15)
        $("#weather").text(`it looks like ${message.name}'s weather is on ${message.weather[0].main} with temperature ${temperature.toFixed(2)}°C`)
    })

    request.fail(function( jqXHR ) {
        $("#warning").show()
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! set name
let setName = () => {
    $("#user").text(localStorage.getItem("name"))
}