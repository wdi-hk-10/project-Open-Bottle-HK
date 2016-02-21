$(document).ready(function() {

  var bindFilterButton = function () {
    $('#filter-button').off().on("click", function (e) {
      e.preventDefault();
      console.log("hello");
      var db = request.server.plugins['hapi-mongodb'].db;

      var day = $("select-day").val();
      var time = $("select-time").val();
      var location = $("select-location").val();
      var price = $("select-price").val();
      var drink = $("select-drink").val();
      var features = $("select-features").val();

      db.getCollection('bars').find({location: location});

      $.ajax({
        method: "GET",
        url: "/api/bars",
        success: function (response) {
          console.log(response);

          response.forEach(function (obj) {
            console.log(obj.name);
          });
        },
        error: function (response) {
          console.log(response);
        }
      })
    })
  }
  bindFilterButton();
});

