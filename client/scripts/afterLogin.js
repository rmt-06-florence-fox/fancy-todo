
function logoutHandler() {
    clearError()
    localStorage.clear()
    $('#content').empty();
    showLogin()
}
function showContent() {
    clearContent()
    fetchContents()
    fetchQuote()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#edit-page').hide()
    $('#add-page').hide()
    $('#logoutBtn').show()
    $('#main-page').show();

}
function alterStatus(id, btn){
    
    console.log(btn)
    $.ajax({
        url : server + '/todos/' + +id,
        method : 'PATCH',
        data : {status : btn},
        headers : {token : localStorage.getItem('token')}
    })
    .done (_ => {
        clearContent()
        showContent()
    })
    .fail (xhr => {
        const errors = xhr.responseJSON.errors
        //console.log(errors)
        showError(errors)
    })
}
function deleteTodo(id){
    clearError()
    $.ajax({
        url : server + '/todos/' + +id,
        method : 'DELETE',
        data : {id},
        headers: { token: localStorage.getItem('token') }
    })
    .done(_ => {
        showContent()
    })
    .fail(xhr => {
        const errors = xhr.responseJSON.errors
        console.log(errors)
        showError(errors)
    })
}


function fetchContents() {
    clearError()
    const token = localStorage.getItem('token')
    if (token) {
        $.ajax({
            url: server + '/todos',
            method: 'GET',
            headers: { token }
        })
            .done(response => {
                //console.log(response)

                response.forEach(todo => {
                    let {id, title, description, due_date, status} = todo
                    due_date = due_date.split('T')[0]
                    //console.log(status)
                    let btn
                    if(status === 'done') {
                        btn = "undone"
                    }
                    else {
                        btn = 'done'
                    } 
                    $('#content').append(`
                    <div class="card-deck border-dark m-5 col-sm-3">
                    <div class="card-header row">
                    
                    <button onclick="alterStatus(${id}, '${btn}')" class="col-3 btn-dark m-1 text-light"> ${btn} </button>

                    <button onclick="showEdit(${id},'${title}', '${description}', '${due_date}')" class="col-3 btn-warning text-light m-1"> EDIT </button>

                    <button onclick="deleteTodo(${id})" class="col-3 btn-danger text-light m-1"> DEL </button> 
                    
                    <h4 class="col-8"> ${title}</h4></div>

                    <div class="card-body bg-info text-white">${description}</div>
                    
                    <div class="card-footer">due date : ${due_date} </div>
                    </div>
                `);
                })
            })
            .fail(xhr => {
                //console.log(xhr)
                const errors = xhr.responseJSON.errors
                //console.log(errors)
                showError(errors)
            })
    }
}

function showAdd(){
    $('#login-page').hide()
    $('#register-page').hide()
    $('#edit-page').hide()
    $('#add-page').show()
    $('#logoutBtn').show()
    $('#main-page').hide();
}

function addHandler(){
    clearError()
    const title = $('#title-add').val();
    const description = $('#description-add').val();
    const due_date = $('#due_date-add').val();
    $.ajax({
        url : server + '/todos',
        method : 'POST',
        data : {title, description, due_date},
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        //console.log('berhasilk cuy',response)
        showContent()
    })
    .fail(xhr => {
        //console.log('erorro', xhr)
        const errors = xhr.responseJSON.errors
        //console.log(errors)
        showError(errors)
        showAdd()
    })
}

function clearContent(){
    $('#content').empty();
}

function showEdit (id, title, description, due_date){
    localStorage.setItem('id', id)
    $('#title-edit').val(title);
    $('#description-edit').val(description);
    $('#due_date-edit').val(due_date);

    $('#login-page').hide()
    $('#register-page').hide()
    $('#edit-page').show()
    $('#add-page').hide()
    $('#logoutBtn').show()
    $('#main-page').hide();
}

function editHandler(){
    const id = +localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const title =  $('#title-edit').val();
    const description =  $('#description-edit').val();
    const due_date = $('#due_date-edit').val();

    $.ajax({
        url : server + '/todos/'+ id,
        method : 'PUT',
        headers : {token},
        data : {title, description, due_date}
    })

    .done (response => {
        console.log(response)
        showContent()
    })
    .fail(xhr => {
        const errors = xhr.responseJSON.errors
        //console.log(errors)
        showError(errors)
        showEdit(id, title, description, due_date)
    })
}

function fetchQuote(){
    $.ajax({
        url : server + '/quote',
        method : 'GET',
        headers : {token : localStorage.getItem('token')}
    })
    .done(response => {
        //console.log(response)
        $('#quote').text(response.quoteText);
        $('#quote-author').text(response.quoteAuthor);

    })
    .fail(xhr => {
        console.log(xhr.responseJSON.errors)
    })
}