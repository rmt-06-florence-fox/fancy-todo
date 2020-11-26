
$(document).ready( () =>{
    if(localStorage.getItem('access_token')){
        mainPage()
    }else {
        loginForm()
    }

    getExchangeAPI()
    // form
    $('#login-form').on('click', (e)=>{
        e.preventDefault()
    })
    $('#register-form').on('click', (e)=>{
        e.preventDefault()
    })
    $('#add-form').on('click', (e)=>{
        e.preventDefault()
    })
    $('#edit-form').on('click', (e)=>{
        e.preventDefault()
    })


    // button
    $('#logout-button').on('click', ()=>{
        logout()

    })  
    $("#submit-loginForm-btn").on("click", ()=>{
        getLoginData()
    })
    $("#submit-register-btn").on("click", ()=>{
        getRegisterData()
    })
    $('#add-new-todo-btn').on('click', ()=>{
        addTodoList()
    })  
    $('#register-button').on('click' , () =>{
        registerForm()
    })
    $('#logout-button').on('click' , () =>{
        loginForm()
    })
    $('#edit-todo-btn').on('click' , () =>{
        saveEditData()
    })
    $('#add-new-button').on('click', ()=>{
        addNewTodo()
    })  
    $('.cancel-button').on('click', ()=>{
        mainPage()
    }) 
})