
require('dotenv').config({ path: './../../.env' })
const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('./../mongodb/models/user'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  bcrypt = require('bcrypt');
  
const BCRYPT_SALT_ROUNDS = 12;

passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        try {
          User.findOne({
            where: {
              username: username,
            },
          }).then(user => {
            if (user != null) {
              return done(null, false, { message: 'username already taken' });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                
                User.create({ username, password: hashedPassword }).then(user => {
                  // note the return needed with passport local - remove this return for passport JWT to work
                  return done(null, user);
                });
              });
            }
          });
        } catch (err) {
            console.log(err);
          done(err);
        }
      },
    ),
  );
  
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        try {
          User.findOne({
            where: {
              username: username,
            },
          }).then(user => {
            if (user === null) {
              return done(null, false, { message: 'Invalid username' });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  return done(null, false, { message: 'passwords do not match' });
                }
                // note the return needed with passport local - remove this return for passport JWT
                return done(null, user);
              });
            }
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({
          where: {
            username: jwt_payload.id,
          },
        }).then(user => {
          if (user) {
            // note the return removed with passport JWT - add this return for passport local
            done(null, user);
          } else {
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );




  module.exports = passport;