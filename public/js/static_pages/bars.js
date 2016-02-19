var Auth = require('./api/auth');

exports.register = function (server, options, next) {
  // serving static files
  server.route([
    {
      method: 'GET',
      path: "/public/{path*}",
      handler: {
        directory: {
          path: 'public'
        }
      }
    },

    {
      // Retrieve all bars
      method: 'GET',
      path: '/bars',
      handler: function(request, reply) {
            reply.view('bars').code(200);
        };
    }




exports.register.attributes = {
  name: 'static-pages-bars',
  version: '0.0.1'
};