const {Schema, model} = require('mongoose');

const TokenShema = new Schema({
    user: {type: String, ref: 'User'},
    refreshToken: {type: String, required: false},
});

module.exports = model('Token', TokenShema);