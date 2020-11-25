$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showRegisterPage()
    }

    $("#login-form").on("submit", function (e) {
        e.preventDefault()
        login()
    });

    $("#register-form").on("submit", function (e) {
        e.preventDefault()
        register()
    });

    $("#logout-button").on("click", function () {
        logout()
    });

    $("#register-btn-form").on("click", function () {
        showRegisterPage()
    });

    $("#login-btn-form").on("click", function () {
        showLoginPage()
    });

    $("#addModalButton").on("click", function () {
        $("#add-todo-form").trigger("reset")
        $("#add-todo-form").fadeIn("slow")
    })

    $("#closeAddModal").on("click", function () {
        $("#add-todo-form").fadeOut("slow")
    })

    $("#add-todo-form").on("submit", function (e) {
        e.preventDefault()
        createTodo()
        $("#add-todo-form").fadeOut("slow")
    });

    $("#closeEditModal").on("click", function () {
        $("#edit-todo-form").fadeOut("slow")
    })

    $("#edit-todo-form").on("submit", function (e) {
        e.preventDefault()
        editTodo()
        $("#edit-todo-form").fadeOut("slow")
    });
});