


function loginForm(){
    $('#logout-button').hide()
    $('#login-page').show()
    $('#edit-page').hide()
    $('#main-page').hide()
    $('#add-page').hide()
    $('#exchange-api').hide()
    $('#register-page').hide()

}
function registerForm(){
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-page').hide()
    $('#main-page').hide()
    $('#add-page').hide()
    $('#exchange-api').hide()
    $('#register-page').show()
}

function mainPage(){
    $('#register-button').hide()
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-page').hide()
    $('#main-page').show()
    $('#add-page').hide()
    $('#register-page').hide()
    $('#exchange-api').show()
    fetchTodoList()
    cuacaApi()
}
function addNewTodo(){
        $('#register-button').hide()
        $('#logout-button').show()
        $('#login-page').hide()
        $('#edit-page').hide()
        $('#main-page').show()
        $('#add-page').show()
        $('#register-page').hide()
        $('#exchange-api').show()
        fetchTodoList()
    
}

function editPage(){
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-page').show()
    $('#main-page').show()
    $('#add-page').hide()
    $('#register-page').hide()

}

function getLoginData(){
    let password = $('#login-password').val()
    let email = $('#login-email').val()

    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/signIn',
        data : {
            email:email,
            password:password
        }
    }).done(resp =>{
        localStorage.setItem('access_token',resp)
        mainPage()
    }).fail(err =>{
        console.log(err)
    }).always( ()=>{
        $('#login-password').val('')
        $('#login-email').val('')
    })
}
function deleteData(id){
    console.log(id)
    $.ajax({
        method : 'DELETE',
        url : `http://localhost:3000/todos/${id}`,
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(resp =>{
        mainPage()
    }).fail(err =>{
        console.log(err)
    })
}
function editData( id ){
    console.log('===== Try to edit===')
    console.log(id)
    editPage()
    $.ajax({
        method : 'GET',
        url : `http://localhost:3000/todos/${id}`,
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(respon =>{
        $('#edit-title').val(respon[0].title)
        $('#edit-desc').val(respon[0].description)
        $('#edit-due_date').val(respon[0].due_date)
        $('#edit-id').val(respon[0].id)


    })
    .fail(err =>{
        console.log(err)
    })
}
function saveEditData(){
    let newTitle = $('#edit-title').val()
    let newDesc = $('#edit-desc').val()
    let newDue_date = $('#edit-due_date').val()
    let id = $('#edit-id').val()

    $.ajax({
        method : 'PUT',
        url : `http://localhost:3000/todos/${id}`,
        data : {
            title : newTitle,
            description : newDesc,
            due_date : newDue_date,
        },
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(resp =>{
        mainPage()
    }).fail(err =>{
        console.log(err)
    })
}
function getRegisterData(){
    const name = $('#register-name').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    console.log(name,email,password)

    $.ajax({
        method : 'post',
        url : 'http://localhost:3000/signUp',
        data: {
            name,
            email,
            password
        }
    }).done(resp =>{
        loginForm()
        console.log(resp)
    }).fail(err=>{
        console.log(err)
    })

}
function changeStatus(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/todos/${id}`,
        data : {
            status : 'success'
        },
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(resp =>{
        mainPage()
    }).fail(err =>{
        console.log(err)
    })
}
function fetchTodoList(){
    $('#todo-table').empty()
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/todos',
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(resp =>{
        console.log('==== REsp====')
        resp.forEach( todo =>{
            console.log(todo.description)
            let style ; 
            todo.status == 'success' ? style = 'style="background-color: #99d6ff;"': ""
            $('#todo-table').append(`
            <thead class="center-text head-todo" ${style}>
                <tr>
                    <th></th>
                    <th>${todo.title}</th>
                </tr>
            </thead>

            <tbody ${style} >
                <tr >
                    <td class="center-text checkbox">
                        <form action="">
                            <input type="checkbox" name="" class="checkbox-todo" onclick = changeStatus(${todo.id})>
                        </form>
                    </td>
                        <td class="left-text desc">description : ${todo.description}<br>
                            due date : ${todo.due_date} <br>
                            status : ${todo.status} <br>
                            <div class = "row">
                                <div class="login-manual">
                            <button class = "btn btn-danger " onclick = deleteData(${todo.id})>delete</button> 
                                </div>
                                <div class="login-manual">
                            <button class ="btn btn-primary" onclick = "editData(${todo.id})" >edit</button> 
                                </div>
                            </div>
                        </td>

                </tr>
            </tbody>`)
        })
    }).fail(err =>{
        console.log(err)
    })
}

function addTodoList(){
    const title = $('#add-title').val()
    const description = $('#add-desc').val()
    const due_date = $('#add-due_date').val()
    console.log(title,description,due_date)
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/todos',
        data : {
            title,
            description,
            due_date
        },
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    }).done(resp =>{
        fetchTodoList()
    }).fail(err=>{
        console.log(err)
    }).always( () =>{
        $('#add-title').val("")
        $('#add-desc').val("")
        $('#add-due_date').val("")
    })
    
}
function logout(){
    localStorage.removeItem('access_token')
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    loginForm()
}
function onSignIn(googleUser) {
   const google_token = googleUser.getAuthResponse().id_token;
//    console.log(google_token)
   $.ajax({
       method : 'POST',
       url : 'http://localhost:3000/googleLogin',
       data : {
           google_token
       }
   }).done(resp =>{
    console.log(resp)
    localStorage.setItem('access_token',resp)
    mainPage()
   }).fail(err=>{
    console.log(err)
   })
  }
function getExchangeAPI(){
    console.log('===EXCHANGE===')
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/exchange'
    }).done(resp =>{
        console.log(resp.conversion_rates)
        $('#last-update').text(resp.time_last_update_utc)
        $('#usd-idr').text(resp.conversion_rates.IDR)
        $('#usd-jpy').text(resp.conversion_rates.JPY)
        $('#usd-hkd').text(resp.conversion_rates.HKD)
        $('#usd-aud').text(resp.conversion_rates.AUD)
    }).fail(err =>{
        console.log(fail)
    })
}

function cuacaApi(){
    console.log('weather')
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/weather'

    }).done(resp =>{
        console.log(resp)
        console.log(resp.weather[0].description)
        console.log(resp.main.temp)
        console.log(resp.name)
        const cuaca =resp.weather[0].description
        $('#cuaca').text(cuaca)
        $('#temperatur').text(resp.main.temp)
        $('#location').text(resp.name)
    }).fail(err =>{
        console.log(err)
    })
}