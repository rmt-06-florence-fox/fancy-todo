$(document).ready(()=>{
    if(localStorage.getItem('access_token')){
        showMainPage();
    } else {
        showLoginPage();
    }
    $("#loginForm").on("submit", function (event){
        event.preventDefault();
        const loginInput = {
            email: $("#emailLogin").val(),
            password: $("#passwordLogin").val()
        }
        $.ajax({
            url:'http://localhost:3000/user/login',
            method: 'POST',
            data: loginInput,
        })
        .done((response)=>{
            localStorage.setItem("access_token", response.access_token)
            showMainPage();
        })
        .fail((xhr, textStatus)=>{
            console.log(xhr, textStatus)
        })
        .always(()=>{
            $("#loginForm").trigger("reset");
        })
    })
    $('#registerForm').on('submit', (event)=>{
        event.preventDefault();
        const registerInput = {
            email: $("#emailRegister").val(),
            password: $("#passwordRegister").val()
        }
        $.ajax({
            url:'http://localhost:3000/user/register',
            method: 'POST',
            data: registerInput,
        })
        .done((response)=>{
            console.log(response);
            showLoginPage();
        })
        .fail((xhr, textStatus)=>{
            console.log(xhr, textStatus)
        })
        .always(()=>{
            $("#registerForm").trigger("reset");
        })
    })
    $("#toLogin").click(()=>{
        showLoginPage();
    })
    $("#toRegister").click(()=>{
        showRegisterPage();
    })
    $("#logoutButton").click(()=>{
        logout();
    })
    $("#addTodoForm").on("submit", function(event){
        event.preventDefault();
        addTodo();
    })
})
