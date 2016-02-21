$(document).ready(function() {

  var bindFilterButton = function () {
    $('#filter-button').off().on("click", function (e) {
      e.preventDefault();
      console.log("clicked");

      var day = $("#select-day").val();
      var time = $("#select-time").val();
      var location = $("#select-location").val();
      var price = $("#select-price").val();
      var drink = $("#select-drink").val();
      var features = $("#select-features").val();


      $.ajax({
        method: "GET",
        url: "/api/bars",
        success: function (response) {
          console.log(response);

          response.forEach(function (obj) {
          console.log (obj.location); //this is all the location data from mongodb which works
          console.log (location); // this is the selected drop down box value which works
          // now i need to match the two???!
          obj.day == day;
          obj.time == time;
          obj.location == location;
          obj.price == price;
          obj.beverage == drink;
          obj.features == features;

          // var filteredResults = db.bars.find({
          // location: location,
          // day: day,
          // startTime: time, //may need to convert this??!
          // features: features,
          // beverage: drink,
          // price: price,
          // })

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

