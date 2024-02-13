const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const UserDto = require('../dtos/user-dto');
const TokenService = require('./token-service');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        if(candidate) {
            throw new Error(`User ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); 

        const user = await UserModel.create({email, password:hashPassword, activationLink});
        await MailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); //id email isActivated
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();