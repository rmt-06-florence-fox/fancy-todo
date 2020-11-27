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
        $('#add-success-message').show('fast')
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
              $('#add-success-message').show('slow')
              setTimeout(homepage, 700);
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
    
    
  });