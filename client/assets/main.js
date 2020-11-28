$(document).ready(function(){
    if(localStorage.getItem('accesstoken')){
        mainhome()
    } else {
        home()
    }
    
    $('#f-signup').on('submit', function(e){
        e.preventDefault()
        signupProcess()
    })
    $('#f-signin').on('submit', function(){
        // e.preventDefault()
        signinProcess()
    }) 
    $('#f-createTodo').on('submit', function(e){
        e.preventDefault()
        createTodo()
    })
    $('#f-editTodo').on('submit', function(e){
        e.preventDefault()
        inputEdit()
    })
    
})