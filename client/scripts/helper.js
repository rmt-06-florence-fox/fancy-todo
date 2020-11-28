function landing () {
        //show login form
        $('#landing').show(0)
        $('#formlogin').show(0,_=> {
            $('#slog')
            .on('click', _=> {
                $('#formregister').show();
                $('#formlogin').hide()
                $('#error-log').empty()
          })
        })

    //show register form
     $('#formregister').hide(0,_=> {
          $('#sreg')
          .on('click', _=> {
                $('#formregister').hide();
                $('#formlogin').show()
                $('#errorlog').empty()
          })
      });

    //register user
    $('#formregister').on('submit', e => {
        $('#errorlog').empty()
        e.preventDefault()
        const data = {
                        name: $('#namereg').val(),
                        email: $('#emailreg').val(),
                        password: $('#passwordreg').val()
                    }
        
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/register",
            data: data
            })
            .done (msg => {
                localStorage.setItem('access_token', msg.access_token)
                homepage()
            })
            .fail((xhr, textStatus) => {
               
                const errorLog = xhr
                                    .responseJSON
                                    .errors
                                    // .map(el => el.message)
                                   
                errorLog.forEach( el => {
                    $('#errorlog').append(
                        `<div><small id="errmes" class="form-text text-danger">${el.message}</small></div>`
                    )                    
                })        
                
                if(xhr
                    .responseJSON
                    .errors[0]
                    .message == 'email must be unique') {
                        $('#errorlog').empty()
                        $('#errorlog').append(
                            `<div><small id="errmes" class="form-text text-danger">Email have been used</small></div>`
                        )    
                    }
                // alert(errorLog)
                console.log(xhr
                    .responseJSON
                    .errors[0]
                    .message)

            })
            .always(_=> {
                $('#namereg').val('')
                $('#emailreg').val('')
                $('#passwordreg').val('')
            })
    });

    //login user
    $('#formlogin').on('submit', e => {
        $('#error-log').empty()
        e.preventDefault()
        const data = {
                        email: $('#emaillog').val(),
                        password: $('#passwordlog').val()
                    }

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/login",
            data: data
            })
            .done (msg => {
                localStorage.setItem('access_token', msg.access_token)
                homepage()
            })
            .fail((xhr, textStatus) => {
                const errorLog = xhr
                .responseJSON
                .message
                // .map(el => el.message)
                console.log(errorLog)
               
                $('#error-log').append(
                    `<div><small id="errmes" class="form-text text-danger">${errorLog}</small></div>`
                )                    

            })
            .always(_=> {
                $('#emaillog').val('')
                $('#passwordlog').val('')
            })
    });

    //hide another page
    $('#footernav').hide()
    $('#homepage').hide()
    $('#newtask').hide(0)
    $('#getsuggest').hide()
    $('#edit-task').hide()
}

function homepage () {
    
    $('#homepage').show(0)
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
        })
        .done (msg => {
            $('#list').empty()
            $('#complete-list').empty()
            $('#uncomplete-list').empty()
            $('#missing-list').empty()
            const list = msg.list
            let completedList = 0
            let uncompletedList = 0
            let missingList = 0

            $('#tabel-all').show()
            $('#tabel-complete').hide()
            $('#tabel-uncomplete').hide()
            $('#tabel-missing').hide()

            list.forEach(el => {
                let dateLog = new Date (el.due_date)
                let date = dateLog.toDateString()
                let time = dateLog.toTimeString().split('GMT')[0]
                if (el.status == false) {
                    if(new Date(el.due_date) < new Date ()) {
                        missingList++
                        $('#missing-list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription}  <br>
                            <span class="badge bg-light text-dark"><em> due </em> ${date} ${time}</span> 
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                            <button type="button" class="btn btn-warning btn-sm mr-1" onclick="editTask(${el.id})">Edit</button>
                            <button type="button" class="btn btn-success btn-sm mr-1" onclick="patchTask(${el.id})">Mark As Done</button>
                            <button type="button" class="btn btn-dark btn-sm delbut" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)
                    }
                    uncompletedList++
                    //adding item to all tab
                    $('#list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription}  <br>
                            <span class="badge bg-light text-dark"><em> due </em> ${date} ${time}</span> 
                            
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                            <button type="button" class="btn btn-warning btn-sm mr-1" onclick="editTask(${el.id})">Edit</button>
                            <button type="button" class="btn btn-success btn-sm mr-1" onclick="patchTask(${el.id})">Mark As Done</button>
                            <button type="button" class="btn btn-dark btn-sm delbut" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)

                    //add to missing tab
                    $('#uncomplete-list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription}  <br>
                            <span class="badge bg-light text-dark"><em> due </em> ${date} ${time}</span>  
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                            <button type="button" class="btn btn-warning btn-sm mr-1" onclick="editTask(${el.id})">Edit</button>
                            <button type="button" class="btn btn-success btn-sm mr-1" onclick="patchTask(${el.id})">Mark As Done</button>
                            <button type="button" class="btn btn-dark btn-sm delbut" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)
                } else {
                    completedList++
                    $('#list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription}  <br>
                            <span class="badge bg-light text-dark"><em> due </em> ${date} ${time}</span>  
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                            <button type="button" class="btn btn-warning btn-sm" style="margin-right: 7px;" onclick="editTask(${el.id})">Edit</button>
                            <button type="button" class="btn btn-danger btn-sm mr-1" onclick="patchTask(${el.id})">Mark  Undone</button>
                            <button type="button" class="btn btn-dark btn-sm delbut" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)
                    
                        $('#complete-list').prepend(`
                        <tr class='row'>
                            <td class="col"><b>${el.title}</b><br>
                                ${el.desrcription}  <br>
                            <span class="badge bg-light text-dark"><em> due </em> ${date} ${time}</span>  
                            </td>
                            <td class="col-md-auto d-flex align-items-center">
                                <button type="button" class="btn btn-warning btn-sm" style="margin-right: 7px;" onclick="editTask(${el.id})">Edit</button>
                                <button type="button" class="btn btn-danger btn-sm mr-1" onclick="patchTask(${el.id})">Mark  Undone</button>
                                <button type="button" class="btn btn-dark btn-sm delbut" onclick="deleteTask(${el.id})">Delete</button>
                            </td>
                        </tr>
                                    `)
                }
            })
            // console.log(list)
            $('#all-count').text(list.length)
            $('#uncomplete-count').text(uncompletedList)
            $('#complete-count').text(completedList)
            $('#missing-count').text(missingList)

 

            
        })
        .fail((xhr, textStatus) => {
            console.log(xhr)
        })
        .always(_=> {
            
        })

    //hide another page
    $('#footernav').show()
    $('#landing').hide(0)
    $('#newtask').hide(0)
    $('#getsuggest').hide()
    $('#edit-task').hide()
}

function newTask () {
    $('#add-error').empty()

    $('#newtask').show(0)
    $('#homepage').hide()
    $('#getsuggest').hide()
    $('#add-success-message').hide()
    $('#edit-task').hide()
}

function getSuggest () {
    $('#suggest-error').empty()
    $('#suggest-success-message').hide()
    $('#getsuggest').show()
    $('#homepage').hide()
    $('#newtask').hide()
    $('#edit-task').hide()
    $.ajax({
        url: 'http://localhost:3000/todos/suggest',
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(msg => {
        console.log(msg)
        $('#get-suggest-description').val(msg.try.activity)
        $('#get-suggest-title').val(`try ${msg.try.type}`)
    })
    .fail((xhr, textStatus) => {

    })
    .always(_=> {

    })

}

function editTask (id) {
    $('#edit-error').empty()

    $('#edit-task').show()
    $('#getsuggest').show()
    $('#homepage').hide()
    $('#newtask').hide()
    $('#getsuggest').hide()
    $('#edit-success-message').hide()

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(msg => {
        let dateData = msg.todo.due_date.split('')
        dateData.splice(-1)
        console.log(dateData.join(''))
        $('#edit-task-id').val(msg.todo.id)
        $('#edit-task-title').val(msg.todo.title)
        $('#edit-task-description').val(msg.todo.desrcription)
        $('#edit-task-due_date').val(dateData.join(''))
    })
}

function backHome () {
    
    console.log($('input.btn-check'))
    $('input.btn-check').removeAttr('checked')
    $('input.btn-check').prop('checked', false);
    $('#homelink').attr('checked', true)
    $('#homelink').prop('checked', true);
    homepage()

}

function deleteTask (id) {
    $.ajax ({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(msg => {
        backHome()
    })
    .fail((xhr, textStatus) => {

    })
    
}

function patchTask (id) {
    $.ajax ({
        method: 'PATCH',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(msg => {
        homepage()
    })
    .fail((xhr, textStatus) => {

    })
}

function logout () {
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    landing()
}

//google sign in

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/google-login',
        data: {
            id_token
        }
    })
    .done(msg => {
        localStorage.setItem('access_token', msg.access_token)
                homepage()
    })
    .fail((xhr, textStatus) => {

    })
    .always(_=> {

    })
}