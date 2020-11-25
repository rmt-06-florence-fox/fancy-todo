$(document).ready(function(){
    if(localStorage.getItem('accesstoken')){
       mainhome()
    } else {
        signup()
    }
    
    $('#f-signup').on('submit', function(e){
        e.preventDefault()
        signupProcess()
    })
    $('#f-signin').on('submit', function(e){
        e.preventDefault()
        signinProcess()
    }) 
    $('#signout').on('click', function(){
        signOut()
    })
    $('#f-createTodo').on('submit', function(e){
        e.preventDefault()
        createTodo()
    })
    // $('#fe-createTodo').on('submit', function(e){
    //     e.preventDefault()
    //     editTodoProcess(id)
    // })
    
})