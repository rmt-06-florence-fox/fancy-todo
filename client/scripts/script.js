$(document).ready (function(){

    if (localStorage.getItem('access_token')) {
      homepage()
      footerLink()
    } else {
      landing()
    }

    
  });