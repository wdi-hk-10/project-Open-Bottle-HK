var authenticated = require("./modules/authenticated.js");

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
        authenticated(request, function (result) {
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
    { // Get ONE bar - usually we would have this on another bar.js file under routes, however because this project is small we can keep it in pages.js

      method: 'GET',
      path: '/bars/{id}',
      handler: function (request, reply) {
        authenticated(request, function (result) {
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
    { // get all bookmarks for one user
      method: 'GET',
      path: '/profile', //or is this meant to be /profile?
      handler: function (request, reply) {
        authenticated(request, function (result) {
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            var user_id = ObjectID(result.user._id);

            db.collection('bookmarks').find({"user_id": user_id}).toArray(function(err, bookmarks) {
              if (err) { return reply(err).code(400); }

              var data = {
                bookmarks: bookmarks,
                authenticated: result.authenticated,
                user: result.user
              };

              console.log(data)

              reply.view('pages/profile', data).code(200);
            });
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
    query.price = { $lte: parseInt(queries.price) };
  }

  if (queries.drink) {
    query.beverage = { $in: [queries.drink] };
  }

  if (queries.features) {
    query.features = { $in: [queries.features] };
  }

  console.log(query);
  return query;
}