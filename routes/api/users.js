var Joi   = require('joi');
var Authenticated = require("../modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
      { // Get ONE user
      method: 'GET',
      path: '/users/{id}',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          console.log(request);
          var db = request.server.plugins['hapi-mongodb'].db;
          var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

          var id = ObjectID(request.params.id);

          db.collection('users').findOne({"_id": id}, function (err, user) {
            if (err) { return reply(err); }
            // reply(results).code(200);
            reply.view('static_pages/user', {user: user, authenticated: result.authenticated}).code(200);
          });
        });
      }
    }
]);