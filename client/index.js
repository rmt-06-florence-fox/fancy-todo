function showmainpage() {
  $("#main-page").show();
  $("#login-page").hide();
  $("#logout").show();
  $("#register-nav").hide();
  $("#login-nav").hide();
}

function showloginpage() {
  $("#login-page").show();
  $("#main-page").hide();
  $("#logout").hide();
  $("#register-page").hide();
  $("#register-nav").show();
  $("#login-nav").show();
}

function showregisterpage() {
  $("#login-page").hide();
  $("#main-page").hide();
  $("#logout").hide();
  $("#register-page").show();
}

function login() {
  const email = $("#email").val();
  const password = $("#password").val();
  $.ajax({
    url: "http://localhost:3000/todos/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      showmainpage();
    })
    .fail((xhr, testStatus) => {
      console.log(xhr, testStatus);
    })
    .always(() => {
      $("#email").val("");
      $("#password").val("");
    });
}

function register() {
  const email = $("#email-register").val();
  const password = $("#password-register").val();

  $.ajax({
    url: "http://localhost:3000/todos/register",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      showloginpage();
    })
    .fail((xhr, testStatus) => {
      console.log(xhr, testStatus);
    })
    .always(() => {
      $("#email").val("");
      $("#password").val("");
    });
}

function logout() {
  localStorage.clear();
  $("#main-page").hide();
  $("#login-page").show();
  $("#logout").hide();
}

$(document).ready(function () {
  if (localStorage.getItem("access_token")) {
    showmainpage();
  } else {
    showloginpage();
  }

  $("#login-form").on("submit", function (e) {
    e.preventDefault();
    login();
  });

  $("#logout").on("click", function () {
    logout();
  });

  $("#login-nav").on("click", function () {
    showloginpage();
  });

  $("#register-nav").on("click", function () {
    showregisterpage();
  });

  $("#register-form").on("submit", function (e) {
    e.preventDefault();
    register();
  });
});
