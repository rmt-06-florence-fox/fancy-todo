
    function showlogin () {
      $("#login-page").show()
      $("#form-add").hide()
      $("#edit").hide()
      $("#register").hide()
      $("#show").hide()
      $("#btn-logout").show()
      $("#fetchData").hide()
     

    }
    function showMainPage (){
      quote()
      $("#login-page").hide()
      $("#edit").hide()
      $("#register").hide()
      $("#btn-logout").hide()
      fetchData()
      $("#form-add").show()
     
    }

    function showRegister() {
      $("#login-page").hide()
      $("#form-add").hide()
      $("#edit").hide()
      $("#show").hide()
      $("#btn-logout").hide()
      $("#fetchData").hide()
      $('#register').show();
    }

    function login (){
        const email = $("#email").val()
        const password = $("#password").val()
        console.log(email,password)
        $.ajax({
          
          url: "http://localhost:3000/login",
          method: "POST",
          data: { 
            email,
            password}
        })
        .done(response => {
          localStorage.setItem('access_token',response.access_token)
          console.log(response)
          showMainPage()
        })
        .fail((xHR, textStatus)  => {
          console.log(  xHR,textStatus );
        })
        .always(()=>{
          $("#email").val()
          $("#password").val()


        })
      
    }
    
    function register() {
      const email = $('#registemail').val()
      const password = $('#registpassword').val()
      console.log(email, password);
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email,
          password
        }
      })
        .done(_ => {
          showLogin()
        })
        .fail((xhr, textStatus) => {
          console.log(xhr);
        })
        .always(_ => {
          $('#registemail').val("")
          $('#registpassword').val("")
        })
    }

    function logout (e){
      var auth2 = gapi.auth2.getAuthInstance();
       auth2.signOut().then(function () {
          console.log('User signed out.');
       });
     
      localStorage.clear()
      showlogin()
    }
    function onSignIn(googleUser) {
      var google_token = googleUser.getAuthResponse().id_token;
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      $.ajax({
          
          url: "http://localhost:3000/googleLogin",
          method:"POST",
          data: { 
            google_token
          }
        })
        .done(response => {
          console.log('masuk done')
          localStorage.setItem('access_token',response.access_token)
          console.log(response)
          showMainPage()
        })
        .fail((xHR, textStatus)  => {
          console.log('masuk fail')
          console.log(  xHR,textStatus );
        })
       
    }
    function quote(){
      $.ajax({
          method: "GET",
          url: "http://localhost:3000/todos/quote",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
          
        })
        .done(response => {
       
        const quote = response.quoteText
       console.log(quote)
        $("#quote").show().append(`<div class="col-6 mb-5 md-8">
                  <section id="content" class="container-fluid" >
               <div class="d-flex justify-content-center align-items-center" style="height: auto;">
                <div class="p-5 bg-light shadow" style="width: auto; height: auto%; border-radius: 10px;">
                  <p><i> "${quote}" by ${response.quoteAuthor} <i></h2>`)
       
     
        })
        .fail((xHR, textStatus)  => {
          console.log(  xHR,textStatus );
        })
        .always(()=>{

        })
    

    }
    function deleteTodo(id){
      console.log(id);
      $.ajax({
        method : 'DELETE',
        url : `http://localhost:3000/todos/${id}`,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .done(_=>{
        showMainPage()
      })
      .fail((xhr, textStatus)=>{
        console.log(xhr, textStatus);
      })

    }

    function addTodo(){
    console.log('masuk add todo');

     let title = $('#add-title').val();
      let description = $('#add-description').val();
      let status = $('#add-status').val();
      let due_date = $('#add-due_date').val();

     

      $.ajax({
        method :'POST',
        url : 'http://localhost:3000/todos',
        headers:{
          access_token: localStorage.getItem('access_token')
        },
        data:{
          title,
          description,
          status,
          due_date
        }
      })
      .done(response=>{
        console.log(response)
        fetchData()
      })
      .fail((xhr,textStatus)=>{
        console.log(xhr,textStatus);
      })
      .always(_=>{
        $('#add-title').val("");
        $('#add-description').val("");
        $('#add-status').val("");
        $('#add-due_date').val("");
      })
    }
    function fetchData(){
      $.ajax({
          method: "GET",
          url: "http://localhost:3000/todos",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
          
        })
        .done(response => {
       
        const todos = response
       
        $("#title-todo").show()
        $("#list-todos").empty()

        response.forEach(el => {

            $("#list-todos").append(`
            
                <div class="col mb-5 md-8">
                  <section id="content" class="container-fluid" >
               <div class="d-flex " style="height: auto;">
                <div class="p-5 bg-light shadow" style="width: auto; height: auto; border-radius: 10px;">
    
                    <p> title: ${el.title}</p>
                    <p> description: ${el.description}</p>
                   <p>  status: ${el.status}</p>
                   <p>  due date: ${el.due_date}</p>
                    <button type="submit" class="btn btn-primary" style="background-color: green;" onClick="getEdit(${el.id})">Edit</button>
                    <button type="submit" class="btn btn-primary" style="background-color: red;" onClick="deleteTodo(${el.id})">Delete</button>
                </div>
              </div></div>
               </section> 
            `)
        })
        // console.log(response, '<< response ')
     
        })
        .fail((xHR, textStatus)  => {
          console.log(  xHR,textStatus );
        })
        .always(()=>{
         


        })
    }
    function showEditForm(data) {
      $("#form-add").hide()
      $("#edit").hide()
      $("#show").hide()
      $("#btn-logout").hide()
      $("#fetchData").hide()
      $("#register").hide()
      $("#quote").hide()

      console.log(data);
      $('#edit').show().empty().append(`
        <form id="edit-form" onsubmit="postEdit(${data.id})">
          <div class="col-6 mt-4">
            <div class="row justify-content-center mt-5">
              <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
          <div class="p-5 bg-light shadow" style="width: 100%; height: 80%; border-radius: 10px;">

          <div class="form-group">
            <label for="edit-title">Title</label>
            <input type="text" id="edit-title" class="form-control" value="${data.title}">
          </div>
          <div class="form-group">
            <label for="edit-description">Description</label>
            <input type="text" id="edit-description" class="form-control" value="${data.description}">
          </div>
          <div class="form-group">
            <label for="edit-status">Status</label>
            <input type="text" id="edit-status" class="form-control" value="${data.status}">
          </div>
          <div class="form-group">
            <label for="edit-due_date">Due date</label>
            <input type="date" id="edit-due_date" class="form-control" value="${data.due_date}">
          </div>
    
          <input type="submit"class="btn btn-primary" style="background-color: green; id="submit-edit" value="Save Changes">
        </form>
      
    </div>
        
      `);
    }

    function getEdit(id) {

      $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .done(data => {
         
          showEditForm(data)
        })
        .fail((xhr, textStatus) => {
          console.log(xhr, textStatus);
        })
    }

    function postEdit(id) {

      const title = $('#edit-title').val();
      const description = $('#edit-description').val();
      const status = $('#edit-status').val();
      const due_date = $('#edit-due_date').val();
      console.log(id, title, description, status, due_date);

      $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title,
          description,
          status,
          due_date
        }
      })
        .done(_ => {
          showMainPage()
        })
        .fail((xhr, textStatus) => {
          console.log(xhr, textStatus);
        })
    }

     $(document).ready(function(){
       if (localStorage.getItem('access_token')){
         showMainPage()
         
       }
       else {
        showlogin ()
        
       }
       $("#form-add").on("submit",function(e){
        e.preventDefault();
       addTodo()
  
       })

       $('#btn-register').on('click', (e) => {
          e.preventDefault();
          showRegister();
      })
       $("#login-form").on("submit",function(e){
        e.preventDefault()
        login()
      })
      $("#btn-logout").on("click",function(e){
        e.preventDefault()
        logout()
        showlogin()
      })
  });

  