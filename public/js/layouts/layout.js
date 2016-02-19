$(document).ready(function () {
  var bindSignout = function () {
    $('#signout-btn').on('click', function (e) {
      e.preventDefault();
      $.ajax({
        type: "DELETE",
        url: "/api/signout",
        success: function (response) {
          window.location.href = '/';
        }
      });
    });
  };

  var bindSignin = function () {
    $('#signIn').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/api/signin",
        success: function (response) {
          window.location.href = '/';
        }
      });
    });
  };


  var bindSignup = function () {
    $('#signUp').on('submit', function (e) {
      e.preventDefault();

      var user = {
        email:      $('#signUp [name="email"]').val(),
        // name:       $('#signup [name="name"]').val(),
        username:   $('#signUp [name="username"]').val(),
        password:   $('#signUp [name="password"]').val(),
      }

      console.log(user);

      $.ajax({
        type: "POST",
        url: "/api/signup",
        data: user,
        success: function (response) {
          console.log(response);
          window.location.href = '/';
        },
        error: function(response) {
          console.log(response);
        }
      });
    });
  };

  var init = function () {
    bindSignout();
    bindSignup();
    bindSignin();
  };

  init();
});





