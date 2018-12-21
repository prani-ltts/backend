var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./models/user');
var FACEBOOK_APP_ID ='228813381350241',
FACEBOOK_APP_SECRET='481e23a76168a0f99361d814bcf19a0b';
    

passport.use('local1',new LocalStrategy({
usernameField:'email',
passwordField:'password'
},
function (username, password, done) {
    User.findOne({ mailid : username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
      if (!user.isValid(password)) {
            return done(null, false, { message: 'Incorrect password .' });
        }
        return done(null, user);
    });
}
));
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    done(null,accessToken, refreshToken, profile);
  }
));


passport.serializeUser(function(user, done) {
done(null, user._id);
});

passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user) {
  done(err, user);
});
});