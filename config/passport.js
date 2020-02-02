const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const AtUser = mongoose.model("atUsers")
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use('user',
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use( 'atUser',
    new JwtStrategy(opts, (jwt_payload2, done) => {
      AtUser.findById(jwt_payload2.id)
        .then(atUser => {
          if (atUser) {
            return done(null, atUser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

