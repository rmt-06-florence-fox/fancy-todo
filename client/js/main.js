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

    $("#uncompleted-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        if (value !== "") {
            let category = $("#uncompleted-search-category").val().toLowerCase();
            let target;
            if (category === "title") {
                target = ".card-title";
            } else if (category === "description") {
                target = ".card-text";
            } else {
                target = ".card-subtitle";
            }
            console.log(target);
            console.log(value);
            $("#main-uncompleted-content > div").filter(function() {
                let targetText =  $(this).find(`${target}`).text().toLowerCase();
                $(this).toggle($(this).find(`${target}`).text().toLowerCase().indexOf(value) > -1);
            });
        } else {
            $("#main-uncompleted-content > div").show();
        }
    });

    $("#completed-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        if (value !== "") {
            let category = $("#completed-search-category").val().toLowerCase();
            let target;
            if (category === "title") {
                target = ".card-title";
            } else if (category === "description") {
                target = ".card-text";
            } else {
                target = ".card-subtitle";
            }
            console.log(target);
            console.log(value);
            $("#main-completed-content > div").filter(function() {
                let targetText =  $(this).find(`${target}`).text().toLowerCase();
                $(this).toggle($(this).find(`${target}`).text().toLowerCase().indexOf(value) > -1);
            });
        } else {
            $("#main-completed-content > div").show();
        }
    });

    $("#expired-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        if (value !== "") {
            let category = $("#expired-search-category").val().toLowerCase();
            let target;
            if (category === "title") {
                target = ".card-title";
            } else if (category === "description") {
                target = ".card-text";
            } else {
                target = ".card-subtitle";
            }
            console.log(target);
            console.log(value);
            $("#main-expired-content > div").filter(function() {
                let targetText =  $(this).find(`${target}`).text().toLowerCase();
                $(this).toggle($(this).find(`${target}`).text().toLowerCase().indexOf(value) > -1);
            });
        } else {
            $("#main-expired-content > div").show();
        }
    });

    $("#btn-logout").on("click", (e) => {
        logout();
    })
})