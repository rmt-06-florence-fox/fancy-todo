function landing () {
    //show register form
     $('#formregister').show('fast',_=> {
          $('#sreg')
          .on('click', _=> {
                $('#formregister').hide();
                $('#formlogin').show()
          })
      });

    //show login form
     $('#formlogin').hide('fast',_=> {
        $('#slog')
        .on('click', _=> {
            $('#formregister').show();
            $('#formlogin').hide()
      })
    })

    //register user
    $('#formregister').on('submit', e => {
        e.preventDefault()
        console.log('tes')
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
                console.log(msg)
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
            .always()
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
                console.log(msg)
                homepage()
            })
            .fail((xhr, textStatus) => {
                console.log(xhr)
            })
    });

    //hide another page
    $('#homepage').hide()
}

function homepage () {
    $('#homepage').show()


    //hide another page
    $('#landing').hide()
}