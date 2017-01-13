const chai = require('chai');
const assert = chai.assert;

const connection = require( '../lib/setup_mongoose');
const Server = require( '../lib/server' );

describe( 'players e2e', () => {

    before(done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'players';
            connection.db.listCollections({ name })
		.next( (err, collinfo) => {
    if (!collinfo) return done();
    connection.db.dropCollection(name, done);
});
        }

    });

    it ('/GET - gets all', done => {

        const req = {
            method: 'GET',
            url: '/api/players'
        };

        Server.inject (req, res => {
            console.log(res.payload);
            assert.deepEqual(res.statusCode, 200);
            assert.deepEqual(res.payload, '[]');
            done();
        });

    });

    const antonio = {
        playerName: 'Antonio Brown',
        position: 'WR'
    };

    it ('/POST - adds a player', done => {

        const req = {
            method: 'POST',
            url: '/api/players',
            payload: antonio
        };

        Server.inject (req, res => {
            const player = res.result;
            console.log(res.result);
            antonio._id = player._id;
            assert.deepEqual(res.statusCode, 200);
            assert.deepEqual(player.playerName, 'Antonio Brown');
            done();
        });

    });

    it ('/GET - gets by id', done => {

        const req = {
            method: 'GET',
            url: `/api/players/${antonio._id}`
        };

        Server.inject (req, res => {
            const player = res.result;
            console.log(player._id);
            assert.deepEqual(res.statusCode, 200);
            assert.deepEqual(player._id, antonio._id);
            done();
        });

    });


    const updated = {
        playerName: 'Antonio Brown',
        position: 'QB'
    };

    it('/PUT - updates a player', done => {

        const req = {
            method: 'PUT',
            url: `/api/players/${antonio._id}`,
            payload: updated
        };

        Server.inject (req, res => {
            const player = res.result;
            console.log(player);
            assert.deepEqual(res.statusCode, 200);
            assert.deepEqual(res.result.position, 'QB');
            done();
        });

    });

    it ('/DELETE - removes a player', done => {

        const req = {
            method: 'DELETE',
            url: `/api/players/${antonio._id}`
        };

        Server.inject (req, res => {
            const player = res.result;
            console.log(player);
            assert.deepEqual(res.statusCode, 200);
            assert.deepEqual(player._id, antonio._id);
            done();
        });

    });


});
