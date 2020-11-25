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
        // console.log(jqxhr.responseJSON);
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
        // console.log(jqxhr.responseJSON);
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
        $("#warning").empty()
        $("#list-todo").empty()
        msg.forEach(todo => {
            $("#list-todo").append(`
            <div id="card">
                <div id="todo-${todo.id}" ${todo.status == true ? `style="text-decoration: line-through;" ondblclick="patchTodo(${todo.id},${false})"` : `ondblclick="patchTodo(${todo.id},${true})"`}>
                    <div id="todo-title">
                        <h2>${todo.title}</h2>
                    </div>
                    <div id="todo-due-date">
                        <p>${new Date(todo.due_date).toLocaleDateString(['jav', 'id'])}</p>
                    </div>
                    <div id="todo-description">
                        <p>${todo.description}</p>
                    </div>
                </div>
                <div>
                    <form id="update-form-${todo.id}" style="display:none;" onsubmit="updateTodo(${todo.id});event.preventDefault();">
                        <div>
                            <label for="title">Title</label>
                            <input type="text" name="" id="update-title-${todo.id}" value="${todo.title}">
                        </div>
                        <div>
                            <label for="description">Description</label>
                            <textarea name="" id="update-description-${todo.id}" cols="30" rows="10">${todo.description}</textarea>
                        </div>
                        <div>
                            <label for="status">Status</label>
                            <select id="update-status-${todo.id}">
                                <option value="true" ${todo.status == true ? 'selected' : ''}>Done</option>
                                <option value="false" ${todo.status == false ? 'selected' : ''}>Not Done</option>
                            </select>
                        </div>
                        <div>
                            <label for="due_date">Due Date</label>
                            <input type="date" name="" id="update-due-date-${todo.id}" value="${new Date(todo.due_date).toISOString().split("T")[0]}">
                        </div>
                        <div>
                            <button type="submit">
                                Update    
                            </button>
                            <button onclick="event.preventDefault();document.getElementById('update-form-${todo.id}').style.display = 'none';document.getElementById('todo-${todo.id}').style.display = 'block';document.getElementById('opt-${todo.id}').style.display = 'block';">
                                Cancel    
                            </button>
                        </div>
                        <p id="warning-${todo.id}"></p>
                    </form>
                </div>
                <div id="opt-${todo.id}">
                    <a href="" onclick="event.preventDefault();document.getElementById('update-form-${todo.id}').style.display = 'block';document.getElementById('todo-${todo.id}').style.display = 'none';document.getElementById('opt-${todo.id}').style.display = 'none';">Edit</a>
                    <a href="" onclick="deleteTodo(${todo.id});event.preventDefault()">Delete</a>
                </div>
            </div>
            `) 
        });
    });
       
    request.fail(function( jqXHR ) {
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! add todo
let addTodo = () => {
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $('#add-due-date').val() || new Date()

    // console.log(title, description, due_date);
    const request = $.ajax({
        url: "http://localhost:3000/todos",
        method: "POST",
        data: {
            title,
            description,
            due_date
        },
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done(message => {
        fetchTodo()
    })
    request.fail(function( jqXHR ) {
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
    request.always(() => {
        $("#add-title").val("")
        $("#add-description").val("")
        $("#add-due-date").val("")
    })
}

// ! delete todo
let deleteTodo = (id) => {
    const request = $.ajax({
        method: "DELETE",
        url:`http://localhost:3000/todos/${id}`,
        headers: {access_token:localStorage.getItem('access_token')}
    })

    request.done((message) => {
        fetchTodo()
    })

    request.fail(function( jqXHR ) {
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! patch todo
let patchTodo = (id, status) => {
    const request = $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'PATCH',
        headers: {access_token:localStorage.getItem('access_token')},
        data: {status}
    })
    
    request.done((message) => {
        // console.log(message);
        fetchTodo()
    })
    request.fail(function( jqXHR ) {
        $("#warning").html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}

// ! put todo
let updateTodo = (id) => {
    const title = $(`#update-title-${id}`).val()
    const description = $(`#update-description-${id}`).val()
    const status = $(`#update-status-${id}`).val()
    const due_date = $(`#update-due-date-${id}`).val()
    
    const request = $.ajax({
        url: `http://localhost:3000/todos/${id}`,
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
        fetchTodo()
    })

    request.fail(function( jqXHR ) {
        $(`#warning-${id}`).html(`<b>${jqXHR.responseJSON.errors}</b>`);
    });
}