function showTodos(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        $("#todosTableHead").empty();
        $("#todosTableBody").empty();
        $("#todosTableHead").append(`
        <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            <th scope="col">Action</th>
        </tr>
    `);
        for(let i = 0; i < response.length; i++){
            $("#todosTableBody").append(`
            <tr>
                <th>${i + 1}</th>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${response[i].status}</td>
                <td>${response[i].due_date}</td>
                <td class ="text-right">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#editTodoModal" onclick="editFormTodo(${response[i].id})" style="width: 80px;">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTodo(${response[i].id})" style="width: 80px;">Delete</button>
                </td>
            </tr>
        `)
        }
    })
    .fail((xhr)=>{
        console.log(xhr);
    })
}

function addTodo(){
    const newTodo = {
        title: $("#addTitle").val(),
        description: $("#addDesc").val(),
        status: $("#addStatus").val(),
        due_date: $("#addDueDate").val()
    }
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: newTodo
    })
    .done((response) =>{
        showTodos()
        console.log(response)
    })
    .fail((xhr) =>{
        console.log(xhr);
    })
    .always(()=>{
        $("#addTodoForm").trigger("reset")
    })
}

function editFormTodo(id){
    $("#editTodoForm").empty();
    $("#editTodoFormButton").remove();
    $("#editTodoForm").show();
    // $("#editTodoForm").on("submit", (event)=>{
    //     event.preventDefault();
    // })
    $("editTodoModal").modal();
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/" + `${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done((response)=>{
        // $("#editTodoForm").append(`<label for="editTitleForm">Title:</label><br>
        // <input type="text" id="editTitle" name="title" required>
        // <br>
        // <label for="editDescForm">Description:</label><br>
        // <input type="text" id="editDesc" name="description"><br><br>
        // <label for="editStatusForm">Status:</label>
        // <select name="status" id="editStatus" required>
        //     <option value="Akan dikerjakan">Akan dikerjakan</option>
        //     <option value="Sedang dikerjakan">Sedang dikerjakan</option>
        //     <option value="Sudah dikerjakan">Sudah dikerjakan</option>
        // </select> 
        // <br><br>
        // <label for="editDueDate">Due Date:</label>
        // <input type="date" id="editDueDate" name="due_date" required><br><br>
        // <button onclick="editTodo(${response.id})">Edit</buton>`)
        console.log(response);
        $("#editTodoForm").append(`<div class="form-group">
        <label for="editTitleForm">Title:</label>
        <input type="text" id="editTitle" name="title" class="form-control" required>
      </div>
      <div class="form-group">
          <label for="editDescForm">Description:</label>
          <input type="text" id="editDesc" name="description" class="form-control">
      </div>
      <div class="form-group">
          <label for="editStatusForm">Status</label>
          <select name = "status" class="form-control" id="editStatus" required>
              <option value="Akan dikerjakan">Akan dikerjakan</option>
              <option value="Sedang dikerjakan">Sedang dikerjakan</option>
              <option value="Sudah dikerjakan">Sudah dikerjakan</option>
          </select>
      </div>
      <div class="form-group">
          <label for="editDueDate">Due Date:</label>
          <input type="date" id="editDueDate" name="due_date" class="form-control" required>
      </div>`);

        $("#editButton").append(`<button type="button" onclick="editTodo(${response.id})" class="btn btn-primary" id="editTodoFormButton">Edit Todo</button>`)
        $("#editTitle").val(response.title),
        $("#editDesc").val(response.description),
        $("#editStatus").val(response.status),
        $("#editDueDate").val(response.due_date)
    })
    .fail((xhr)=>{
        console.log(xhr);
    })
}

function editTodo(id){
    console.log(id);
    const editTodo = {
        title: $("#editTitle").val(),
        description: $("#editDesc").val(),
        status: $("#editStatus").val(),
        due_date: $("#editDueDate").val()
    }

    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/todos/" + `${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: editTodo
    })
    .done((response)=>{
        showTodos();
        console.log(response);
    })
    .fail((xhr) =>{
        console.log(xhr);
    })
    .always(()=>{
        $("#editTodoForm").trigger("reset")
        $("#editTodoForm").empty();
        $("#editTodoForm").hide();
        $("#editTodoFormButton").remove();
        $("#editTodoModal").modal("hide");
    })

}

function showLoginPage(){
    $('#createNewAccount').on("click", (event)=>{
        event.preventDefault();
    })
    $('#registerPage').hide();
    $('#loginPage').show();
    $('#main-page').hide();
    $('#logoutButton').hide();
}
function showRegisterPage(){
    $('#alreadyHaveAccount').on("click", (event)=>{
        event.preventDefault();
    })
    $('#registerPage').show();
    $('#loginPage').hide();
    $('#main-page').hide();
    $('#logoutButton').hide();
}
function showMainPage(){
    $('#registerPage').hide();
    $('#loginPage').hide();
    $('#main-page').show();
    $('#logoutButton').show();
    $("#editTodoForm").hide();
    showTodos();
}
function logout(){
    localStorage.clear();
    showLoginPage();

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

}
function deleteTodo(id){
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/todos/` + `${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done((response)=>{
        showTodos();
    })
    .fail((xhr)=>{
        console.log(xhr);
    })
}
function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: "http://localhost:3000/user/googleLogin",
        method: "POST",
        data: {
            googleToken
        }
    })
    .done((response)=>{
        localStorage.setItem("access_token", response.access_token);
        showMainPage();
    })
    .fail((xhr)=>{
        console.log(xhr)
    })
}
