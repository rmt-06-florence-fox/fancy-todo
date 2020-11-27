$(document).ready(function(){
  if(localStorage.getItem('access_token')){
    showMainPage()
  }else{
    showLoginPage()
  }
  $('#form-login').on('submit', (e)=>{
    e.preventDefault()
    login()
  })
  $('#link-register').on('click', (e)=>{
    e.preventDefault()
    showRegistPage()
  })
  $('#form-regist').on('submit', function(e){
    e.preventDefault()
    regist()
  })
  $('#form-create-todo').on('submit', (e)=>{
    e.preventDefault()
    createTodo()
  })
  $('#btn-logout').on('click', (e)=>{
    logout()
  })
})