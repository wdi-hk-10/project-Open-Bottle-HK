var Joi   = require('joi');
var Authenticated = require("../modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    { // INDEX. Get all bars
      method: 'GET',
      path: '/api/bars',
      handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('bars').find().toArray(function (err, results) {
          if (err) { return reply(err); }
          reply(results).code(200);
        });
      }
    },
    { // Get ONE bar
      method: 'GET',
      path: '/bars/{id}',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          console.log(request);
          var db = request.server.plugins['hapi-mongodb'].db;
          var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

          var id = ObjectID(request.params.id);

          db.collection('bars').findOne({"_id": id}, function (err, bar) {
            if (err) { return reply(err); }
            // reply(results).code(200);
            reply.view('static_pages/bars', {bar: bar, authenticated: result.authenticated}).code(200);
          });
        });
      }
    }
  ]);



//     //GET USER'S BOOKMARKS
//     {
//       method: 'GET',
//       path: '/api/{username}/bars',
//       handler: function (request, reply) {
//         var db = request.server.plugins['hapi-mongodb'].db;
//         var username = request.params.username;

//         // search the username, and extract the id of the user
//         db.collection('users').findOne({username: username}, function (err, user) {
//           if (err) { return reply(err).code(400); }

//           //check if user exist
//           if (user === null){
//             return reply({message: "user Not Found"}).code(404);
//           }
//           // given the user_id, we will find all the bookmarks that this user_id has
//           var user_id = user._id; //this is directly from the mongo database

//           db.collection('bars').find({user_id: user_id}).toArray(function (err, results){
//             if (err) { return reply(err).code(400); }

//             reply(results).code(200); // this now provides an array of all the donuts for the user
//           });
//           // reply(user);
//         });
//       }
//     },
//     { //create a bar
//       method: 'POST',
//       path: '/api/bars',
//       handler: function (request, reply) {
//         Auth.authenticated(request, function(result) {
//           if (result.authenticated){
//             //only authorised users can create a doughnut
//             var db = request.server.plugins['hapi-mongodb'].db; //database
//             var session = request.yar.get('obhk_session'); //retrieving cookie that the user sent - use underscore for cookies
//             var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

//             var bar = {
//               user_id: ObjectID(session.user_id),
//               name: request.payload.name,
//               location: request.payload.location,
//               deal: request.payload.deal,
//               day: request.payload.day,
//               startTime: request.payload.startTime,
//               endTime: request.payload.endTime,
//               price: request.payload.price,
//               image: request.payload.image
//             };

//             db.collection('bars').insert(bar, function (err, doc) { //bar refers to object in var bar above
//               if (err) { return reply(err).code(400); }
//               reply(doc.ops[0]).code(200);
//             });

//           } else {
//             //can't create a post if you are not logged in
//             reply (result).code(400);
//           }
//         });


//       }
//     },
//     { //delete bar
//       method: 'DELETE',
//       path: '/api/doughnuts/{id}',
//       handler: function (request, reply) {
//         Auth.authenticated(request, function (result) {
//           if (result.authenticated) {
//             var db        = request.server.plugins['hapi-mongodb'].db;
//             var ObjectID  = request.server.plugins['hapi-mongodb'].ObjectID;
//             var session   = request.yar.get('hapi_doughnuts_session');

//             var id = ObjectID(request.params.id);
//             var user_id   = ObjectID(session.user_id);

//             // find the doughnut
//             db.collection('doughnuts').findOne({"_id": id}, function (err, doughnut){
//               if (err) { return reply(err).code(400); }
//               // check if doughnut exists
//               if (doughnut === null ) {
//                 return reply({message: "there is not doughnut"}).code(404);
//               }

//               // if doughnut's user_id is the same as current user then remove doughnut
//               if (doughnut.user_id.toString() === user_id.toString()) { //your doughnut
//                 db.collection('doughnuts').remove({"_id": id}, function (err, doc) {
//                   if (err) { return reply(err).code(400); }
//                   reply(doc).code(200);
//                 });
//               } else { //not your doughnut
//                 reply({message: "This is not your doughnut"}).code(400);
//               }
//             });
//           } else { //whether you are logged in or not (part of the auth.authentication bit) - not logged in
//             reply(result).code(400);
//           }
//         });
//       }
//     },
//     { //update doughnut
//       method: 'PUT',
//       path: '/api/doughnuts/{id}',
//       handler: function (request, reply) {
//         Auth.authenticated(request, function (result) {
//           if (result.authenticated) {
//             var db        = request.server.plugins['hapi-mongodb'].db;
//             var ObjectID  = request.server.plugins['hapi-mongodb'].ObjectID;
//             var session   = request.yar.get('hapi_doughnuts_session');

//             var id        = ObjectID(request.params.id);
//             var user_id   = ObjectID(session.user_id);
//             var updateDoughnut = {
//               user_id: user_id,
//               style : request.payload.style,
//               flavor: request.payload.flavor
//             };

//             // find the doughnut
//             db.collection('doughnuts').findOne({"_id": id}, function (err, doughnut){
//               if (err) { return reply(err).code(400); }
//               // check if doughnut exists
//               if (doughnut === null ) {
//                 return reply({message: "There is no doughnut"}).code(404);
//               }

//               // if doughnut's user_id is the same as current user then update doughnut
//               //$set - just update the things inside and don't replace anything else
//               if (doughnut.user_id.toString() === user_id.toString()) { //your doughnut
//                 db.collection('doughnuts').update({"_id": id}, {$set: updateDoughnut}, function(err, doughnut) {
//                   if (err) { return reply(err).code(400); }
//                   reply(doughnut).code(200);
//                 });
//               } else { //not your doughnut
//                 reply({message: "This is not your doughnut"}).code(400);
//               }
//             });
//           } else {
//               reply(result).code(400);
//           }
//         });
//       }
//     }



  next();
};

exports.register.attributes = {
  name: 'bars-api',
  version: '0.0.1'
};