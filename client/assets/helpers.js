function home(){
    $("#signin").hide()
    $("#signup").hide()
    $("#mainhome").hide()  
    $("#createTodo").hide()
    $("#editTodo").hide()          
}
function signin(){
    $("#home").hide()
    $("#signup").hide()
    $("#mainhome").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
}
function signinProcess(){
    const email = $('#emailsignin').val()
    const password = $('#passwordsignin').val()
    $.ajax({
        url : "http://localhost:3001/users/signin",
        method : "post",
        data : {
            email,
            password
        }
    })
    .done(result => {
        localStorage.setItem('accesstoken', result.accessToken)
        mainhome()
    })
    .fail((xhr, textStatus) => {
        signin()
    })  
    .always(_ => {
        $('#signin').trigger('reset')
    })
}  
function signup(){
    $("#signin").hide()
    $("#home").hide()
    $("#mainhome").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
}
function signupProcess(){
    const email = $('#emailsignup').val()
    const password = $('#passwordsignup').val()
    $.ajax({
        url : "http://localhost:3001/users/signup",
        method : "post",
        data : {
            email,
            password
        }
    })
    .done(result => {
        home()
    })
    .fail(xhr => {
        signup()
        console.log(xhr)
    })          
}  
function signOut(){
    localStorage.clear()
    signin()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}
function mainhome(){
    $("#signin").hide()
    $("#signup").hide()
    $("#home").hide()
    $("#editTodo").hide()
    showlist()
}
function showlist(){
    $.ajax({
        method : 'get',
        url : "http://localhost:3001/todos/",
        headers : {
            accessToken : localStorage.getItem('accesstoken')
        }
    })
    .done(result => {
        $('#mainhome').empty()
        result.forEach(data => {
            $('#mainhome').append(`
                <tr>
                    <th> ${data.title} </th>
                    <th> ${data.description} </th>
                    <th> ${data.due_date} </th>
                    <th> <button onclick="editTodoProcess(${data.id})"> Edit </button> | <button onclick="deleteTodo(${data.id})"> Delete </button> </th>
                </tr>`
            )
        })
        $('#mainhome').append('</table>')
        
    })
    .fail(err => {
        console.log(err);
    })
}
function createTodo(){
    const title = $('#titleToDo').val()
    const description = $('#descriptionToDo').val()
    const due_date = $('#due_dateTodo').val()
    $.ajax({
        url : 'http://localhost:3001/todos/',
        method : 'post',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(result => {
        console.log(result);
        mainhome()
    })
    .fail(xhr => {
        console.log(xhr)
    })
    .always(_ => {
        $('#createtodo').trigger('reset')
    })
}
function deleteTodo(id){
    $.ajax({
        url : 'http://localhost:3001/todos/' + id,
        method : 'delete',
        headers : {
            accesstoken : localStorage.getItem('accesstoken')
        },
    })
    .done(result => {
        mainhome()
    })
    .fail(err => {
        console.log(err);
    })
}

// function editTodo(id){
//     $("#signin").hide()
//     $("#signup").hide()
//     $("#home").hide()
//     $("#createTodo").hide()
//     // $.ajax({
//     //     url : 'http://localhost:3001/todos/' + id,
//     //     method : 'get',
//     //     headers : {
//     //         accesstoken : localStorage.getItem('accesstoken')
//     //     }
//     // })
//     // .done(data => {
//     //     $('#edittitleToDo').val(data.title),
//     //     $('#editdescriptionToDo').val(data.description)
//     //     $('#editdue_dateToDo').val(data.due_date)
//     // })
//     // .fail(err => {
//     //     console.log(err);
//     // })
// }
// function editTodoProcess(id){
//     const title = $('#edittitleToDo').val()
//     const description = $('#editdescriptionToDo').val()
//     const due_date = $('#editdue_dateToDo').val()
//     $.ajax({
//         url : 'http:/localhost:3001/todos/' + id,
//         method : 'patch',
//         headers : {
//             accesstoken : localStorage.getItem('accesstoken')
//         },
//         data : {
//             title,
//             description,
//             due_date
//         }
//     })
//     .done(result => {
//         mainhome()
//     })
//     .fail(xhr => {
//         console.log(xhr)
//     })
//     .always(_ => {
//         $('#edittodo').trigger('reset')
//     })
// }   

function onSignIn(googleUser) {
    var tokenGoogle = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : 'http://localhost:3001/users/signinbygoogle',
        method : 'post',
        data : {
            tokenGoogle
        }
    })
    .done(result => {
        console.log(result);
    })
    .fail(err => {
        console.log(err);
    })
}
    
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); 
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); 
// }