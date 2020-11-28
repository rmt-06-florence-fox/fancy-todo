$(document).ready(() => {
    if(localStorage.getItem("access_token")) {
        showMainPage();
    } else {
        showLoginPage();
    }

    $("#login-form").on("submit", (e) => {
        e.preventDefault();
        login();
    })

    $("#login-register-btn").on("click", (e) => {
        showRegisterPage();
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault();
        register();
    })

    $("#register-cancel-btn").on("click", (e) => {
        showLoginPage();
    })

    $("#add-task-form").on("submit", (e) => {
        e.preventDefault();
        createTask();
    })

    $("#get-hourly-forecast").on("click", (e) => {
        getHourlyForecast();
    })

    $("#get-daily-forecast").on("click", (e) => {
        getDailyForecast();
    })

    $("#get-quote").on("click", (e) => {
        e.preventDefault();
        getQuote();
    })

    $("#btn-logout").on("click", (e) => {
        logout();
    })
})