$(document).ready(function () {
    auth()
}) 

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token
    $.ajax('http://localhost:3000/googleLogin', {
        method: 'POST',
        headers: {
            google_token
        }
    })
        .done(data => {
            localStorage.access_token = data.access_token
            $('#loginPage').hide()
            $('#homePage').show()
            $('#registerPage').hide() 
        })
        .fail(err => {
            console.log(err);
            
        })
        .always(() => console.log('selesai'))
  }

function auth() {
    if(!localStorage.access_token) {
        $('#loginPage').show()
        $('#homePage').hide()
        $('#registerPage').hide()
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
    } else {
        $('#loginPage').hide()
        $('#homePage').show()
        $('#registerPage').hide()
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
        listTodos()
    }
}

$('#signUpForm').submit(event => {
    event.preventDefault()

    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()
    $(`#alertRegister`).empty()

    $.ajax('http://localhost:3000/register', {
        method: 'POST',
        data: {
            email,
            password,
        }
    })
        .done(data => auth())
        .fail(err => {
            $(`#alertRegister`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${err.responseJSON.message}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
        })
        .always(() => console.log('success'))
})

$('#signInForm').submit(event => {
    event.preventDefault()

    const email = $('#email').val()
    const password = $('#password').val()
    $(`#alertLogin`).empty()

    $.ajax('http://localhost:3000/login', {
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(data => {
        console.log(data)
        localStorage.access_token = data.access_token
        $('#loginPage').hide()
        $('#homePage').show()
        $('#registerPage').hide()
        $('#editTodoPage').hide()
        listTodos()
    })
    .fail(err => {
        $(`#alertLogin`).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err.responseJSON.message}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`)
    })
    .always(() => console.log('selesai'))
})

$('#logout').click(event => {
    event.preventDefault()
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
        .then(() => {
            localStorage.clear()
            $('#email').val('')
            $('#password').val('')
            auth()
        })
        .catch(err => {
            console.log(err);
        })
})

$('#goRegister').click(() => {
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#registerPage').show()
    $('#addTodoPage').hide()
    $('#editTodoPage').hide()
})

// SHOW LIST TODOS

function listTodos() {
    $.ajax('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            console.log(data);
            $('.table-data').empty()
            data.data.forEach((todo, i) => {
                $('.table-data').append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${todo.title} </td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.due_date}</td>
                    <th>
                        <a href="#" class="btn btn-dark btn-sm" onclick="editTodoForm(${todo.id})">Edit</a>
                        <a href="#" class="btn btn-outline-dark btn-sm" onclick="deleteTodoConfirm(${todo.id})" data-toggle="modal" data-target="#confirmDelete">Delete</a>
                    </th>
                </tr>
                `)
            });
        })
        .fail(err => console.log(err, '<<< err fetchTodos'))
}

$('#addTodo').click(event => {
    event.preventDefault()
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#registerPage').hide() 
    $('#addTodoPage').show()
    $('#editTodoPage').hide()
})

$('#addTodoForm').submit(event => {
    event.preventDefault()

    const title = $('#title').val()
    const description = $('#description').val()
    const dueDate = $('#dueDate').val()
    $(`#alertAddTodo`).empty()

    $.ajax('http://localhost:3000/todos', {
        method: 'POST',
        data: {
            title,
            description,
            dueDate
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data=> auth())
        .fail(err => {
            $(`#alertAddTodo`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${err.responseJSON.message}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
        })
        .always(() => console.log('success'))
})

// 1. pindah konten html yang di deleteTodoConfirm ke index.html
// 2. kasih ID ke button yang confirm, nanti ID-nya bisa dipake buat update ID todo yang mau diapus
// 3. tambah event yang mana pas user klik delete, munculin modal yang udahhhhhh dipindah tadi, berikut dengan ID yang mau dihapus
// baru dari itu, udah bisa hapus dengan bener

function deleteTodoConfirm(id) {
    // set value dari input type hidden dengan id delete-todo-id,
    // dengan value dari parameter id
    $('#deleteId').val(id)
    // $('.confirm').append(
    //     `
    // <div class="modal fade" id="confirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
    //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div class="modal-body">
    //                 Delete this todo ?
    //             </div>
    //             <div class="modal-footer">
    //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    //                 <button type="button" class="btn btn-primary" onclick="deleteTodo(${id})">Delete</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `
    // )
}

function deleteTodo() {
    const id = $('#deleteId').val()
    console.log(id);
    console.log(`http://localhost:3000/todos/${id}`);
    
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            listTodos()
            $('#confirmDelete').modal('hide')
        })
        .fail(err => console.log(err.responseJSON, '<<<<< err delete'))
}

function editTodoForm(id) {
    todoCurrentId = id;
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((data) => {
            $('#loginPage').hide()
            $('#homePage').hide()
            $('#registerPage').hide() 
            $('#addTodoPage').hide()
            $('#editTodoPage').show()
            $('#titleEdit').val(data.title)
            $('#descriptionEdit').val(data.description)
            $('#dueDateEdit').val(data.dueDate)
            console.log(data.dueDate)
        })
        .fail(err => console.log(err.responseJSON, '<<<<< err addTodo'))
}

function updateTodo(event) {
    event.preventDefault()
    let title = $('#titleEdit').val()
    let description = $('#descriptionEdit').val()
    let dueDate = $('#dueDateEdit').val()
    let status = $('#status').val()

    $.ajax(`http://localhost:3000/todos/${todoCurrentId}`, {
        method: 'PUT',
        headers: {
            access_token: localStorage.access_token
        },
        data: { title, description, dueDate, status }
    })
        .done((data) => {
            auth()
        })
        .fail(err => {
            $(`#alertEditTodo`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${err.responseJSON.message}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
        })
}