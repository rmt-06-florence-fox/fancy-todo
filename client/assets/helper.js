


function loginForm(){
    $('#login-page').show()
    $('#edit-form').hide()
    $('#main-page').hide()
    $('#add-form').hide()
    $('#register-page').hide()
    $('#cuaca-container').hide()
    $('#todo-page').hide()

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
    console.log('main page')
    // $('#register-button').hide()
    $('#main-page').show()
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-form').hide()
    $('#add-form').hide()
    $('#register-page').hide()
    $('#cuaca-container').show()
    $('#todo-page').show()
    fetchTodoList()
    cuacaApi()
}
function addNewTodo(){
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-form').hide()
    $('#main-page').show()
    $('#add-form').show()
    $('#register-page').hide()
    $('#cuaca-container').hide()
    $('#todo-page').hide()
        // fetchTodoList()
    
}

function editPage(){
    $('#logout-button').show()
    $('#login-page').hide()
    $('#edit-form').show()
    $('#main-page').show()
    $('#add-form').hide()
    $('#register-page').hide()
    $('#cuaca-container').hide()
    $('#todo-page').hide()



}

function getLoginData(){
    let password = $('#login-password').val()
    let email = $('#login-email').val()
    console.log(password)
    console.log(email)
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
    console.log('delete')
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
        console.log(respon)
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
        $('#todo-card').empty()
        console.log(resp.length)
        if (resp.length == 0){
            $('#todo-card').append('<h2 id="dont-have-task"> You Dont Have Any Task</h2>')
        } else {
            $('#dont-have-task').hide()

            resp.forEach( todo =>{
                let style ; 
                todo.status == 'success' ? style = 'style="background-color: #33F9FF;"': ""
                $('#todo-card').append(`
                <div class="min-w-0 p-4 text-white bg-blue-500 rounded-lg shadow-xs">
                <table >
                  <td class="check-box">                      
                    <div >
                      <input type="checkbox" id="myCheck" onclick = changeStatus(${todo.id})>
                    </div>
                  </td>
                  <td>
                    <div class="desc-card">
                      <h4 class="mb-4 font-semibold text-3xl">
                        ${todo.title}
                      </h4>
                      <ul>
                        <li>Description : ${todo.description}
                        </li>
                        <li>Due Date    : ${todo.due_date}
                        </li>
                        <li>Status      : ${todo.status}
                        </li>
                      </ul> 

                      <button 
                      type="button"
                      class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" onclick = "editData(${todo.id})"
                    >
                      Edit Task
                      </button>


                      <button id="delete-task-button"
                      type="button"
                      class=" border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onclick = deleteData(${todo.id})
                    >
                      Delete Task
                    </button>
                    </div>
                  </td>
                </table>
              </div>
                `)
            })          
        }
        
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
        mainPage()
        // fetchTodoList()
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
    console.log('goooooooooooooooooo')
    console.log(resp)
    localStorage.setItem('access_token',resp)
    mainPage()
   }).fail(err=>{
    console.log(err)
   })
  }
function getExchangeAPI(){
    console.log('===EXCHANGE===')
    // $.ajax({
    //     method : 'GET',
    //     url : 'http://localhost:3000/exchange'
    // }).done(resp =>{
    //     console.log(resp.conversion_rates)
    //     $('#last-update').text(resp.time_last_update_utc)
    //     $('#usd-idr').text(resp.conversion_rates.IDR)
    //     $('#usd-jpy').text(resp.conversion_rates.JPY)
    //     $('#usd-hkd').text(resp.conversion_rates.HKD)
    //     $('#usd-aud').text(resp.conversion_rates.AUD)
    // }).fail(err =>{
    //     console.log(fail)
    // })
}

function cuacaApi(){
    console.log('weather')
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/weather'

    }).done(resp =>{
        console.log(resp)
        $('#cuaca').text(resp.data.weather)
        $('#temperatur').text(resp.data.temperature)
        $('#location').text(resp.data.location)
    }).fail(err =>{
        console.log(err)
    })
}