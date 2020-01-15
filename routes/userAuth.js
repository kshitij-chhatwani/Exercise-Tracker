import authController from '../controllers/authController';
import passport from 'passport';
var express = require('express');
var Router = express.Router();
import userAuthSchema from '../models/userSchema';

Router.use(function( req,res,next){
    next()
});

Router.post('/register',authController.register_user);
Router.post('/login',authController.login_user);

module.exports = Router;