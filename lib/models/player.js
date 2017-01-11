const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPlayer = new Schema ({

    playerName: {
        type: String,
        required: true
    },
    position: {
        type: String
    }

});

module.exports = mongoose.model('Player', schemaPlayer);
