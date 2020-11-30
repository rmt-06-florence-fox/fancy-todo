$(document).ready(function(){
    if(localStorage.getItem('access_token')){
      showMainPage()
    } else {
      showLoginPage() 
    }
    $("#login_form").on("submit", (event)=> {
      event.preventDefault()
      login()
      })
    
    $("#register_form").on("submit", (event)=> {
    event.preventDefault()
    register()
    })
    $("#form-edit-todo").on("submit", (event) => {
      editTodo()
    })

    $("#form-todo").on("submit", (event)=> {
      event.preventDefault()
      createTodo()
    })

    $("#button_logout").on("click", () => {
      logout()
    })
    $("#button_signup").on("click", (event) => {
      event.preventDefault()
      showRegister()
    })
    $("#button_signin").on("click", ()=> {
      showLoginPage()
    })
});