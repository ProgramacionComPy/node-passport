var mongoose = require('mongoose');
var User = mongoose.model('User');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

     passport.serializeUser(function(user, done) {
        done(null, user);
    });

     passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
     passport.use(new FacebookStrategy({
        clientID: 'FACEBOOK_APP_CLIENT_ID',
        clientSecret: 'FACEBOOK_APP_SECRET_ID',
        callbackURL: '/auth/facebook/callback'
    }, function(accessToken, refreshToken, profile, done) {
        console.log('token: '+accessToken+' '+profile.id+' '+profile.displayName);
        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null){
                console.log('user != null');
                return done(null, user);
            }

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName
            });

            user.save(function(err) {
                if(err) throw err;
                console.log('ok');
                done(null, user);
            });
        });
    }));
 }