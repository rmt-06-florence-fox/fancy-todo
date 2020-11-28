// const Swal = require('sweetalert2')
function showLoginPage(){
   $('#notLoggedIn-page').show()
   $('#loggedIn-page').hide()
   $('.btn-signOut').hide()
   $('#register-page').hide();
}
function showRegisterPage(){
   $('#notLoggedIn-page').hide()
   $('#loggedIn-page').hide()
   $('.btn-signOut').hide()
   $('#register-page').show()
}
function showMainPage(){
   $('#notLoggedIn-page').hide()
   $('#loggedIn-page').show()
   $('#edit-page').hide();
   $('.btn-signOut').show();
   $('#register-page').hide();
}

function register(){
   const email = $("#emailRegister-input").val()
   const password = $("#passwordRegister-input").val()
   $.ajax({
      url:"http://localhost:3000/users/register",
      method:"POST",
      data:{
         email,
         password
      }
   })
   .done(response => {
      showLoginPage();
   })
   .fail(err => {
      err = err.responseJSON.map(item =>item.message)
      
      let message = err.join()
      Swal.fire({
         icon:'error',
         text:message
      })
      
   })
   .always(_ =>{
      $("#emailRegister-input").val("")
      $("#passwordRegister-input").val("")  
   })
}
function login(code=null){
   const email = $("#emailLogin-input").val()
   const password = $("#passwordLogin-input").val()
   let url;
   let data
   if(code){
      console.log('githublogin')
      url = 'http://localhost:3000/users/githubLogin'
      data={
         code
      }
      Swal.fire({
         icon:'question',
         text:'Testing your credential..',
         footer:'Please wait',
         timer:3000,
         showConfirmButton:false,
         timerProgressBar:true
      })
      
   }else{
      url='http://localhost:3000/users/login',
      data={
         email,
         password
      }
   }
   
   $.ajax({
      url,
      method:'POST',
      data,
   })
   .done(response => {
      Swal.fire({
         icon:'success',
         text:'Log In success',
         footer:'Please wait..',
         timer:1900,
         showConfirmButton:false,
         timerProgressBar:true
      })
      localStorage.setItem('access_token',response.token);
      if(response.email)
         localStorage.setItem('user_email',response.email)
      else
         localStorage.setItem('user_email',data.email)
      //showMainPage();
      $("#errormessage").empty()
      Swal.fire({
         icon:'success',
         text:'Log In success',
         footer:'Please wait..',
         timer:1900,
         showConfirmButton:false,
         timerProgressBar:true
      }),
      setTimeout(() => {
         window.location.href = "http://localhost:8080"
      },2000)
     
      
   })
   .fail(err => {
      Swal.fire({
         icon:'error',
         text:err.responseJSON[0].message
      })
   })
   .always(_ => {
      $("#emailLogin-input").val("")
      $("#passwordLogin-input").val("")
   })
}
function addTodo(){
   const title = $('#title-input').val()
   const description = $('#description-input').val()
   const due_date = $('#due_date-input').val()
   console.log(">>>>>>",localStorage.getItem('access_token'))
   $.ajax({
      url:"http://localhost:3000/todos",
      method:"POST",
      headers:{
         access_token:localStorage.getItem('access_token')
      },
      data:{
         title,
         description,
         due_date
      }
   })
   .done(response => {
      const quote = 
         `"${response[1].quoteText}"-${response[1].quoteAuthor}`
      Swal.fire(quote)
      getAllTodo();
   })
   .fail(err => {
      console.log(err.responseJSON);
      let message=[]
      err.responseJSON.forEach(item => {
         message.push(item.message)
      })
      console.log(message);
      Swal.fire({
         text:message.join('\n'),
         icon:'error'
      })
   })
   .always(_ => {
      $('#title-input').val("")
      $('#description-input').val("")
      $('#due_date-input').val("")
   })
}
function getAllTodo(){
   $("#todos").empty();
   $("#holidays").empty();
   $.ajax({
      url:"http://localhost:3000/todos",
      method:"GET",
      headers:{
         access_token:localStorage.getItem('access_token')
      }
   })
   .done(response => {
      console.log(response)
      $("#todos").append(
         `
         <table id=table-todos class="table" >
            <tr>
               <th scope="col">Title</th>
               <th scope="col">Description</th>
               <th scope="col">Due Date</th>
               <th scope="col">Status</th>
               <th scope="col">Action</th>
            </tr>
         </table>
         `
      )
      response[0].forEach(item => {
         let currStatus = item.status === false ?'Not Done' :'Done'
         $("#table-todos").append( 
         `  <tr scope="row">
               <td>${item.title}</td>
               <td>${item.description}</td>
               <td>${item.due_date}</td>
               <td>${currStatus}</td>
               <td><button id='edit-btn' class='btn btn-primary' onclick=getEdit(${item.id})>Edit</button>|
                  <button id="delete-btn" class='btn btn-danger' onclick=delTodo(${item.id})>Delete</button>|
                  <button id="updateStatus-btn" class='btn btn-success' onclick=updateStatus(${item.id})>Update Progress</button>
               </td>
            </tr>
         `
      )
      })

      $("#holidays").append(
         `
         <table id=holiday-todos class="table" >
            <tr>
               <th scope="col">date</th>
               <th scope="col">Description</th>
            </tr>
         </table>
         `
      )

      response[1].forEach(item => {
         // let currStatus = item.status === false ?'Not Done' :'Done'
         $("#holiday-todos").append( 
         `  <tr scope="row">
               <td>${item.date}</td>
               <td>${item.localName}</td>
            </tr>
         `
      )
      })
      
   })
   .fail(err => {
      $('#errormessage').text(err.message)
   })
}
function delTodo(id){
   $.ajax({
      url:"http://localhost:3000/todos/"+id,
      method:"DELETE",
      headers:{
         access_token:localStorage.getItem('access_token')
      }
   })
   .done(response => {
      Swal.fire('Success Delete')
      getAllTodo();
   })
   .fail(err => {
      $('#errormessage').text(err.message)
   })
}
function getEdit(id){
   $.ajax({
      url:"http://localhost:3000/todos/"+id,
      method:"GET",
      headers:{
         access_token:localStorage.getItem("access_token")
      }
   })
   .done(response=>{
      localStorage.setItem('todoId',id);
      response.due_date = response.due_date.split("T")[0]
      $("#title-edit").val(response.title)
      $("#description-edit").val(response.description)
      $("#due_date-edit").val(response.due_date)
      $('#edit-page').show();
      $('html,body').animate({
         scrollTop:$("#form-editTodo").offset().top
      },1000)
   })
   .catch(err => {
      $('#errormessage').text(err.message)
   })
}
function postEdit(){
   const title = $('#title-edit').val()
   const description = $('#description-edit').val()
   const due_date = $('#due_date-edit').val()

   $.ajax({
      url:"http://localhost:3000/todos/" + localStorage.getItem('todoId'),
      method:"PUT",
      headers:{
         access_token:localStorage.getItem('access_token')
      },
      data:{
         title,
         description,
         due_date
      }
   })
   .done(response => {
      showMainPage();
      getAllTodo();
   })
   .fail(err => {
      $('#errormessage').text(err.message)
   })
   .always(_ =>{
      $("#title-edit").val("")
      $("#description-edit").val("")
      $("#due_date-edit").val("")
   })
}
function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();
   var googleToken = googleUser.getAuthResponse().id_token;
   //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   //console.log('Name: ' + profile.getName());
   //console.log('Image URL: ' + profile.getImageUrl());
   //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
   localStorage.setItem('user_email',profile.getEmail());
   $.ajax({
      url:'http://localhost:3000/users/googleLogin',
      method:"POST",
      data:{
         googleToken
      }
   })
   .done(res => {
      localStorage.setItem('access_token',res.access_token)
      Swal.fire({
         icon:'success',
         text:'Log In success',
         footer:'Please wait..',
         timer:1000,
         showConfirmButton:false,
         timerProgressBar:true
      }),
      setTimeout(() => {
         showMainPage();
      },1100)
   
   })
   .fail(err => {
      
      $('#errormessage').text(err.message)
   })
 }
function signOut() {
   localStorage.clear();
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
      console.log('User signed out.');
   });
   showLoginPage();
}
function update(id){
   $.ajax({
      url:"http://localhost:3000/todos"+id,
      method:"PATCH",
   })
}
function updateStatus(id){
   $.ajax({
      url:'http://localhost:3000/todos/'+id,
      method:'PATCH',
      headers:{
         access_token:localStorage.access_token
      }
   })
   .done(response => {
      //showMainPage();
      
      if(response[1][0].status === true){
         Swal.fire('Congratulations!')
      }else{
         Swal.fire("Don't be sad! You Can Do it!")
      }
      getAllTodo();
   })
   .fail(err => {
      console.log(err)
   })
}

function getTokenGithub(){
   const URL_PARAMS= new URLSearchParams(window.location.search)
   return URL_PARAMS.get('code')
}
