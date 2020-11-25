$(document).ready (function(){

    if (localStorage.getItem('access_token')) {
      homepage()
    } else {
      landing()
    }

  });