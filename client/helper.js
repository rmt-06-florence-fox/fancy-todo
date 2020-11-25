const URL = "http://localhost:3000/"

  $(document).ready(() => {
    $('#signin').click(function(e) {
      e.preventDefault()
      doSignIn()
    })
  })

  function doSignIn() {
    const email = $('#input-email').val()
    const password = $('#input-password').val()
    $.ajax({
      url: `${URL}signIn`,
      method: "POST",
      data: {
        email,
        password
      }
    })
      .done(result => {
        localStorage.setItem('accesstoken', result.accessToken) //set token di client
        console.log('berhasil login', result)
      })
      .fail(err => {
        console.log(err)
      })
      .always(_ => {
        $('#email').val('')
        $('#password').val('')
      })
  }