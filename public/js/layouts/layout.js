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

  }

  var init = function () {
    bindSignout();
  };

  init();
});





