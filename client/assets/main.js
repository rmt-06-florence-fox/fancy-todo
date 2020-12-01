
$(document).ready( () =>{
    if(localStorage.getItem('access_token')){
        mainPage()
    }else {
        loginForm()
    }
    
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



    $("#login-btn").on("click", ()=>{
        getLoginData()
    })

    $('#logout-btn').on('click', ()=>{
        console.log('log outttttttttt')
        logout()
    }) 

    $('#register-btn').on('click',() =>{
        console.log('register')
        registerForm()
    })
    $("#submit-register-btn").on("click", ()=>{
        getRegisterData()
    })
    $('#cancel-register-btn').on('click', ()=>{
        loginForm()
    }) 
    $('.cancel-button').on('click', ()=>{
        mainPage()
    }) 
    $('#add-new-todo-btn').on('click', ()=>{
        addTodoList()
        console.log('addd newww')
    }) 
    $('#edit-todo-btn').on('click' , () =>{
        saveEditData()
        // console.log('edit')
    })

    $('#add-page-button').on('click', ()=>{
        addNewTodo()
        console.log('addd newww')
    }) 
})