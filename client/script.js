$("#login-form").hide()
        $("#register-form").show()
        $("#add-todo-form").hide()
        $("#edit-todo-form").hide()
        $("#content-form").hide()
        $("#logout").hide()

        function onSignIn(googleUser) {
            var googletoken = googleUser.getAuthResponse().id_token;

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/googlelogin",
                data : {
                    googletoken
                }
            })
                .done(data => {
                    localStorage.setItem('access_token', data.access_token)
                    getTodo()
                    getNews()
                })
                .fail((xhr, text) => {
                    console.log(xhr.responseText, text)
                })
        }


        function showloginpage(){
            $("#login-form").show()
            $("#register-form").hide()
            $("#add-todo-form").hide()
            $("#edit-todo-form").hide()
            $("#content-form").hide()
            $("#logout").hide()
        }

        function showRegisterpage(){
            $("#login-form").hide()
            $("#register-form").show()
            $("#add-todo-form").hide()
            $("#edit-todo-form").hide()
            $("#content-form").hide()
            $("#logout").hide()
        }

        function showcontentpage(){
            $("#login-form").hide()
            $("#register-form").hide()
            $("#add-todo-form").show()
            $("#edit-todo-form").hide()
            $("#content-form").show()
            $("#logout").show()
        }

        function showEditpage(){
            $("#login-form").hide()
            $("#register-form").hide()
            $("#add-todo-form").hide()
            $("#edit-todo-form").show()
            $("#content-form").hide()
            $("#logout").show()
        }

        function getTodo(){
            $.ajax({
                type: "GET",
                url: 'http://localhost:3000/todos',
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .done(data => {
                showcontentpage()
                $("#content-form").empty()
                data.forEach(element => {
                    $("#content-form").append(`
                    <div class="col-sm-6" style="padding: 10px;">
                        <div class="card">
                            <h5 class="card-header"><b>${element.title}</b></h5>
                            <div class="card-body">
                                <p class="card-text"><b>Decsription : </b>${element.description}</p>
                                <p class="card-text"><b>Status : </b>${element.status}</p>
                                <p class="card-text"><b>Due Date : </b>${element.due_date}</p>
                                <button onclick="getTodoById(${element.id})" class="btn btn-primary">Edit</button>
                                <button onclick="deletetodo(${element.id})" class="btn btn-primary">Delete</button>
                            </div>
                        </div>
                    </div>`)
                })
            })
            .fail((xhr, text) => {
                console.log(xhr.responseText, text)
            })
        }

        function login(){
            const email = $("#login-email").val()
            const password = $("#login-password").val()
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/login',
                data: {
                    email: email,
                    password: password
                }})
                .done(data => {
                    localStorage.setItem('access_token', data.access_token)
                    getTodo()
                    getNews()
                    console.log(data)
                })
                .fail((xhr, text) => {
                    console.log(xhr.responseText, text)
                })
                .always(() => {
                    $("#login").trigger("reset")
                })        
        }

        function register(){
            const email = $("#register-email").val()
            const password = $("#register-password").val()
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/register',
                data: {
                    email: email,
                    password: password
                }})
                .done(data => {
                    showloginpage()
                })
                .fail((xhr, text) => {
                    console.log(xhr.responseText, text)
                })
                .always(() => {
                    $("#register").trigger("reset")
                })        
        }

        function addtodo(){
            const title = $("#add-todo-title").val()
            const description = $("#add-todo-description").val()
            const status = $("#add-todo-status").val()
            const due_date = $("#add-todo-duedate").val()
            console.log(title, description, status, due_date)
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/todos',
                headers: {
                    access_token : localStorage.getItem('access_token')
                },
                data: {
                    title: title,
                    description: description,
                    status: status,
                    due_date: due_date
                }})
                .done(data => {
                    getTodo()
                })
                .fail((xhr, text) => {
                    console.log(xhr.responseText, text)
                })
                .always(() => {
                    $("#add-todo").trigger("reset")
                })
        }

        function getTodoById(id){
            $.ajax({
                type: "GET",
                url: 'http://localhost:3000/todos/'+id,
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .done(data => {
                console.log(data)
                $("#edit-todo-title").val(data.title)
                $("#edit-todo-description").val(data.description)
                $("#edit-todo-status").val(data.status)
                $("#edit-todo-duedate").val(data.due_date)
                localStorage.setItem('edit_data', data.id)
                showEditpage()
            })
            .fail((xhr, text) => {
                console.log(xhr.responseText, text)
            })
        }

        function getNews(){
            $.ajax({
                type: "GET",
                url: 'http://localhost:3000/todos/news',
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .done(data => {
                console.log(data)
                $("#news").empty()
                $("#news").append(`
                <h5 class="card-header bg-dark text-info"><b>Today News</b></h5>
                    <div class="card-body bg-secondary">
                        <p class="card-text"><b>Title : </b>${data.title}</p>
                        <div><p class="card-text"><b>Url : </b><a href="${data.url}" target="_blank">Link News</a></p></div>
                        <p class="card-text"><img src=${data.image} class="img-fluid" style="width: 70%"alt=""></p>
                    </div>`)
            })
            .fail((xhr, text) => {
                console.log(xhr.responseText, text)
            })
        }


        function editTodo(){
            const title = $("#edit-todo-title").val()
            const description = $("#edit-todo-description").val()
            const status = $("#edit-todo-status").val()
            const due_date = $("#edit-todo-duedate").val()
            const data_id = localStorage.getItem('edit_data')
            $.ajax({
                type: "PUT",
                url: 'http://localhost:3000/todos/'+data_id,
                headers: {
                    access_token : localStorage.getItem('access_token')
                },
                data: {
                    title,
                    description,
                    status,
                    due_date,
                    data_id
                }
            })
            .done(data => {
                getTodo()
                localStorage.removeItem('edit_data')
            })
            .fail((xhr, text) => {
                console.log(xhr.responseText, text)
            })
        }

        function deletetodo(id){
            $.ajax({
                type: "DELETE",
                url: 'http://localhost:3000/todos/'+id,
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .done(data => {
                console.log(data)
                getTodo()
            })
            .fail((xhr, text) => {
                console.log(xhr.responseText, text)
            })
        }

        $(document).ready(function(){

            if(localStorage.getItem('access_token')){
                showcontentpage()
                getTodo()
                
            }else{
                showloginpage()
            }
            $("#login").on("submit", (e) => {
                e.preventDefault()
                login()
            })
            $("#register").on("submit", (e) => {
                e.preventDefault()
                register()
            })
            $("#add-todo").on("submit", (e) => {
                e.preventDefault()
                addtodo()
            })
            $("#edit-todo").on("submit", (e) => {
                e.preventDefault()
                editTodo()
            })
            $("#toregisterpage").on("click", (e) => {
                e.preventDefault()
                showRegisterpage()
            })
            $("#tologinpage").on("click", (e) => {
                e.preventDefault()
                showloginpage()
            })
            $("#canceledit").on("click", (e) => {
                e.preventDefault()
                showcontentpage()
            })
            $("#logout").on("click", (e) => {
                localStorage.clear()
                showloginpage()
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.')
                })
            })  
        })