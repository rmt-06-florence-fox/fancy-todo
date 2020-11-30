const server = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    // console.log(token)
    if(token){ 
        getTodo()
        showMainPage()
    }
    else{
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
        $("#error").hide()
    }
})

function signIn(e){
    e.preventDefault()
    $("#error").hide()
    // console.log("button terclick")
    const email = $("#email").val()
    const password = $("#password").val()
    console.log(email)
    $.ajax({
        method: "POST",
        url: server + "/users/sign-in",
        data: {
            email,
            password
        }
    }).done(response =>{
        console.log(response)
        const token = response.acces_token
        localStorage.setItem("token", token)
        // console.log(response)
        getTodo()
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
    }).fail(xhr => {
        console.log(xhr)
        $("#error").show()
        $("#error").append(xhr.responseJSON.message)
    }).always(_ => {
        $("#email").val("")
        $("#password").val("")
    })
}

function showSignUp(e){
    e.preventDefault()
    $("#sign-up-page").show()
    $("#home-page").hide()
    $("#sign-in-page").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()

}
function signUp(e){
    e.preventDefault()
    const email = $("#sign-up-email").val()
    const password = $("#sign-up-password").val()
    $.ajax({
        method: "POST",
        url: server + "/users/sign-up",
        data: {
            email,
            password,
        }
    }).done(response =>{
        // console.log(response)
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
       
    }).fail(err => {
        console.log(err)
    })
}

function logOut(e){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").show()
    $("#sign-up-page").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    localStorage.removeItem("token")
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    // const token = localStorage.getItem("token")
    // console.log(token)
}

function addTodo(e){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").hide()
    $("#sign-up-page").hide()
    $("#add-todo-form").show()
    $("#edit-todo-form").hide()
}

function addedTodo(e){
    e.preventDefault()
    const token = localStorage.getItem('token');
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due-date").val()
    const status = "belum dikerjakan"
    $.ajax({
        method: "POST",
        url: server + "/todos",
        headers: {
            acces_token: token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    }).done(response => {
        getTodo()
        $("#title").val("")
        $("#description").val("")
        $("#due-date").val("")
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
    }).fail(err => {
        console.log(err)
    })
}

// yang memakai parameter event hanya yang function onsubmit atau memakai onclick karena
// tag anchor juga memakai event (<a href=".."></a>)

function getTodo(){
    // e.preventDefault()
    const token = localStorage.getItem('token');
    $.ajax({
        method: "GET",
        url: server + "/todos",
        headers: {
            acces_token: token
        }
    }).done(response => {
        // console.log(response)
        $("#list-todo").empty()
        response.forEach(element => {
            const title = element.title
            const description = element.description
            const status = element.status
            const due_date = element.due_date
            $(`<div class="card mx-4 mt-4 shadow" style= "width: 25%;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2 text-muted" id="status">${status}</h6>
                <p class="card-text">
                    ${description} harus dikerjakan sebelum ${due_date}
                </p>
                <button class="btn btn-primary" onclick="editTodo(${element.id})">Edit Todo</button>
                <button class="btn btn-primary" onclick="updateTodo(event, ${element.id})">Update Todo</button>
                <button class="btn btn-danger" onclick="deleteTodo(event, ${element.id})">Delete Todo</button>
            </div>
        </div>`).appendTo("#list-todo")
        });
    }).fail( err => {
        console.log(err)
    })
}
// cara mempassing id, arahkan editTodo function ini ke server yaitu method get by id. Lalu setelah mendapat data, tempelkan ke edit todo form 
// cara menempelkan ke edit todo form yaitu menulis syntax $("#title-edit").val(response.title) // untuk menggantikan value dari edit form input type = title
function editTodo(id){
    // localStorage.setItem("id", id)
    const token = localStorage.getItem('token');
    // e.preventDefault()
    // bikin ajax getById
    $.ajax({
        method: "GET",
        headers: {
            acces_token: token
        },
        url: server + `/todos/${id}`
    }).done(todo => {
        console.log(todo)
        $("#home-page").hide()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").show() // harusnya di render setelah GET by id
        $("#title-edit").val(todo.title)
        $("#description-edit").val(todo.description)
        $("#due-date-edit").val(todo.due_date)
        $("#edit-id").val(todo.id)
    }).fail(err => {
        console.log(err)
    })

    // $("#home-page").hide()
    // $("#sign-in-page").hide()
    // $("#sign-up-page").hide()
    // $("#add-todo-form").hide()
    // $("#edit-todo-form").show() // harusnya di render setelah GET by id
    /* populate data contohnya 
    $("#title-edit").val(data.title)
    $("#description-edit").val(data.description)
    $("#due-date-edit").val(data.dueDate)
    */
}

function editedTodo(e){
    const id = $("#edit-id").val()
    e.preventDefault()
    const token = localStorage.getItem('token');
    const title = $("#title-edit").val()
    const description = $("#description-edit").val()
    const due_date = $("#due-date-edit").val()
    const status = "belum dikerjakan"
    $.ajax({
        method: "PUT",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    }).done(response => {
        localStorage.removeItem("id")
        getTodo()
        console.log(response, "masuk ke response bro")
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
    }).fail(err => {
        console.log(err)
        console.log("masuk ke error bro")
    })
}

function deleteTodo(e ,id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "DELETE",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        }
    }).done(response => {
        getTodo()
    }).fail(err => {
        console.log(err)
    })
}

function updateTodo(e, id){
    const token = localStorage.getItem("token")
    // $("#status").replaceWith(`sudah dikerjakan`)
    e.preventDefault()
    const status = "sudah dikerjakan"
    $.ajax({
        method: "PATCH",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        },
        data: {
            status
        } 
    }).done(response => {
        getTodo()
    }).fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)
    $.ajax({
        method:"POST",
        url: server + "/users/googleSignIn",
        data: {
            google_access_token
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem("token", response )
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
    })  
    .fail(err => {
        console.log(err)
    })
}

function showMainPage(){
    $("#home-page").show()
    $("#sign-in-page").hide()
    $("#sign-up-page").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").hide()
    getWeather()
}
function getWeather(){
    // $("#min-temperature").empty()
    // $("#max-temperature").empty()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: server + "/weather",
        headers: {
            acces_token: token
        }
    }).done(response =>{
        $(`<h6 class="ml-5 mt-4" style="display: block; width: 100px;">${response.consolidated_weather[0].min_temp}</h6>`).appendTo("#min-temperature")
        $(`<h6 class="ml-5 mt-4" style="display: block; width: 100px;">${response.consolidated_weather[0].max_temp}</h6>`).appendTo("#max-temperature")
        $(`<h6 class="ml-5 mt-4" style="display: block; width: 100px;">${response.consolidated_weather[0].weather_state_name}</h6>`).appendTo("#weather-state")
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}