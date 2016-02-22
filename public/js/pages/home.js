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
});

