const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.KEY_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.KEY_REFRESH_TOKEN, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = new TokenService();