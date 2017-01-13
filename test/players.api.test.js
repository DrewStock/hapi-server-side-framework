const chai = require('chai');
// const chaiHttp = require('chai-http');
const assert = chai.assert;
// chai.use(chaiHttp);

const connection = require( '../lib/setup_mongoose');

const Server = require( '../lib/server' );

describe( 'player e2e', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'players';
            connection.db
						.listCollections({ name })
						.next( (err, collinfo) => {
    if (!collinfo) return done();
    connection.db.dropCollection(name, done);
});
        }
    });



    it ('GET all', done => {

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

    it ('/POST', done => {

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
            // assert.ok(player._id);
            done();
        });

    });

    it ('GET by id', done => {

        const req = {
            method: 'GET',
            url: `/api/players/${antonio._id}`
        };

        Server.inject (req, res => {
            const player = res.result;
            console.log(player);
            assert.deepEqual(res.statusCode, 200);
            console.log(player._id);
            console.log(antonio._id);
            assert.deepEqual(player._id, antonio._id);
            done();
        });

    });

//     it( '/POST', done => {
//         request
// 				.post( '/players' )
// 				.send( antonio )
// 				.then( res => {
//     const player = res.body;
//     // console.log(team);
//     assert.ok( player._id );
//     antonio.__v = 0;
//     antonio._id = player._id;
//     done();
// })
// 			.catch( done );
//
//     });

//     it( '/GET by id', done => {
//         request
//     .get( `/players/${antonio._id}` )
// 			.then( res => {
//     const player = res.body;
//     assert.deepEqual( player, antonio );
//     done();
// })
// 			.catch( done );
//     });
//
//
    // after( done => {
    //     connection.close( done );
    // });
});
