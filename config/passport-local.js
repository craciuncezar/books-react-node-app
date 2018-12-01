const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/dbModel").User;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      return UserModel.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Email not found" });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              const payload = {
                id: user.dataValues.id,
                name: user.dataValues.name,
                email: user.dataValues.email,
                password: user.dataValues.password
              };
              return done(null, payload, { message: "Logged In Successfully" });
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch(err => done(err));
    }
  )
);

// Protecting routes
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secret = require("./index").secret;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    },
    (jwtPayload, cb) => {
      return cb(null, jwtPayload.id);
    }
  )
);
