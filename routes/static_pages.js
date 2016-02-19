var Authenticated = require("./modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    { // serving static files
      method: 'GET',
      path: "/public/{path*}",
      handler: {
        directory: {
          path: 'public'
        }
      }
    },
    { // Home Page
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var bars = [{
            image: "http://hongkong.peninsula.com/en/~/media/Images/Hong-Kong/dining/the-bar/phk-the-bar-interior-1074b.ashx?mw=952",
            name: "Dragon",
            location: "LKF",
            deal: "50% off"
          }];
          // need to have authenticated inorder to show signout button
          reply.view('static_pages/home', {bars: bars, authenticated: result.authenticated}).code(200);
        });
      }
    }

  ]);

  next();
};

exports.register.attributes = {
  name: 'static-pages-views',
  version: '0.0.1'
};
