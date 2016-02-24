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
      // bar ID, user ID,
      var $button = $(this);
      var bar_id = $button.data("id");

      $.ajax({
        url: '/api/profile/bookmark',
        method: "POST",
        data: {bar_id: bar_id},
        success: function (response, status) {
          console.log(response.message);
          $button.text(response.message);
          // window.location.href = "/profile";
        },
        error: function (response, status) {
          console.log(response);
          $button.text(response.responseJSON.message);
        }
      })
    });
  }
  bookmarkedBar();

  var setFilterValFromStorage = function($filter, storageKey, defaultVal) {
      var localValue = localStorage[storageKey];
      if (localValue) {
        $filter.selectpicker().selectpicker('val', localValue);
      } else {
        localStorage.setItem(storageKey, defaultVal);
      }
    };

  var $selectDay = $("#select-day");
  var $selectTime = $("#select-time");
  var $selectLocation = $("#select-location");
  var $selectPrice = $("#select-price");
  var $selectDrink = $("#select-drink");
  var $selectFeatures = $("#select-features");

  $selectDay.off().on('change', function(){
    localStorage.obhkDay = $selectDay.val();
  });

  $selectTime.off().on('change', function(){
    localStorage.obhkTime = $selectTime.val();
  });

  $selectLocation.off().on('change', function(){
    localStorage.obhkLocation = $selectLocation.val();
  });

  $selectPrice.off().on('change', function(){
    localStorage.obhkPrice = $selectPrice.val();
  });

  $selectDrink.off().on('change', function(){
    localStorage.obhkDrink = $selectDrink.val();
  });

  $selectFeatures.off().on('change', function(){
    localStorage.obhkFeatures = $selectFeatures.val();
  });

  setFilterValFromStorage($selectDay, "obhkDay", "All days");

  setFilterValFromStorage($selectTime, "obhkTime", "All times");

  setFilterValFromStorage($selectLocation, "obhkLocation", "All locations");

  setFilterValFromStorage($selectPrice, "obhkPrice", "All prices");

  setFilterValFromStorage($selectDrink, "obhkDrink", "All drinks");

  setFilterValFromStorage($selectFeatures, "obhkFeatures", "All features");

});