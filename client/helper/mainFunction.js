
$(document).ready(function(){
  if (localStorage.getItem('access_token')) {
    mainPage()
  } else {
    loginPage()
  }

  $('#formRegister').on('submit', (e)=>{
    e.preventDefault()
    inputRegister()
  })

  $('#formLogin').on('submit', (e)=>{
    e.preventDefault()
    inputLogin()
  })

  $('#formToDo').on('submit', (e)=>{
    e.preventDefault()
    create()
  })

  $('#logout').on('click', ()=> {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    loginPage()
  })

  $('#registButton').on('click', (e)=>{
    e.preventDefault()
    registerPage()
  })

  $('#loginButton').on('click', (e)=>{
    e.preventDefault()
    loginPage()
  })
})