const Hapi = require('hapi');
const server = new Hapi.Server();

require('./setup_mongoose');

// const bodyParser = require('body-parser').json();
const Player = require('./models/player');


server.connection({
    host: 'localhost',
    port: 3000
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

server.route({
    method: 'GET',
    path:'/api/players',
    handler: function (request, reply) {
        Player.find()
            .select('playerName')
            .lean()
            .then(players => reply(players))
            .catch();
    }
});

server.route({
    method: 'GET',
    path:'/api/players/{id}',
    handler: function (request, reply) {
        Player.findById(request.params.id)
            .then(player => reply(player))
            .catch();
    }
});

server.route({
    method: 'DELETE',
    path:'/api/players/{id}',
    handler: function (request, reply) {
        Player.findByIdAndRemove(request.params.id)
            .then(removed => reply(removed))
            .catch();
    }
});

server.route({
    method: 'POST',
    path:'/api/players',
    handler: function (request, reply) {
        new Player(request.payload).save()
            .then(saved => reply(saved))
            .catch();
    }
});

server.route({
    method: 'PUT',
    path:'/api/players/{id}',
    handler: function (request, reply) {
        Player.findByIdAndUpdate(request.params.id, request.payload, {new: true})
        .then(updated => reply(updated))
        .catch();
    }
});

module.exports = server;
