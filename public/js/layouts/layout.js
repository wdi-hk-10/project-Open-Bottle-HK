$(document).ready(function () {
  var bindSignout = function () {
    $('#signout-btn').on('click', function (e) {
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

      var user = {
        email:      $('#signup [name="email"]').val(),
        // name:       $('#signup [name="name"]').val(),
        username:   $('#signup [name="username"]').val(),
        password:   $('#signup [name="password"]').val(),
      }

      $.ajax({
        type: "POST",
        url: "/api/signup",
        data: user,
        success: function (response) {
          window.location.href = '/';
        }
      });
    });
  };

  var init = function () {
    bindSignout();
  };

  init();
});





