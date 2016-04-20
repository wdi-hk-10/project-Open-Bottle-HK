$(document).ready(function () {
  var startStr = $('span#start-time').text();
  var endStr   = $('span#end-time').text();
  var startTime = moment(startStr, "HH").format("LT");
  var endTime   = moment(endStr, "HH").format("LT");
  $('span#start-time').text(startTime);
  $('span#end-time').text(endTime);
});
