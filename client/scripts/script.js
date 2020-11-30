$(document).ready (function(){

    if (localStorage.getItem('access_token')) {
      homepage()
    } else {
      landing()
    }

    //submit new task
    $('#newtask').on({
      submit: e => {
        e.preventDefault()
            $('#add-error').empty()
            const newUser = {
              title: $('#add-task-title').val(),
              desrcription: $('#add-task-description').val(),
              due_date: $('#add-task-due_date').val()
            }
            $.ajax({
              method: 'POST',
              url: 'http://localhost:3000/todos',
              headers: {
                access_token: localStorage.getItem('access_token')
              },
              data: newUser
            })
            .done(msg => {
              $('#add-success-message').show('fast')
              setTimeout(backHome, 700);
            })
            .fail((xhr, textStatus) => {
                console.log(xhr)
                const errorLog = xhr
                                    .responseJSON
                                    .errors
                                    // .map(el => el.message)
                                   
                errorLog.forEach( el => {
                    $('#add-error').append(
                        `<div><small id="errmes" class="form-text text-danger">${el.message}</small></div>`
                    )                    
                })  
            })
            .always(_=> {
              $('#add-task-title').val('')
              $('#add-task-description').val('')
              $('#add-task-due_date').val('')
            })

      }
    })

    //edit task
    $('#edit-task').on({
      submit: e => {
        e.preventDefault()
        $('#edit-error').empty()
        const updateData = {
          title: $('#edit-task-title').val(),
          desrcription: $('#edit-task-description').val(),
          due_date: $('#edit-task-due_date').val()
        }
        $.ajax({
          method: 'PUT',
          url: `http://localhost:3000/todos/${$('#edit-task-id').val()}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: updateData
        })
        .done(msg => {
          $('#edit-success-message').show('fast')
          setTimeout(backHome, 700);
        })
        .fail((xhr, textStatus) => {
            console.log(xhr)

            const errorLog = xhr
                                    .responseJSON
                                    .errors
                                    // .map(el => el.message)
                                   
                errorLog.forEach( el => {
                    $('#edit-error').append(
                        `<div><small id="errmes" class="form-text text-danger">${el.message}</small></div>`
                    )                    
                })  
        })
        .always(_=> {
          $('#edit-task-id').val('')
          $('#edit-task-title').val('')
          $('#edit-task-description').val('')
          $('#edit-task-due_date').val('')
        })
      }
    })

    //post suggestion
    $('#getsuggest').on({
      submit: e => {
        e.preventDefault()
        $('#suggest-error').empty()
            const newUser = {
              title: $('#get-suggest-title').val(),
              desrcription: $('#get-suggest-description').val(),
              due_date: $('#get-suggest-due_date').val()
            }
            $.ajax({
              method: 'POST',
              url: 'http://localhost:3000/todos',
              headers: {
                access_token: localStorage.getItem('access_token')
              },
              data: newUser
            })
            .done(msg => {
              $('#suggest-success-message').show('fast')
              setTimeout(backHome, 700);
            })
            .fail((xhr, textStatus) => {
                console.log(xhr)

                 const errorLog = xhr
                                    .responseJSON
                                    .errors
                                    // .map(el => el.message)
                                   
                errorLog.forEach( el => {
                    $('#suggest-error').append(
                        `<div><small id="errmes" class="form-text text-danger">${el.message}</small></div>`
                    )                    
                }) 
            })
            .always(_=> {
              $('#add-task-title').val('')
              $('#add-task-description').val('')
              $('#add-task-due_date').val('')
            })

      }
    })

         //atur link navigasi atas
         $('#alltask').on({
          click: _=> {
              console.log('alltask')
              $('#tabel-all').show()
              $('#tabel-complete').hide()
              $('#tabel-uncomplete').hide()
              $('#tabel-missing').hide()
          }
      })
      $('#uncomplete-task').on({
          click: _=> {
              console.log('uncompletetask')
              $('#tabel-all').hide()
              $('#tabel-complete').hide()
              $('#tabel-uncomplete').show()
              $('#tabel-missing').hide()
          }
      })
      $('#completetask').on({
          click: _=> {
              console.log('completetask')
              $('#tabel-all').hide()
              $('#tabel-complete').show()
              $('#tabel-uncomplete').hide()
              $('#tabel-missing').hide()
          }
      })
      $('#missingtask').on({
          click: _=> {
              console.log('missingtask')
              $('#tabel-all').hide()
              $('#tabel-complete').hide()
              $('#tabel-uncomplete').hide()
              $('#tabel-missing').show()
          }
      })
     

      //
      $('#get-suggest-due_date').on(
        {
          focus: _=> {
            $('#pickdue').hide()
          },
          blur: _=> {
            console.log($('#get-suggest-due_date').val())
            if ($('#get-suggest-due_date').val() == null || $('#get-suggest-due_date').val() == '') {
              $('#pickdue').show()
            } else {
              $('#pickdue').hide()
            }
          }
        }
      )

  });