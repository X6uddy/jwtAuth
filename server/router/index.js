const Router = require('express').Router;
const {body} = require('express-validator');
const UserController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration', 
            body('email').isEmail(),
            body('password').isLength({min: 3, max: 20}),
            UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.users);

module.exports = router;
