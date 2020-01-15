
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//import UserSchema 
var userAuthSchema = require('../models/userSchema');
var settings = require('../config/settings');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = settings.secret;
    passport.use( new JwtStrategy(opts, function(jwt_payload, done){
        userAuthSchema.findOne({_id: jwt_payload.id}, function(err, user) { 
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};