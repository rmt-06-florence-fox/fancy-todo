function landing () {
        //show login form
        $('#landing').show(0)
        $('#formlogin').show(0,_=> {
            $('#slog')
            .on('click', _=> {
                $('#formregister').show();
                $('#formlogin').hide()
          })
        })

    //show register form
     $('#formregister').hide(0,_=> {
          $('#sreg')
          .on('click', _=> {
                $('#formregister').hide();
                $('#formlogin').show()
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
                                    .map(el => el.message)
                                   
                errorLog.forEach( el => {
                    $('#errorlog').append(
                        `<small id="errmes" class="form-text text-danger">${el}</small>`
                    )                    
                })                   
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
                console.log(xhr)
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
    $('#list').empty()
    $('#homepage').show(0)
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
        })
        .done (msg => {
            const list = msg.list

            list.forEach(el => {
                if (el.status == false) {
                    $('#list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription} 
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                        <button type="button" class="btn btn-warning btn-sm mr-1">Edit</button>
                        <button type="button" class="btn btn-success btn-sm mr-1">Mark As Done</button>
                        <button type="button" class="btn btn-dark btn-sm" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)
                } else {
                    $('#list').prepend(`
                    <tr class='row'>
                        <td class="col"><b>${el.title}</b><br>
                            ${el.desrcription} 
                        </td>
                        <td class="col-md-auto d-flex align-items-center">
                        <button type="button" class="btn btn-warning btn-sm" style="margin-right: 6px;">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm mr-1">Mark  Undone</button>
                        <button type="button" class="btn btn-dark btn-sm" onclick="deleteTask(${el.id})">Delete</button>
                        </td>
                    </tr>
                                `)
                }
            })
            console.log(list)

            //atur link navigasi bawah
            
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
    $('#newtask').show(0)
    $('#homepage').hide()
    $('#getsuggest').hide()
    $('#add-success-message').hide()
    $('#edit-task').hide()
}

function getSuggest () {
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

function editTask () {
    $('#edit-task').show()
    $('#getsuggest').show()
    $('#homepage').hide()
    $('#newtask').hide()
    $('#getsuggest').hide()
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

function logout () {
    localStorage.clear()
    landing()
}