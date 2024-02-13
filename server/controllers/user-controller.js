const UserService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            await res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            console.log(userData)
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async activate(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async users(req, res, next) {
        try {
            res.json(['111', '222', '333']);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController();