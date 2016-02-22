

var bookmarkedBar = function () {
    $('#elem-bookmark').off().on("click", function (e) {
      e.preventDefault();

      $.ajax({
        url: '/profile/bookmark',
        method: "POST",
        success: function (response, status) {
          console.log (response);
        },

        error: function (response, status) {
          console.log(response);
        }
      })