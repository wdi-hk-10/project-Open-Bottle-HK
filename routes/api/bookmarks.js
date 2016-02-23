// ONLY PUT THESE IN API FILES IF YOU ARE SENDING/CREATING JSON REQUESTS - NOT HTML RENDERED REQUESTS. FOR HTML YOU PUT THEM IN PAGES.JS OR CREATE OTHER "STATIC" PAGES UNDER ROUTES
var authenticated = require("../modules/authenticated.js");

exports.register = function(server, options, next) {
  server.route([
    { // create a bookmark for the user- use the data value from bookmarked button
      method: 'POST',
      path: '/api/profile/bookmark',
      handler: function (request, reply) {
        authenticated(request, function (result) {
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('bars').findOne({"_id": ObjectID(request.payload.bar_id)}, function(err, bar){
              if (err) { return reply(err).code(400);}

              if (bar === null) { return reply({message: "bar not found"}); }

              var bookmark = {
                bar: bar,
                user_id: result.user._id,
              }

              db.collection('bookmarks').insert(bookmark, function(err, doc) {
                if (err) { return reply('Internal MongoDB error', err).code(400);}

                reply({doc: doc, message: "Added!"}).code(200);

              });
            });
          } else {
            reply.redirect("/");
          }
        });
      }
    },
    { // create a bookmark for the user- use the data value from bookmarked button
      method: 'DELETE',
      path: '/api/profile/bookmark',
      handler: function (request, reply) {
        authenticated(request, function (result) {
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('bars').findOne({"_id": ObjectID(request.payload.bar_id)}, function(err, bar){
              if (err) { return reply(err).code(400);}

              if (bar === null) { return reply({message: "bar not found"}); }

              var bookmark = {
                bar: bar,
                user_id: result.user._id,
              }

              db.collection('bookmarks').remove(bookmark, function(err, doc) {
                if (err) { return reply('Internal MongoDB error', err).code(400);}

                reply({doc: doc, message: "Removed!"}).code(200);

              });
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
  name: 'bookmarks-api',
  version: '0.0.1'
};
