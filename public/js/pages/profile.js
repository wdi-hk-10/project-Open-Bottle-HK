

var bookmarkedBar = function () {
    $('#elem-bookmark').off().on("click", function (e) {
      e.preventDefault();

// bar ID, user ID,
      var id = $(this).data("id");

      $.ajax({
        url: '/profile/bookmark',
        method: "POST",
        data: id,
        success: function (response, status) {
          console.log (response);
        },

        error: function (response, status) {
          console.log(response);
        }
      })