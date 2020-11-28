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
     


  });