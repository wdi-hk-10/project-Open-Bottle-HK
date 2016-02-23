$(document).ready(function() {

  var bindFilterButton = function () {
    $('#filter-button').off().on("click", function (e) {
      e.preventDefault();

      var filters = {
        day: $("#select-day").val(),
        time: $("#select-time").val(),
        location: $("#select-location").val(),
        price: $("#select-price").val(),
        drink: $("#select-drink").val(),
        features: $("#select-features").val(),
      };
      // this returns the appropriate query string
      window.location.href = "/?" + $.param(filters);
    })
  }
  bindFilterButton();


  var bookmarkedBar = function () {
    $('.elem-bookmark-btn').off().on("click", function (e) {
      e.preventDefault();
      console.log("hello");
      // bar ID, user ID,
      var bar_id = $(this).data("id");

      $.ajax({
        url: '/api/profile/bookmark',
        method: "POST",
        data: {bar_id: bar_id},
        success: function (response, status) {
          console.log (response);
          // window.location.href = "/profile";
        },
        error: function (response, status) {
          console.log(response);
        }
      })
    });
  }
  bookmarkedBar();
});
