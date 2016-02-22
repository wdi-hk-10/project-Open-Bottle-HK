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
          var db = request.server.plugins['hapi-mongodb'].db;

          var query = createSearchQuery(request.query);

          db.collection('bars').find(query).toArray(function (err, bars) {
            if (err) { return reply(err); }

            var data = {
              bars: bars,
              authenticated: result.authenticated,
              user: result.user
            };

            // need to have authenticated inorder to show signout button
            reply.view('pages/home', data).code(200);
          });
        });
      }
    },
    { // Get ONE bar
      method: 'GET',
      path: '/bars/{id}',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          var db = request.server.plugins['hapi-mongodb'].db;
          var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
          var id = ObjectID(request.params.id);

          db.collection('bars').findOne({"_id": id}, function (err, bar) {
            if (err) { return reply(err); }

            var data = {
              bar: bar,
              authenticated: result.authenticated,
              user: result.user
            }

            reply.view('pages/bars', data ).code(200);
          });
        });
      }
    },
    { // Get ONE user
      method: 'GET',
      path: '/profile',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var id = ObjectID(request.params.id);

            var data = {
              authenticated: result.authenticated,
              user: result.user
            }

            reply.view('pages/profile', data).code(200);
          } else {
            reply.redirect("/");
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'pages-views',
  version: '0.0.1'
};


function createSearchQuery (queries) {
  var query = {};
  if (queries.day) {
    query.day = { $in: [queries.day] };
  }

  if (queries.time) {
    query.startTime = { $lte: parseInt(queries.time) };
    query.endTime   = { $gte: parseInt(queries.time) };
  }

  if (queries.location) {
    query.location = queries.location;
  }

  if (queries.price) {
    query.price = queries.price;
  }

  if (queries.drink) {
    query.beverage = { $in: [queries.drink] };
  }

  if (queries.features) {
    query.features = { $in: [queries.features] };
  }

  return query;
}