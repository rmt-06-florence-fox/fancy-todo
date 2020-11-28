function showLoginPage() {
    $("#login-page").show()
    $("#main-page").hide()
    $("#btn-logout").hide()
}
function showMainPage() {
    $("#login-page").hide()
    $("#main-page").show()
    $("#btn-logout").show()
    fetchTodo()
    weather()
}
function login() {
    const email = $("#email-input").val()
    const password = $("#password-input").val()
    
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/login",
        data: { email, password },
    })
        .done(response => {
            // console.log(response);
            localStorage.setItem("access_token", response.access_token);
            showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
    .always(_ => {
        $("#email-input").val("")
        $("#password-input").val("")
    })
}
function logout() {
    localStorage.clear()
    showLoginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
function fetchTodo() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3333/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done((response) => {
        // console.log(Number(new Date().getMonth()+1));
        $("#duedate-input").val(new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + Number(new Date().getDate()+1))
        $("#todo-list-done").empty()
        $("#todo-list").empty()
        response.forEach(todo => {
            console.log(todo.due_date);
            const date = todo.due_date.split('T')[0]
            let condition = ''
            
            let warning = ''
            if (date <= new Date().getFullYear() + '-' + Number(new Date().getMonth()+1) + '-' + Number(new Date().getDate()+1)) {
                warning = 'danger'
                condition = 'badge badge-danger ml-2'
            } else if (date > new Date().getFullYear() + '-' + Number(new Date().getMonth()+1) + '-' + Number(new Date().getDate()+1) && date <= new Date().getFullYear() + '-' + Number(new Date().getMonth()+1) + '-' + Number(new Date().getDate()+3)) {
                warning = 'warning'
                condition = 'badge badge-warning ml-2'
            } else if (date > new Date().getFullYear() + '-' + Number(new Date().getMonth()+1) + '-' + Number(new Date().getDate()+3)) {
                warning = 'success'
                condition = 'badge badge-success ml-2'
            } else {
                warning = 'info'
            }





            let button_checklist = `<button class="border-0 btn-transition btn btn-outline-success" onclick="updateStatus(${todo.id})"> <i class="fa fa-check"></i></button>`
            let status = `Due date: ${date}`
            if(todo.status == 'done') {

                condition = 'badge badge-info ml-2'
                status = `${todo.status}`
                button_checklist = ''
                $("#todo-list-done").append(
                    // `<div class="card bg-light m-2" style="max-width: 18rem;">
                    //     <div class="card-header">${date}</div>
                    //         <div class="card-body">
                    //             <h5 class="card-title"><strong>${todo.title}</strong></h5>
                    //             <p class="card-text">${todo.description}</p>
                    //             <p class="card-text" style="font-size:12px; color:blue">${todo.status}</p>
                    //             <button class="btn btn-warning text-white col-12 mb-2"> Done </button>
                    //             <button class="btn btn-danger text-white col-12" onclick="deleteTodo(${todo.id})"> Delete </button>
                    //         </div>
                    //     </div>
                    // </div>`
                    `<div class="ps-content">
                        <ul class=" list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="todo-indicator"></div>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left mr-2">
                                           
                                        </div>
                                        <div class="widget-content-left">
                                            <div class="widget-heading"> ${todo.title}
                                                <div class="${condition}">Well done!</div>
                                            </div>
                                            <div class="widget-subheading"><i>${todo.description}</i></div>
                                        </div>
                                        <div class="widget-content-right">
                                            ${button_checklist}
                                            <button class="border-0 btn-transition btn btn-outline-danger" onclick="deleteTodo(${todo.id})"> <i class="fa fa-trash"></i> </button> </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>`
                )
            } else {
                
                $("#todo-list").append(
                    // `<div class="card bg-light m-2" style="max-width: 18rem;">
                    //     <div class="card-header">${date}</div>
                    //         <div class="card-body">
                    //             <h5 class="card-title"><strong>${todo.title}</strong></h5>
                    //             <p class="card-text">${todo.description}</p>
                    //             <p class="card-text" style="font-size:12px; color:blue">${todo.status}</p>
                    //             <button class="btn btn-warning text-white col-12 mb-2"> Done </button>
                    //             <button class="btn btn-danger text-white col-12" onclick="deleteTodo(${todo.id})"> Delete </button>
                    //         </div>
                    //     </div>
                    // </div>`
                    `<div class="ps-content">
                        <ul class=" list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="todo-indicator bg-${warning}"></div>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left mr-2">
                                           
                                        </div>
                                        <div class="widget-content-left">
                                            <div class="widget-heading"> ${todo.title}
                                                <div class="${condition}">${status}</div>
                                            </div>
                                            <div class="widget-subheading"><i>${todo.description}</i></div>
                                        </div>
                                        <div class="widget-content-right">
                                            ${button_checklist}
                                            <button class="border-0 btn-transition btn btn-outline-danger" onclick="deleteTodo(${todo.id})"> <i class="fa fa-trash"></i> </button> </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>`
                )
            }

        })
    })
    .fail((err) => {
        console.log(err);
    })
}
function createTodo() {
    const title = $("#title-input").val()
    const description = $("#description-input").val()
    // const status = $("#status-input").val()
    const due_date = $("#duedate-input").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            // status,
            due_date
        }
    })
    .done(response => {
        fetchTodo()
        console.log(response);
    })
    .fail(err => {
        console.log(err);
    })
    .always(_ => {
        $("#addtodo-form").trigger("reset")
    })
}
function deleteTodo(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3333/todos/" + id,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err);
    })
}

function updateStatus(id) {
    $.ajax({
        method: "PATCH",
        url: "http://localhost:3333/todos/" + id,
        headers: {
            access_token: localStorage.getItem("access_token")
        }, 
        data: { 
            status: 'done'
        }
    })
    .done(response => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    console.log('MASUK')
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/googleLogin",
        data: { googleToken },
    })
        .done(response => {
            // console.log(response);
            localStorage.setItem("access_token", response.access_token);
            showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
      
  }

  function weather() {
    $(".title").empty();
    $(".temp").empty();

    $.ajax({
        method: "GET",
        url: "http://localhost:3333/weather",
    })
        .done(response => {
            console.log(response.main.temp);
            const suhu = (Math.round((response.main.temp - 274) * 100) / 100).toFixed(2);
            $(".title").append(`<p>${response.name}</p>`)
            $(".temp").append(`${suhu}<sup>&deg;</sup>C`)
            
            
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
  }
