$(document).ready(function() {
// google map functionality
  function initMap() {
      var mapDiv = document.getElementById('map');
      var map = new google.maps.Map(mapDiv, {
        center: {lat: 22.278417, lng: 114.170817},
        zoom: 15
      });
    }

  // initmap();


  var bindProfileBookmarkButton = function () {
    $('.remove-btn').off().on("click", function (e) {
      e.preventDefault();
        console.log("hello");
        // bar ID, user ID,
        var bar_id = $(this).data("id");
        console.log(bar_id);
        $.ajax({
          url: '/api/profile/bookmark',
          method: "DELETE",
          data: {bar_id: bar_id},
          success: function (response, status) {
            console.log(response.message);
              window.location.href= "/profile";
          },
          error: function (response, status) {
            console.log(response);
          }
        })
      });
    }
  bindProfileBookmarkButton();
});
