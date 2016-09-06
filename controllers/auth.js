import User from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

// GENERATE token for user
function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret, 'HS512');
}

// singUP
// -----------------------
exports.signUp = function(req, res, next) {
  const email    = req.body.email,
        password = req.body.password;

  if (!email || !password) {
    return res.status(442).send({
      error: 'You must provide email and password'
    });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }

      res.json({
        token: tokenForUser(user) //return the token
      });
    });
  });
};

// singIN
// -----------------------
exports.signIn = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};
