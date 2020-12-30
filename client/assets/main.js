$(document).ready(function(){
   const githubToken = getTokenGithub();
   if(githubToken){
      login(githubToken)
   }
   const token = localStorage.getItem('access_token')
   if(!token)
      showLoginPage()
   else
      showMainPage();
   
   getAllTodo()
   $("#form-register").on("submit",function(e){
      e.preventDefault();
      register();
   })

   $("#form-login").on("submit",function(e){
      e.preventDefault();
      login();
      //showMainPage()

   })
   $("#form-addTodo").on('submit',function(e){
      console.log("test")
      e.preventDefault();
      addTodo();
   })
   $("#form-editTodo").on('submit',function(e){
      e.preventDefault();
      postEdit();
   })
   
   
})